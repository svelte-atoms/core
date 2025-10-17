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
	}: SvgElementProps<T> & Omit<SVGAttributes<Element>, keyof SvgElementProps<T>> = $props();

	let node = $state<Element>();

	let hasIntroTransitionStarted: boolean | undefined = $state(undefined);
	let skipFirstAnimate = true;

	$effect(() => {
		if (!node) return;

		const unmount = untrack(() => onmount?.(node!));

		if (!enter || typeof hasIntroTransitionStarted === 'undefined') {
			skipFirstAnimate = false;
		}

		return () => {
			if (typeof unmount === 'function') unmount(node!);
			ondestroy?.(node!);
		};
	});

	$effect(() => {
		if (!node) return;

		if (skipFirstAnimate) {
			skipFirstAnimate = false;
			return;
		}

		animate?.(node);
	});

	const elementProps = $derived({
		[createAttachmentKey()]: (n: Element) => {
			node = n;
		},
		class: cn(toClassValue(klass)),
		onintrostart: () => {
			hasIntroTransitionStarted = true;
		},
		onintroend: () => {
			hasIntroTransitionStarted = false;
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
