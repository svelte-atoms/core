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
		base= Stack.Item,
		children,
		preset = 'tab.body' as const,
		...restProps
	}: TabBodyProps<E, B> = $props();

	const contentProps = $derived({
		class: klass,
		preset,
		base,
		...restProps
	});

	// Register content snippet with props and children with tabs on mount
	$effect(() => {
		if (tabBond && tabsBond && children) {
			const id = tabBond.state.props.value;
			tabsBond.state.registerTabContent(id, contentProps, children);

			return () => {
				tabsBond.state.unregisterTabContent(id);
			};
		}
	});
</script>

<!-- Content is teleported to Tabs.Content, so we don't render anything here -->
