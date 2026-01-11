import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { StepperBond } from './bond.svelte';

export interface StepperRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'> {
	/**
	 * The active step index (0-based)
	 * @bindable
	 */
	activeStep?: number;

	/**
	 * Orientation of the stepper
	 * @default 'horizontal'
	 */
	orientation?: 'horizontal' | 'vertical';

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
	children?: Snippet<[{ stepper: StepperBond }]>;
}

export interface StepperHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ stepper?: StepperBond }]>;
}

export interface StepperBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ stepper?: StepperBond }]>;
}

export interface StepperFooterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ stepper?: StepperBond }]>;
}

export interface StepperContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'> {
	/**
	 * Child render function
	 */
	children?: Snippet<[{ stepper?: StepperBond }]>;
}
