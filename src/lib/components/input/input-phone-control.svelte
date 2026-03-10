<script lang="ts">
	import { InputBond } from './bond.svelte';
	import type { InputPhoneControlProps } from './types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		countryCode = '+1',
		placeholder = '(555) 000-0000',
		disabled = false,
		readonly = false,
		preset = 'input.phone',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputPhoneControlProps = $props();

	// Strip leading country code if present for display
	const displayValue = $derived(
		value.startsWith(countryCode + ' ')
			? value.slice(countryCode.length + 1)
			: value.startsWith(countryCode)
				? value.slice(countryCode.length)
				: value
	);

	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		const raw = input.value.replace(/[^\d\s\-().+]/g, '');
		value = raw === '' ? '' : countryCode + ' ' + raw;
		if (bond) bond.state.props.value = value;
		oninput?.(ev, { value });
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}
</script>

<span class="flex h-full w-full flex-1 items-center">
	<span class="text-muted-foreground border-border select-none border-r px-2 text-sm">{countryCode}</span>
	<input
		type="tel"
		value={displayValue}
		{placeholder}
		{disabled}
		{readonly}
		class={[
			'text-foreground h-full min-w-0 flex-1 bg-transparent px-2 leading-1 outline-none',
			'$preset',
			klass
		].filter(Boolean).join(' ')}
		oninput={handleInput}
		onchange={handleChange}
		{...restProps}
	/>
</span>
