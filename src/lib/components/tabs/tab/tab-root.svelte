<script lang="ts">
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { TabBond, TabBondState, type TabBondProps } from './bond.svelte';
	import { TabsBond } from '../bond.svelte';
	import { untrack, type Snippet } from 'svelte';

	const tabsBond = TabsBond.get();

	if (!tabsBond) {
		throw new Error('TabRoot must be used within a Tabs component.');
	}

	let {
		value = nanoid(),
		disabled = false,
		data = undefined as unknown,
		factory = _factory,
		children,
	}: {
		value?: string;
		disabled?: boolean;
		data?: unknown;
		factory?: typeof _factory;
		children?: Snippet<[{ tab: TabBond }]>;
	} = $props();

	const bondProps = defineState<TabBondProps<unknown>>([
		defineProperty('value', () => value),
		defineProperty('disabled', () => disabled),
		defineProperty('data', () => data)
	]);

	const bond = untrack(() => factory(bondProps)).share();

	const unmount = bond.mount();
	$effect.pre(() => unmount);

	function _factory(props: typeof bondProps) {
		const bondState = new TabBondState(() => props);

		return new TabBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ tab: bond })}