<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { SliderProps } from './types';

	let {
		class: klass = '',
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		id,
		name,
		orientation = 'horizontal',
		preset = 'slider',
		thumbContent = undefined,
		trackContent = undefined,
		onchange = undefined,
		oninput = undefined,
		children = undefined,
		...restProps
	}: SliderProps & HTMLAttributes<HTMLDivElement> = $props();

	const isVertical = $derived(orientation === 'vertical');
	const percent = $derived(((value - min) / (max - min)) * 100);

	function handleInput(ev: Event) {
		const input = ev.target as HTMLInputElement;
		value = Number(input.value);
		oninput?.(ev, { value });
	}

	function handleChange(ev: Event) {
		const input = ev.target as HTMLInputElement;
		value = Number(input.value);
		onchange?.(ev, { value });
	}
</script>

<HtmlAtom
	{preset}
	as="div"
	class={[
		'slider-root relative flex items-center',
		isVertical ? 'h-full w-6 flex-col' : 'h-6 w-full flex-row',
		disabled && 'cursor-not-allowed opacity-50',
		'$preset',
		klass
	]}
	aria-orientation={orientation}
	{...restProps}
>
	<!-- Track -->
	{#if trackContent}
		<HtmlAtom
			preset="slider.track"
			as="div"
			class={[
				'slider-track relative overflow-hidden rounded-full',
				isVertical ? 'h-full w-2' : 'h-2 w-full',
				'$preset'
			]}
			base={trackContent}
		/>
	{:else}
		<HtmlAtom
			preset="slider.track"
			as="div"
			class={[
				'slider-track bg-input border-border relative overflow-hidden rounded-full border',
				isVertical ? 'h-full w-2' : 'h-2 w-full',
				'$preset'
			]}
		>
			<!-- Fill -->
			<HtmlAtom
				preset="slider.fill"
				as="div"
				class={[
					'slider-fill bg-foreground absolute rounded-full',
					isVertical ? 'bottom-0 left-0 w-full' : 'left-0 top-0 h-full',
					'$preset'
				]}
				style={isVertical ? `height: ${percent}%` : `width: ${percent}%`}
			/>
		</HtmlAtom>
	{/if}

	<!-- Native range input (invisible, positioned over track for a11y) -->
	<input
		{id}
		{name}
		{min}
		{max}
		{step}
		{disabled}
		type="range"
		bind:value
		oninput={handleInput}
		onchange={handleChange}
		class={[
			'slider-input absolute inset-0 h-full w-full cursor-pointer opacity-0',
			disabled && 'cursor-not-allowed'
		].filter(Boolean).join(' ')}
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={value}
		aria-disabled={disabled || undefined}
	/>

	<!-- Thumb -->
	{#if thumbContent}
		<HtmlAtom
			preset="slider.thumb"
			as="div"
			class={[
				'slider-thumb pointer-events-none absolute',
				isVertical
					? 'left-1/2 -translate-x-1/2 -translate-y-1/2'
					: 'top-1/2 -translate-x-1/2 -translate-y-1/2',
				'$preset'
			]}
			style={isVertical ? `bottom: calc(${percent}% - 10px)` : `left: ${percent}%`}
			base={thumbContent}
		/>
	{:else}
		<HtmlAtom
			preset="slider.thumb"
			as="div"
			class={[
				'slider-thumb bg-background border-border pointer-events-none absolute h-5 w-5 rounded-full border-2 shadow-sm',
				isVertical
					? 'left-1/2 -translate-x-1/2 -translate-y-1/2'
					: 'top-1/2 -translate-x-1/2 -translate-y-1/2',
				'$preset'
			]}
			style={isVertical ? `bottom: calc(${percent}% - 10px)` : `left: ${percent}%`}
		/>
	{/if}
</HtmlAtom>

{#if children}
	{@render children()}
{/if}
