<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { List } from '../list';
	import { Content } from '$svelte-atoms/core/components/popover/atoms';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { PopoverBond } from '$svelte-atoms/core/components/popover';

	const bond = PopoverBond.get();
	const preset = getPreset('menu.body');

	let {
		class: klass = '',
		as = preset?.as ?? 'ul',
		base = preset?.base ?? List.Root,
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
	class={[
		'bg-background overflow-hidden p-0',
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
	{...restProps}
>
	{@render children?.()}
</Content>
