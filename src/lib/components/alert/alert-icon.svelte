<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Icon } from '$ixirjs/ui/components/icon';
	import { type Base, HtmlAtom } from '$ixirjs/ui/components/atom';
	import { AlertBond } from './bond.svelte';
	import type { AlertIconProps } from './types';

	const bond = AlertBond.get();

	let {
		class: klass = '',
		base = Icon,
		preset = 'alert.icon',
		children = undefined,
		...restProps
	}: AlertIconProps<E, B> = $props();

	const iconProps = $derived({
		...bond?.icon(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	{base}
	{preset}
	class={[
		'alert-icon border-border inline-flex aspect-square h-5 items-center justify-center rounded-full text-sm font-medium',
		'$preset',
		klass
	]}
	{...iconProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
