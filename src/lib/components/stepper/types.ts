import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { StepperBond } from './bond.svelte';

// ============================================================================
// Stepper Snippet Props (Extensible)
// ============================================================================

export interface StepperSnippetProps extends SnippetProps {
	stepper: StepperBond;
}

export type StepperChildren = Snippet<[StepperSnippetProps]>;

export interface StepperRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, StepperChildren> {
	/**
	 * The active step index (0-based)
	 * @bindable
	 */
	step?: number;

	/**
	 * Whether to enforce linear progression (users can only go to next/previous steps)
	 * @default false
	 */
	linear?: boolean;

	/**
	 * Whether the stepper is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Custom factory for creating stepper bond
	 */
	factory?: Factory<StepperBond>;

	/**
	 * Child render function
	 */
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StepperHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, StepperChildren> {
	/**
	 * Child render function
	 */
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StepperBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, StepperChildren> {
	/**
	 * Child render function
	 */
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StepperFooterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, StepperChildren> {
	/**
	 * Child render function
	 */
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StepperContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, StepperChildren> {
	/**
	 * Child render function
	 */
}
