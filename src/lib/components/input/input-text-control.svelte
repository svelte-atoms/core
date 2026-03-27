<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { resolvePreset } from '$svelte-atoms/core/components/atom';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { InputBond } from './bond.svelte';
	import type { InputTextControlProps } from './types';
	import { untrack } from 'svelte';

	const bond = InputBond.get();

	let {
		value = $bindable(),
		type = 'text',
		class: klass = '',
		placeholder = '',
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.text',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputTextControlProps = $props();

	const preset = resolvePreset(getPreset(untrack(() => presetKey) as PresetModuleName)?.apply(bond, [bond]));

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}

	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		value = input.value;
		if (bond) bond.state.props.value = value;
		oninput?.(ev, { value });
	}
</script>

<input
	bind:value={
		() => value,
		(v) => {
			value = v;
			if (bond) bond.state.props.value = v;
		}
	}
	type={type}
	{placeholder}
	{disabled}
	{readonly}
	class={cn(
		'text-foreground placeholder:text-muted-foreground h-full w-full flex-1 bg-transparent px-2 leading-1 outline-none',
		preset?.class,
		toClassValue(klass, bond)
	)}
	onchange={handleChange}
	oninput={handleInput}
	{...restProps}
/>
