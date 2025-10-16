<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as LabelCmp } from './label.svelte';
	import { Root } from '$svelte-atoms/core/components/root';

	const { Story } = defineMeta({
		title: 'ATOMS/Label'
	});
</script>

<script>
	let value = $state(undefined);
	let checked = $state(false);
</script>

<Story name="Label">
	{#snippet children(args)}
		<Root>
			{#snippet children({})}
				<div class="flex h-full w-full items-center justify-center">
					<LabelCmp>Hello World</LabelCmp>
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
