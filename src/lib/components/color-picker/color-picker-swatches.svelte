<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import type { ColorPickerSwatchesProps } from './types';

	const bond = ColorPickerBond.get();

	let {
		class: klass = '',
		preset = 'color-picker.swatches',
		...restProps
	}: ColorPickerSwatchesProps & HTMLAttributes<HTMLDivElement> = $props();

	const swatches = $derived(bond?.state.swatches ?? []);
	const current = $derived(bond?.state.value ?? '');
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['color-picker-swatches flex flex-wrap gap-1.5', '$preset', klass]}
	role="group"
	aria-label="Color swatches"
	{...restProps}
>
	{#each swatches as color}
		<button
			type="button"
			onclick={() => bond?.state.setHex(color)}
			class={[
				'color-picker-swatch h-6 w-6 rounded-md border-2 transition-transform hover:scale-110 focus:outline-none',
				current.toLowerCase() === color.toLowerCase()
					? 'border-foreground scale-110'
					: 'border-border'
			].join(' ')}
			style="background-color: {color}"
			aria-label={color}
			aria-pressed={current.toLowerCase() === color.toLowerCase()}
		></button>
	{/each}
</HtmlAtom>
