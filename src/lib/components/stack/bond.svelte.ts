import { createAttachmentKey } from 'svelte/attachments';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { getContext, setContext } from 'svelte';

export type StackStateProps = BondStateProps & {
	value?: string;
	readonly rest?: Record<string, unknown>;
};

export type StackElements = {
	root?: HTMLElement;
};

export class StackBond extends Bond<StackStateProps, StackState, StackElements> {
	static CONTEXT_KEY = '@atoms/context/stack';

	constructor(state: StackState) {
		super(state);
	}

	share(): this {
		return StackBond.set(this) as this;
	}

	root() {
		return {
			'data-atom': this.id ?? '',
			'data-kind': 'stack-root',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	item(id: string) {
		const state = this.state;

		return {
			'data-atom': this.id ?? '',
			'data-kind': 'stack-item',
			'data-stack-item': id,
			get style() {
				return `z-index: ${state.getZIndex(id)}`;
			},
			[createAttachmentKey()]: () => {}
		};
	}

	raise(id: string) {
		this.state.raise(id);
	}

	bringToFront(id: string) {
		this.state.bringToFront(id);
	}

	sendToBack(id: string) {
		this.state.sendToBack(id);
	}

	bringForward(id: string) {
		this.state.bringForward(id);
	}

	sendBackward(id: string) {
		this.state.sendBackward(id);
	}

	static get(): StackBond | undefined {
		return getContext(StackBond.CONTEXT_KEY);
	}

	static set(bond: StackBond): StackBond {
		return setContext(StackBond.CONTEXT_KEY, bond);
	}
}

export class StackState extends BondState<StackStateProps> {
	#order = $state<{ id: string; index: number }[]>([]);

	constructor(props: () => StackStateProps) {
		super(props);
	}

	register(id: string) {
		if (!this.#order.find((item) => item.id === id)) {
			// Start z-index at 1 so items are always above the stacking context baseline
			this.#order = [...this.#order, { id, index: this.#order.length + 1 }];
		}
	}

	unregister(id: string) {
		this.#order = this.#order.filter((i) => i.id !== id);
	}

	raise(id: string) {
		this.bringToFront(id);
	}

	bringToFront(id: string) {
		const item = this.#order.find((item) => item.id === id);
		if (!item) return;

		this.#order = [...this.#order]
			.sort((a, b) => {
				if (a.id === id) return 1;
				if (b.id === id) return -1;
				return a.index - b.index;
			})
			.map((item, i) => ({ ...item, index: i + 1 }));
	}

	sendToBack(id: string) {
		const item = this.#order.find((item) => item.id === id);
		if (!item) return;

		this.#order = [...this.#order]
			.sort((a, b) => {
				if (a.id === id) return -1;
				if (b.id === id) return 1;
				return a.index - b.index;
			})
			.map((item, i) => ({ ...item, index: i + 1 }));
	}

	bringForward(id: string) {
		const item = this.#order.find((i) => i.id === id);
		if (!item) return;

		const neighbor = [...this.#order]
			.sort((a, b) => a.index - b.index)
			.find((i) => i.index > item.index);
		if (!neighbor) return;

		this.#order = [...this.#order]
			.sort((a, b) => {
				if (a.id === id && b.id === neighbor.id) return 1;
				if (a.id === neighbor.id && b.id === id) return -1;
				return a.index - b.index;
			})
			.map((item, i) => ({ ...item, index: i + 1 }));
	}

	sendBackward(id: string) {
		const item = this.#order.find((i) => i.id === id);
		if (!item) return;

		const neighbor = [...this.#order]
			.sort((a, b) => b.index - a.index)
			.find((i) => i.index < item.index);
		if (!neighbor) return;

		this.#order = [...this.#order]
			.sort((a, b) => {
				if (a.id === id && b.id === neighbor.id) return -1;
				if (a.id === neighbor.id && b.id === id) return 1;
				return a.index - b.index;
			})
			.map((item, i) => ({ ...item, index: i + 1 }));
	}

	getZIndex(id: string): number {
		const item = this.#order.find((item) => item.id === id);
		return item ? item.index : -1;
	}

	get items() {
		return this.#order;
	}
}
