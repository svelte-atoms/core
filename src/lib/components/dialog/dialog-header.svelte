<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { DialogHeaderProps } from './types';
	import { DialogBond } from './bond.svelte';

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DialogHeaderProps<E, B> = $props();

	const bond = DialogBond.get();

	const headerProps = $derived({
		...bond?.header({}),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="dialog.header"
	class={['border-border', 'flex w-full px-4 text-xl', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...headerProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
