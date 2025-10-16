import { getContext, setContext } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { FieldBond } from './field/bond.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

export type FormProps<Extension extends Record<string, unknown> = Record<string, unknown>> =
	BondStateProps & {
		renderless?: boolean;
		extend: Extension;
	};

export type FormElements = {
	root: HTMLElement;
};

export class FormBond extends Bond<FormProps, FormBondState, FormElements> {
	static CONTEXT_KEY = '@atoms/context/form';

	constructor(state: FormBondState) {
		super(state);
	}

	root() {
		return {};
	}

	label() {
		return {};
	}

	control() {
		return {};
	}

	share(): this {
		return FormBond.set(this) as this;
	}

	static get(): FormBond | undefined {
		return getContext(FormBond.CONTEXT_KEY);
	}

	static set(bond: FormBond): FormBond {
		return setContext(FormBond.CONTEXT_KEY, bond);
	}
}

export class FormBondState<Props extends FormProps = FormProps> extends BondState<Props> {
	#fields = new SvelteMap<string, FieldBond>();

	constructor(props: () => Props) {
		super(props);
	}

	mountField(id: string, atom: FieldBond) {
		this.#fields.set(id, atom);

		return () => this.unmountField(id);
	}

	unmountField(id: string) {
		this.#fields.delete(id);
	}

	validate() {
		this.fields.map((field) => field.state.validate());
	}

	clear() {}

	get fields() {
		return this.#fields.values().toArray();
	}
}
