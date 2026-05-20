<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Base, HtmlAtomProps } from './types';
	import { RootBond } from '../root';
	import { HtmlElement } from '../element';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import SnippetRenderer from './snippet-renderer.svelte';
	import type { Component } from 'svelte';
	import type { ClassValue } from '$svelte-atoms/core/utils';
	import {
		resolvePreset,
		resolveLocalVariants,
		mergeVariants,
		mergeClassesWithPreset,
		extractRestProps,
		isSnippetBase
	} from './utils';

	const rootBond = RootBond.get();

	let {
		class: klass = '',
		as = undefined,
		base = undefined,
		preset: presetKey = undefined,
		bond = undefined,
		variants = undefined,
		fallback = undefined,
		children: children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> = $props();

	// Memoize preset resolution - only recompute when presetKey or bond changes
	const preset = $derived.by(() => {
		if (!presetKey) return undefined;
		const result = getPreset(presetKey as PresetModuleName)?.(bond);
		return resolvePreset(result);
	});

	// Resolve local variants - either VariantDefinition or function
	const localVariants = $derived(resolveLocalVariants(variants, bond, restProps));

	// Merge preset variants with local variants
	// Memoized to avoid recomputation when inputs haven't changed
	const mergedVariants = $derived.by(() => {
		return mergeVariants(
			preset?.variants,
			preset?.class,
			preset?.compounds,
			preset?.defaults,
			localVariants,
			bond,
			restProps
		);
	});

	const finalKlass = $derived(
		mergeClassesWithPreset(klass, preset?.class, mergedVariants?.class as ClassValue)
	);

	const finalBase = $derived(base ?? preset?.base);
	const finalAs = $derived(as ?? preset?.as);
	const finalRestProps = $derived(extractRestProps(preset, mergedVariants, restProps, fallback));

	const atom = $derived(rootBond?.state?.props?.renderers?.html ?? HtmlElement);

	// Memoize the snippet check so the renderer component / props don't both
	// recompute it on every reactive tick.
	const baseIsSnippet = $derived(isSnippetBase(finalBase));

	// Track the renderer component and its props as INDEPENDENT signals.
	// - `rendererComponent` only flips when the underlying base/atom changes,
	//   so Svelte won't tear down + remount when only props change.
	// - `rendererProps` re-allocates when any prop changes, but doesn't drag
	//   the component identity with it (no nested `{ component, props }` wrapper).
	const RendererComponent = $derived(
		baseIsSnippet ? (SnippetRenderer as unknown as Component) : ((finalBase ?? atom) as Component)
	);

	const rendererProps = $derived.by((): Record<string, unknown> => {
		if (baseIsSnippet) {
			return {
				snippet: finalBase,
				class: finalKlass,
				as: finalAs,
				children: children,
				...finalRestProps
			};
		}
		return { class: finalKlass, as: finalAs, ...finalRestProps };
	});

	function forwardChildren(...args: any[]) {
		return children?.(...args);
	}
</script>

<RendererComponent {...rendererProps} children={forwardChildren} />
