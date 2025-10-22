import type { Snippet } from 'svelte';
import type { HTMLAttributes, SVGAttributes } from 'svelte/elements';
import type { TransitionConfig } from 'svelte/transition';
import type { ClassValue } from '$svelte-atoms/core/utils';

export type ElementProps<T extends ElementTagName> = Record<string, unknown> & {
	class?: ClassValue | ClassValue[];
	as?: T | (string & {});
	global?: boolean;
	initial?: NodeFunction<T>;
	enter?: TransitionFunction<T>;
	exit?: TransitionFunction<T>;
	animate?: NodeFunction<T>;
	onmount?: NodeFunction<T>;
	ondestroy?: NodeFunction<T>;
	children?: Snippet;

	[key: string]: unknown;
};

export type HtmlElementTagName = keyof HTMLElementTagNameMap;
export type SvgElementTagName = keyof SVGElementTagNameMap;
export type MathMLElementTagName = keyof MathMLElementTagNameMap;

export type HtmlElementProps<T extends HtmlElementTagName = 'div'> = ElementProps<T>;
export type SvgElementProps<T extends SvgElementTagName = 'g'> = ElementProps<T>;
export type MathMLElementProps<T extends MathMLElementTagName> = ElementProps<T>;

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

export type TransitionFunction<T extends ElementTagName> = (
	node: ElementType<T>
) => Partial<TransitionConfig>;

export type NodeFunction<T extends ElementTagName> = (node: ElementType<T>, ...args: any[]) => any;
