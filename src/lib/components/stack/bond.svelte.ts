import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';
import { getContext, setContext, tick, untrack } from 'svelte';

export type StackStateProps = BondStateProps & {
	value?: string;
	readonly rest?: Record<string, unknown>;
};

export type StackElements = {
	root?: HTMLElement;
};

export class StackRootAtom extends BondAtom<StackBond> {
	constructor(bond: StackBond) {
		super(bond, 'root');
	}

	override get attrs() {
		return {
			...super.attrs,
			'data-atom': this.bond.id ?? '',
			'data-kind': 'stack-root'
		};
	}
}

export class StackItemAtom extends BondAtom<StackBond> {
	#value: string;

	constructor(bond: StackBond, value: string) {
		super(bond, `item-${value}`);
		this.#value = value;
	}

	override get attrs() {
		return {
			...super.attrs,
			'data-atom': this.bond.id ?? '',
			'data-kind': 'stack-item',
			'data-stack-item': this.#value,
			style: `z-index: ${this.bond.state.getZIndex(this.#value)}`
		};
	}
}

export class StackBond extends Bond<StackStateProps, StackState, StackElements> {
	static CONTEXT_KEY = '@atoms/context/stack';

	constructor(state: StackState) {
		super(state);
	}

	share(): this {
		return StackBond.set(this) as this;
	}

	root() {
		return this.atom('root', () => new StackRootAtom(this));
	}

	item(value: string) {
		return this.atom(`item-${value}`, () => new StackItemAtom(this, value));
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

	register(value: string) {
		const order = untrack(() => this.#order);
		if (!order.find((item) => item.id === value)) {
			// Start z-index at 1 so items are always above the stacking context baseline
			this.#order = [...order, { id: value, index: order.length + 1 }];
		}
	}

	unregister(value: string) {
		const order = untrack(() => this.#order);
		tick().then(() => {
			this.#order = order.filter((i) => i.id !== value);
		});
	}

	raise(value: string) {
		this.bringToFront(value);
	}

	bringToFront(value: string) {
		const order = untrack(() => this.#order);
		const item = order.find((item) => item.id === value);

		if (!item) return;

		const newOrder = [...order]
			.sort((a, b) => {
				if (a.id === value) return 1;
				if (b.id === value) return -1;
				return a.index - b.index;
			})
			.map((item, i) => ({ ...item, index: i + 1 }));

		this.#order = newOrder;

		// Update value to the new top item
		const topValue = newOrder.at(-1)?.id;
		if (topValue) {
			this.props.value = topValue;
		}
	}

	sendToBack(value: string) {
		const order = untrack(() => this.#order);
		const item = order.find((item) => item.id === value);
		if (!item) return;

		const newOrder = [...order]
			.sort((a, b) => {
				if (a.id === value) return -1;
				if (b.id === value) return 1;
				return a.index - b.index;
			})
			.map((item, i) => ({ ...item, index: i + 1 }));

		this.#order = newOrder;

		// Update value to the new top item
		const topValue = newOrder.at(-1)?.id;
		if (topValue) {
			this.props.value = topValue;
		}
	}

	bringForward(value: string) {
		const order = untrack(() => this.#order);
		const item = order.find((i) => i.id === value);
		if (!item) return;

		const sortedOrder = [...order].sort((a, b) => a.index - b.index);
		const currentIndex = sortedOrder.findIndex((i) => i.id === value);
		const neighbor = sortedOrder[currentIndex + 1];
		
		if (!neighbor) return;

		const newOrder = [...order]
			.sort((a, b) => {
				if (a.id === value && b.id === neighbor.id) return 1;
				if (a.id === neighbor.id && b.id === value) return -1;
				return a.index - b.index;
			})
			.map((item, i) => ({ ...item, index: i + 1 }));

		this.#order = newOrder;

		// Update value to the new top item
		const topValue = newOrder.at(-1)?.id;
		if (topValue) {
			this.props.value = topValue;
		}
	}

	sendBackward(value: string) {
		const order = untrack(() => this.#order);
		const item = order.find((i) => i.id === value);
		if (!item) return;

		const sortedOrder = [...order].sort((a, b) => a.index - b.index);
		const currentIndex = sortedOrder.findIndex((i) => i.id === value);
		const neighbor = sortedOrder[currentIndex - 1];
		
		if (!neighbor) return;

		const newOrder = [...order]
			.sort((a, b) => {
				if (a.id === value && b.id === neighbor.id) return -1;
				if (a.id === neighbor.id && b.id === value) return 1;
				return a.index - b.index;
			})
			.map((item, i) => ({ ...item, index: i + 1 }));

		this.#order = newOrder;

		// Update value to the new top item
		const topValue = newOrder.at(-1)?.id;
		if (topValue) {
			this.props.value = topValue;
		}
	}

	getZIndex(value: string): number {
		const item = this.#order.find((item) => item.id === value);
		return item ? item.index : 0;
	}

	get items() {
		return this.#order;
	}
}
