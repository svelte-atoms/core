<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as SliderCmp } from './slider.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Slider'
	});
</script>

<script>
	let value = $state(40);
</script>

<Story name="Default">
	{#snippet children()}
		<div class="flex w-72 flex-col gap-6">
			<div class="flex flex-col gap-2">
				<span class="text-sm font-medium">Value: {value}</span>
				<SliderCmp bind:value min={0} max={100} step={1} />
			</div>

			<div class="flex flex-col gap-2">
				<span class="text-sm font-medium">Step 10</span>
				<SliderCmp value={50} min={0} max={100} step={10} />
			</div>

			<div class="flex flex-col gap-2">
				<span class="text-sm font-medium">Disabled</span>
				<SliderCmp value={30} disabled />
			</div>
		</div>
	{/snippet}
</Story>
