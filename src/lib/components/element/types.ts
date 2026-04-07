import type { HTMLAttributes, SVGAttributes } from 'svelte/elements';
import type { TransitionConfig } from 'svelte/transition';
import type { ClassValue } from '$svelte-atoms/core/utils';
import type { Snippet } from 'svelte';

// ============================================================================
// Element Type Definitions
// ============================================================================

export type HtmlElementTagName = keyof HTMLElementTagNameMap;
export type SvgElementTagName = keyof SVGElementTagNameMap;
export type ElementTagName = HtmlElementTagName | SvgElementTagName;

export type HtmlElementType<T extends HtmlElementTagName> = HTMLElementTagNameMap[T];
export type SvgElementType<T extends SvgElementTagName> = SVGElementTagNameMap[T];

export type ElementType<T> = T extends HtmlElementTagName
	? HTMLElementTagNameMap[T]
	: T extends SvgElementTagName
		? SVGElementTagNameMap[T]
		: never;

// ============================================================================
// Attributes & Events
// ============================================================================

export type ElementAttributes<T extends ElementTagName> = T extends HtmlElementTagName
	? HTMLAttributes<ElementType<T>>
	: T extends SvgElementTagName
		? SVGAttributes<ElementType<T>>
		: never;

// ============================================================================
// Transition & Lifecycle Functions
// ============================================================================

export interface TransitionFunction<T extends Element = Element> {
	(node: T): Partial<TransitionConfig> | void;
}

export interface NodeFunction<T extends ElementTagName = ElementTagName> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(node: ElementType<T>, ...args: any[]): any;
}

// ============================================================================
// Base Element Props (Core, Extensible)
// ============================================================================

export interface ElementProps<T extends ElementTagName = ElementTagName> extends Record<
	string,
	unknown
> {
	/** CSS class binding (string, array, or computed) */
	class?: ClassValue | ClassValue[];

	/** Change the HTML tag (use polymorphic components) */
	as?: T | (string & {});

	/** Apply styles globally */
	global?: boolean;

	/** Initial animation/setup on mount */
	initial?: NodeFunction<T>;

	/** Enter transition */
	enter?: TransitionFunction<T>;

	/** Exit transition */
	exit?: TransitionFunction<T>;

	/** Animation function */
	animate?: NodeFunction<T>;

	/** Lifecycle: on mount */
	onmount?: NodeFunction<T>;

	/** Lifecycle: on destroy */
	ondestroy?: NodeFunction<T>;

	[key: string]: unknown;
}

// ============================================================================
// HTML Element Props (with transition events)
// ============================================================================

export interface HtmlElementEventProps {
	/** Fired when enter transition ends */
	onintroend?: (ev: TransitionEvent) => void;

	/** Fired when exit transition ends */
	onexitend?: (ev: TransitionEvent) => void;
}

export interface HtmlElementProps<
	T extends HtmlElementTagName = 'div',
	Children extends Snippet<unknown[]> = Snippet
>
	extends ElementProps<T>, HtmlElementEventProps {
	children?: Children;
}

// ============================================================================
// SVG Element Props
// ============================================================================

export type SvgElementProps<T extends SvgElementTagName = 'g'> = ElementProps<T>;
