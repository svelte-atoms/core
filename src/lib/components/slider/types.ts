import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$ixirjs/ui/components/atom';
import type { StateChangeCallback } from '$ixirjs/ui/types';

export type SliderResolvedPartProps = Record<string, unknown>;

export interface SliderThumbContentProps {
	value: number;
	percent: number;
	props: SliderResolvedPartProps;
}

export interface SliderTrackContentProps {
	value: number;
	percent: number;
	min: number;
	max: number;
	props: SliderResolvedPartProps;
}

export interface SliderValueChangeDetails {
	percent: number;
	min: number;
	max: number;
	step: number;
	type: 'number';
}

type SliderStateChangeCallback = StateChangeCallback<number>;

export type SliderValueChangeCallback = (
	value: Parameters<SliderStateChangeCallback>[0],
	context: Parameters<SliderStateChangeCallback>[1] & SliderValueChangeDetails
) => ReturnType<SliderStateChangeCallback>;

export interface SliderProps extends HtmlAtomProps<'div'> {
	value?: number;
	// Default: 0.
	min?: number;
	// Default: 100.
	max?: number;
	// Step increment. Default: 1.
	step?: number;
	disabled?: boolean;
	// Forwarded to the hidden input.
	id?: string;
	// Forwarded to the hidden input.
	name?: string;
	// Default: `'horizontal'`.
	orientation?: 'horizontal' | 'vertical';
	// Custom thumb snippet; replaces the default circular thumb; receives `{ value, percent }`.
	thumbContent?: Snippet<[SliderThumbContentProps]>;
	// Custom track snippet; replaces the default track + fill bar; receives resolved `props`.
	trackContent?: Snippet<[SliderTrackContentProps]>;
	// Child content (e.g. label rendered after the slider root).
	children?: Snippet<[]>;
	// Semantic state callback; runs once for each committed value transition.
	onvaluechange?: SliderValueChangeCallback;
	// Native DOM callbacks retain their event-only signatures.
	onchange?: (event: Event) => void;
	oninput?: (event: Event) => void;
}
