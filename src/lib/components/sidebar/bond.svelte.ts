import { BondState, BondAtom, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { defineBond, type BondOf, type ViewOf } from '$svelte-atoms/core/shared';
import { OverlayBond } from '$svelte-atoms/core/components/overlay';
import {
	createDisclosure,
	type Disclosure
} from '$svelte-atoms/core/shared/capabilities/disclosure.svelte';

export type SidebarBondProps<T extends Record<string, unknown> = Record<string, unknown>> =
	BondStateProps & {
		open: boolean;
		disabled: boolean;
		reversed: boolean;
		extend: T;
		readonly rest?: Record<string, unknown>;
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
> extends BondState<Props> {
	// Storage stays in `props.open`.
	#disclosure: Disclosure = createDisclosure({
		get: () => this.props.open,
		set: (v) => (this.props.open = v)
	});

	constructor(props: Props) {
		super(props);
	}

	get disclosure(): Disclosure {
		return this.#disclosure;
	}

	get isOpen() {
		return this.#disclosure.isOpen;
	}

	open() {
		this.#disclosure.open();
	}

	close() {
		this.#disclosure.close();
	}

	toggle() {
		this.#disclosure.toggle();
	}
}
