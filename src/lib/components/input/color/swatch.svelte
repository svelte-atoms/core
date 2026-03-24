<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';
	import { InputBond } from '../bond.svelte';
	import { Swatch } from '$svelte-atoms/core/components/swatch';

	const bond = InputBond.get();

	let {
		class: klass = '',
		...restProps
	}: {
		class?: string;
		[key: string]: unknown;
	} = $props();

	const colorValue = $derived(String(bond?.state?.props?.value ?? ''));
</script>

<Swatch
	color={colorValue}
	class={cn('my-1 h-[calc(100%-8px)] max-h-6 aspect-square rounded-sm', klass)}
	{...restProps}
/>
