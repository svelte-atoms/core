<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as Dropzone } from './dropzone.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Dropzone'
	});
</script>

<Story name="Default">
	{#snippet children()}
		<div class="w-96">
			<Dropzone />
		</div>
	{/snippet}
</Story>

<Story name="Images Only">
	{#snippet children()}
		<div class="w-96">
			<Dropzone accept="image/*" multiple />
		</div>
	{/snippet}
</Story>

<Story name="With File List">
	{#snippet children()}
		{@const files = $state([])}
		<div class="flex w-96 flex-col gap-4">
			<Dropzone bind:files multiple />

			{#if files.length}
				<ul class="flex flex-col gap-1">
					{#each files as f}
						<li class="border-border flex items-center justify-between rounded border px-3 py-2 text-sm">
							<span class="truncate">{f.file.name}</span>
							<span class="text-muted-foreground ml-2 shrink-0">
								{(f.file.size / 1024).toFixed(1)} KB
							</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/snippet}
</Story>

<Story name="Custom Content">
	{#snippet children()}
		<div class="w-96">
			<Dropzone multiple>
				{#snippet idleContent({ open, files })}
					<div class="flex flex-col items-center gap-3">
						<span class="text-3xl">📂</span>
						<p class="text-muted-foreground text-sm">
							{files.length ? `${files.length} file(s) selected` : 'Drop your files here'}
						</p>
						<button
							type="button"
							onclick={(e) => { e.stopPropagation(); open(); }}
							class="border-border rounded border px-3 py-1 text-xs"
						>
							Browse
						</button>
					</div>
				{/snippet}

				{#snippet dragContent()}
					<p class="text-foreground font-semibold">🎯 Release to drop!</p>
				{/snippet}
			</Dropzone>
		</div>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet children()}
		<div class="w-96">
			<Dropzone disabled />
		</div>
	{/snippet}
</Story>
