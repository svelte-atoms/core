import { SvelteMap } from 'svelte/reactivity';
import { createAttachmentKey } from 'svelte/attachments';
import type { AccordionItemBond } from './item/bond.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { getContext, setContext } from 'svelte';

export type AccordionStateProps = BondStateProps & {
	open: boolean;
	value?: string;
	values: string[];
	multiple?: boolean;
	collapsible?: boolean;
	disabled: boolean;
};

export type AccordionElements = {
	root: HTMLElement;
	indicator: HTMLElement;
};

export class AccordionBond extends Bond<AccordionStateProps, AccordionState, AccordionElements> {
	static CONTEXT_KEY = '@atomic-sv/context/accordion';

	constructor(s: AccordionState) {
		super(s);
	}

	share(): this {
		return AccordionBond.set(this) as this;
	}

	root() {
		return {
			'aria-expand': this.state?.props?.open ?? false,
			'aria-disabled': this.state?.props?.disabled ?? false,
			'aria-multiselectable': this.state?.props?.multiple ?? false,
			'data-atom': this.id ?? '',
			'data-kind': 'accordion',
			id: `accordion-${this.id}`,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
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
