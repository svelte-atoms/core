<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond } from '$svelte-atoms/core/shared/bind-bond.svelte';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { TreeBond, TreeBondState, type TreeBondProps } from './bond.svelte';
	import type { TreeRootProps } from './types';

	let {
		open = $bindable(false),
		disabled = false,
		class: klass = '',
		preset = undefined,
		children = undefined,
		factory = defaultFactory,
		...restProps
	}: TreeRootProps<E, B> = $props();

	const binding = bindBond<TreeBond>(
		(props) => factory(props),
		{
			open: [() => open, (v) => { open = v; }],
			disabled: () => disabled,
			rest: () => restProps
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();

	function defaultFactory(props: TreeBondProps) {
		const bondState = new TreeBondState(props);
		return new TreeBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={['flex flex-col', '$preset', klass]}
	{...binding.props}
	{...restProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
