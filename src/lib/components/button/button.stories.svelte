<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import ButtonCmp from './button.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Button'
	});
</script>

<Story name="Button">
	<Root class="p-4">
		{#snippet children({ args })}
			<ButtonCmp>Clicke me</ButtonCmp>
		{/snippet}
	</Root>
</Story>
