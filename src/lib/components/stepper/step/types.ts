import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { StepBond } from './bond.svelte';

export interface StepRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'> {
	/**
	 * The step index (0-based)
	 */
	index: number;

	/**
	 * Header content for the step
	 */
	header: string;

	/**
	 * Optional body content for the step
	 */
	body?: string;

	/**
	 * Whether this step is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether this step is completed
	 * @default false
	 */
	completed?: boolean;

	/**
	 * Whether this step is optional
	 * @default false
	 */
	optional?: boolean;

	/**
	 * Whether this step has an error
	 * @default false
	 */
	error?: boolean;

	/**
	 * Custom factory for creating step bond
	 */
	factory?: Factory<StepBond>;

	/**
	 * Child render function
	 */
	children?: Snippet<[{ step: StepBond }]>;
}

export interface StepIndicatorProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ step: StepBond }]>;
}

export interface StepHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ step: StepBond }]>;
}

export interface StepTitleProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ step: StepBond }]>;
}

export interface StepDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ step: StepBond }]>;
}

export interface StepBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ step: StepBond }]>;
}

export interface StepSeparatorProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ step: StepBond }]>;
}

export interface StepContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ step?: StepBond }]>;
}
