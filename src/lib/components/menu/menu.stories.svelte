<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Menu as AMenu } from '.';
	import { Button } from '$svelte-atoms/core/components/button';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Menu',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	let open = $state(false);
</script>

<Story name="Menu" args={{}}>
	<AMenu.Root bind:open offset={4}>
		<AMenu.Trigger base={Button}>Select a language</AMenu.Trigger>
		<AMenu.List>
			<AMenu.Item onclick={() => console.log('Arabic')}>Arabic</AMenu.Item>
			<AMenu.Item onclick={() => console.log('English')}>English</AMenu.Item>
			<AMenu.Item onclick={() => console.log('Spanish')}>Spanish</AMenu.Item>
			<AMenu.Item onclick={() => console.log('Italian')}>Italian</AMenu.Item>
		</AMenu.List>
	</AMenu.Root>
</Story>
