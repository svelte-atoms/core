<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { Factory } from '$svelte-atoms/core/types';

	export type SlideoverRootProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ sidebar?: SidebarBond }]>;
		}
	> & {
		open?: boolean;
		disabled?: boolean;
		factory?: Factory<SidebarBond>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { SidebarBond, SidebarBondState, type SidebarBondProps } from './bond.svelte';
	import { toClassValue, defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { Override } from '$svelte-atoms/core/types';

	const preset = getPreset('sidebar');

	let {
		open = $bindable(false),
		class: klass = '',
		disabled = false,
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: SlideoverRootProps<E, B> = $props();

	const bondProps = defineState<SidebarBondProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					open = v;
				}
			),
			defineProperty('disabled', () => disabled)
		],
		() => ({})
	);

	const bond = factory(bondProps).share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const bondState = new SidebarBondState(() => props);
		const bond = new SidebarBond(bondState);

		return bond;
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'flex min-h-full w-full flex-1 flex-nowrap',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.({ sidebar: bond })}
</HtmlAtom>
