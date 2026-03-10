<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { InputBond } from './bond.svelte';
	import type { InputDateTimeControlProps } from './types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		date = $bindable<Date | null>(null),
		min = undefined,
		max = undefined,
		step = undefined,
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.datetime',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputDateTimeControlProps = $props();

	const preset = getPreset(presetKey as PresetModuleName)?.apply(bond, [bond]);

	function parseDate(val: string): Date | null {
		if (!val) return null;
		const d = new Date(val);
		return isNaN(d.getTime()) ? null : d;
	}

	function handleChange(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		value = input.value;
		date = parseDate(value);
		if (bond) bond.state.props.value = value;
		onchange?.(ev, { value, date });
	}

	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		value = input.value;
		date = parseDate(value);
		if (bond) bond.state.props.value = value;
		oninput?.(ev, { value, date });
	}
</script>

<input
	type="datetime-local"
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
