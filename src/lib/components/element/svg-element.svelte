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
		motion: motionProp = undefined,
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
	let hasEntered = $state<boolean | undefined>();

	$effect(() => {
		if (!node) return;

		const unmount = untrack(() => onmount?.(node!));

		return () => {
			if (typeof unmount === 'function') unmount(node!);
			ondestroy?.(node!);
		};
	});

	const attachmentKey = createAttachmentKey();
	const directMotion = $derived.by(() => {
		if (motionProp === null) return null;
		return {
			initial: motionProp?.initial !== undefined ? motionProp.initial : initial,
			enter: motionProp?.enter !== undefined ? motionProp.enter : enter,
			exit: motionProp?.exit !== undefined ? motionProp.exit : exit,
			animate: motionProp?.animate !== undefined ? motionProp.animate : animate
		};
	});
	const presentation = createPresentation({
		preset: () => presetKey,
		variants: () => variants,
		defaults: () => defaults,
		motion: () => directMotion,
		class: () => klass,
		as: () => as,
		restProps: () => restProps
	});
	const resolvedMotion = $derived(presentation.motion);

	$effect(() => {
		if (hasEntered !== undefined || !resolvedMotion) return;
		hasEntered = !resolvedMotion.enter;
	});

	$effect(() => {
		if (!hasEntered || !node) return;
		const currentNode = node;
		const cleanup = resolvedMotion?.animate?.(currentNode);
		return () => stopAnimation(cleanup, currentNode);
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
		resolvedMotion?.initial?.(node);

		return resolvedMotion?.enter?.(node) ?? {};
	}

	function exitTransition(node: Element) {
		return resolvedMotion?.exit?.(node) ?? {};
	}

	function stopAnimation(cleanup: unknown, currentNode: Element) {
		if (typeof cleanup === 'function') {
			cleanup(currentNode);
			return;
		}

		if (!cleanup || typeof cleanup !== 'object' || !('stop' in cleanup)) return;
		const stop = cleanup.stop;
		if (typeof stop === 'function') stop.call(cleanup);
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
