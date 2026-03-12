<script lang="ts">
	import { Input } from '../input';
	import { getDurationContext } from './context';
	import type { DurationToProps } from './types';

	let {
		value = $bindable(''),
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

<Input.Root class={klass} {...restProps}>
	<Input.Control
		type="datetime-local"
		value={ctx.to()}
		{disabled}
		{readonly}
		{min}
		{max}
		{placeholder}
		onchange={handleChange}
		class=""
	/>
</Input.Root>
