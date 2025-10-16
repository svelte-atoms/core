import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { TabsBond, TabsBondState } from '../bond.svelte';
import { getElementId } from '$svelte-atoms/core/utils/dom.svelte';
import { portal } from '$svelte-atoms/core/attachments/portal.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

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

const TAB_ELEMENTS_KIND = {
	root: 'tab-root',
	header: 'tab-header',
	body: 'tab-body',
	description: 'tab-description'
};

export class TabBond<T = unknown> extends Bond<TabBondProps<T>, TabBondState<T>, TabBondElement> {
	static CONTEXT_KEY = '@atoms/bonds/tabs/tab';

	#tabs?: TabsBond<T>;

	constructor(state: TabBondState<T>) {
		super(state);
		this.#tabs = TabsBond.get();
	}

	get text() {
		return this.elements?.header?.innerText ?? '';
	}

	mount() {
		return this.#tabs?.state.mountItem(this.id, this);
	}
	unmount() {
		this.#tabs?.state.unmountItem(this.id);
	}

	share(): this {
		return TabBond.set<T>(this) as this;
	}

	root(props?: Record<string, unknown>) {
		return {};
	}

	header(props?: Record<string, unknown>) {
		const id = getElementId(this.id, TAB_ELEMENTS_KIND.header);
		const tabBodyId = getElementId(this.id, TAB_ELEMENTS_KIND.body);

		return {
			id,
			role: 'tab',
			'aria-controls': tabBodyId,
			'aria-disabled': this.state.props.disabled ?? false,
			'data-controler-id': this.#tabs?.id,
			'data-active': this.state.isActive,
			'data-kind': 'tab-header',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;

				if (!this.#tabs?.elements.header) {
					node.hidden = true;

					return;
				}

				const unport = portal(this.#tabs.elements.header)(node);

				return unport;
			}
		};
	}

	body(props?: Record<string, unknown>) {
		const id = getElementId(this.id, TAB_ELEMENTS_KIND.body);
		const tabHeaderId = getElementId(this.id, TAB_ELEMENTS_KIND.header);
		const descriptionId = getElementId(this.id, TAB_ELEMENTS_KIND.description);

		const isActive = this.state.isActive;

		return {
			id,
			role: 'tabpanel',
			'aria-labeledby': tabHeaderId,
			'aria-describedby': descriptionId,
			'aria-controledby': tabHeaderId,
			'data-active': isActive,
			'data-kind': 'tab-body',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		};
	}

	description(props?: Record<string, unknown>) {
		const id = getElementId(this.id, TAB_ELEMENTS_KIND.description);

		return {
			id,
			'data-kind': 'tab-description',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.description = node;
			}
		};
	}

	static get(): TabBond | undefined {
		return getContext(TabBond.CONTEXT_KEY);
	}

	static set(bond: TabBond): TabBond {
		return setContext(TabBond.CONTEXT_KEY, bond);
	}
}

export class TabBondState<T> extends BondState<TabBondProps<T>> {
	#tabsState?: TabsBondState<T>;

	constructor(props: () => TabBondProps<T>) {
		super(props);

		this.#tabsState = TabsBond.get()?.state as TabsBondState<T> | undefined;
	}

	get isActive() {
		return this.#tabsState?.props.value === this.props.value;
	}

	select() {
		this.#tabsState?.select(this.props.value);
	}

	unselect() {
		this.#tabsState?.unselect();
	}
}
