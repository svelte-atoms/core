<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Sidebar as Sidebar_ } from '.';
	import Root from '$svelte-atoms/core/components/root/root.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Sidebar',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	let isOpen = $state(false);
</script>

<Story name="Sidebar" args={{}}>
	<Root class="">
		<Sidebar_.Root class="" bind:open={isOpen}>
			{#snippet children({ sidebar })}
				<div class="flex size-full">
					<Sidebar_.Content
						class="flex max-w-[300px] min-w-32 flex-col border-r px-6 py-10 whitespace-nowrap"
					>
						<div>
							<button
								onclick={() => {
									sidebar?.state.toggle?.();
								}}>Open</button
							>
						</div>
					</Sidebar_.Content>

					<main class="bg-foreground/2 flex-1 p-8">Hello World!</main>
				</div>
			{/snippet}
		</Sidebar_.Root>
	</Root>
</Story>
