import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

export type CollapsibleStateProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
};

export type CollapsibleDomElements = {
	root: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
	indicator: HTMLElement;
};

export class CollapsibleBond extends Bond<
	CollapsibleStateProps,
	CollapsibleState,
	CollapsibleDomElements
> {
	static CONTEXT_KEY = '@atoms/context/collapsible';

	#parent?: CollapsibleBond;

	constructor(state: CollapsibleState) {
		super(state);

		this.#parent = CollapsibleBond.get();
	}

	get parent() {
		return this.#parent;
	}

	share() {
		return CollapsibleBond.set(this) as this;
	}

	root(props: Record<string, unknown> = {}) {
		return {
			'data-id': this.id,
			'data-kind': 'collapsible',
			'data-atom': this.id ?? '',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	header(props: Record<string, unknown> = {}) {
		return {
			'aria-disabled': this.state?.props?.disabled ?? false,
			'aria-expanded': this.state?.props?.open ?? false,
			'aria-controls': `collapsible-body-${this.id}`,
			disabled: this.elements.header instanceof HTMLButtonElement ? this.state?.props.disabled : '',
			role: this.elements.header instanceof HTMLButtonElement ? undefined : 'button',
			tabindex: this.state?.props?.open ? 0 : -1, // Make focusable if open
			id: `collapsible-header-${this.id}`,
			'data-atom': this.id ?? '',
			'data-kind': 'collapsible-header',
			...props,
			onclick: () => {
				this.state.toggle();
			},
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	body(props: Record<string, unknown> = {}) {
		return {
			'aria-labelledby': `collapsible-header-${this.id}`,
			'aria-hidden': !this.state?.props?.open, // Hide when closed
			role: 'region', // Announce as a region
			id: `collapsible-body-${this.id}`,
			'data-atom': this.id ?? '',
			'data-kind': 'collapsible-body',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		};
	}

	indicator(props: Record<string, unknown> = {}) {
		return {
			role: 'icon',
			'data-atom': this.id ?? '',
			'data-kind': 'collapsible-indicator',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.indicator = node;
			}
		};
	}

	static get(): CollapsibleBond | undefined {
		return getContext(CollapsibleBond.CONTEXT_KEY);
	}

	static set(bond: CollapsibleBond): CollapsibleBond {
		return setContext(CollapsibleBond.CONTEXT_KEY, bond);
	}
}

export class CollapsibleState extends BondState<CollapsibleStateProps> {
	constructor(props: () => CollapsibleStateProps) {
		super(props);
	}

	get isOpen() {
		return this.props.open;
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
