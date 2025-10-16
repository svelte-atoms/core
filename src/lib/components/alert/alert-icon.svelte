<script module lang="ts">
	export type AlertIconProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ alert: AlertBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { AlertBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { type HtmlAtomProps, type Base, HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	const bond = AlertBond.get();

	const preset = getPreset('alert.icon');

	let {
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AlertIconProps<E, B> = $props();

	const iconProps = $derived({
		...bond?.icon(),
		...restProps
	});
</script>

<Icon
	class={[
		'alert-icon inline-flex aspect-square h-5 items-center justify-center rounded-full text-sm font-medium',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...iconProps}
>
	{#if base}
		<HtmlAtom {base} />
	{:else}
		{@render children?.({ alert: bond! })}
	{/if}
</Icon>
