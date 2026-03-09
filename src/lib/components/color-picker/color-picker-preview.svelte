<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import type { ColorPickerPreviewProps } from './types';

	const bond = ColorPickerBond.get();

	let {
		class: klass = '',
		preset = 'color-picker.preview',
		...restProps
	}: ColorPickerPreviewProps & HTMLAttributes<HTMLDivElement> = $props();

	const color = $derived(bond?.state.value ?? '#000000');
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['color-picker-preview border-border h-8 w-8 rounded-md border shadow-sm', '$preset', klass]}
	style="background-color: {color}"
	aria-label={`Selected color: ${color}`}
	{...restProps}
/>
