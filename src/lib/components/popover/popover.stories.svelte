<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Popover as Popover_ } from '.';
	import { Button } from '../button';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Popover',
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

<Story name="Popover" args={{}}>
	{#snippet children(args)}
		<Popover_.Root bind:open offset={0} {...args}>
			<Popover_.Trigger base={Button} class="items-center gap-4">
				<div>Open Popover</div>
				<Popover_.Indicator />
			</Popover_.Trigger>

			<Popover_.Content class="bg-card" autoClose>
				<div>Hello World !</div>
				<Popover_.Arrow />
			</Popover_.Content>
		</Popover_.Root>
	{/snippet}
</Story>
