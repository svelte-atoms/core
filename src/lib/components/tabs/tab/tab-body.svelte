<script module lang="ts">
	export type TabBodyProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ tab?: TabBond<unknown> }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { TabBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = TabBond.get();

	if (!bond) {
		throw new Error('TabBody must be used within a Tab');
	}

	const preset = getPreset('tab.body');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		children,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: TabBodyProps<E, B> = $props();

	let mounted = $state(false);

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});

	$effect(() => {
		mounted = true;
	});
</script>

<HtmlAtom
	class={[
		'tab-body pointer-events-auto flex h-auto w-full min-w-full flex-1 flex-col',
		toClassValue.apply(bond, [preset?.class, { bond: bond }]),
		toClassValue.apply(bond, [klass, { bond: bond }])
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{as}
	{base}
	{...bodyProps}
>
	{@render children?.({ tab: bond })}
</HtmlAtom>
