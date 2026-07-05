<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Content } from '$ixirjs/ui/components/popover/atoms';
	import type { Base } from '$ixirjs/ui/components/atom';
	import { DropdownMenuBond } from './bond.svelte';
	import { Root } from '../list/atoms';

	const bond = DropdownMenuBond.get();

	let {
		class: klass = '',
		as = 'ul' as T,
		base = Root as B,
		preset = 'dropdown-menu.content',
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
