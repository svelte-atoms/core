import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { AlertBond } from './bond.svelte';

/**
 * Extend this interface to add custom alert root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertRootExtendProps {}

/**
 * Extend this interface to add custom alert content properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertContentExtendProps {}

/**
 * Extend this interface to add custom alert title properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertTitleExtendProps {}

/**
 * Extend this interface to add custom alert description properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertDescriptionExtendProps {}

/**
 * Extend this interface to add custom alert icon properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertIconExtendProps {}

/**
 * Extend this interface to add custom alert actions properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertActionsExtendProps {}

/**
 * Extend this interface to add custom alert close button properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertCloseButtonExtendProps {}

export interface AlertRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		AlertRootExtendProps {
	dismissible?: boolean;
	dismissed?: boolean;
	disabled?: boolean;
	extend?: Record<string, unknown>;
	factory?: Factory<AlertBond>;
	children?: Snippet<[{ alert: AlertBond }]>;
}

export interface AlertContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		AlertContentExtendProps {}

export interface AlertTitleProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		AlertTitleExtendProps {}

export interface AlertDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		AlertDescriptionExtendProps {}

export interface AlertIconProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		AlertIconExtendProps {}

export interface AlertActionsProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		AlertActionsExtendProps {}

export interface AlertCloseButtonProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		AlertCloseButtonExtendProps {}
