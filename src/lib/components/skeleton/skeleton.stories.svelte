<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as SkeletonCmp } from './skeleton.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Skeleton'
	});
</script>

<Story name="Default">
	{#snippet children()}
		<div class="flex flex-col gap-3 w-64">
			<!-- Text lines -->
			<SkeletonCmp class="h-4 w-full" />
			<SkeletonCmp class="h-4 w-4/5" />
			<SkeletonCmp class="h-4 w-3/5" />
		</div>
	{/snippet}
</Story>

<Story name="Card Layout">
	{#snippet children()}
		<div class="flex flex-col gap-3 w-64 p-4 border rounded-lg">
			<!-- Avatar + title row -->
			<div class="flex items-center gap-3">
				<SkeletonCmp class="h-10 w-10 rounded-full" />
				<div class="flex flex-col gap-2 flex-1">
					<SkeletonCmp class="h-3 w-3/4" />
					<SkeletonCmp class="h-3 w-1/2" />
				</div>
			</div>
			<!-- Body -->
			<SkeletonCmp class="h-32 w-full rounded-md" />
			<SkeletonCmp class="h-3 w-full" />
			<SkeletonCmp class="h-3 w-5/6" />
		</div>
	{/snippet}
</Story>

<Story name="Loading Toggle">
	{#snippet children()}
		{@const loading = false}
		<SkeletonCmp class="h-6 w-40" {loading}>
			<span class="text-sm font-medium">Content loaded!</span>
		</SkeletonCmp>
	{/snippet}
</Story>

<Story name="Custom Shimmer">
	{#snippet children()}
		<SkeletonCmp class="h-4 w-48">
			{#snippet shimmerContent()}
				<span
					class="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
				/>
			{/snippet}
		</SkeletonCmp>
	{/snippet}
</Story>
