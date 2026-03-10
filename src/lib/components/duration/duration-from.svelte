<script lang="ts">
	import { getDurationContext } from './context';
	import type { DurationFromProps } from './types';

	let {
		value = $bindable(''),
		label = 'From',
		placeholder = '',
		disabled = false,
		readonly = false,
		min = undefined,
		max = undefined,
		class: klass = '',
		...restProps
	}: DurationFromProps = $props();

	const ctx = getDurationContext();

	// Sync inbound bind:value with context
	$effect(() => {
		if (value !== ctx.from()) ctx.setFrom(value);
	});

	// Sync context changes back out (e.g. if Root's bind:from changes externally)
	$effect(() => {
		const ctxVal = ctx.from();
		if (ctxVal !== value) value = ctxVal;
	});

	function handleChange(ev: Event) {
		const v = (ev.currentTarget as HTMLInputElement).value;
		value = v;
		ctx.setFrom(v);
	}
</script>

<div class={klass} {...restProps}>
	{#if label}
		<label class="mb-1 block text-sm font-medium text-foreground">{label}</label>
	{/if}
	<input
		type="datetime-local"
		value={ctx.from()}
		{disabled}
		{readonly}
		{min}
		{max}
		{placeholder}
		onchange={handleChange}
		class="w-full rounded border border-border bg-background px-2 py-1 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
	/>
</div>
