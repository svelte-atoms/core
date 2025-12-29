import {
	type PopoverDomElements,
	type PopoverStateProps
} from '$svelte-atoms/core/components/popover/bond.svelte';
import {
	DropdownBond,
	DropdownBondState,
	type DropdownStateProps
} from '$svelte-atoms/core/components/dropdown/bond.svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { SvelteMap } from 'svelte/reactivity';
import { nanoid } from 'nanoid';
import type { ComboboxSelection } from './types';

export type ComboboxBondProps = DropdownStateProps & {
};

export type ComboboxBondElements = PopoverDomElements & {
	input: HTMLInputElement;
};

export class ComboboxBond extends DropdownBond<
	ComboboxBondProps,
	ComboboxBondState,
	ComboboxBondElements
> {
	constructor(s: ComboboxBondState) {
		super(s);
	}

	control() {
		const isMultiselect = this.state.props.multiple ?? false;

		return {
			'data-atom': `trigger-${this.id}`,
			'data-kind': 'combobox-input',
			role: 'combobox',
			'aria-autocomplete': 'list',
			'aria-expanded': this.state.props.open ?? false,
			'aria-controls': `overlay-${this.id}`,
			'aria-activedescendant': this.state.selections.at(0)?.id
				? `item-${this.state.selections.at(0)?.id}`
				: undefined,
			'aria-disabled': this.state.props.disabled ?? false,
			tabindex: this.state.props.disabled ? -1 : 0,
			oninput: (ev: Event) => {
				const target = ev.target as HTMLInputElement;
				this.state.props.control = target.value;
			},
			onkeydown: (ev: KeyboardEvent) => {
				if (this.state.props.disabled) return;

				if (ev.key === 'Enter' && isMultiselect) {
					const currentTarget = ev.currentTarget as HTMLInputElement;
					const value = currentTarget.value.trim();
					if (value !== '') {
						this.state.addSelection(value);
						this.state.props.control = ''
					}
				}

			},
			[createAttachmentKey()]: (node: HTMLInputElement) => {
				this.elements.input = node;
			}
		};
	}

	static get(): ComboboxBond | undefined {
		return super.get() as ComboboxBond | undefined;
	}

	static set(context: ComboboxBond): ComboboxBond {
		return super.set(context) as ComboboxBond;
	}
}

export class ComboboxBondState extends DropdownBondState<ComboboxBondProps> {
	#userSelections = new SvelteMap<string, ComboboxSelection>();

	constructor(props: () => ComboboxBondProps) {
		super(props);
	}

	addSelection(text: string) {
		const id = nanoid();
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const createdAt = new Date();
		this.#userSelections.set(id, { id, text, createdAt, unselect: () => this.deleteSelection(id) });

		this.updateLabels()
	}

	deleteSelection(id: string) {
		this.#userSelections.delete(id);
		this.updateLabels();
	}

	get userSelections() {
		return Array.from(this.#userSelections.values());
	}

	get allSelections() {
		const itemSelections = this.selections.map((controller) => ({
			id: controller.id,
			text: controller.text as string,
			createdAt: controller.createdAt, // default date for items from the list
			controller,
			unselect: () => this.unselect([controller.id]),
		}));

		return [...itemSelections, ...this.userSelections].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
	}

	protected updateLabels(): void {
		const labels = this.allSelections.map((s) => s.text)
		this.props.labels = labels;
		this.props.label = labels[0] ?? '';
	}
}
