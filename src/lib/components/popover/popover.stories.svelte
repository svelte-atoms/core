<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Popover as Popover_ } from '.';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import { clickoutPopover } from './attachments.svelte';
	import { animate } from 'motion';
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
		<Root class="overflow-clip p-4">
			<Popover_.Root bind:open offset={0} {...args}>
				{#snippet children({ popover })}
					<!-- {#if dev}
						<RenderScan duration={400} />
					{/if} -->

					<Popover_.Trigger base={Button} class="items-center gap-4">
						<div>Open Popover</div>
						<Popover_.Indicator />
					</Popover_.Trigger>

					<Popover_.Content
						{@attach clickoutPopover((ev, atom) => {
							atom.state.close();
						})}
						class="bg-card"
						animate={function (this, node) {
							const isOpen = this.isOpen;

							const m = animate(
								node,
								{
									y: (isOpen ? 0 : -1) * 8,
									opacity: +isOpen
								},
								{
									duration: 0.1
								}
							);
						}}
					>
						<div>Hello World !</div>
						<Popover_.Arrow />
					</Popover_.Content>
				{/snippet}
			</Popover_.Root>
		</Root>
	{/snippet}
</Story>
