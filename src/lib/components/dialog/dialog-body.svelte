<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { DialogBodyProps } from './types';
	import { DialogBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let {
		class: klass,
		children = undefined,
		...restProps
	}: DialogBodyProps<E, B> = $props();

	const bond = DialogBond.get();

	const bodyProps = $derived({
		...bond?.body().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="dialog.body"
	class={['border-border px-4 py-2', '$preset', klass]}
	{...bodyProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
