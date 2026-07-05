<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { FieldBond } from './bond.svelte';
	import type { FieldLabelProps } from '../types';

	const bond = FieldBond.get();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: FieldLabelProps<E, B> = $props();

	const labelProps = $derived({
		...(bond?.label().spread ?? {}),
		...restProps
	});
</script>

<HtmlAtom preset="field.label" class={['flex', '$preset', klass]} {...labelProps}>
	{@render children?.({ field: bond })}
</HtmlAtom>
