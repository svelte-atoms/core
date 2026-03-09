import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';

export type ToastBondProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
	extend?: Record<string, unknown>;
};

export type ToastBondElements = {
	root: HTMLElement;
	title: HTMLElement;
	description: HTMLElement;
};

export class ToastBond<
	Props extends ToastBondProps = ToastBondProps,
	State extends ToastBondState<Props> = ToastBondState<Props>
> extends Bond<Props, State, ToastBondElements> {
	static CONTEXT_KEY = '@atoms/context/toast';

	constructor(s: State) {
		super(s);
	}

	share(): this {
		return ToastBond.set(this) as this;
	}

	root(props: Record<string, unknown> = {}) {
		return {
			id: `toast-root-${this.id}`,
			'aria-labeledby': `toast-title-${this.id}`,
			'aria-describedby': `toast-description-${this.id}`,
			'aria-disabled': this.state.props.disabled ?? false,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	title(props: Record<string, unknown> = {}) {
		return {
			id: `toast-title-${this.id}`,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.title = node;
			}
		};
	}

	description(props: Record<string, unknown> = {}) {
		return {
			id: `toast-description-${this.id}`,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.description = node;
			}
		};
	}

	static get(): ToastBond | undefined {
		return getContext(this.CONTEXT_KEY);
	}
	static set(atom: ToastBond): ToastBond {
		return setContext(this.CONTEXT_KEY, atom);
	}
}

export class ToastBondState<Props extends ToastBondProps> extends BondState<Props> {
	constructor(props: () => Props) {
		super(props);
	}

	open() {
		this.props.open = true;
	}

	close() {
		this.props.open = false;
	}
}
