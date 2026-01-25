import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

export type InputStateProps = BondStateProps & {
	value?: string | number | Date;
	readonly number?: number;
	readonly date?: Date;
	files?: File[];
	checked?: string[];
	group?: any[];
	readonly rest?: Record<string, unknown>;
};

export type InputElements = {
	root: HTMLElement;
	input: HTMLInputElement;
	placeholder: HTMLElement;
};

const INPUT_ELEMENTS_KIND: Record<keyof InputElements, string> = {
	root: 'input-root',
	input: 'input-field',
	placeholder: 'input-placeholder'
};

export class InputBond extends Bond<InputStateProps, InputState, InputElements> {
	static CONTEXT_KEY = '@atomic-sv/context/input';

	constructor(s: InputState) {
		super(s);
	}

	get value() {
		return this.state.props.value;
	}

	get number() {
		return this.state.props.number;
	}

	get date() {
		return this.state.props.date;
	}

	get files() {
		return this.state.props.files ?? [];
	}

	share(): this {
		return InputBond.set(this) as this;
	}

	root() {
		const id = [INPUT_ELEMENTS_KIND.root, this.id].join('-');

		return {
			id,
			role: 'group',
			'data-atom': 'input',
			'data-kind': 'root',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	input() {
		const id = [INPUT_ELEMENTS_KIND.input, this.id].join('-');

		return {
			id,
			role: 'group',
			'data-atom': 'input',
			'data-kind': 'value',
			[createAttachmentKey()]: (node: HTMLInputElement) => {
				this.elements.input = node;
			}
		};
	}

	placeholder() {
		const id = [INPUT_ELEMENTS_KIND.placeholder, this.id].join('-');

		return {
			id,
			role: 'group',
			'data-atom': 'input',
			'data-kind': 'placeholder',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.placeholder = node;
			}
		};
	}

	static get(): InputBond | undefined {
		return getContext(InputBond.CONTEXT_KEY);
	}

	static set(bond: InputBond): InputBond {
		return setContext(InputBond.CONTEXT_KEY, bond);
	}
}

export class InputState extends BondState<InputStateProps> {
	constructor(props: () => InputStateProps) {
		super(props);
	}
}
