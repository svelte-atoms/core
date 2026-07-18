import { DEV } from 'esm-env';
import { collectionCapability, collectionSlot } from '../capability/models/collection.svelte';
import { isCapabilityDecorator, normalizeBondCapability, slotName } from '../capability/capability';
import { CapabilityRuntime } from '../capability/runtime.svelte';
import type { Behavior, Capability, CapabilityInfo, CapabilityKey } from '../capability/capability';
import type { Bond } from './bond.svelte';
import type { Collection } from './collection.svelte';

/** Shared Bond/BondState capability registry backed by the unified lifecycle runtime. */
export abstract class CapabilityRegistry {
	abstract get id(): string;

	readonly #runtime = new CapabilityRuntime<Capability, Bond>({
		missingRequirement: (capability, requirement) =>
			`[ixirjs] capability "${slotName(capability.slot)}" requires slot "${slotName(requirement)}", which is not registered in "${this.id}".`,
		cycle: (capabilities) =>
			`[ixirjs] capability setup dependency cycle in "${this.id}": ${capabilities.map((capability) => `"${slotName(capability.slot)}"`).join(' -> ')}.`,
		alreadyActive: () =>
			`[ixirjs] capabilities for "${this.id}" are already active; exactly one lifecycle owner is allowed.`,
		disposed: () =>
			`[ixirjs] capabilities for "${this.id}" were disposed and cannot be activated again.`,
		disposalFailed: () => `[ixirjs] capability disposal failed in "${this.id}".`,
		activationFailed: () => `[ixirjs] capability activation failed in "${this.id}".`
	});
	#validated = false;

	collection<T>(kind: string): Collection<T> {
		const slot = collectionSlot(kind);
		const existing = this.#runtime.find(slot);
		if (existing) return existing.surface as Collection<T>;
		const capability = collectionCapability<T>(kind);
		this.capability(capability);
		return capability.surface;
	}

	capability<C extends Capability>(capability: C): C;
	capability<S>(key: CapabilityKey<S>): Capability<S> | undefined;
	capability<S = unknown>(
		capabilityOrKey: Capability | CapabilityKey<S>
	): Capability<S> | undefined {
		if (typeof capabilityOrKey === 'symbol') {
			const found = this.#runtime.find(capabilityOrKey) as Capability<S> | undefined;
			if (DEV && !found) {
				console.warn(
					`[ixirjs] capability("${slotName(capabilityOrKey)}"): no capability registered at this slot in "${this.id}".`
				);
			}
			return found;
		}

		const descriptor = normalizeBondCapability(capabilityOrKey);
		if (this.#runtime.isSealed) {
			throw new Error(
				`[ixirjs] cannot register capability "${slotName(descriptor.slot)}" in "${this.id}" after activation or role projection.`
			);
		}

		const prior = this.#runtime.find(descriptor.slot);
		if (!prior && isCapabilityDecorator(descriptor)) {
			throw new Error(
				`[ixirjs] capability decorator "${slotName(descriptor.slot)}" requires an already-registered base capability in "${this.id}".`
			);
		}
		const registered = this.#runtime.register(descriptor, (current, next) =>
			next.compose ? normalizeBondCapability(next.compose(current), next.slot) : next
		);
		if (DEV && prior) {
			const verb = capabilityOrKey.compose ? 'decorated' : 'replaced';
			console.debug(
				`[ixirjs] capability slot "${slotName(capabilityOrKey.slot)}" ${verb} in "${this.id}" (last-wins).`
			);
		}
		this.#validated = false;
		return registered as Capability<S>;
	}

	registerCapabilities(capabilities: readonly Capability[]): void {
		for (const capability of capabilities) this.capability(capability);
	}

	surface<S>(key: CapabilityKey<S>): S | undefined {
		return this.capability(key)?.surface;
	}

	requireCapability<S>(key: CapabilityKey<S>): Capability<S> {
		const found = this.#runtime.find(key) as Capability<S> | undefined;
		if (!found) {
			throw new Error(
				`[ixirjs] required capability "${slotName(key)}" is not registered in "${this.id}".`
			);
		}
		return found;
	}

	requireSurface<S>(key: CapabilityKey<S>): S {
		const capability = this.requireCapability(key);
		if (capability.surface === undefined) {
			throw new Error(`[ixirjs] capability "${slotName(key)}" has no surface in "${this.id}".`);
		}
		return capability.surface;
	}

	get capabilities(): readonly Capability[] {
		return this.#runtime.capabilities;
	}

	describeCapabilities(): CapabilityInfo[] {
		return this.capabilities.map((capability) => ({
			slot: capability.slot,
			description: capability.slot.description,
			...(capability.meta ? { meta: capability.meta } : {}),
			hasSurface: capability.surface !== undefined,
			requires: capability.requires ?? [],
			hasSetup: typeof capability.setup === 'function'
		}));
	}

	activateCapabilities(owner: Bond = this as unknown as Bond): void {
		this.#runtime.activate(owner, (capability, bond) => capability.setup?.(bond));
		if (DEV && !this.#validated) {
			this.#validated = true;
			this.#validateCapabilities();
		}
	}

	destroyCapabilities(): void {
		this.#runtime.destroy();
	}

	// Kept for compatibility with setup-free tests and legacy hosts.
	markSetupConsumed(): void {
		this.#runtime.markActive();
	}

	behaviorsForRole(role: string, ctx?: unknown): Behavior[] {
		this.#runtime.seal();
		if (DEV && !this.#validated) {
			this.#validated = true;
			this.#validateCapabilities();
		}
		const out: Behavior[] = [];
		for (const capability of this.#runtime.order()) {
			const behavior = capability.behavior?.(role, ctx);
			if (behavior) out.push(behavior);
		}
		return out;
	}

	#validateCapabilities(): void {
		// Plain local diagnostic indexes, never reactive state.
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const slotOwners = new Map<symbol, Capability>(
			this.capabilities.map((capability) => [capability.slot, capability])
		);
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const roleOwners = new Map<string, Capability[]>();
		for (const capability of this.capabilities) {
			for (const role of capability.meta?.projects ?? []) {
				const owners = roleOwners.get(role);
				if (owners) owners.push(capability);
				else roleOwners.set(role, [capability]);
			}
		}

		for (const capability of this.capabilities) {
			for (const need of capability.requires ?? []) {
				if (!slotOwners.has(need)) {
					console.warn(
						`[ixirjs] capability "${slotName(capability.slot)}" requires slot "${slotName(need)}", which is not registered in "${this.id}".`
					);
				}
			}
			for (const conflict of capability.meta?.conflicts ?? []) {
				if (typeof conflict === 'symbol') {
					const owner = slotOwners.get(conflict);
					if (owner && owner !== capability) {
						console.warn(
							`[ixirjs] capability "${slotName(capability.slot)}" conflicts with registered capability slot "${slotName(conflict)}" in "${this.id}".`
						);
					}
					continue;
				}
				const owners = roleOwners.get(conflict)?.filter((owner) => owner !== capability) ?? [];
				if (owners.length > 0) {
					console.warn(
						`[ixirjs] capability "${slotName(capability.slot)}" conflicts with role "${conflict}" projected by ${owners.map((owner) => `"${slotName(owner.slot)}"`).join(', ')} in "${this.id}".`
					);
				}
			}
		}

		if (!this.#runtime.isActive && this.capabilities.some((capability) => capability.setup)) {
			console.warn(
				`[ixirjs] "${this.id}" registered capabilities with setup() but its lifecycle was never activated — use bindBond() from the owning root.`
			);
		}
	}
}
