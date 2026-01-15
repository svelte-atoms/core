<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Base, HtmlAtomProps, SnippetBase } from './types';
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

	type Element = HTMLElementTagNameMap[E];

	type Props =  Omit<HTMLAttributes<Element>, 'children'> & HtmlAtomProps<E, B>;

	const rootBond = RootBond.get();

	let {
		class: klass = '',
		as = 'div',
		base = undefined,
		preset: presetKey = undefined,
		bond = undefined,
		variants = undefined,
		children: childrenProp = undefined,
		...restProps
	}: Props = $props();

	// Memoize preset resolution - only recompute when presetKey or bond changes
	const preset = $derived.by(() => {
		if (!presetKey) return undefined;
		const result = getPreset(presetKey as PresetModuleName)?.apply?.(bond, [bond]);
		return resolvePreset(result);
	});

	const presetVariantsProps = $derived(preset?.variants);

	// Resolve local variants - either VariantDefinition or function
	const localVariants = $derived(resolveLocalVariants(variants, bond, restProps));

	// Merge preset variants with local variants
	// Memoized to avoid recomputation when inputs haven't changed
	const mergedVariants = $derived.by(() => {
		return mergeVariants(
			presetVariantsProps,
			preset?.class,
			preset?.compounds,
			preset?.defaults,
			localVariants,
			bond,
			restProps
		);
	});

	const _klass = $derived(
		mergeClassesWithPreset(klass, preset?.class, mergedVariants?.class as ClassValue)
	);

	const _base = $derived(base ?? preset?.base);
	const _as = $derived(as ?? preset?.as);
	const _restProps = $derived(extractRestProps(preset, mergedVariants, restProps));

	const isSnippet = $derived(isSnippetBase(_base));

	const snippet = $derived(_base as SnippetBase);

	const atom = rootBond?.state?.props?.renderers?.html ?? HtmlElement;

	const renderer = $derived.by(() => {
		if (isSnippet)
			return {
				component: SnippetRenderer,
				props: { snippet: snippet, class: _klass, as: _as, children: childrenProp, ..._restProps }
			};

		return {
			component: _base ?? atom,
			props: { class: _klass, as: _as, ..._restProps }
		};
	}) as { component: Component; props: Record<string, any> };
</script>

<renderer.component {...renderer.props}>
	{#snippet children(args: any)}
		{@render (childrenProp as any)?.(args)}
	{/snippet}
</renderer.component>
