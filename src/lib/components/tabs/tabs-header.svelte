<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom as Atom, type Base } from '$svelte-atoms/core/components/atom';
	import { TabsBond } from './bond.svelte';
	import type { TabsHeaderProps } from './types';

	const bond = TabsBond.get();

	if(!bond) {
		throw new Error('TabsHeader must be used within a Tabs component');
	}

	let {
		class: klass = '',
		children,
		preset = 'tabs.header' as const,
		...restProps
	}: TabsHeaderProps<E, B> = $props();

	const headerProps = $derived({
		...bond?.header(),
		...restProps
	});
</script>

<Atom
	{bond}
	{preset}
	class={['relative flex min-w-full border-border', '$preset', klass]}
	{...headerProps}
>
	{@render children?.({ tabs: bond })}
</Atom>
