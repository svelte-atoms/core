import { getContext, setContext } from 'svelte';
import { Bond, BondState, Atom, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { isBrowser } from '$svelte-atoms/core/utils/dom.svelte.js';

export type CollapsibleStateProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
	readonly rest?: Record<string, unknown>;
};

export type CollapsibleDomElements = {
	root: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
	indicator: HTMLElement;
};

export class CollapsibleRootAtom extends Atom<CollapsibleBond> {
	constructor(bond: CollapsibleBond) {
		super(bond, 'root');
	}
}

export class CollapsibleHeaderAtom extends Atom<CollapsibleBond> {
	constructor(bond: CollapsibleBond) {
		super(bond, 'header');
	}

	override get attrs() {
		const isDisabled = untrack(()=> this.bond.state?.props)?.disabled ?? false;
		const isOpen = untrack(()=> this.bond.state?.props)?.open ?? false;
		const isButton = isBrowser() && this.element instanceof HTMLButtonElement;

		return {
			...super.attrs,
			'aria-disabled': isDisabled ? 'true' : 'false',
			'aria-expanded': isOpen ? 'true' : 'false',
			'aria-controls': `collapsible-body-${this.bond.id}`,
			disabled: isButton ? isDisabled : undefined,
			role: isButton ? undefined : 'button',
			tabindex: isButton ? undefined : isDisabled ? -1 : 0
		};
	}

	override get handlers() {
		const isDisabled = untrack(()=> this.bond.state?.props)?.disabled ?? false;

		return {
			onclick: () => {
				if (!isDisabled) {
					this.bond.state.toggle();
				}
			},
			onkeydown: (e: KeyboardEvent) => {
				if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
					e.preventDefault();
					this.bond.state.toggle();
				}
			}
		};
	}
}

export class CollapsibleBodyAtom extends Atom<CollapsibleBond> {
	constructor(bond: CollapsibleBond) {
		super(bond, 'body');
	}

	override get attrs() {
		const isOpen = untrack(()=> this.bond.state?.props)?.open ?? false;

		return {
			...super.attrs,
			'aria-labelledby': `collapsible-header-${this.bond.id}`,
			role: 'region',
			id: `collapsible-body-${this.bond.id}`,
			inert: isOpen ? undefined : true
		};
	}
}

export class CollapsibleIndicatorAtom extends Atom<CollapsibleBond> {
	constructor(bond: CollapsibleBond) {
		super(bond, 'indicator');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'icon'
		};
	}
}

export class CollapsibleBond extends Bond<
	CollapsibleStateProps,
	CollapsibleState,
	CollapsibleDomElements
> {
	static CONTEXT_KEY = '@atoms/context/collapsible';

	#parent: CollapsibleBond | undefined;

	constructor(state: CollapsibleState) {
		super(state, 'collapsible');

		this.#parent = CollapsibleBond.get();
	}

	get parent() {
		return this.#parent;
	}

	share() {
		return CollapsibleBond.set(this) as this;
	}

	/** Handle for granular access to root attrs and attachment */
	root() {
		return this.atom('root', () => new CollapsibleRootAtom(this));
	}

	/** Handle for granular access to header attrs, handlers, and attachment */
	header() {
		return this.atom('header', () => new CollapsibleHeaderAtom(this));
	}

	/** Handle for granular access to body attrs and attachment */
	body() {
		return this.atom('body', () => new CollapsibleBodyAtom(this));
	}

	/** Handle for granular access to indicator attrs and attachment */
	indicator() {
		return this.atom('indicator', () => new CollapsibleIndicatorAtom(this));
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
