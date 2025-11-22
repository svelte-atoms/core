import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte.js';

export type SidebarBondProps<T extends Record<string, unknown> = Record<string, unknown>> =
	BondStateProps & {
		open: boolean;
		disabled: boolean;
		reversed: boolean;
		extend: T;
	};

export type SidebarElements = {
	root: HTMLElement;
	content: HTMLElement;
};

export class SidebarBond<
	Props extends SidebarBondProps = SidebarBondProps,
	State extends SidebarBondState<Props> = SidebarBondState<Props>
> extends Bond<Props, State, SidebarElements> {
	static CONTEXT_KEY = '@atomic-sv/bonds/sidebar';

	constructor(state: State) {
		super(state);
	}

	content(props: Record<string, unknown> = {}) {
		return {
			'aria-expanded': this.state?.props?.open ?? false,
			'aria-disabled': this.state?.props?.disabled ?? false,
			'data-atom': this.id,
			'data-kind': 'sidebar-content',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.content = node;
			}
		};
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
