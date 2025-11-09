import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Override, Factory } from '$svelte-atoms/core/types';
import type { FormBond } from './bond.svelte';
import type { FieldBond } from './field/bond.svelte';
import type { LabelProps } from '$svelte-atoms/core/components/label';
import type { Schema } from './validation-adapters';

/**
 * Extend this interface to add custom form root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormRootExtendProps {}

/**
 * Extend this interface to add custom field root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FieldRootExtendProps {}

/**
 * Extend this interface to add custom field label properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FieldLabelExtendProps {}

/**
 * Extend this interface to add custom field control properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FieldControlExtendProps {}

interface CommonProps extends FormRootExtendProps {
	factory?: Factory<FormBond>;
}

interface RenderlessProps {
	renderless?: true;
	children?: Snippet<[{ form: FormBond }]>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RenderfullProps<B extends Base = Base>
	extends Override<
		HtmlAtomProps<'form', B>,
		{
			renderless?: false;
			children?: Snippet<[{ form: FormBond }]>;
		}
	> {}

export type FormRootProps<B extends Base = Base> = CommonProps &
	(RenderlessProps | RenderfullProps<B>);

export type FieldRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = Override<
	HtmlAtomProps<E, B>,
	{
		disabled: boolean;
		readonly: boolean;
		name?: string;
		value?: any;
		schema?: Schema;
		parse: (schema: Schema) => void;
		extend: any;
		factory?: Factory<FieldBond>;
		children?: Snippet<[{ field?: FieldBond }]>;
	}
> &
	FieldRootExtendProps;

export type FieldLabelProps<
	E extends keyof HTMLElementTagNameMap = 'label',
	B extends Base = Base
> = Omit<LabelProps<E, B>, 'for'> & FieldLabelExtendProps;

export type FieldControlProps<B extends Base<{ value?: unknown }>> = Override<
	HtmlAtomProps<any, B>,
	{
		value?: any;
		valueAsDate?: Date;
		valueAsNumber?: number;
		checked?: boolean;
		files?: File[] | null;
		oninput?: (ev: CustomEvent, detail?: { value: any }) => void;
		children?: Snippet;
	}
> &
	FieldControlExtendProps;

/**
 * @deprecated Use FormRootExtendProps instead
 */
export type FormExtendProps = FormRootExtendProps;
