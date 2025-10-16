<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import { Alert as AAlert } from './index';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Alert',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script>
	import { Button } from '$svelte-atoms/core/components/button';

	let dismissibleDismissed = $state(false);
	let withActionsDismissed = $state(false);
</script>

<Story name="Alert" args={{}}>
	{#snippet children(args)}
		<Root class="p-4">
			<AAlert.Root variant="info">
				<AAlert.Icon />
				<AAlert.Content>
					<AAlert.Title>Info Alert</AAlert.Title>
					<AAlert.Description>
						This is an informational message that provides context about something.
					</AAlert.Description>
				</AAlert.Content>
			</AAlert.Root>
		</Root>
	{/snippet}
</Story>
