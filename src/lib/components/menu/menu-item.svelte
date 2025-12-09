<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { PopoverBond } from '$svelte-atoms/core/components/popover/bond.svelte';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { List } from '../list';

	const bond = PopoverBond.get();

	let {
		class: klass = '',
		preset: presetKey = 'menu.item',
		children = undefined,
		onclick = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();

	function _onclick(ev: MouseEvent) {
		onclick?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		bond?.state.close();
	}
</script>

<List.Item
	{bond}
	preset={presetKey}
	class={[
		'border-border last:border-b-none hover:bg-foreground/5 active:bg-foreground/10 cursor-pointer border-b',
		'$preset',
		klass
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	tabIndex={0}
	onclick={_onclick}
	{...restProps}
>
	{@render children?.({ menu: bond })}
</List.Item>
