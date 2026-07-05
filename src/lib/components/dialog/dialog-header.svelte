<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import type { DialogHeaderProps } from './types';
	import { DialogBond } from './bond.svelte';

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DialogHeaderProps<E, B> = $props();

	const bond = DialogBond.get();

	const headerProps = $derived({
		...bond?.header().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="dialog.header"
	class={['border-border', 'flex w-full px-4 text-xl', '$preset', klass]}
	{...headerProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
