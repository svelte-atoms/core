import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { FormBond, type FormBondState } from '../bond.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

export interface ValidationError {
	path: (string | number)[];
	message: string;
	code?: string;
}

export interface ValidationResult<T = unknown> {
	success: boolean;
	data?: T;
	errors: ValidationError[];
}

export interface ValidationAdapter<Schema, Value> {
	validate(schema: Schema, value: Value): ValidationResult<Value>;
	validateAsync?(schema: Schema, value: Value): Promise<ValidationResult<Value>>;
}

export class ZodValidationAdapter<
	T extends { parse: (value: unknown) => any; parseAsync?: (value: unknown) => Promise<any> }
> implements ValidationAdapter<T, any>
{
	validate(schema: T, value: unknown): ValidationResult<any> {
		try {
			const data = schema.parse(value);
			return { success: true, data, errors: [] };
		} catch (error: any) {
			if (error?.issues && Array.isArray(error.issues)) {
				return {
					success: false,
					errors: error.issues.map((issue: any) => ({
						path: issue.path || [],
						message: issue.message || 'Validation error',
						code: issue.code
					}))
				};
			}
			throw error;
		}
	}

	async validateAsync(schema: T, value: unknown): Promise<ValidationResult<any>> {
		if (!schema.parseAsync) {
			return this.validate(schema, value);
		}

		try {
			const data = await schema.parseAsync(value);
			return { success: true, data, errors: [] };
		} catch (error: any) {
			if (error?.issues && Array.isArray(error.issues)) {
				return {
					success: false,
					errors: error.issues.map((issue: any) => ({
						path: issue.path || [],
						message: issue.message || 'Validation error',
						code: issue.code
					}))
				};
			}
			throw error;
		}
	}
}

export type FieldStateProps<
	Extension extends Record<string, unknown> = Record<string, unknown>,
	Schema = unknown,
	Value = unknown
> = BondStateProps & {
	disabled: boolean;
	readonly: boolean;
	name?: string;
	value?: Value;
	files?: File[];
	date?: Date | null;
	number?: number;
	checked?: boolean;
	schema?: Schema;
	validator?: ValidationAdapter<Schema, Value>;
	onvalidation?: (errors: ValidationError[]) => void;
	extend: Extension;
};

export type FieldDomElements = {
	root: HTMLElement;
	label: HTMLElement;
	control: HTMLElement;
};

export class FieldBond extends Bond<FieldStateProps, FieldBondState, FieldDomElements> {
	static CONTEXT_KEY = '@atoms/context/form/field';

	constructor(state: FieldBondState) {
		super(state);
	}

	root() {
		return {
			id: `root-${this.id}`,
			role: 'group',
			'aria-labelledby': `label-${this.id}`,
			'aria-describedby': this.state.errors.length > 0 ? `error-${this.id}` : undefined,
			'aria-invalid': !!this.state.errors.length + '',

			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	label() {
		return {
			id: `label-${this.id}`,
			for: `control-${this.id}`,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.label = node;
			}
		};
	}

	control() {
		return {
			id: `control-${this.id}`,
			'aria-labelledby': `label-${this.id}`,
			'aria-describedby': this.state.errors.length > 0 ? `error-${this.id}` : undefined,
			'aria-invalid': !!this.state.errors.length + '',
			'aria-disabled': this.state.props.disabled + '',
			'aria-readonly': this.state.props.readonly + '',

			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.control = node;
			}
		};
	}

	share(): this {
		return FieldBond.set(this) as this;
	}

	static get(): FieldBond | undefined {
		return getContext(FieldBond.CONTEXT_KEY);
	}

	static set(bond: FieldBond): FieldBond {
		return setContext(FieldBond.CONTEXT_KEY, bond);
	}
}

export class FieldBondState<
	Props extends FieldStateProps = FieldStateProps
> extends BondState<Props> {
	#data = $state<unknown>(undefined);
	#errors = $state<ValidationError[]>([]);
	#isValidating = $state(false);
	#form?: FormBondState;

	constructor(props: () => Props) {
		super(props);

		this.#form = FormBond.get()?.state;

		if (!this.#form) {
			throw new Error(
				'Form Context is undefined, FieldAtom must be used within a FormAtom context'
			);
		}
	}

	get value() {
		return this.props.value;
	}

	get files() {
		return this.props.files;
	}

	get date() {
		return this.props.date;
	}

	get number() {
		return this.props.number;
	}

	get checked() {
		return this.props.checked;
	}

	get errors() {
		return [...this.#errors];
	}

	get isValidating() {
		return this.#isValidating;
	}

	validate(): ValidationResult {
		const { schema, validator, value, onvalidation } = this.props;

		if (!schema || !validator) {
			this.#errors = [];
			onvalidation?.([]);
			return { errors: this.#errors };
		}

		const result = validator.validate(schema, value);

		this.#errors = result.errors;

		onvalidation?.({ data: result.data, errors: this.#errors });

		return result;
	}

	async validateASync(): Promise<ValidationResult> {
		const { schema, validator, value, onvalidation } = this.props;

		if (!schema || !validator) {
			this.#errors = [];
			onvalidation?.([]);
			return { errors: this.#errors };
		}

		this.#isValidating = true;

		try {
			const result = validator.validateAsync
				? await validator.validateAsync(schema, value)
				: validator.validate(schema, value);

			this.#errors = result.errors;

			onvalidation?.({ data: result.data, errors: this.#errors });

			return result;
		} finally {
			this.#isValidating = false;
		}
	}

	clear() {
		this.#errors = [];
	}

	toJSON() {
		return {
			name: this.props.name,
			value: this.value
		};
	}
}
