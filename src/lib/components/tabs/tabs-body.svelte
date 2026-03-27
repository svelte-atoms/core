<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { type Base } from '$svelte-atoms/core/components/atom';
	import { Stack } from '../stack';
	import { TabsBond } from './bond.svelte';
	import type { TabsBodyProps } from './types';

	const bond = TabsBond.get();

	if (!bond) {
		throw new Error('Tabs.Body must be used within a Tabs.Root component.');
	}

	let {
		class: klass = '',
		as = 'div' as E,
		children,
		preset = 'tabs.body' as const,
		...restProps
	}: TabsBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body().spread,
		...restProps
	});
</script>

<Stack.Root
	{bond}
	{preset}
	{as}
	class={['tabs-body border-border relative flex-1 flex flex-col', '$preset', klass]}
	{...bodyProps}
>
	{@render children?.({ tabs: bond })}
</Stack.Root>