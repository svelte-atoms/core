<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Skeleton from './atoms';

	const { Story } = defineMeta({
		title: 'ATOMS/Skeleton'
	});
</script>

<Story name="Text Lines">
	{#snippet children()}
		<Skeleton.Root loading={true} class="w-64">
			{#snippet skeleton()}
				<div class="flex flex-col gap-3">
					<Skeleton.Block class="h-4 w-full" />
					<Skeleton.Block class="h-4 w-4/5" />
					<Skeleton.Block class="h-4 w-3/5" />
				</div>
			{/snippet}
		</Skeleton.Root>
	{/snippet}
</Story>

<Story name="Card Layout">
	{#snippet children()}
		<Skeleton.Root loading={true} class="w-64">
			{#snippet skeleton()}
				<div class="flex flex-col gap-3 rounded-lg border p-4">
					<!-- Avatar + name row -->
					<div class="flex items-center gap-3">
						<Skeleton.Block class="h-10 w-10 rounded-full" />
						<div class="flex flex-1 flex-col gap-2">
							<Skeleton.Block class="h-3 w-3/4" />
							<Skeleton.Block class="h-3 w-1/2" />
						</div>
					</div>
					<!-- Image placeholder -->
					<Skeleton.Block class="h-36 w-full rounded-md" />
					<!-- Body text -->
					<Skeleton.Block class="h-3 w-full" />
					<Skeleton.Block class="h-3 w-5/6" />
					<!-- Action row -->
					<div class="flex gap-2">
						<Skeleton.Block class="h-8 w-20 rounded-md" />
						<Skeleton.Block class="h-8 w-20 rounded-md" />
					</div>
				</div>
			{/snippet}

			<!-- Real content when loaded -->
			<div class="rounded-lg border p-4">
				<p class="text-sm">Content loaded!</p>
			</div>
		</Skeleton.Root>
	{/snippet}
</Story>

<Story name="List">
	{#snippet children()}
		<Skeleton.Root loading={true} class="w-72">
			{#snippet skeleton()}
				<div class="flex flex-col divide-y">
					{#each [1, 2, 3, 4] as _}
						<div class="flex items-center gap-3 py-3">
							<Skeleton.Block class="h-8 w-8 rounded-md" />
							<div class="flex flex-1 flex-col gap-1.5">
								<Skeleton.Block class="h-3 w-3/4" />
								<Skeleton.Block class="h-2.5 w-1/2" />
							</div>
						</div>
					{/each}
				</div>
			{/snippet}
		</Skeleton.Root>
	{/snippet}
</Story>

<Story name="Custom Shimmer">
	{#snippet children()}
		<Skeleton.Root loading={true} class="w-64">
			{#snippet skeleton()}
				<div class="flex flex-col gap-3">
					<Skeleton.Block class="h-4 w-full">
						{#snippet shimmerContent()}
							<span
								class="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
							/>
						{/snippet}
					</Skeleton.Block>
					<Skeleton.Block class="h-4 w-3/4">
						{#snippet shimmerContent()}
							<span
								class="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
							/>
						{/snippet}
					</Skeleton.Block>
				</div>
			{/snippet}
		</Skeleton.Root>
	{/snippet}
</Story>
