import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$svelte-atoms/core/components/atom';
import type { Override, Factory } from '$svelte-atoms/core/types';
import type { FormBond } from './bond.svelte';
import type { FieldBond } from './field/bond.svelte';
import type { LabelProps } from '$svelte-atoms/core/components/label';
import type { Schema } from './validation-adapters';

// ============================================================================
// Form Snippet Props (Extensible)
// ============================================================================

export interface FormSnippetProps extends SnippetProps {
	form: FormBond;
}

export type FormChildren = Snippet<[FormSnippetProps]>;

export interface FieldSnippetProps extends SnippetProps {
	field: FieldBond | undefined;
}

export type FieldChildren = Snippet<[FieldSnippetProps]>;

interface CommonProps {
	factory?: Factory<FormBond>;
}

interface RenderlessProps {
	renderless?: true;
	children?: FormChildren;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RenderfullProps<B extends Base = Base> extends Override<
	HtmlAtomProps<'form', B, FormChildren>,
	{
		renderless?: false;
	}
> {}

export type FormRootProps<B extends Base = Base> = CommonProps &
	(RenderlessProps | RenderfullProps<B>);

export type FieldRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = Override<
	HtmlAtomProps<E, B, FieldChildren>,
	{
		disabled: boolean;
		readonly: boolean;
		name?: string;
		value?: any;
		schema?: Schema;
		parse: (schema: Schema) => void;
		extend: any;
		factory?: Factory<FieldBond>;
	}
>;

export type FieldLabelProps<
	E extends keyof HTMLElementTagNameMap = 'label',
	B extends Base = Base
> = Omit<LabelProps<E, B>, 'for'>;

export type FieldControlProps<B extends Base<{ value?: unknown }>> = Override<
	HtmlAtomProps<any, B, FieldChildren>,
	{
		value?: any;
		valueAsDate?: Date;
		valueAsNumber?: number;
		checked?: boolean;
		files?: File[] | null;
		oninput?: (ev: CustomEvent, detail?: { value: any }) => void;
		children?: Snippet;
	}
>;
