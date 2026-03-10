<script lang="ts">
	import { InputBond } from './bond.svelte';
	import type { InputUrlControlProps } from './types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		scheme = 'https://',
		placeholder = 'example.com',
		disabled = false,
		readonly = false,
		preset = 'input.url',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputUrlControlProps = $props();

	// Strip the scheme prefix when user types — we always prepend it
	const displayValue = $derived(
		value.startsWith(scheme)
			? value.slice(scheme.length)
			: value.startsWith('http://') || value.startsWith('https://')
				? value.replace(/^https?:\/\//, '')
				: value
	);

	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		const raw = input.value;
		// Normalise: prepend scheme unless user explicitly typed a different one
		value = raw === '' ? '' : raw.startsWith('http://') || raw.startsWith('https://') ? raw : scheme + raw;
		if (bond) bond.state.props.value = value;
		oninput?.(ev, { value });
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}
</script>

<span class="flex h-full w-full flex-1 items-center">
	<span class="text-muted-foreground select-none px-1 text-sm">{scheme}</span>
	<input
		type="url"
		value={displayValue}
		{placeholder}
		{disabled}
		{readonly}
		class={[
			'text-foreground h-full min-w-0 flex-1 bg-transparent py-0 pr-2 leading-1 outline-none',
			'$preset',
			klass
		].filter(Boolean).join(' ')}
		oninput={handleInput}
		onchange={handleChange}
		{...restProps}
	/>
</span>
