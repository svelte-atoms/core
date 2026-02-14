<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ContextMenu as AContextMenu } from '.';
	import { Button } from '../button';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/ContextMenu',
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

	const data = $state([
		{ id: 1, value: 'apple', label: 'Apple' },
		{ id: 2, value: 'banana', label: 'Banana' },
		{ id: 3, value: 'cherry', label: 'Cherry' },
		{ id: 4, value: 'date', label: 'Date' },
		{ id: 5, value: 'elderberry', label: 'Elderberry' }
	]);
</script>

<Story name="ContextMenu" args={{}}>
	<AContextMenu.Root bind:open>
		<AContextMenu.Trigger base={Button}>Select a language</AContextMenu.Trigger>
		<AContextMenu.List>
			<AContextMenu.Item onclick={() => console.log('Arabic')}>Arabic</AContextMenu.Item>
			<AContextMenu.Item onclick={() => console.log('English')}>English</AContextMenu.Item>
			<AContextMenu.Item onclick={() => console.log('Spanish')}>Spanish</AContextMenu.Item>
			<AContextMenu.Item onclick={() => console.log('Italian')}>Italian</AContextMenu.Item>
		</AContextMenu.List>
	</AContextMenu.Root>
</Story>
