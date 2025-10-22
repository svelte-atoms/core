<script module lang="ts">
	export type CollapsibleRootProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ collapsible: CollapsibleBond }]>;
		}
	> & {
		open?: boolean;
		value?: string;
		data?: any;
		disabled?: boolean;
		factory?: Factory<CollapsibleBond>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { nanoid } from 'nanoid';
	import type { Factory, Override } from '$svelte-atoms/core/types';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { CollapsibleBond, CollapsibleState, type CollapsibleStateProps } from './bond.svelte';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	let {
		open = $bindable(false),
		class: klass = '',
		value = nanoid(),
		data = undefined,
		disabled = false,
		as = 'div' as E,
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: CollapsibleRootProps<E, B> = $props();

	const bondProps = defineState<CollapsibleStateProps>([
		defineProperty(
			'open',
			() => open,
			(v) => (open = v)
		),
		defineProperty('data', () => data),
		defineProperty('disabled', () => disabled),
		defineProperty('value', () => value)
	]);

	const bond = _factory(bondProps).share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const bondState = new CollapsibleState(() => props);
		return new CollapsibleBond(bondState).share();
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	preset="collapsible"
	class={['flex w-full flex-col overflow-hidden', '$preset', klass]}
	{bond}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{as}
	{...rootProps}
>
	{@render children?.({ collapsible: bond })}
</HtmlAtom>
