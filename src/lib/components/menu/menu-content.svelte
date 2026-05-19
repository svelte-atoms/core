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
		preset = 'menu.content',
		children = undefined,
		...restProps
	} = $props();
</script>

<Content
	{as}
	{base}
	{bond}
	{preset}
	class={['border-border overflow-hidden p-0', '$preset', klass]}
	{...restProps}
>
	{@render children?.()}
</Content>
