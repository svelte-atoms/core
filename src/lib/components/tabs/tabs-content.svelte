<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { Stack } from '../stack';
	import { TabsBond } from './bond.svelte';
	import type { TabsContentProps } from './types';

	const bond = TabsBond.get();

	let {
		class: klass = '',
		children = undefined,
		preset = 'tabs.content' as const,
		...restProps
	}: TabsContentProps<E, B> = $props();
	
	const activeTab = $derived(bond?.state?.selectedItem);
	const activeTabContent = $derived(bond?.state?.activeTabContent);

	const contentKlass = $derived(activeTabContent?.props.class);
	
	const allProps = $derived.by(() => {
		if (!activeTabContent?.props) return restProps;
		const { class: _, ...propsWithoutClass } = activeTabContent.props;
		return {
			...propsWithoutClass,
			...restProps
		};
	});

	const content = $derived(activeTabContent && bond ? item : undefined)
</script>
{#snippet item()}
	<HtmlAtom
			{preset}
			{bond}
			class={[
				'tab-body border-border pointer-events-auto flex h-auto w-full min-w-full flex-1 flex-col',
				'$preset',
				contentKlass,
				klass
			]}
			
		>
			<!-- Render teleported tab content -->
			{@render activeTabContent?.children?.({ tab: activeTab })}

			<!-- Optional custom content wrapper -->
			<!-- {@render children?.({ tabs: bond })} -->
		</HtmlAtom>
{/snippet}

<Stack.Root
	{bond}
	{preset}
	class={['tabs-body border-border relative flex-1', '$preset', klass]}
	{...{...allProps}}
>
	{@render content?.()}
</Stack.Root>


