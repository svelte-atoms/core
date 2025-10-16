<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as CheckboxCmp } from './checkbox.svelte';
	import Root from '$svelte-atoms/core/components/root/root.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Checkbox'
	});
</script>

<script>
	let checked = $state(false);
</script>

<Story name="Checkbox">
	{#snippet children({ args })}
		<Root class="p-4">
			{#snippet children({})}
				<div class="flex gap-2">
					<CheckboxCmp bind:checked />

					<CheckboxCmp indeterminate />
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
