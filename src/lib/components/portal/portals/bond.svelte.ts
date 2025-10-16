import { SvelteMap } from 'svelte/reactivity';
import { getContext, setContext } from 'svelte';
import type { PortalBond } from '../bond.svelte.js';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte.js';

export type PortalsStateProps = BondStateProps & {
	id: string;
};

export class PortalsBond extends Bond<PortalsStateProps, PortalsState> {
	static CONTEXT_KEY = '@atoms/context/portals';

	constructor(bond: PortalsState) {
		super(bond);
	}

	share() {
		return PortalsBond.set(this) as this;
	}

	static get(): PortalsBond | undefined {
		return getContext(PortalsBond.CONTEXT_KEY);
	}

	static set(bond: PortalsBond): PortalsBond {
		return setContext(PortalsBond.CONTEXT_KEY, bond);
	}
}

export class PortalsState extends BondState<PortalsStateProps> {
	#portals: Map<string, PortalBond> = new SvelteMap();

	constructor(props: () => PortalsStateProps) {
		super(props);
	}

	get id() {
		return this.props.id;
	}

	get(id: string) {
		return this.#portals.get(id);
	}

	set(id: string, portal: PortalBond) {
		this.#portals.set(id, portal);
	}

	delete(id: string) {
		this.#portals.delete(id);
	}
}
