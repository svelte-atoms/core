<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DialogBond } from './bond.svelte';
	import type { DialogFooterProps } from './types';

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DialogFooterProps<E, B> = $props();

	const bond = DialogBond.get();

	const footerProps = $derived({
		...bond?.footer().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="dialog.footer"
	class={['border-border', 'flex px-4', '$preset', klass]}
	{...footerProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
