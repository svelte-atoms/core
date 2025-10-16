<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { List } from '../list';
	import { PopoverBond } from '$svelte-atoms/core/components/popover/bond.svelte';
	import type { Base } from '$svelte-atoms/core/components/atom';

	const bond = PopoverBond.get();

	const preset = getPreset('dropdown.item');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
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
	class={[
		'border-border last:border-b-none hover:bg-foreground/5 active:bg-foreground/10 cursor-pointer border-b',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{as}
	{base}
	onclick={_onclick}
	{...restProps}
>
	{@render children?.({ menu: bond })}
</List.Item>
