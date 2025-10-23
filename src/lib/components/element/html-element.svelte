<script lang="ts" generics="T extends HtmlElementTagName">
	import { untrack } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { createAttachmentKey } from 'svelte/attachments';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { ElementType, HtmlElementProps, HtmlElementTagName } from './types';

	type Element = ElementType<T>;

	let {
		class: klass = '',
		as = 'div' as T,
		global = true,
		initial = undefined,
		enter = undefined,
		exit = undefined,
		animate = undefined,
		onmount = undefined,
		ondestroy = undefined,
		children = undefined,
		...restProps
	}: HtmlElementProps<T> & Omit<HTMLAttributes<Element>, keyof HtmlElementProps<T>> = $props();

	let node = $state<Element>();

	let skipFirstAnimate = $state(!!enter);

	$effect(() => {
		if (!node) return;

		const unmount = untrack(() => onmount?.(node!));

		return () => {
			if (typeof unmount === 'function') unmount(node!);
			ondestroy?.(node!);
		};
	});

	$effect(() => {
		const fn = animate;

		if (!node) return;
		const shouldSkip = untrack(() => skipFirstAnimate);

		if (shouldSkip) {
			skipFirstAnimate = false;
			return;
		}

		fn?.(node);
	});

	const elementProps = $derived({
		[createAttachmentKey()]: (n: Element) => {
			node = n;
		},
		class: cn(toClassValue(klass)),
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
