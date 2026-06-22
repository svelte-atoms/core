import { BondAtom } from '$svelte-atoms/core/shared/bond/bond.svelte';
import { defineBond, type BondOf, type ViewOf } from '$svelte-atoms/core/shared';
import { OverlayBond } from '$svelte-atoms/core/components/portal/host';
import {
	createDisclosure,
	type Disclosure
} from '$svelte-atoms/core/shared/capability/models/disclosure.svelte';
import {
	DisclosureState,
	type DisclosureStateProps
} from '$svelte-atoms/core/shared/capability/models/disclosure-state.svelte';

export type SidebarBondProps<T extends Record<string, unknown> = Record<string, unknown>> =
	DisclosureStateProps & {
		reversed: boolean;
		extend: T;
	};

export type SidebarElements = {
	root: HTMLElement;
	content: HTMLElement;
};

// Bond shape the atoms type `this.bond` against — breaks the atom↔bond cycle.
type SidebarBondView = ViewOf<SidebarBondState>;

class SidebarContentAtom extends BondAtom<SidebarBondView, HTMLElement> {
	constructor(bond: SidebarBondView) {
		super(bond, 'content');
	}
	override get attrs() {
		const props = this.bond.state.props;
		const isOpen = props?.open ?? false;
		const isDisabled = props?.disabled ?? false;

		return {
			...super.attrs,
			'aria-expanded': isOpen,
			'aria-disabled': isDisabled
		};
	}
}

// Non-generic bond; `SidebarBondState` keeps its `Props` generic.
export const SidebarBond = defineBond<
	{ content: typeof SidebarContentAtom },
	SidebarBondState,
	typeof OverlayBond
>({
	name: 'sidebar',
	base: OverlayBond,
	atoms: { content: SidebarContentAtom }
});

export type SidebarBond = BondOf<typeof SidebarBond>;

export class SidebarBondState<
	Props extends SidebarBondProps = SidebarBondProps
> extends DisclosureState<Props> {
	// Storage stays in `props.open`. isOpen/open/close/toggle are inherited.
	readonly disclosure: Disclosure = createDisclosure({
		get: () => this.props.open,
		set: (v) => (this.props.open = v)
	});
}
