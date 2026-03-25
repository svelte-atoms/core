<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { InputBond } from './bond.svelte';
	import type { InputNumberControlProps } from './types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		number = $bindable(),
		min = undefined,
		max = undefined,
		step = 1,
		disabled = false,
		placeholder = undefined,
		preset = 'input.number',
		decrementContent = undefined,
		incrementContent = undefined,
		onchange = undefined,
		...restProps
	}: InputNumberControlProps & HTMLAttributes<HTMLDivElement> = $props();

	const canDecrement = $derived(!disabled && (min === undefined || number - step >= min));
	const canIncrement = $derived(!disabled && (max === undefined || number + step <= max));

	function decrement() {
		if (!canDecrement) return;
		number = parseFloat((number - step).toPrecision(10));
		onchange?.(undefined, { number });
		bond?.state?.props && (bond.state.props.value = number);
	}

	function increment() {
		if (!canIncrement) return;
		number = parseFloat((number + step).toPrecision(10));
		onchange?.(undefined, { number });
		bond?.state?.props && (bond.state.props.value = number);
	}

	function handleInput(ev: Event) {
		const input = ev.target as HTMLInputElement;
		const parsed = parseFloat(input.value);
		if (!isNaN(parsed)) {
			number = parsed;
			onchange?.(ev, { number });
			bond?.state?.props && (bond.state.props.value = number);
		}
	}
</script>

<!-- ─── Default part snippets ──────────────────────────────────────────── -->

{#snippet defaultDecrement({ decrement: dec, disabled: dis }: { decrement: () => void; disabled: boolean })}
	<button
		type="button"
		onclick={dec}
		disabled={dis}
		aria-label="Decrement"
		class="input-number-decrement text-foreground hover:bg-muted disabled:text-muted-foreground flex h-full w-8 shrink-0 cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed"
	>
		<svg viewBox="0 0 16 16" fill="none" class="h-3 w-3" aria-hidden="true">
			<path d="M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
		</svg>
	</button>
{/snippet}

{#snippet defaultIncrement({ increment: inc, disabled: dis }: { increment: () => void; disabled: boolean })}
	<button
		type="button"
		onclick={inc}
		disabled={dis}
		aria-label="Increment"
		class="input-number-increment text-foreground hover:bg-muted disabled:text-muted-foreground flex h-full w-8 shrink-0 cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed"
	>
		<svg viewBox="0 0 16 16" fill="none" class="h-3 w-3" aria-hidden="true">
			<path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
		</svg>
	</button>
{/snippet}

<!-- ─── Render ────────────────────────────────────────────────────────── -->

<HtmlAtom
	{preset}
	as="div"
	class={['input-number-root flex h-full w-full items-center', '$preset', klass]}
	{...restProps}
>
	{@render (decrementContent ?? defaultDecrement)({ decrement, disabled: !canDecrement })}

	<input
		type="number"
		bind:value={number}
		{min}
		{max}
		{step}
		{disabled}
		{placeholder}
		oninput={handleInput}
		class="input-number-field text-foreground placeholder:text-muted-foreground h-full w-full flex-1 bg-transparent text-center text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={number}
	/>

	{@render (incrementContent ?? defaultIncrement)({ increment, disabled: !canIncrement })}
</HtmlAtom>
