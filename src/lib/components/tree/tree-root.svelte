<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { TreeBond, TreeBondState, type TreeBondProps } from './bond.svelte';
	import type { TreeRootProps } from './types';

	let {
		open = $bindable(false),
		disabled = false,
		class: klass = '',
		children = undefined,
		factory = _factory,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: TreeRootProps<E, B> = $props();

	const bondProps = defineState<TreeBondProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					open = v;
				}
			),
			defineProperty('rest', () => restProps)
		],
		() => ({ disabled })
	);

	const bond = factory(bondProps).share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const bondState = new TreeBondState(() => props);
		return new TreeBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{bond}
	preset="tree"
	class={['border-border flex flex-col', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
