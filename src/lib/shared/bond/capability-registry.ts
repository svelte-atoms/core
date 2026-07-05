import { DEV } from 'esm-env';
import { collectionCapability, collectionSlot } from '../capability/models/collection.svelte';
import { slotName } from '../capability/capability';
import type { Behavior, Capability, CapabilityInfo, CapabilityKey } from '../capability/capability';
import type { Collection } from './collection.svelte';

/**
 * The capability registry seam shared by `Bond` and the deprecated `BondState`
 * compatibility host. Single home for capabilities (`#capabilities`), including
 * collections at slot `collection:<kind>`. Extracted so the two hosts share one
 * implementation instead of maintaining byte-for-byte copies.
 */
export abstract class CapabilityRegistry {
	abstract get id(): string;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#capabilities: Capability<any>[] = [];
	// Slot index mirrors #capabilities for O(1) lookup while preserving projection order.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#capabilitySlots = new Map<symbol, number>();
	#setupConsumed = false;
	#validated = false;

	collection<T>(kind: string): Collection<T> {
		const slot = collectionSlot(kind);
		// Read the registry directly (not via `capability(slot)`) so a first, cache-priming
		// access doesn't trip the "no capability at this slot" DEV warning.
		const existing = this.#findCapability(slot);
		if (existing) return existing.surface as Collection<T>;
		const cap = collectionCapability<T>(kind);
		this.capability(cap);
		return cap.surface;
	}

	capability<C extends Capability>(capability: C): C;
	capability<S>(key: CapabilityKey<S>): Capability<S> | undefined;
	capability<S = unknown>(
		capabilityOrKey: Capability | CapabilityKey<S>
	): Capability<S> | undefined {
		if (typeof capabilityOrKey === 'symbol') {
			const found = this.#findCapability(capabilityOrKey) as Capability<S> | undefined;
			if (DEV && !found) {
				console.warn(
					`[ixirjs] capability("${slotName(capabilityOrKey)}"): no capability registered at this slot in "${this.id}".`
				);
			}
			return found;
		}

		// Last-wins-per-slot: re-registering a slot replaces the prior holder (lets a spec override a
		// base default; `fuse` and the overlay capability stacks rely on it). A holder carrying a
		// `compose` hook instead WRAPS the prior — the registry hands it the capability it supersedes
		// so it can delegate (decorateCapability). DEV-logs either way so overrides aren't silent.
		// Slot identity is by symbol, not string.
		const i = this.#capabilitySlots.get(capabilityOrKey.slot);
		if (i !== undefined) {
			const prior = this.#capabilities[i]!;
			const next = capabilityOrKey.compose ? capabilityOrKey.compose(prior) : capabilityOrKey;
			if (DEV) {
				const verb = capabilityOrKey.compose ? 'decorated' : 'replaced';
				console.debug(
					`[ixirjs] capability slot "${slotName(capabilityOrKey.slot)}" ${verb} in "${this.id}" (last-wins).`
				);
			}
			this.#capabilities[i] = next;
			return next as Capability<S>;
		}
		this.#capabilitySlots.set(capabilityOrKey.slot, this.#capabilities.length);
		this.#capabilities.push(capabilityOrKey);
		return capabilityOrKey as Capability<S>;
	}

	surface<S>(key: CapabilityKey<S>): S | undefined {
		return this.capability(key)?.surface;
	}

	// Throws with the slot name (skips the DEV warn).
	requireCapability<S>(key: CapabilityKey<S>): Capability<S> {
		const found = this.#findCapability(key) as Capability<S> | undefined;
		if (!found) {
			throw new Error(
				`[ixirjs] required capability "${slotName(key)}" is not registered in "${this.id}".`
			);
		}
		return found;
	}

	requireSurface<S>(key: CapabilityKey<S>): S {
		const cap = this.requireCapability(key);
		if (cap.surface === undefined) {
			throw new Error(
				`[ixirjs] capability "${slotName(key)}" has no surface in "${this.id}".`
			);
		}
		return cap.surface;
	}

	get capabilities(): readonly Capability[] {
		return this.#capabilities;
	}

	describeCapabilities(): CapabilityInfo[] {
		return this.#capabilities.map((c) => ({
			slot: c.slot,
			description: c.slot.description,
			...(c.meta ? { meta: c.meta } : {}),
			hasSurface: c.surface !== undefined,
			requires: c.requires ?? [],
			hasSetup: typeof c.setup === 'function'
		}));
	}

	// Set by useCapabilities() once it has run the registered setups.
	markSetupConsumed(): void {
		this.#setupConsumed = true;
	}

	behaviorsForRole(role: string, ctx?: unknown): Behavior[] {
		if (DEV && !this.#validated) {
			this.#validated = true;
			this.#validateCapabilities();
		}
		const out: Behavior[] = [];
		for (const capability of this.#capabilities) {
			const behavior = capability.behavior?.(role, ctx);
			if (behavior) out.push(behavior);
		}
		return out;
	}

	// Bare registry lookup by slot identity — no DEV warn. Shared by capability()/collection()/require*.
	#findCapability(slot: symbol): Capability | undefined {
		const i = this.#capabilitySlots.get(slot);
		return i === undefined ? undefined : this.#capabilities[i];
	}

	// Deferred to first projection so the full constructor-time registration order is complete.
	// Checks: (a) requires slots are registered, (b) useCapabilities ran if any cap has setup().
	// Timing: real roots call useCapabilities before children project, so (b) only fires when genuinely missing.
	#validateCapabilities() {
		// Plain local Set: built once for membership lookup below, never reactive state.
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const slots = new Set(this.#capabilities.map((c) => c.slot));
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const slotOwners = new Map(this.#capabilities.map((c) => [c.slot, c]));
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const roleOwners = new Map<string, Capability[]>();
		for (const cap of this.#capabilities) {
			for (const role of cap.meta?.projects ?? []) {
				const owners = roleOwners.get(role);
				if (owners) owners.push(cap);
				else roleOwners.set(role, [cap]);
			}
		}
		for (const cap of this.#capabilities) {
			for (const need of cap.requires ?? []) {
				if (!slots.has(need)) {
					console.warn(
						`[ixirjs] capability "${slotName(cap.slot)}" requires slot "${slotName(need)}", which is not registered in "${this.id}".`
					);
				}
			}
			for (const conflict of cap.meta?.conflicts ?? []) {
				if (typeof conflict === 'symbol') {
					const owner = slotOwners.get(conflict);
					if (owner && owner !== cap) {
						console.warn(
							`[ixirjs] capability "${slotName(cap.slot)}" conflicts with registered capability slot "${slotName(conflict)}" in "${this.id}".`
						);
					}
					continue;
				}

				const owners = roleOwners.get(conflict)?.filter((owner) => owner !== cap) ?? [];
				if (owners.length > 0) {
					console.warn(
						`[ixirjs] capability "${slotName(cap.slot)}" conflicts with role "${conflict}" projected by ${owners.map((owner) => `"${slotName(owner.slot)}"`).join(', ')} in "${this.id}".`
					);
				}
			}
		}
		if (!this.#setupConsumed && this.#capabilities.some((c) => c.setup)) {
			console.warn(
				`[ixirjs] "${this.id}" registered capabilities with setup() (focus/escape/...) but useCapabilities(bond) was never called — their whole-bond effects will not run.`
			);
		}
	}
}
