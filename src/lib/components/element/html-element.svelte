<script lang="ts" generics="T extends HtmlElementTagName">
	import { untrack } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
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
		onintroend = undefined,
		children = undefined,
		...restProps
	}: HtmlElementProps<T> & Omit<HTMLAttributes<Element>, keyof HtmlElementProps<T>> = $props();

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

	const attachFunction = (n: Element) => {
		node = n;
	};

	// handleIntroEnd is stable (defined once) — keep it separate from the derived
	// so restProps changes don't force a new object including this stable reference.
	// Using $derived.by to be explicit about what we're tracking.
	const elementProps = $derived.by(() => {
		// Access restProps to track it; spread into a fresh object only when it changes
		const base = { ...restProps };
		base.onintroend = handleIntroEnd;
		return base as Record<string, any>;
	});

	const finalKlass = $derived(cn(toClassValue(klass)));
	const transitionSnippet = $derived(global ? globalTransition : localTransition);

	function handleIntroEnd(ev: TransitionEvent) {
		onintroend?.(ev);
		if (ev.defaultPrevented) return;

		hasEntered = true;
	}

	function enterTransition(node: Element) {
		initial?.(node);
		
		return enter?.(node) ?? {};
	}

	function exitTransition(node: Element) {
		return exit?.(node) ?? {};
	}
</script>

{#snippet globalTransition()}
	<svelte:element this={as} {@attach attachFunction} class={finalKlass} in:enterTransition|global out:exitTransition|global {...elementProps}>
		{@render children?.()}
	</svelte:element>
{/snippet}

{#snippet localTransition()}
	<svelte:element this={as} {@attach attachFunction} class={finalKlass} in:enterTransition out:exitTransition {...elementProps}>
		{@render children?.()}
	</svelte:element>
{/snippet}

{@render transitionSnippet()}
