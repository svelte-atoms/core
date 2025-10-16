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
		as = 'g' as T,
		initial = (node) => ({}),
		enter = (node) => ({}),
		exit = (node) => ({}),
		animate = (node) => {},
		onmount = undefined,
		ondestroy = undefined,
		children = undefined,
		...restProps
	}: SvgElementProps<T> & Omit<SVGAttributes<Element>, keyof SvgElementProps<T>> = $props();

	let node = $state<Element>();

	let hasIntroTransition = $state(false);
	let isEntered = false;

	const checkIfEntered = () => isEntered;

	$effect(() => {
		const unmount = untrack(() => onmount?.(node!));

		if (!hasIntroTransition) {
			isEntered = true;
		}

		return () => {
			if (typeof unmount === 'function') unmount(node);
			ondestroy?.(node!);
		};
	});

	const elementProps = $derived({
		[createAttachmentKey()]: (n: Element) => {
			node = n;
		},
		[createAttachmentKey()]: _animate,

		class: cn(toClassValue(klass)),
		onintrostart: () => {
			hasIntroTransition = true;
			isEntered = false;
		},
		onintroend: () => {
			isEntered = true;
		},
		onoutroend: () => {
			isEntered = false;
		},
		...restProps
	});

	function _enter(node: Element) {
		initial?.(node);

		return () => enter(node);
	}

	function _exit(node: Element) {
		return () => exit(node);
	}

	function _animate(node: Element) {
		if (!checkIfEntered()) return;

		return animate(node);
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
