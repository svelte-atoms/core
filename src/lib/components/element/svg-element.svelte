<svelte:options namespace="svg" />

<script lang="ts" generics="T extends SvgElementTagName">
	import { untrack } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';
	import { createAttachmentKey } from 'svelte/attachments';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { ElementType, SvgElementProps, SvgElementTagName } from './types';

	type Element = ElementType<T>;

	let {
		class: klass = '',
		as="g",
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
	// If enter animation is defined, we want to wait for it first beafore running animate
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
		if(!hasEntered) return;
		if (!node) return;

		animate?.(node);
	});

	const elementProps = $derived({
		[createAttachmentKey()]: (n: Element) => {
			node = n;
		},
		class: cn(toClassValue(klass)),
		onintroend: (ev: TransitionEvent) => {
			onintroend?.(ev);
			if (ev.defaultPrevented) return;

			hasEntered = true;
		},
		...restProps
	});

	function _enter(node: Element) {
		initial?.(node);
		return () => {
			const { duration = 0, delay = 0, easing = undefined } = enter?.(node) ?? {};
			return { duration, delay, easing };
		};
	}

	function _exit(node: Element) {
		return () => {
			const { duration = 0, delay = 0, easing = undefined } = exit?.(node) ?? {};
			return { duration, delay, easing };
		};
	}
</script>

{#if global}
	<svelte:element this={as} in:_enter|global out:_exit|global {...elementProps}>
		{@render children?.()}
	</svelte:element>
{:else}
	<svelte:element this={as} in:_enter out:_exit {...elementProps}>
		{@render children?.()}
	</svelte:element>
{/if}
