<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Content } from '$svelte-atoms/core/components/popover/atoms';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { MenuBond } from './bond.svelte';
	import { Root } from '../list/atoms';

	const bond = MenuBond.get();

	let {
		class: klass = '',
		as = 'ul' as T,
		base = Root as B,
		preset = 'menu.list',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();
</script>

<Content
	{as}
	{base}
	{bond}
	{preset}
	class={['border-border overflow-hidden p-0', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...restProps}
>
	{@render children?.()}
</Content>
