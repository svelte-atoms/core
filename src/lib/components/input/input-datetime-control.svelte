<script lang="ts">
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
		preset = 'input.datetime',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputDateTimeControlProps = $props();

	function handleChange(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		value = input.value;
		date = input.valueAsDate;
		if (bond) bond.state.props.value = value;
		onchange?.(ev, { value, date });
	}

	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		value = input.value;
		date = input.valueAsDate;
		if (bond) bond.state.props.value = value;
		oninput?.(ev, { value, date });
	}
</script>

<input
	type="datetime-local"
	bind:value
	class={[
		'text-foreground h-full w-full flex-1 bg-transparent px-2 leading-1 outline-none',
		'[color-scheme:light] dark:[color-scheme:dark]',
		'$preset',
		klass
	].filter(Boolean).join(' ')}
	{min}
	{max}
	{step}
	{disabled}
	{readonly}
	onchange={handleChange}
	oninput={handleInput}
	{...restProps}
/>
