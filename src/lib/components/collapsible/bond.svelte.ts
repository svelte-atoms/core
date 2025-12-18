import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { isBrowser } from '$svelte-atoms/core/utils/dom.svelte.js';

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
		const isDisabled = this.state?.props?.disabled ?? false;
		const isOpen = this.state?.props?.open ?? false;
		const isButton = isBrowser() && this.elements.header instanceof HTMLButtonElement;

		return {
			'aria-disabled': isDisabled ? 'true' : 'false',
			'aria-expanded': isOpen ? 'true' : 'false',
			'aria-controls': `collapsible-body-${this.id}`,
			disabled: isButton ? isDisabled : undefined,
			role: isButton ? undefined : 'button',
			tabindex: isButton ? undefined : isDisabled ? -1 : 0,
			id: `collapsible-header-${this.id}`,
			'data-atom': this.id ?? '',
			'data-kind': 'collapsible-header',
			...props,
			onclick: () => {
				if (!isDisabled) {
					this.state.toggle();
				}
			},
			onkeydown: (e: KeyboardEvent) => {
				if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
					e.preventDefault();
					this.state.toggle();
				}
			},
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	body(props: Record<string, unknown> = {}) {
		const isOpen = this.state?.props?.open ?? false;

		return {
			'aria-labelledby': `collapsible-header-${this.id}`,
			role: 'region',
			id: `collapsible-body-${this.id}`,
			'data-atom': this.id ?? '',
			'data-kind': 'collapsible-body',
			inert: isOpen ? undefined : true,
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
