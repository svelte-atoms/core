<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { FieldBond } from './bond.svelte';
	import type { FieldTextProps } from '../types';

	const bond = FieldBond.get();

	let {
		class: klass = '',
		as = 'p' as E,
		children = undefined,
		...restProps
	}: FieldTextProps<E, B> = $props();
</script>

<HtmlAtom
	{as}
	preset="field.helper-text"
	class={['text-muted-foreground mt-1 text-xs', '$preset', klass]}
	{...restProps}
>
	{@render children?.({ field: bond })}
</HtmlAtom>