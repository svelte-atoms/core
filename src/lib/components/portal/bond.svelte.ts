import {
	Bond,
	BondState,
	BondAtom,
	type BondElements,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';
import { defineBond, type BondOf, type ViewOf } from '$svelte-atoms/core/shared';

export type PortalStateProps = BondStateProps & {
	id: string;
	readonly rest?: Record<string, unknown>;
};

export type PortalElements = BondElements & {
	root?: HTMLElement;
	inner?: HTMLElement;
};

// Bond shape the portal atoms type `this.bond` against — breaks the atom↔bond cycle.
type PortalBondView = ViewOf<PortalState>;

export class PortalRootAtom extends BondAtom<PortalBondView, HTMLElement> {
	constructor(bond: PortalBondView) {
		super(bond, 'root');
	}

	override get attrs() {
		return {
			...super.attrs,
			id: this.bond.id
		};
	}
}

export class PortalInnerAtom extends BondAtom<PortalBondView, HTMLElement> {
	constructor(bond: PortalBondView) {
		super(bond, 'inner');
	}
}

// Hand-written base for PortalBond — resolves the portal target and overrides destroy
// to remove detached DOM nodes (calls super.destroy()).
class PortalBondBase extends Bond<PortalStateProps, PortalState> {
	get targetElement() {
		return this.element<HTMLElement>('inner') ?? this.element<HTMLElement>('root');
	}

	override destroy(): void {
		super.destroy();
		this.element<HTMLElement>('inner')?.remove();
		this.element<HTMLElement>('root')?.remove();
	}
}

// PortalBond — defineBond (§6) over PortalBondBase.
export const PortalBond = defineBond<
	{ root: typeof PortalRootAtom; inner: typeof PortalInnerAtom },
	PortalState,
	typeof PortalBondBase
>({
	name: 'portal',
	base: PortalBondBase,
	atoms: { root: PortalRootAtom, inner: PortalInnerAtom }
});

// Instance type of the portal bond — paired with the const above.
export type PortalBond = BondOf<typeof PortalBond>;

export class PortalState extends BondState<PortalStateProps> {
	constructor(props: PortalStateProps) {
		super(props);
	}
}
