import { SvelteMap } from 'svelte/reactivity';
import type { AccordionItemBond } from './item/bond.svelte';
import { Bond, BondState, Atom, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { getContext, setContext, untrack } from 'svelte';

export type AccordionStateProps = BondStateProps & {
	open: boolean;
	value?: string;
	values: string[];
	multiple?: boolean;
	collapsible?: boolean;
	disabled: boolean;
	readonly rest?: Record<string, unknown>;
};

export type AccordionElements = {
	root: HTMLElement;
	indicator: HTMLElement;
};

export class AccordionRootAtom extends Atom<AccordionBond> {
	constructor(bond: AccordionBond) {
		super(bond, 'root');
	}

	override get attrs() {
		const props = untrack(() => this.bond.state?.props);
		const isOpen = props?.open ?? false;
		const isDisabled = props?.disabled ?? false;
		const isMultiple = props?.multiple ?? false;

		return {
			...super.attrs,
			'aria-expand': isOpen,
			'aria-disabled': isDisabled,
			'aria-multiselectable': isMultiple,
		};
	}
}

export class AccordionBond extends Bond<AccordionStateProps, AccordionState, AccordionElements> {
	static CONTEXT_KEY = '@atomic-sv/context/accordion';

	constructor(s: AccordionState) {
		super(s, 'accordion');
	}

	share(): this {
		return AccordionBond.set(this) as this;
	}

	/** Handle for granular access to root attrs and attachment */
	root() {
		return this.atom('root', () => new AccordionRootAtom(this));
	}

	static get(): AccordionBond | undefined {
		return getContext(AccordionBond.CONTEXT_KEY);
	}

	static set(bond: AccordionBond): AccordionBond {
		return setContext(AccordionBond.CONTEXT_KEY, bond);
	}
}

export class AccordionState extends BondState<AccordionStateProps> {
	#items: SvelteMap<string, unknown> = new SvelteMap();

	constructor(props: () => AccordionStateProps) {
		super(props);
	}

	get activeItems() {
		return this.props.values.map((d) => this.#items.get(d));
	}

	open(vals: string[]) {
		if (this.props.multiple) {
			const sequence = new Set(this.props.values ?? []);

			for (const val of vals) {
				sequence.add(val);
			}

			this.props.values = [...sequence];
		} else {
			this.props.values = [vals[0]];
		}
	}

	close(vals: string[]) {
		if (this.props.multiple) {
			const sequence = new Set(this.props.values ?? []);

			for (const val of vals) {
				sequence.delete(val);
			}

			this.props.values = [...sequence];
		} else {
			this.props.values = [];
		}
	}

	toggle(id: string) {
		const sequence = new Set(this.props.values);

		if (sequence.has(id)) {
			sequence.delete(id);
		} else {
			sequence.add(id);
		}

		this.props.values = [...sequence];
	}

	mountItem(id: string, item: AccordionItemBond) {
		this.#items.set(id, item);
	}

	unmountItem(id: string) {
		this.#items.delete(id);
	}
}
