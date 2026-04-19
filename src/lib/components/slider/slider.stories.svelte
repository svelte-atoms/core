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
</Story>

<Story name="Custom Thumb">
	<div class="flex w-72 flex-col gap-2">
		<span class="text-sm font-medium">Custom thumb snippet</span>
		<SliderCmp value={60}>
			{#snippet thumbContent({ value, percent })}
				<div
					class="absolute -translate-x-1/2 pointer-events-none bg-primary text-primary-foreground flex h-4 aspect-square p-0 items-center justify-center rounded-full text-[8px] font-bold shadow-sm shadow-black/50"
					style={`left: ${percent}%`}
				>
					{Math.round(percent)}
				</div>
			{/snippet}
		</SliderCmp>
	</div>
</Story>

<Story name="Custom Track">
	<div class="flex w-72 flex-col gap-2">
		<span class="text-sm font-medium">Custom track snippet</span>
		<SliderCmp value={70}>
			{#snippet trackContent({ percent })}
				<div class="bg-muted relative h-3 w-full overflow-hidden rounded-full">
					<div
						class="from-primary to-destructive h-full rounded-full bg-gradient-to-r"
						style="width: {percent}%"
					></div>
				</div>
			{/snippet}
		</SliderCmp>
	</div>
</Story>
