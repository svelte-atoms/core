<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { AlertBond } from './bond.svelte';
	import type { AlertActionsProps } from './types';

	type Element = HTMLElementTagNameMap[E];

	const bond = AlertBond.get();

	let {
		class: klass = '',
		preset = 'alert.actions',
		children = undefined,
		...restProps
	}: AlertActionsProps<E, B> & HTMLAttributes<Element> = $props();

	const actionsProps = $derived({
		...bond?.actions(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	{preset}
	class={['alert-actions border-border mt-3 flex items-center gap-2', '$preset', klass]}
	{...actionsProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
