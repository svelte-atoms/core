<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { DialogDescriptionProps } from './types';
	import { DialogBond } from './bond.svelte';

	let {
		class: klass = '',
		as = 'p' as E,
		children = undefined,
		...restProps
	}: DialogDescriptionProps<E, B> = $props();

	const bond = DialogBond.get();

	const descriptionProps = $derived({
		...bond?.description().spread,
		...restProps
	});
</script>

<HtmlAtom
	{as}
	preset="dialog.description"
	class={['border-border', '$preset', klass]}
	{...descriptionProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
