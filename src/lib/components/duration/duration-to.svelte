<script lang="ts">
	import { getDurationContext } from './context';
	import type { DurationToProps } from './types';

	let {
		value = $bindable(''),
		label = 'To',
		placeholder = '',
		disabled = false,
		readonly = false,
		min = undefined,
		max = undefined,
		class: klass = '',
		...restProps
	}: DurationToProps = $props();

	const ctx = getDurationContext();

	$effect(() => {
		if (value !== ctx.to()) ctx.setTo(value);
	});

	$effect(() => {
		const ctxVal = ctx.to();
		if (ctxVal !== value) value = ctxVal;
	});

	function handleChange(ev: Event) {
		const v = (ev.currentTarget as HTMLInputElement).value;
		value = v;
		ctx.setTo(v);
	}
</script>

<div class={klass} {...restProps}>
	{#if label}
		<label class="mb-1 block text-sm font-medium text-foreground">{label}</label>
	{/if}
	<input
		type="datetime-local"
		value={ctx.to()}
		{disabled}
		{readonly}
		{min}
		{max}
		{placeholder}
		onchange={handleChange}
		class="w-full rounded border border-border bg-background px-2 py-1 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
	/>
</div>
