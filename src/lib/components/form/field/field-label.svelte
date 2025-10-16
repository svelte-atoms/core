<script module lang="ts">
	export type FieldLabelProps<
		E extends keyof HTMLElementTagNameMap = 'label',
		B extends Base = Base
	> = Omit<LabelProps<E, B>, 'for'>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base">
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { Label } from '$svelte-atoms/core/components/label';
	import type { LabelProps } from '$svelte-atoms/core/components/label/label.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { FieldBond } from './bond.svelte';

	const bond = FieldBond.get();

	const preset = getPreset('field.label');

	let {
		class: klass = '',
		as = preset?.as ?? ('label' as E),
		base = preset?.base as B,
		children = undefined,
		...restProps
	}: FieldLabelProps = $props();

	const labelProps = $derived({
		...bond?.label(),
		...restProps
	});
</script>

<Label
	class={[
		'flex flex-col',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	{as}
	{base}
	{...labelProps}
>
	{@render children?.()}
</Label>
