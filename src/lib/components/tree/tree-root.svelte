<script module lang="ts">
	import type { Factory } from '$svelte-atoms/core/types';

	export type TreeRootProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		class?: string;
		open?: boolean;
		disabled?: boolean;
		factory?: Factory<TreeBond>;
		children?: Snippet<[{ tree: TreeBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { TreeBond, TreeBondState, type TreeBondProps } from './bond.svelte';
	import { defineProperty, defineState, toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	const preset = getPreset('tree');

	let {
		open = $bindable(false),
		disabled = false,
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
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
			)
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
	class={[
		'flex flex-col',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
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
