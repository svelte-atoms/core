import type { Snippet } from 'svelte';
import type { HTMLAttributes, SVGAttributes } from 'svelte/elements';
import type { TransitionConfig } from 'svelte/transition';
import type { ClassValue } from '$svelte-atoms/core/utils';

export interface ElementProps<T extends ElementTagName> extends Record<string, unknown> {
	class?: ClassValue | ClassValue[];
	as?: T | (string & {});
	global?: boolean;
	initial?: NodeFunction<T>;
	enter?: TransitionFunction<T>;
	exit?: TransitionFunction<T>;
	animate?: NodeFunction<T>;
	onmount?: NodeFunction<T>;
	ondestroy?: NodeFunction<T>;
	children?: Snippet<unknown[]>;

	[key: string]: unknown;
}

export type HtmlElementTagName = keyof HTMLElementTagNameMap;
export type SvgElementTagName = keyof SVGElementTagNameMap;
export type MathMLElementTagName = keyof MathMLElementTagNameMap;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HtmlElementProps<T extends HtmlElementTagName = 'div'> extends ElementProps<T> {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SvgElementProps<T extends SvgElementTagName = 'g'> extends ElementProps<T> {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MathMLElementProps<T extends MathMLElementTagName> extends ElementProps<T> {}

export type ElementTagName = HtmlElementTagName | SvgElementTagName | MathMLElementTagName;

export type HtmlElementType<T extends HtmlElementTagName> = HTMLElementTagNameMap[T];

export type SvgElementType<T extends SvgElementTagName> = SVGElementTagNameMap[T];

export type ElementType<T> = T extends HtmlElementTagName
	? HTMLElementTagNameMap[T]
	: T extends SvgElementTagName
		? SVGElementTagNameMap[T]
		: T extends MathMLElementTagName
			? MathMLElementTagNameMap[T]
			: never;

export type ElementAttributes<T extends ElementTagName> = T extends HtmlElementTagName
	? HTMLAttributes<ElementType<T>>
	: T extends SvgElementTagName
		? SVGAttributes<ElementType<T>>
		: never;

export interface TransitionFunction<T extends ElementTagName> {
	(node: ElementType<T>): Partial<TransitionConfig>;
}

export interface NodeFunction<T extends ElementTagName> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(node: ElementType<T>, ...args: any[]): any;
}
