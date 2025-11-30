<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { SidebarBond } from './bond.svelte';
	import type { SidebarRootProps } from './types';
	import { animate as motion } from 'motion';

	const bond = SidebarBond.get();

	let {
		class: klass = '',
		width = 'auto',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
		enter = undefined,
		exit = undefined,
		initial = _initial,
		...restProps
	}: SidebarRootProps<E, B> = $props();

	const contentProps = $derived({
		...bond?.content(),
		...restProps
	});

	const isOpen = $derived(bond?.state.props.open);

	function _initial(node: HTMLElement) {
		motion(node, { width: isOpen ? width : 0 }, { duration: 0 });
	}
	function _animate(node: HTMLElement) {
		motion(node, { width: isOpen ? width : 0 }, { duration: 0.3, ease: 'anticipate' });
	}
</script>

<HtmlAtom
	{bond}
	preset="sidebar.content"
	class={['bg-card border-border', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...contentProps}
>
	{@render children?.({ sidebar: bond })}
</HtmlAtom>
