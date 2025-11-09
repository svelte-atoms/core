<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base">
	import { Label } from '$svelte-atoms/core/components/label';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { FieldBond } from './bond.svelte';
	import type { FieldLabelProps } from '../types';

	const bond = FieldBond.get();

	let {
		class: klass = '',
		as = 'label' as E,
		children = undefined,
		...restProps
	}: FieldLabelProps = $props();

	const labelProps = $derived({
		...bond?.label(),
		...restProps
	});
</script>

<Label {as} {bond} preset="field.label" class={['flex flex-col', '$preset', klass]} {...labelProps}>
	{@render children?.()}
</Label>
