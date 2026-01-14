<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
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

</script>

{#if activeTabContent && bond}
	{#key activeTabContent}
		<HtmlAtom
			{preset}
			{bond}
			class={[
				'tab-body border-border pointer-events-auto flex h-auto w-full min-w-full flex-1 flex-col',
				'$preset',
				contentKlass,
				klass
			]}
			{...allProps}
		>
			<!-- Render teleported tab content -->
			{@render activeTabContent.children({ tab: activeTab })}

			<!-- Optional custom content wrapper -->
			<!-- {@render children?.({ tabs: bond })} -->
		</HtmlAtom>
	{/key}
{/if}
