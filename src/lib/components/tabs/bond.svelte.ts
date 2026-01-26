import { SvelteMap } from 'svelte/reactivity';
import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import type { TabBond } from './tab/bond.svelte';
import { getElementId } from '$svelte-atoms/core/utils/dom.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import type { Snippet } from 'svelte';

export type TabsBondProps<T extends Record<string, unknown> = Record<string, unknown>> = BondStateProps & {
	value?: string|undefined;
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

const TABS_ELEMENTS_KIND = {
	root: 'tabs-root',
	content: 'tabs-content',
	header: 'tabs-header',
	body: 'tabs-body'
};

export class TabsBond<T = unknown> extends Bond<TabsBondProps, TabsBondState<T>, TabElements> {
	static CONTEXT_KEY = '@atoms/bonds/tabs';

	constructor(s: TabsBondState<T>) {
		super(s);
	}

	share(): this {
		return TabsBond.set(this) as this;
	}

	root(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, TABS_ELEMENTS_KIND.root);

		return {
			id,
			'aria-orientation': 'horizontal' as const,
			'data-kind': TABS_ELEMENTS_KIND.root,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	header(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, TABS_ELEMENTS_KIND.header);

		return {
			id,
			role: 'tablist',
			'data-kind': TABS_ELEMENTS_KIND.header,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	body(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, TABS_ELEMENTS_KIND.body);

		return {
			id,
			role: 'group',
			'data-kind': TABS_ELEMENTS_KIND.body,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		};
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
	#tabContents: SvelteMap<string, TabContentSnippet> = new SvelteMap();
	#selectedItem = $derived(
		this.props?.value ? this.#items.get(this.props?.value) : undefined
	) as TabBond<T>;

	constructor(props: () => TabsBondProps) {
		super(props);
	}

	get selectedItem() {
		return this.#selectedItem;
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

	registerTabContent(id: string, props: Record<string, unknown>, children: Snippet<[{ tab?: TabBond }]>) {
		this.#tabContents.set(id, { props, children });
	}

	unregisterTabContent(id: string) {
		this.#tabContents.delete(id);
	}

	getTab(id: string) {
		return this.#items.get(id);
	}
}
