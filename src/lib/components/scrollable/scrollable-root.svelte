<script lang="ts" generics="T extends keyof HTMLElementTagNameMap">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ScrollableBond, ScrollableState, type ScrollableStateProps } from './bond.svelte';
	import type { ScrollableRootProps } from './types';
	let {
		scrollX = $bindable(0),
		scrollY = $bindable(0),
		scrollWidth = $bindable(0),
		scrollHeight = $bindable(0),
		clientWidth = $bindable(0),
		clientHeight = $bindable(0),
		class: klass = '',
		disabled = false,
		open = true,
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: ScrollableRootProps<T> = $props();

	let isScrolling = $state(false);

	const bondProps = defineState<ScrollableStateProps>([
		defineProperty(
			'scrollX',
			() => scrollX,
			(v) => (scrollX = v)
		),
		defineProperty(
			'scrollY',
			() => scrollY,
			(v) => (scrollY = v)
		),
		defineProperty(
			'scrollWidth',
			() => scrollWidth,
			(v) => (scrollWidth = v)
		),
		defineProperty(
			'scrollHeight',
			() => scrollHeight,
			(v) => (scrollHeight = v)
		),
		defineProperty(
			'clientWidth',
			() => clientWidth,
			(v) => (clientWidth = v)
		),
		defineProperty(
			'clientHeight',
			() => clientHeight,
			(v) => (clientHeight = v)
		),
		defineProperty('disabled', () => disabled),
		defineProperty(
			'open',
			() => open,
			(v) => (open = v)
		),
		defineProperty(
			'isScrolling',
			() => isScrolling,
			(v) => (isScrolling = v)
		),
		defineProperty('rest', () => restProps)
	]);

	const bond = factory(bondProps).share();

	const rootProps = $derived({ ...bond.root(), ...restProps });

	function _factory(props: typeof bondProps) {
		const scrollableState = new ScrollableState(() => props);
		return new ScrollableBond(scrollableState).share();
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{bond}
	preset="scrollable"
	class={['scrollable-root border-border relative box-content overflow-hidden', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.({ scrollable: bond })}
</HtmlAtom>
