<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Root } from '$svelte-atoms/core/components/root';
	import LinkComponent from './link.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Link'
	});
</script>

<script>
	let value = $state(undefined);
	let checked = $state(false);
</script>

<Story name="Link">
	{#snippet children(args)}
		<Root>
			{#snippet children({})}
				<div class="flex h-full w-full items-center justify-center">
					<LinkComponent>Hello World</LinkComponent>
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
