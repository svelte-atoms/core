<script lang="ts" generics="T extends HtmlElementTagName">
	import { untrack } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { toClassValue } from '$ixirjs/ui/utils';
	import { withDefaultBorder } from './class';
	import { createPresentation } from '../atom/presentation.svelte';
	import type { ElementType, HtmlElementProps, HtmlElementTagName } from './types';

	type Element = ElementType<T>;

	let {
		class: klass = '',
		as = 'div' as T,
		preset: presetKey = undefined,
		variants = undefined,
		defaults = undefined,
		motion: motionProp = undefined,
		__resolvedPresentation = false,
		global = true,
		initial = undefined,
		enter = undefined,
		exit = undefined,
		animate = undefined,
		onmount = undefined,
		ondestroy = undefined,
		onintroend = undefined,
		onexitend = undefined,
		children = undefined,
		...restProps
	}: HtmlElementProps<T> & Omit<HTMLAttributes<Element>, keyof HtmlElementProps<T>> = $props();

	let node = $state<Element>();
	// with an enter transition, defer animate() until it ends
	let hasEntered = $state<boolean | undefined>();
	// guards initial() to a single mount-time invocation
	let hasInitialized = false;

	$effect(() => {
		if (!node) return;

		const unmount = untrack(() => onmount?.(node!));

		return () => {
			if (typeof unmount === 'function') unmount(node!);
			ondestroy?.(node!);
		};
	});

	$effect(() => {
		if (hasEntered !== undefined || !resolvedMotion) return;
		hasEntered = !resolvedMotion.enter;
	});

	$effect(() => {
		if (!hasEntered) return;
		if (!node) return;

		const currentNode = node;
		const cleanup = resolvedMotion?.animate?.(currentNode);
		return () => stopAnimation(cleanup, currentNode);
	});

	const attachFunction = (n: Element) => {
		node = n;
	};

	// Renderer mode is an initialization-only internal prop from HtmlAtom.
	const resolvedPresentation = untrack(() => __resolvedPresentation);
	const directMotion = $derived.by(() => {
		if (motionProp === null) return null;
		return {
			initial: motionProp?.initial !== undefined ? motionProp.initial : initial,
			enter: motionProp?.enter !== undefined ? motionProp.enter : enter,
			exit: motionProp?.exit !== undefined ? motionProp.exit : exit,
			animate: motionProp?.animate !== undefined ? motionProp.animate : animate
		};
	});
	const presentation = resolvedPresentation
		? undefined
		: createPresentation({
				preset: () => presetKey,
				variants: () => variants,
				defaults: () => defaults,
				motion: () => directMotion,
				class: () => klass,
				as: () => as,
				restProps: () => restProps
			});
	const resolvedMotion = $derived(resolvedPresentation ? directMotion : presentation?.motion);
	const finalKlass = $derived(
		withDefaultBorder(resolvedPresentation ? toClassValue(klass) : (presentation?.class ?? ''))
	);
	const finalAs = $derived(String(resolvedPresentation ? as : (presentation?.as ?? as)));
	const hasTransitions = $derived(!!(resolvedMotion?.enter ?? resolvedMotion?.exit));
	const transitionSnippet = $derived(
		!hasTransitions ? bareElement : global ? globalTransition : localTransition
	);

	// attach transition-end handlers only when transitions exist — they can't fire on a bare element
	const elementProps = $derived.by(() => {
		const base = resolvedPresentation ? { ...restProps } : { ...(presentation?.attrs ?? {}) };
		if (hasTransitions) {
			base.onintroend = handleIntroEnd;
			base.onoutroend = handleExitEnd;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- loose passthrough spread onto a polymorphic element; `unknown` values can't satisfy attribute types
		return base as Record<string, any>;
	});

	function handleIntroEnd(ev: TransitionEvent) {
		onintroend?.(ev);
		if (ev.defaultPrevented) return;
		hasEntered = true;
	}

	function handleExitEnd(ev: TransitionEvent) {
		onexitend?.(ev);
	}

	function enterTransition(node: Element) {
		return resolvedMotion?.enter?.(node) ?? {};
	}

	function exitTransition(node: Element) {
		return resolvedMotion?.exit?.(node) ?? {};
	}

	function applyInitial(node: Element) {
		if (!node) return;
		if (hasInitialized) return;
		hasInitialized = true;
		untrack(() => resolvedMotion?.initial?.(node!));
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

{#snippet bareElement()}
	<svelte:element
		this={finalAs}
		{@attach applyInitial}
		{@attach attachFunction}
		class={finalKlass}
		{...elementProps}
	>
		{@render children?.()}
	</svelte:element>
{/snippet}

{#snippet globalTransition()}
	<svelte:element
		this={finalAs}
		{@attach applyInitial}
		{@attach attachFunction}
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
		{@attach applyInitial}
		{@attach attachFunction}
		class={finalKlass}
		in:enterTransition
		out:exitTransition
		{...elementProps}
	>
		{@render children?.()}
	</svelte:element>
{/snippet}

{@render transitionSnippet()}
