import { SvelteMap } from 'svelte/reactivity';
import type { PortalBond } from '../bond.svelte';
import { BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { defineBond, type BondOf } from '$svelte-atoms/core/shared';

export type PortalsStateProps = BondStateProps & {
	id: string;
};

// Context-only registry bond (no atoms); the portal map lives on PortalsState.
export const PortalsBond = defineBond<Record<never, never>, PortalsState>({
	name: 'portals',
	atoms: {}
});

// Instance type of the portals bond — paired with the const above.
export type PortalsBond = BondOf<typeof PortalsBond>;

export class PortalsState extends BondState<PortalsStateProps> {
	#portals: Map<string, PortalBond> = new SvelteMap();

	constructor(props: PortalsStateProps) {
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
