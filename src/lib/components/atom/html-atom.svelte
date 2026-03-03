<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
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
		defaults = undefined,
		children: childrenProp = undefined,
		...restProps
	}: Props = $props();

	// Memoize preset resolution - only recompute when presetKey or bond changes
	const preset = $derived.by(() => {
		if (!presetKey) return undefined;
		const result = getPreset(presetKey as PresetModuleName)?.apply?.(bond, [bond]);
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

	const _klass = $derived(
		mergeClassesWithPreset(klass, preset?.class, mergedVariants?.class as ClassValue)
	);

	const _base = $derived(base ?? preset?.base);
	const _as = $derived(as ?? preset?.as);
	// Priority (lowest → highest): defaults → preset → mergedVariants → restProps
	const _restProps = $derived({ ...defaults, ...extractRestProps(preset, mergedVariants, restProps) });

	const atom = $derived(rootBond?.state?.props?.renderers?.html ?? HtmlElement);

	const renderer = $derived.by(() => {
		if (isSnippetBase(_base))
			return {
				component: SnippetRenderer,
				props: { snippet: _base, class: _klass, as: _as, children: childrenProp, ..._restProps }
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
