<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { InputBond } from './bond.svelte';
	import type { InputTimeControlProps } from './types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		min = undefined,
		max = undefined,
		step = undefined,
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.time',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputTimeControlProps = $props();

	const preset = getPreset(presetKey as PresetModuleName)?.apply(bond, [bond]);

	function handleChange(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		value = input.value;
		if (bond) bond.state.props.value = value;
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
	type="time"
	bind:value
	class={cn(
		'text-foreground h-full w-full flex-1 bg-transparent px-2 leading-1 outline-none',
		'[color-scheme:light] dark:[color-scheme:dark]',
		preset?.class,
		toClassValue(klass, bond)
	)}
	{min}
	{max}
	{step}
	{disabled}
	{readonly}
	onchange={handleChange}
	oninput={handleInput}
	{...restProps}
/>
