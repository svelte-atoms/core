<script lang="ts" generics="B extends Base<{value: unknown}>">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { FieldBond } from './bond.svelte';
	import type { FieldControlProps } from '../types';

	const bond = FieldBond.get();
	const name = $derived(bond?.state?.props?.name);

	let {
		class: klass = '',
		value = $bindable(),
		checked = $bindable(),
		number = $bindable(),
		date = $bindable(),
		files = $bindable(),
		children = undefined,
		oninput = undefined,
		...restProps
	}: FieldControlProps<B> = $props();
	const controlProps = $derived({ ...bond.control(), ...restProps });

	function handleInput(ev: CustomEvent, detail: any) {
		oninput?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		bond.state.props.value = value = detail?.value;
		bond.state.props.files = files = detail?.files ?? [];
		bond.state.props.date = date = detail?.date ?? null;
		bond.state.props.number = number = detail?.number ?? null;
		bond.state.props.checked = checked = detail?.checked ?? false;
	}
</script>

<HtmlAtom
	{bond}
	{value}
	{checked}
	{name}
	preset="field.control"
	class={['flex items-center', '$preset', klass]}
	oninput={handleInput}
	{...controlProps}
>
	{@render children?.()}
</HtmlAtom>
