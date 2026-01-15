<script
	lang="ts"
	generics="D extends string, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { TabsBond, TabsBondState, type TabsBondProps } from './bond.svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom as Atom, type Base } from '$svelte-atoms/core/components/atom';
	import type { TabsRootProps } from './types';

	let {
		class: klass = '',
		value = $bindable(undefined),
		children,
		onchange,
		preset = 'tabs' as const,
		...restProps
	}: TabsRootProps<D, E, B> = $props();

	const bondProps = defineState<TabsBondProps>([
		defineProperty(
			'value',
			() => value,
			(v) => (value = v)
		)
	]);

	function _factory(props: typeof bondProps = bondProps) {
		const tabsState = new TabsBondState(() => props);
		return new TabsBond(tabsState);
	}
	
	const bond = _factory(bondProps).share();

	const rootProps = $derived({
		...bond?.root(),
		...restProps
	});

	$effect(() => {
		onchange?.(value as D);
	});

	export function getBond() {
		return bond;
	}
</script>

<Atom
	{bond}
	preset="tabs"
	class={['border-border flex w-full flex-1 flex-col', '$preset', klass]}
	{...rootProps}
>
	{@render children?.({ tabs: bond })}
</Atom>
