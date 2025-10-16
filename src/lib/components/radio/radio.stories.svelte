<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as RadioModule } from './radio.svelte';
	import { Root } from '$svelte-atoms/core/components/root/';

	const { Story } = defineMeta({
		title: 'ATOMS/Radio'
	});
</script>

<script>
	let value = $state(undefined);
	let checked = $state(false);
</script>

<Story name="Radio">
	{#snippet children({ args })}
		<Root>
			{#snippet children({})}
				<div class="flex h-full w-full items-center justify-center">
					<RadioModule class="size-5" />
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
