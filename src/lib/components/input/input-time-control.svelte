<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
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
		preset = 'input.time',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputTimeControlProps = $props();

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
	class={[
		'text-foreground h-full w-full flex-1 bg-transparent px-2 leading-1 outline-none',
		'[color-scheme:dark] dark:[color-scheme:dark]',
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
