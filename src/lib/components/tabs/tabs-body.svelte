<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { TabsBond } from './bond.svelte';
	import { Stack } from '../stack';

	const bond = TabsBond.get();

	let {
		class: klass = '',
		as = 'div' as E,
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
	{bond}
	preset="tabs.body"
	class={['tabs-body relative flex-1', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{as}
	{...bodyProps}
>
	{@render children?.({ tabs: bond })}
</Stack.Root>
