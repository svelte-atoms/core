<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { AccordionBond, AccordionState, type AccordionStateProps } from './bond.svelte';
	import type { AccordionRootProps } from './types';

	let {
		value = $bindable(undefined),
		values = $bindable([]),
		data = $bindable([]),
		class: klass = '',
		multiple = false,
		collapsible = false,
		disabled = false,
		children = undefined,
		factory = _factory,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AccordionRootProps<E, B> = $props();

	const bondProps = defineState<AccordionStateProps>([
		defineProperty(
			'values',
			() => (multiple ? values : ([value].filter(Boolean) as string[])),
			(v) => {
				values = v;
				value = values[0];
			}
		)
	]);
	const bond = factory(bondProps).share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps = bondProps) {
		const bondState = new AccordionState(() => props);

		return new AccordionBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	preset="accordion"
	class={['bg-card border-border flex list-none flex-col', '$preset', klass]}
	{bond}
	{...rootProps}
>
	{@render children?.({ accordion: bond })}
</HtmlAtom>
