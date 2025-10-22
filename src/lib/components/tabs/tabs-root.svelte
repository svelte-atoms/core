<script
	lang="ts"
	generics="D extends string, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { TabsBond, TabsBondState, type TabsBondProps } from './bond.svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let {
		class: klass = '',
		value = $bindable(undefined),
		factory = _factory,
		children,
		onchange,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();

	const bondProps = defineState<TabsBondProps>([
		defineProperty(
			'value',
			() => value,
			(v) => (value = v)
		)
	]);
	const bond = factory(bondProps).share() as TabsBond<D>;

	const rootProps = $derived({
		...bond?.root(),
		...restProps
	});

	$effect(() => {
		onchange?.({ tabs: bond, value });
	});

	function _factory(props: typeof bondProps) {
		const tabsState = new TabsBondState(() => props);

		return new TabsBond(tabsState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{bond}
	preset="tabs"
	class={['flex w-full flex-1 flex-col gap-2', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.({ tabs: bond })}
</HtmlAtom>
