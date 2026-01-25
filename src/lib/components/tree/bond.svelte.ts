import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { untrack } from 'svelte';
import { isBrowser } from '$svelte-atoms/core/utils/dom.svelte';

export type TreeBondProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
	readonly rest?: Record<string, unknown>;
};

export type TreeBondElements = {
	root: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
	indicator: HTMLElement;
};

export class TreeBond<
	Props extends TreeBondProps = TreeBondProps,
	State extends TreeBondState<Props> = TreeBondState<Props>,
	Elements extends TreeBondElements = TreeBondElements
> extends Bond<TreeBondProps, State, Elements> {
	static CONTEXT_KEY = '@atoms/context/tree';

	#parent?: typeof this;

	constructor(s: State) {
		super(s);

		this.#parent = TreeBond.get();
	}

	get parent() {
		return this.#parent;
	}

	share(): this {
		return TreeBond.set(this) as this;
	}

	root(props: Record<string, unknown> = {}) {
		const isOpen = this.state.props.open ?? false;
		const isDisabled = this.state.props.disabled ?? false;

		return {
			id: `tree-${this.id}`,
			'aria-labelledby': `tree-header-${this.id}`,
			'aria-expanded': isOpen,
			'aria-disabled': isDisabled,
			'aria-label': props['aria-label'],
			'data-kind': 'tree',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	header(props: Record<string, unknown> = {}) {
		const isButtonElement = isBrowser() ? this.elements.header instanceof HTMLButtonElement : false;
		const role = untrack(() => {
			return isButtonElement ? '' : 'button';
		});
		const tabindex = !isButtonElement || this.state.props.disabled ? -1 : 0;

		return {
			id: `tree-header-${this.id}`,
			'aria-controls': `tree-body-${this.id}`,
			'data-kind': 'tree-header',
			role: role,
			tabindex: tabindex,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	body(props: Record<string, unknown> = {}) {
		return {
			id: `tree-body-${this.id}`,
			'data-kind': 'tree-body',
			role: 'group',
			'aria-controlled-by': `tree-header-${this.id}`,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		};
	}

	indicator(props: Record<string, unknown> = {}) {
		return {
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.indicator = node;
			}
		};
	}

	static get(): TreeBond | undefined {
		return getContext(TreeBond.CONTEXT_KEY);
	}

	static set(bond: TreeBond): TreeBond {
		return setContext(TreeBond.CONTEXT_KEY, bond);
	}
}

export class TreeBondState<Props extends TreeBondProps> extends BondState<Props> {
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
