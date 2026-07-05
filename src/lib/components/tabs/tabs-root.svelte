<script
	lang="ts"
	generics="D extends string, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { TabsBond, TabsBondState, type TabsBondProps } from './bond.svelte';
	import { defineProperty, defineState } from '$ixirjs/ui/utils';
	import { HtmlAtom as Atom, type Base } from '$ixirjs/ui/components/atom';
	import type { TabsRootProps } from './types';

	let {
		class: klass = '',
		value = $bindable(),
		children,
		onchange,
		preset = 'tabs' as const,
		...restProps
	}: TabsRootProps<D, E, B> = $props();

	let revision = $state(0);

	const bondProps = defineState<TabsBondProps>([
		defineProperty(
			'value',
			() => {
				void revision; // Ensure reactivity in uncontrolled mode
				return value;
			},
			(v) => {
				value = v as D | undefined;
				revision++; // Trigger reactivity in uncontrolled mode
			}
		),
		defineProperty('rest', () => restProps)
	]);

	function _factory(props: typeof bondProps = bondProps) {
		const tabsState = new TabsBondState(() => props);
		return new TabsBond(tabsState);
	}
	
	const bond = _factory(bondProps).share();

	const rootProps = $derived({
		...bond?.root().spread,
		...restProps
	});

	$effect.pre(() => {
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
