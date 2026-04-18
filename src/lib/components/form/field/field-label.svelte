<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { FieldBond } from './bond.svelte';
	import type { FieldLabelProps } from '../types';

	const bond = FieldBond.get();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: FieldLabelProps<E, B> = $props();

	const labelProps = $derived({
		...bond?.label(),
		...restProps
	});
</script>

<HtmlAtom preset="field.label" class={['flex flex-col', '$preset', klass]} {...labelProps}>
	{@render children?.({ field: bond })}
</HtmlAtom>
