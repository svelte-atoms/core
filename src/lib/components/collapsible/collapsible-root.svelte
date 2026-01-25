<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CollapsibleBond, CollapsibleState, type CollapsibleStateProps } from './bond.svelte';
	import type { CollapsibleRootProps } from './types';

	let {
		open = $bindable(false),
		class: klass = '',
		value = nanoid(),
		data = undefined,
		disabled = false,
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
		defineProperty('value', () => value),
		defineProperty('rest', () => restProps)
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
	{bond}
	preset="collapsible"
	class={['border-border flex w-full flex-col overflow-hidden', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.({ collapsible: bond })}
</HtmlAtom>
