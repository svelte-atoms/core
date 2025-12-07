<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ImageCmp from './image.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Image'
	});
</script>

<Story name="Image">
	{#snippet children({ args })}
		<ImageCmp
			class="h-[400px] w-[600px]"
			src="https://placehold.co/600x400/t"
			alt="Placeholder image"
		>
			<p>Failed Loading...</p>
		</ImageCmp>
	{/snippet}
</Story>
