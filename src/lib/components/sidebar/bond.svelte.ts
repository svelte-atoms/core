import { getContext, setContext, untrack } from 'svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

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

class SidebarContentAtom extends BondAtom<SidebarBond, HTMLElement> {
	constructor(bond: SidebarBond) {
		super(bond, 'content');
	}
	override get attrs() {
		const props = untrack(() => this.bond.state.props);
		const isOpen = props?.open ?? false;
		const isDisabled = props?.disabled ?? false;

		return {
			...super.attrs,
			'aria-expanded': isOpen,
			'aria-disabled': isDisabled
		};
	}
}

export class SidebarBond<
	Props extends SidebarBondProps = SidebarBondProps,
	State extends SidebarBondState<Props> = SidebarBondState<Props>
> extends Bond<Props, State, SidebarElements> {
	static CONTEXT_KEY = '@atomic-sv/bonds/sidebar';

	constructor(state: State) {
		super(state, 'sidebar');
	}

	content() {
		return this.atom('content', () => new SidebarContentAtom(this));
	}

	share(): this {
		return SidebarBond.set(this) as this;
	}

	static get(): SidebarBond | undefined {
		return getContext(SidebarBond.CONTEXT_KEY);
	}

	static set(bond: SidebarBond): SidebarBond {
		return setContext(SidebarBond.CONTEXT_KEY, bond);
	}
}

export class SidebarBondState<
	Props extends SidebarBondProps = SidebarBondProps
> extends BondState<Props> {
	constructor(props: () => Props) {
		super(props);
	}

	open() {
		this.props.open = true;
	}

	close() {
		this.props.open = false;
	}

	toggle() {
		this.props.open = !this.props.open;
	}
}
