import { getContext, setContext } from 'svelte';
import type { Snippet } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';
import type { TabBond } from './tab/bond.svelte';

export type TabsBondProps<T extends Record<string, unknown> = Record<string, unknown>> =
	BondStateProps & {
		value?: string | undefined;
		multiple?: boolean;
		extend?: T;
		readonly rest?: Record<string, unknown>;
	};

export type TabElements = {
	root: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
};

export type TabContentSnippet = {
	props: Record<string, unknown>;
	children: Snippet<[{ tab?: TabBond }]>;
};

export class TabsRootAtom extends BondAtom<TabsBond> {
	constructor(bond: TabsBond) {
		super(bond, 'root');
	}

	override get attrs() {
		return {
			...super.attrs,
			'aria-orientation': 'horizontal' as const
		};
	}
}

export class TabsHeaderAtom extends BondAtom<TabsBond> {
	constructor(bond: TabsBond) {
		super(bond, 'header');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'tablist'
		};
	}
}

export class TabsBodyAtom extends BondAtom<TabsBond> {
	constructor(bond: TabsBond) {
		super(bond, 'body');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'group'
		};
	}
}

export class TabsBond<T = unknown> extends Bond<TabsBondProps, TabsBondState<T>, TabElements> {
	static CONTEXT_KEY = '@atoms/bonds/tabs';

	constructor(s: TabsBondState<T>) {
		super(s, 'tabs');
	}

	share(): this {
		return TabsBond.set(this) as this;
	}

	/** Handle for granular access to root attrs and attachment */
	root() {
		return this.atom('root', () => new TabsRootAtom(this));
	}

	/** Handle for granular access to header attrs and attachment */
	header() {
		return this.atom('header', () => new TabsHeaderAtom(this));
	}

	/** Handle for granular access to body attrs and attachment */
	body() {
		return this.atom('body', () => new TabsBodyAtom(this));
	}

	static get(): TabsBond | undefined {
		return getContext(TabsBond.CONTEXT_KEY);
	}

	static set(bond: TabsBond): TabsBond {
		return setContext(TabsBond.CONTEXT_KEY, bond);
	}
}

export class TabsBondState<T> extends BondState<TabsBondProps> {
	#items: Map<string, TabBond<T>> = new SvelteMap();
	#tabContents: SvelteMap<
		string,
		{ value: string; render: Snippet<[Record<string, unknown>]>; props: Record<string, unknown> }
	> = new SvelteMap();
	#selectedItem = $derived(
		this.props?.value ? this.#items.get(this.props?.value) : undefined
	) as TabBond<T>;

	constructor(props: () => TabsBondProps) {
		super(props);
	}

	get selectedItem() {
		return this.#selectedItem;
	}

	get tabContents() {
		return this.#tabContents.values();
	}

	get activeTabContent() {
		return this.props?.value ? this.#tabContents.get(this.props.value) : undefined;
	}

	mountItem<I extends T>(id: string, item: TabBond<I>) {
		if (this.#items.size && !this.props.value) {
			this.props.value = item.state.props.value;
		}

		this.#items.set(id, item);

		return () => this.unmountItem(id);
	}

	unmountItem(id: string) {
		this.#items.delete(id);
	}

	select(id: string) {
		this.props.value = id;
	}

	unselect() {
		this.props.value = undefined;
	}

	registerTabContent(
		id: string,
		content: { render: Snippet<[Record<string, unknown>]>; props: Record<string, unknown> }
	) {
		this.#tabContents.set(id, {
			value: id,
			...content
		});
	}

	unregisterTabContent(id: string) {
		this.#tabContents.delete(id);
	}

	getTab(id: string) {
		return this.#items.get(id);
	}
}
