<script lang="ts">
	import { Input } from '../input';
	import { getDurationContext } from './context';
	import type { DurationFromProps } from './types';

	let {
		value = $bindable(''),
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
	$effect.pre(() => {
		if (value !== ctx.from()) ctx.setFrom(value);
	});

	// Sync context changes back out (e.g. if Root's bind:from changes externally)
	$effect.pre(() => {
		const ctxVal = ctx.from();
		if (ctxVal !== value) value = ctxVal;
	});

	function handleChange(ev: Event) {
		const v = (ev.currentTarget as HTMLInputElement).value;
		value = v;
		ctx.setFrom(v);
	}
</script>

<Input.Root class={klass} {...restProps}>
	<Input.Control
		type="datetime-local"
		value={ctx.from()}
		{disabled}
		{readonly}
		{min}
		{max}
		{placeholder}
		onchange={handleChange}
		class=""
	/>
</Input.Root>
