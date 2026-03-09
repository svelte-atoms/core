<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as ProgressCmp } from './progress.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Progress'
	});
</script>

<Story name="Linear">
	{#snippet children()}
		<div class="flex w-72 flex-col gap-4">
			<ProgressCmp value={40} showLabel />
			<ProgressCmp value={75} showLabel />
			<ProgressCmp value={null} />
			<!-- indeterminate -->
		</div>
	{/snippet}
</Story>

<Story name="Circular">
	{#snippet children()}
		<div class="flex gap-6">
			<ProgressCmp variant="circular" value={65} showLabel />
			<ProgressCmp variant="circular" value={null} />
			<!-- indeterminate -->
		</div>
	{/snippet}
</Story>

<Story name="Custom Fill">
	{#snippet children()}
		<div class="flex w-72 flex-col gap-4">
			<ProgressCmp value={60}>
				{#snippet fillContent({ percent })}
					<div
						class="from-primary to-destructive h-full rounded-full bg-gradient-to-r transition-[width] duration-300"
						style="width: {percent}%"
					></div>
				{/snippet}
			</ProgressCmp>
		</div>
	{/snippet}
</Story>

<Story name="Custom Label">
	{#snippet children()}
		<div class="flex w-72 flex-col gap-4">
			<ProgressCmp value={80}>
				{#snippet labelContent({ value, percent })}
					<span class="text-primary text-xs font-bold">{value} / 100 ({Math.round(percent!)}%)</span>
				{/snippet}
			</ProgressCmp>
		</div>
	{/snippet}
</Story>
