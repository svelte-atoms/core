<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { FieldBond } from './bond.svelte';
	import type { FieldLabelProps } from '../types';

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: FieldLabelProps<E, B> = $props();

	const part = usePart(FieldBond, 'label', () => restProps, {
		message: '<Field.Label /> must be used within a <Field.Root />',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom {bond} class={['flex', '$preset', klass]} {...part.props}>
	{@render children?.({ field: bond })}
</HtmlAtom>
