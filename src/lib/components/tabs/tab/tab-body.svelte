<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { type Base } from '$svelte-atoms/core/components/atom';
	import type { TabBodyProps } from '../types';
	import { TabBond } from './bond.svelte';
	import { TabsBond } from '../bond.svelte';
	import { Stack } from '../../stack';

	const tabBond = TabBond.get();
	const tabsBond = TabsBond.get();

	if (!tabBond) {
		throw new Error('TabBody must be used within a Tab');
	}

	let {
		class: klass = '',
		children,
		preset = 'tab.body' as const,
		...restProps
	}: TabBodyProps<E, B> = $props();

	const contentProps = $derived({
		preset,
		...restProps
	});

	// Register content snippet with props and children with tabs on mount
	$effect.pre(() => {
		if (tabBond && tabsBond && children) {
			const id = tabBond.state.props.value;
			tabsBond.state.registerTabContent(id, body);

			return () => {
				tabsBond.state.unregisterTabContent(id);
			};
		}
	});
</script>

{#snippet body({class: klass, ...restProps}: Record<string, unknown> = {})}
	<Stack.Item class={['tab-body border-border pointer-events-auto flex h-auto w-full min-w-full flex-1 flex-col', '$preset', klass]} {...contentProps} {...restProps}>
		{@render children?.({ ...(tabBond ? { tab: tabBond } : {}), ...(tabsBond ? { tabs: tabsBond } : {}) })}
	</Stack.Item>
{/snippet}

<!-- Content is teleported to Tabs.Content, so we don't render anything here -->
