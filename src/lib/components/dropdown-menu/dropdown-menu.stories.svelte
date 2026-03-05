<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DropdownMenu as ADropdownMenu } from '.';
	import { Button } from '$svelte-atoms/core/components/button';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/DropdownMenu',
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

<Story name="DropdownMenu" args={{}}>
	<ADropdownMenu.Root bind:open>
		<ADropdownMenu.Trigger base={Button}>Select a language</ADropdownMenu.Trigger>
		<ADropdownMenu.List>
			<ADropdownMenu.Item onclick={() => console.log('Arabic')}>Arabic</ADropdownMenu.Item>
			<ADropdownMenu.Item onclick={() => console.log('English')}>English</ADropdownMenu.Item>
			<ADropdownMenu.Item onclick={() => console.log('Spanish')}>Spanish</ADropdownMenu.Item>
			<ADropdownMenu.Item onclick={() => console.log('Italian')}>Italian</ADropdownMenu.Item>
		</ADropdownMenu.List>
	</ADropdownMenu.Root>
</Story>
