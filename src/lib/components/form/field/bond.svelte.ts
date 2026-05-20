import { getContext, setContext } from 'svelte';
import {
	Bond,
	BondAtom,
	BondState,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

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

type ZodLikeIssue = {
	path?: (string | number)[];
	message?: string;
	code?: string;
};

type ZodLikeSchema = {
	parse: (value: unknown) => unknown;
	parseAsync?: (value: unknown) => Promise<unknown>;
};

function isZodLikeError(error: unknown): error is { issues: ZodLikeIssue[] } {
	return (
		typeof error === 'object' &&
		error !== null &&
		'issues' in error &&
		Array.isArray((error as { issues?: unknown }).issues)
	);
}

function toValidationError(issue: ZodLikeIssue): ValidationError {
	return {
		path: issue.path || [],
		message: issue.message || 'Validation error',
		...(issue.code ? { code: issue.code } : {})
	};
}

export class ZodValidationAdapter<T extends ZodLikeSchema> implements ValidationAdapter<
	T,
	unknown
> {
	validate(schema: T, value: unknown): ValidationResult {
		try {
			const data = schema.parse(value);
			return { success: true, data, errors: [] };
		} catch (error: unknown) {
			if (isZodLikeError(error)) {
				return {
					success: false,
					errors: error.issues.map(toValidationError)
				};
			}
			throw error;
		}
	}

	async validateAsync(schema: T, value: unknown): Promise<ValidationResult> {
		if (!schema.parseAsync) {
			return this.validate(schema, value);
		}

		try {
			const data = await schema.parseAsync(value);
			return { success: true, data, errors: [] };
		} catch (error: unknown) {
			if (isZodLikeError(error)) {
				return {
					success: false,
					errors: error.issues.map(toValidationError)
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
	onvalidation?: (result: ValidationResult<Value>) => void;
	extend: Extension;
};

export type FieldDomElements = {
	root: HTMLElement;
	label: HTMLElement;
	control: HTMLElement;
};

export class FieldRootAtom extends BondAtom<FieldBond, HTMLElement> {
	constructor(bond: FieldBond) {
		super(bond, 'root');
	}

	override get attrs() {
		return {
			...super.attrs,
			id: `root-${this.bond.id}`,
			role: 'group',
			'aria-labelledby': `label-${this.bond.id}`,
			'aria-describedby': this.bond.state.errors.length > 0 ? `error-${this.bond.id}` : undefined,
			'aria-invalid': `${this.bond.state.errors.length > 0}`
		};
	}
}

export class FieldLabelAtom extends BondAtom<FieldBond, HTMLElement> {
	constructor(bond: FieldBond) {
		super(bond, 'label');
	}

	override get attrs() {
		return {
			...super.attrs,
			id: `label-${this.bond.id}`,
			for: `control-${this.bond.id}`
		};
	}
}

export class FieldControlAtom extends BondAtom<FieldBond, HTMLElement> {
	constructor(bond: FieldBond) {
		super(bond, 'control');
	}

	override get attrs() {
		return {
			...super.attrs,
			id: `control-${this.bond.id}`,
			'aria-labelledby': `label-${this.bond.id}`,
			'aria-describedby': this.bond.state.errors.length > 0 ? `error-${this.bond.id}` : undefined,
			'aria-invalid': `${this.bond.state.errors.length > 0}`,
			'aria-disabled': `${this.bond.state.props.disabled}`,
			'aria-readonly': `${this.bond.state.props.readonly}`,
			'aria-errormessage': this.bond.state.errors.length > 0 ? `error-${this.bond.id}` : undefined
		};
	}
}

export class FieldBond extends Bond<FieldStateProps, FieldBondState, FieldDomElements> {
	static CONTEXT_KEY = '@atoms/context/form/field';

	constructor(state: FieldBondState) {
		super(state, 'field');
	}

	root() {
		return this.atom('root', () => new FieldRootAtom(this));
	}

	label() {
		return this.atom('label', () => new FieldLabelAtom(this));
	}

	control() {
		return this.atom('control', () => new FieldControlAtom(this));
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
	#errors = $state<ValidationError[]>([]);
	#isValidating = $state(false);

	constructor(props: () => Props) {
		super(props);
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
			const result: ValidationResult = { success: true, data: value, errors: [] };
			onvalidation?.(result);
			return result;
		}

		const result = validator.validate(schema, value);

		this.#errors = result.errors;

		onvalidation?.(result);

		return result;
	}

	async validateASync(): Promise<ValidationResult> {
		const { schema, validator, value, onvalidation } = this.props;

		if (!schema || !validator) {
			this.#errors = [];
			const result: ValidationResult = { success: true, data: value, errors: [] };
			onvalidation?.(result);
			return result;
		}

		this.#isValidating = true;

		try {
			const result = validator.validateAsync
				? await validator.validateAsync(schema, value)
				: validator.validate(schema, value);

			this.#errors = result.errors;

			onvalidation?.(result);

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
