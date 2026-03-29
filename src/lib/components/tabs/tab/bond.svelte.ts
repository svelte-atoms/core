import { getContext, setContext, untrack } from 'svelte';
import { TabsBond, TabsBondState } from '../bond.svelte';
import { getElementId } from '$svelte-atoms/core/utils/dom.svelte';
import { portal } from '$svelte-atoms/core/attachments/portal.svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

export type TabBondProps<
	T,
	S extends Record<string, unknown> = Record<string, unknown>
> = BondStateProps & {
	value: string;
	disabled?: boolean;
	data: T;
	extend: S;
};

export type TabBondElement = {
	header: HTMLElement;
	body: HTMLElement;
	description: HTMLElement;
};

class TabHeaderAtom extends BondAtom<TabBond, HTMLElement> {
	constructor(bond: TabBond) {
		super(bond, 'header');
	}
	override get attrs() {
		const bond = this.bond;
		const state = untrack(() => bond.state);
		const props = untrack(() => state.props);

		const tabBodyId = getElementId(bond.id, 'tab-body');
		return {
			...super.attrs,
			role: 'tab' as const,
			'aria-controls': tabBodyId,
			'aria-disabled': props.disabled ?? false,
			'data-controler-id': bond.tabs?.id,
			'data-active': state.isActive
		};
	}

	override get handlers() {
		const isDisabled = untrack(() => this.bond.state?.props).disabled ?? false;

		return {
			onclick: () => {
				if (isDisabled) return;
				this.bond.state.select();
			}
		};
	}

	override onmount(node: HTMLElement): void | (() => void) {
		const headerElement = this.bond.tabs?.element<HTMLElement>('header');

		if (!headerElement) {
			node.hidden = true;
			return;
		}

		portal(headerElement)(node);
	}
}

class TabBodyAtom extends BondAtom<TabBond, HTMLElement> {
	constructor(bond: TabBond) {
		super(bond, 'body');
	}
	override get attrs() {
		const bond = this.bond;
		const tabHeaderId = getElementId(bond.id, 'tab-header');
		const descriptionId = getElementId(bond.id, 'tab-description');
		return {
			...super.attrs,
			role: 'tabpanel' as const,
			'aria-labeledby': tabHeaderId,
			'aria-describedby': descriptionId,
			'aria-controledby': tabHeaderId,
			'data-active': bond.state.isActive
		};
	}
}

class TabDescriptionAtom extends BondAtom<TabBond, HTMLElement> {
	constructor(bond: TabBond) {
		super(bond, 'description');
	}
	override get attrs() {
		return {
			...super.attrs
		};
	}
}

export class TabBond<T = unknown> extends Bond<TabBondProps<T>, TabBondState<T>, TabBondElement> {
	static CONTEXT_KEY = '@atoms/bonds/tabs/tab';

	#tabs?: TabsBond<T>;

	constructor(state: TabBondState<T>) {
		super(state, 'tab');
		this.#tabs = TabsBond.get() as TabsBond<T>;
	}

	get tabs() {
		return this.#tabs;
	}

	get value() {
		return this.state.props.value;
	}

	get text() {
		return this.elements?.header?.innerText ?? '';
	}

	mount() {
		return this.#tabs?.state.mountItem(this.value, this);
	}
	unmount() {
		this.#tabs?.state.unmountItem(this.id);
	}

	share(): this {
		return TabBond.set(this) as this;
	}

	header() {
		return this.atom('header', () => new TabHeaderAtom(this));
	}

	body() {
		return this.atom('body', () => new TabBodyAtom(this));
	}

	description() {
		return this.atom('description', () => new TabDescriptionAtom(this));
	}

	static get(): TabBond | undefined {
		return getContext(TabBond.CONTEXT_KEY);
	}

	static set(bond: TabBond): TabBond {
		return setContext(TabBond.CONTEXT_KEY, bond);
	}
}

export class TabBondState<T> extends BondState<TabBondProps<T>> {
	#tabsBond?: TabsBond<T> = $state();
	#tabsState?: TabsBondState<T> = $derived(this.#tabsBond?.state);

	constructor(props: () => TabBondProps<T>) {
		super(props);

		this.#tabsBond = TabsBond.get() as TabsBond<T>;
	}

	get isActive() {
		return this.#tabsState?.props.value === this.props.value;
	}

	get isDisabled() {
		return (
			this.props.disabled ??
			this.#tabsBond?.elements?.header?.getAttribute?.('aria-disabled') === 'true'
		);
	}

	select() {
		this.#tabsState?.select(this.props.value);
	}

	unselect() {
		this.#tabsState?.unselect();
	}
}
