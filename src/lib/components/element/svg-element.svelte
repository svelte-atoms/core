<svelte:options namespace="svg" />

<script lang="ts" generics="T extends SvgElementTagName">
	import { untrack } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';
	import { createAttachmentKey } from 'svelte/attachments';
	import { cn, toClassValue } from '$ixirjs/ui/utils';
	import { createPresentation } from '../atom/presentation.svelte';
	import type { ElementType, SvgElementProps, SvgElementTagName } from './types';

	type Element = ElementType<T>;

	let {
		class: klass = '',
		as = 'g',
		preset: presetKey = undefined,
		variants = undefined,
		defaults = undefined,
		global = true,
		initial = undefined,
		enter = undefined,
		exit = undefined,
		animate = undefined,
		onmount = undefined,
		ondestroy = undefined,
		onintroend = undefined,
		children = undefined,
		...restProps
	}: SvgElementProps<T> & Omit<SVGAttributes<Element>, keyof SvgElementProps<T>> = $props();

	let node = $state<Element>();
	// with an enter transition, defer animate() until it ends
	let hasEntered = $state(!(untrack(() => enter) ?? false));

	$effect(() => {
		if (!node) return;

		const unmount = untrack(() => onmount?.(node!));

		return () => {
			if (typeof unmount === 'function') unmount(node!);
			ondestroy?.(node!);
		};
	});

	$effect(() => {
		if (!hasEntered) return;
		if (!node) return;

		animate?.(node);
	});

	const attachmentKey = createAttachmentKey();
	const presentation = createPresentation({
		preset: () => presetKey,
		variants: () => variants,
		defaults: () => defaults,
		class: () => klass,
		as: () => as,
		restProps: () => restProps
	});
	const finalKlass = $derived(cn(toClassValue(presentation.class)));
	const finalAs = $derived(presentation.as as T);
	const elementProps = $derived({
		[attachmentKey]: (n: Element) => {
			node = n;
		},
		class: finalKlass,
		onintroend: (ev: TransitionEvent) => {
			onintroend?.(ev);
			if (ev.defaultPrevented) return;

			hasEntered = true;
		},
		...presentation.attrs
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- loose passthrough spread onto a polymorphic element; `unknown` values can't satisfy attribute types
	}) as Record<string, any>;

	const transitionSnippet = $derived(global ? globalTransition : localTransition);

	function enterTransition(node: Element) {
		initial?.(node);

		return enter?.(node) ?? {};
	}

	function exitTransition(node: Element) {
		return exit?.(node) ?? {};
	}
</script>

{#snippet globalTransition()}
	<svelte:element
		this={finalAs}
		class={finalKlass}
		in:enterTransition|global
		out:exitTransition|global
		{...elementProps}
	>
		{@render children?.()}
	</svelte:element>
{/snippet}

{#snippet localTransition()}
	<svelte:element
		this={finalAs}
		class={finalKlass}
		in:enterTransition
		out:exitTransition
		{...elementProps}
	>
		{@render children?.()}
	</svelte:element>
{/snippet}

{@render transitionSnippet()}
