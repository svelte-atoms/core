<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Tooltip as Tooltip_ } from '.';
	import { Root as TooltipRoot } from './atoms';
	import { Button } from '$svelte-atoms/core/components/button';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Tooltip',
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

<Story name="Tooltip" args={{}}>
	<Tooltip_.Root bind:open offset={0}>
		<Tooltip_.Trigger base={Button}>Open Popover</Tooltip_.Trigger>
		<Tooltip_.Content>
			<div>Hello World !</div>
			<Tooltip_.Arrow />
		</Tooltip_.Content>
	</Tooltip_.Root>
</Story>
