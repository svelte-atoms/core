import { getContext, setContext } from 'svelte';
import { nanoid } from 'nanoid';
import { StagedMap } from './staged-map.svelte';
import { bondContextKey } from './context';
import { Atom } from './atom.svelte';
import { BondState } from './state.svelte';
import { CapabilityRegistry } from './capability-registry';
import { BOND_BRAND, ordinaryHasInstance } from './identity';
export { BOND_BRAND } from './identity';
import type {
	BondClass,
	BondStateProps as BondPropsBase,
	BondVirtualElement,
	NodeRegistration,
	NodeRegistrationOptions
} from './types';
import type { CapabilityKey } from '../capability';

export abstract class Bond<Props extends BondPropsBase = BondPropsBase> extends CapabilityRegistry {
	static CONTEXT_KEY = bondContextKey('bond');

	#id: string;
	#props: Props;
	#nodes = new StagedMap<NodeRegistration>();
	#name: string;
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#nodeRegistrations = new Map<Atom, string>();
	#nodeRegistrationId = 0;

	constructor(props: Props = {} as Props, name?: string) {
		super();
		// Cross-copy identity brand; read by static [Symbol.hasInstance].
		Object.defineProperty(this, BOND_BRAND, { value: true });
		const legacyState = props instanceof BondState ? props : undefined;
		this.#props = (legacyState?.props ?? props ?? {}) as Props;
		this.#id = this.#props.id ?? nanoid(8);
		this.#name = name ?? '';
		if (legacyState) this.#adoptLegacyState(legacyState);
	}

	get id() {
		return this.props?.id ?? this.#id;
	}

	get props() {
		return this.#props;
	}

	get name() {
		return this.#name;
	}

	// Bonds print as [object <name>] in consoles and Object.prototype.toString.
	get [Symbol.toStringTag]() {
		return this.name;
	}

	get namespace(): string {
		return this.name;
	}

	get preset(): string {
		return this.namespace;
	}

	share(): this {
		const key = (this.constructor as typeof Bond).CONTEXT_KEY;
		return setContext(key, this);
	}

	get elements() {
		const obj: Record<string, Element | BondVirtualElement | undefined> = {};
		for (const registration of this.#nodes.values()) {
			obj[registration.key] = registration.node.element;
		}
		return obj;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register<N extends Atom<any, any>>(node: N, options: NodeRegistrationOptions = {}): () => void {
		const key = options.key ?? node.name;
		const cardinality = options.cardinality ?? 'single';
		const existingId = this.#nodeRegistrations.get(node);

		if (existingId) {
			return () => this.unregister(node);
		}

		if (cardinality === 'single') {
			const duplicate = this.#nodes.values().find((registration) => registration.key === key)?.node;
			if (duplicate && duplicate !== node) {
				throw new Error(
					`[ixirjs] Bond("${this.name}").register("${key}") received multiple nodes for a single-node part. Use { cardinality: 'many' } when this is intentional.`
				);
			}
		}

		const id = `${key}:${++this.#nodeRegistrationId}`;
		this.#nodeRegistrations.set(node, id);
		this.#nodes.stage(id, { id, key, cardinality, node });

		let live = true;
		return () => {
			if (!live) return;
			live = false;
			this.unregister(node);
		};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	unregister(node: Atom<any, any>): void {
		const id = this.#nodeRegistrations.get(node);
		if (!id) return;
		this.#nodeRegistrations.delete(node);
		this.#nodes.delete(id);
	}

	/** Exact registration-part lookup. */
	nodeByPart<N extends Atom = Atom>(part: string): N | undefined {
		return this.nodesByPart<N>(part)[0];
	}

	/** Exact registration-part lookup for repeated parts. */
	nodesByPart<N extends Atom = Atom>(part: string): N[] {
		return this.#nodes
			.values()
			.filter((registration) => registration.key === part)
			.map((registration) => registration.node as N);
	}

	/** Exact role lookup; roles do not share the part/name namespace. */
	nodeByRole<N extends Atom = Atom>(role: string): N | undefined {
		return this.#nodes.values().find((registration) => registration.node.hasRole(role))?.node as
			| N
			| undefined;
	}

	// Thin aliases kept for Bond's public API; CapabilityRegistry owns surface()/requireSurface().
	get<S>(key: CapabilityKey<S>): S | undefined {
		return this.surface(key);
	}

	require<S>(key: CapabilityKey<S>): S {
		return this.requireSurface(key);
	}

	destroy() {
		try {
			this.destroyCapabilities();
		} finally {
			this.#nodes.clear();
			this.#nodeRegistrations.clear();
		}
	}

	#adoptLegacyState(state: BondState): void {
		const record = state as unknown as Record<PropertyKey, unknown>;
		const keys = new Set<PropertyKey>(Reflect.ownKeys(state));
		let proto = Object.getPrototypeOf(state);
		while (proto && proto !== BondState.prototype) {
			for (const key of Reflect.ownKeys(proto)) {
				const descriptor = Object.getOwnPropertyDescriptor(proto, key);
				if (!descriptor || typeof descriptor.value === 'function') continue;
				keys.add(key);
			}
			proto = Object.getPrototypeOf(proto);
		}
		for (const key of keys) {
			if (key in this) continue;
			Object.defineProperty(this, key, {
				enumerable: true,
				configurable: true,
				get: () => record[key],
				set: (value) => {
					record[key] = value;
				}
			});
		}
		for (const capability of state.capabilities) {
			this.capability(capability);
		}
	}

	static get<T extends Bond>(this: BondClass<T>): T | undefined {
		return getBondContext(this);
	}

	static getOrThrow<T extends Bond>(this: BondClass<T>, message?: string): T {
		return requireBondContext(this, message);
	}

	static optional<T extends Bond>(this: BondClass<T>): T | undefined {
		return getBondContext(this);
	}

	static required<T extends Bond>(this: BondClass<T>, message?: string): T {
		return requireBondContext(this, message);
	}

	static set<T extends Bond>(this: BondClass<T>, bond: T): T {
		return setContext(this.CONTEXT_KEY, bond);
	}

	static [Symbol.hasInstance](this: unknown, value: unknown): boolean {
		if (this === Bond) {
			return value != null && typeof value === 'object' && BOND_BRAND in value;
		}
		return ordinaryHasInstance(this, value);
	}
}

function getBondContext<T extends Bond>(cls: BondClass<T>): T | undefined {
	return getContext(cls.CONTEXT_KEY);
}

function requireBondContext<T extends Bond>(cls: BondClass<T>, message?: string): T {
	const bond = getBondContext(cls);
	if (!bond) {
		throw new Error(
			message ?? '[ixirjs] Bond context missing: component must be used within its provider.'
		);
	}
	return bond;
}
