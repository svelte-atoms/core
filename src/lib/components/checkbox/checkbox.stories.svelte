<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as CheckboxCmp } from './checkbox.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Checkbox'
	});
</script>

<script>
	let checked = $state(false);
</script>

<Story name="Checkbox">
	{#snippet children({ args })}
		<div class="flex gap-2">
			<CheckboxCmp bind:checked />

			<CheckboxCmp indeterminate />
		</div>
	{/snippet}
</Story>
