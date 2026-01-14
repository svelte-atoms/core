<script
	lang="ts"
	generics="D, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { nanoid } from 'nanoid';
	import { animate as motion } from 'motion';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { TabBond, TabBondState, type TabBondProps } from './bond.svelte';
	import { TabsBond } from '../bond.svelte';
	import { type Base } from '$svelte-atoms/core/components/atom';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';

	const tabsBond = TabsBond.get();

	if(!tabsBond) {
		throw new Error('TabRoot must be used within a Tabs component.');
	}


	let {
		class: klass = '',
		value = nanoid(),
		disabled = false,
		data = undefined,
		factory = _factory,
		children,
	} = $props();

	const bondProps = defineState<TabBondProps<D>>([
		defineProperty('value', () => value),
		defineProperty('disabled', () => disabled),
		defineProperty('data', () => data)
	]);

	const bond = factory(bondProps).share();

	const unmount = bond.mount();
	$effect(() => unmount);

	function _factory(props: typeof bondProps) {
		const bondState = new TabBondState(() => props);

		return new TabBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ tab: bond })}