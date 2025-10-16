import { SvelteMap } from 'svelte/reactivity';
import { getContext, setContext } from 'svelte';
import type { PortalBond } from '../portal/bond.svelte.js';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte.js';
import type { Component } from 'svelte';

export type RootStateProps<T extends Record<string, unknown> = Record<string, unknown>> =
	BondStateProps & {
		renderers?: {
			readonly html?: Component;
			readonly svg?: Component;
			readonly mathml?: Component;
		};
		extend: T;
	};

export class RootBond extends Bond<RootStateProps, RootBondState> {
	static CONTEXT_KEY = '@atomic-sv/bonds/root';

	constructor(atom: RootBondState) {
		super(atom);
	}

	share(): this {
		return RootBond.set(this) as this;
	}

	get rootElement() {
		return this.elements.root as HTMLElement | undefined;
	}
	set rootElement(el: HTMLElement | undefined) {
		this.elements.root = el;
	}

	static get(): RootBond | undefined {
		return getContext(RootBond.CONTEXT_KEY);
	}

	static set(bond: RootBond): RootBond {
		return setContext(RootBond.CONTEXT_KEY, bond);
	}
}

export class RootBondState extends BondState<RootStateProps> {
	#portals: Map<string, PortalBond> = new SvelteMap();

	constructor(state: () => RootStateProps) {
		super(state);
	}

	setPortal(id: string, portal: PortalBond) {
		this.#portals.set(id, portal);
	}

	getPortal(id: string) {
		return this.#portals.get(id);
	}
}
