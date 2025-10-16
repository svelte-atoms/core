<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import ImageCmp from './image.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Image'
	});
</script>

<Story name="Image">
	<Root class="p-4">
		{#snippet children({ args })}
			<ImageCmp
				class="h-[400px] w-[600px]"
				src="https://placehold.co/600x400/t"
				alt="Placeholder image"
			>
				<p>Failed Loading...</p>
			</ImageCmp>
		{/snippet}
	</Root>
</Story>
