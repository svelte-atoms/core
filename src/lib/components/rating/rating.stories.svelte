<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/Rating'
	});
</script>

<script lang="ts">
	import { Rating } from '.';

	let value = $state(3);
	let halfValue = $state(3.5);
</script>

<Story name="Default">
	{#snippet template()}
		<div class="flex flex-col gap-2">
			<Rating bind:value />
			<span class="text-muted-foreground text-sm">Value: {value}</span>
		</div>
	{/snippet}
</Story>

<Story name="Allow Half">
	{#snippet template()}
		<div class="flex flex-col gap-2">
			<Rating bind:value={halfValue} allowHalf />
			<span class="text-muted-foreground text-sm">Value: {halfValue}</span>
		</div>
	{/snippet}
</Story>

<Story name="Readonly">
	{#snippet template()}
		<div class="flex flex-col gap-4">
			<Rating value={1} readonly />
			<Rating value={2.5} allowHalf readonly />
			<Rating value={4} readonly />
			<Rating value={5} readonly />
		</div>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template()}
		<Rating value={3} disabled />
	{/snippet}
</Story>

<Story name="10 Stars">
	{#snippet template()}
		<Rating bind:value count={10} />
	{/snippet}
</Story>

<Story name="Custom Icon">
	{#snippet template()}
		<Rating bind:value>
			{#snippet iconContent({ filled, half })}
				<svg viewBox="0 0 24 24" class="h-full w-full" aria-hidden="true">
					<path
						d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
						fill={filled || half ? 'currentColor' : 'none'}
						stroke="currentColor"
						stroke-width="1.5"
					/>
				</svg>
			{/snippet}
		</Rating>
	{/snippet}
</Story>
