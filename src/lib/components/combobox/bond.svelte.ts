import { type PopoverDomElements } from '$svelte-atoms/core/components/popover/bond.svelte';
import {
	DropdownBond,
	DropdownBondState,
	type DropdownStateProps
} from '$svelte-atoms/core/components/dropdown/bond.svelte';
import { Atom } from '$svelte-atoms/core/shared/bond.svelte';
import { SvelteMap } from 'svelte/reactivity';
import { nanoid } from 'nanoid';
import type { ComboboxSelection } from './types';

export type ComboboxBondProps = DropdownStateProps & {
	readonly rest?: Record<string, unknown>;
};

export type ComboboxBondElements = PopoverDomElements & {
	input: HTMLInputElement;
};

class ComboboxControlAtom extends Atom<ComboboxBond, HTMLInputElement> {
	constructor(bond: ComboboxBond) {
		super(bond, 'input');
	}
	override get attrs() {
		const bond = this.bond;
		return {
			...super.attrs,
			role: 'combobox' as const,
			'aria-autocomplete': 'list' as const,
			'aria-expanded': bond.state.props.open ?? false,
			'aria-controls': `overlay-${bond.id}`,
			'aria-activedescendant': bond.state.selections.at(0)?.id
				? `item-${bond.state.selections.at(0)?.id}`
				: undefined,
			'aria-disabled': bond.state.props.disabled ?? false,
			tabindex: bond.state.props.disabled ? -1 : 0
		};
	}

	override get handlers() {
		const bond = this.bond;
		const isMultiselect = bond.state.props.multiple ?? false;
		return {
			oninput: () => {
				if (!isMultiselect) {
					bond.state.props.values = [];
				}
			},
			onkeydown: (ev: KeyboardEvent) => {
				if (bond.state.props.disabled) return;

				if (ev.key === 'Enter' && isMultiselect) {
					const currentTarget = ev.currentTarget as HTMLInputElement;
					const value = currentTarget.value.trim();
					if (value !== '') {
						bond.state.addSelection(value);
					}
				}
			}
		};
	}
}

export class ComboboxBond extends DropdownBond<
	ComboboxBondProps,
	ComboboxBondState,
	ComboboxBondElements
> {
	constructor(s: ComboboxBondState) {
		super(s);
	}

	control() {
		return this.atom('input', () => new ComboboxControlAtom(this));
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

	addSelection(label: string) {
		const id = nanoid();
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const createdAt = new Date();
		this.#userSelections.set(id, {
			id,
			label,
			createdAt,
			unselect: () => this.deleteSelection(id)
		});

		this.updateLabels();
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
			label: controller.label,
			createdAt: controller.createdAt, // default date for items from the list
			controller,
			unselect: () => this.unselect([controller.id])
		}));

		return [...itemSelections, ...this.userSelections].sort(
			(a, b) => a.createdAt.getTime() - b.createdAt.getTime()
		);
	}

	protected updateLabels(): void {
		const labels = this.allSelections.map((s) => s.label);
		this.props.labels = labels;
		this.props.label = labels[0] ?? '';
	}
}
