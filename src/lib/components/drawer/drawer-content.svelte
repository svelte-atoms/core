<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { SlideoverContentProps } from './types';
	import { DrawerBond } from './bond.svelte';
	import { animate as motion } from 'motion';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();
	const isOpen = $derived(bond?.state.props.open);

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
		enter = undefined,
		exit = undefined,
		initial = _initial,
		...restProps
	}: SlideoverContentProps<E, B> & HTMLAttributes<Element> = $props();

	const contentProps = $derived({
		...bond?.content(),
		...restProps
	});

	function _initial(node: HTMLElement) {
		motion(node, { x: isOpen ? 0 : -100+'%', left: 0 }, { duration: 0.3, ease: 'anticipate' });
	}

	function _animate(node: HTMLElement) {
		motion(node, { x: isOpen ? 0 : -100+'%', left: 0 }, { duration: 0.3, ease: 'anticipate' });
	}
</script>

<HtmlAtom
	preset="drawer.content"
	class={[
		'bg-card text-foreground border-border pointer-events-none absolute',
		isOpen && 'pointer-events-auto',
		'$preset',
		klass
	]}
	{bond}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...contentProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
