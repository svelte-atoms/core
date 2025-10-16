<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Stack } from '../stack';
	import { TabsBond } from './bond.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$lib/utils';

	const bond = TabsBond.get();
	const preset = getPreset('tabs.body');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		children,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});
</script>

<Stack.Root
	class={[
		'tabs-body relative flex-1',
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
	{...bodyProps}
>
	{@render children?.({ tabs: bond })}
</Stack.Root>
