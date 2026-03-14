<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { type Base } from '$svelte-atoms/core/components/atom';
	import { TabsBond } from './bond.svelte';
	import type { TabsContentProps } from './types';

	const bond = TabsBond.get();

	let {
		preset = 'tabs.content' as const,
		...restProps
	}: TabsContentProps<E, B> = $props();
	
	const activeTabBody = $derived(bond?.state?.activeTabContent);

	const content = $derived(activeTabBody && bond ? item : undefined)
	const contentProps = $derived({
		preset,
		...restProps
	});
</script>

{#snippet item()}
	<!-- Render teleported tab content -->
	{@render activeTabBody?.(contentProps)}
{/snippet}

{@render content?.()}


