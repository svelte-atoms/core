import { onDestroy, untrack } from 'svelte';
import { Atom } from './atom.svelte';
import type { Bond } from './bond.svelte';
import type { BondVirtualElement, NodeRegistrationOptions } from './types';
import type { AnyCapabilitySurface, AtomCapability, CapabilitySetupResult } from '../capability';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAtom = Atom<any, any>;

export type AtomCapabilityEntry<
	N extends AnyAtom = Atom,
	B extends Bond = Bond,
	E extends Element | BondVirtualElement = Element | BondVirtualElement
> =
	| ((node: N, bond: B | undefined) => Disposable | (() => void) | void)
	| AtomCapability<AnyCapabilitySurface, N, B, E>;

export type CreateAtomInstanceOptions<
	N extends AnyAtom = Atom,
	B extends Bond = Bond,
	E extends Element | BondVirtualElement = Element | BondVirtualElement
> = {
	/** Plain one-shot input. Resolver names make one-shot lazy resolution explicit. */
	resolveKey?: () => string;
	bond?: B | undefined;
	resolveBond?: () => B | undefined;
	required?: boolean | string;
	resolveRequired?: () => boolean | string;
	register?: boolean | NodeRegistrationOptions;
	factory?: (bond: B | undefined, key: string) => N;
	capabilities?: readonly AtomCapabilityEntry<N, B, E>[];
	resolveCapabilities?: () => readonly AtomCapabilityEntry<N, B, E>[];
	namespace?: string;
	preset?: string;
	id?: string;
};

export function createAtomInstance<
	N extends AnyAtom = Atom,
	B extends Bond = Bond,
	E extends Element | BondVirtualElement = Element | BondVirtualElement
>(key: string | undefined, options: CreateAtomInstanceOptions<N, B, E> = {}): N {
	const resolvedKey = options.resolveKey ? options.resolveKey() : key;
	if (resolvedKey === undefined) throw new Error('[ixirjs] createAtomInstance requires a key.');
	const bond = options.resolveBond ? options.resolveBond() : options.bond;
	const required = options.resolveRequired
		? options.resolveRequired()
		: (options.required ?? false);
	const requiredMessage = typeof required === 'string' ? required : undefined;

	if (required && !bond) {
		throw new Error(
			requiredMessage ??
				`[ixirjs] Atom("${resolvedKey}") requires a Bond context but none was provided.`
		);
	}

	const node = untrack(() =>
		options.factory
			? options.factory(bond, resolvedKey)
			: (new Atom(bond, resolvedKey, {
					...(options.namespace !== undefined ? { namespace: options.namespace } : {}),
					...(options.preset !== undefined ? { preset: options.preset } : {}),
					...(options.id !== undefined ? { id: options.id } : {})
				}) as unknown as N)
	);

	const initializers: Array<(node: N, bond: B | undefined) => CapabilitySetupResult> = [];
	for (const capability of options.resolveCapabilities
		? options.resolveCapabilities()
		: (options.capabilities ?? [])) {
		if (typeof capability === 'function') initializers.push(capability);
		else node.capability(capability as AtomCapability<unknown, Atom, Bond, E>);
	}

	// Registration is the first owned resource. Atom capability setup runs only after the Bond can
	// resolve the atom, then teardown reverses that sequence (capabilities before registration).
	const unregister =
		bond && options.register !== false
			? bond.register(node, options.register === true ? undefined : options.register)
			: undefined;

	try {
		node.setupCapabilities(
			bond,
			initializers.map((initialize) => () => initialize(node, bond))
		);
	} catch (error) {
		unregister?.();
		throw error;
	}

	onDestroy(() => {
		const errors: unknown[] = [];
		try {
			node.teardownCapabilities();
		} catch (error) {
			errors.push(error);
		}
		try {
			unregister?.();
		} catch (error) {
			errors.push(error);
		}
		if (errors.length > 0) {
			throw new AggregateError(errors, `[ixirjs] Atom("${node.name}") disposal failed.`);
		}
	});

	return node;
}
