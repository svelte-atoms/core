import { getContext, setContext } from 'svelte';
import { Bond, BondState, Atom, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
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

class TreeRootAtom extends Atom<TreeBond, HTMLElement> {
	constructor(bond: TreeBond) {
		super(bond, 'root');
	}
	override get attrs() {
		const bond = this.bond;
		const props = untrack(() => bond.state?.props);
		const isOpen = props?.open ?? false;
		const isDisabled = props?.disabled ?? false;

		return {
			...super.attrs,
			'aria-labelledby': `tree-header-${bond.id}`,
			'aria-expanded': isOpen,
			'aria-disabled': isDisabled,
		};
	}
}

class TreeHeaderAtom extends Atom<TreeBond, HTMLElement> {
	constructor(bond: TreeBond) {
		super(bond, 'header');
	}
	override get attrs() {
		const bond = this.bond;
		const isButtonElement = isBrowser() ? bond.elements.header instanceof HTMLButtonElement : false;
		const role = untrack(() => (isButtonElement ? '' : 'button'));
		const tabindex = !isButtonElement || bond.state.props.disabled ? -1 : 0;
		return {
			...super.attrs,
			'aria-controls': `tree-body-${bond.id}`,
			role,
			tabindex
		};
	}
}

class TreeBodyAtom extends Atom<TreeBond, HTMLElement> {
	constructor(bond: TreeBond) {
		super(bond, 'body');
	}
	override get attrs() {
		const bond = this.bond;
		return {
			...super.attrs,
			role: 'group' as const,
			'aria-controlled-by': `tree-header-${bond.id}`
		};
	}
}

class TreeIndicatorAtom extends Atom<TreeBond, HTMLElement> {
	constructor(bond: TreeBond) {
		super(bond, 'indicator');
	}
}

export class TreeBond<
	Props extends TreeBondProps = TreeBondProps,
	State extends TreeBondState<Props> = TreeBondState<Props>,
	Elements extends TreeBondElements = TreeBondElements
> extends Bond<TreeBondProps, State, Elements> {
	static CONTEXT_KEY = '@atoms/context/tree';

	#parent?: typeof this | undefined;

	constructor(s: State) {
		super(s, 'tree');

		this.#parent = TreeBond.get() as typeof this | undefined;
	}

	get parent() {
		return this.#parent;
	}

	share(): this {
		return TreeBond.set(this) as this;
	}

	root() {
		return this.atom('root', () => new TreeRootAtom(this));
	}

	header() {
		return this.atom('header', () => new TreeHeaderAtom(this));
	}

	body() {
		return this.atom('body', () => new TreeBodyAtom(this));
	}

	indicator() {
		return this.atom('indicator', () => new TreeIndicatorAtom(this));
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
