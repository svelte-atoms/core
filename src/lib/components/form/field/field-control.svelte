<script module lang="ts">
	export type FieldInputProps<B extends Base<{ value?: unknown }>> = Override<
		HtmlAtomProps<any, B>,
		{
			value?: any;
			valueAsDate?: Date;
			valueAsNumber?: number;
			checked?: boolean;
			files?: File[] | null;
			oninput?: (ev: CustomEvent, detail?: { value: any }) => void;
			children?: Snippet;
		}
	>;
</script>

<script lang="ts" generics="B extends Base<{value: unknown}>">
	import type { Snippet } from 'svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import type { Override } from '$svelte-atoms/core/types';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';
	import { FieldBond } from './bond.svelte';

	const bond = FieldBond.get();
	const name = $derived(bond?.state?.props?.name);

	const preset = getPreset('field.control');

	let {
		class: klass = '',
		base = preset?.base as B,
		value = $bindable(),
		checked = $bindable(),
		children = undefined,
		oninput = undefined,
		...restProps
	}: FieldInputProps<B> = $props();

	const controlProps = $derived({ ...bond.control(), ...restProps });

	function handleInput(ev: CustomEvent, detail: any) {
		oninput?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		bond.state.props.value = value = detail?.value;
	}
</script>

<HtmlAtom
	class={[
		'flex items-center',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	{base}
	{value}
	{checked}
	{name}
	oninput={handleInput}
	{...controlProps}
>
	{@render children?.()}
</HtmlAtom>
