<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import type { CollapsibleHeaderProps } from './types';
	import { CollapsibleBond } from './bond.svelte';

	const bond = CollapsibleBond.get();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: CollapsibleHeaderProps<E, B> = $props();

	const collapsibleProps = $derived({
		...bond?.header().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="collapsible.header"
	class={['border-border flex cursor-pointer items-center gap-2', '$preset', klass]}
	{...collapsibleProps}
>
	{@render children?.({ collapsible: bond })}
</HtmlAtom>
