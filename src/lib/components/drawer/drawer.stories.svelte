<script module>
	import { animate } from 'motion';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { clickoutDrawer, Drawer as Drawer_ } from '.';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Drawer',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	import { animateDrawerContent, animateDrawerRoot } from './motion';

	let isOpen = $state(false);
</script>

<Story name="Left" args={{}}>
	<Drawer_.Root
		bind:open={isOpen}
		side="left"
	>
		<Drawer_.Content
			class="border-border flex min-h-full w-md flex-col border-r p-8 whitespace-nowrap shadow-md"
			animate={animateDrawerContent()}
		>
			<Drawer_.Header class="flex items-center justify-between">
				<div class="flex flex-col">
					<Drawer_.Title class="text-lg font-semibold">Drawer Title</Drawer_.Title>
					<Drawer_.Description class="text-sm break-all whitespace-break-spaces text-neutral-500"
						>Ac bibendum laoreet lacinia purus duis. Hendrerit quam purus maecenas tincidunt letius
						finibus vel tortor sociosqu proin vulputate. Consectetur velit eleifend purus mi
						pulvinar si tristique litora mollis lobortis.</Drawer_.Description
					>
				</div>
			</Drawer_.Header>
			<div>
				<div>Svelte Fluent</div>
			</div>
		</Drawer_.Content>
	</Drawer_.Root>

	<button
		class="bg-red-500 p-2"
		onclick={() => {
			isOpen = !isOpen;
		}}>Open</button
	>
</Story>

<Story name="Top" args={{}}>
	<Drawer_.Root
		bind:open={isOpen}
		side="top"
	>
		<Drawer_.Content
			class="border-border flex w-md min-w-full flex-col border-b p-8 whitespace-nowrap shadow-md"
			animate={animateDrawerContent()}
			{@attach clickoutDrawer((_, bond) => {
				bond?.state?.close?.();
			})}
		>
			<div>
				<div>Svelte Fluent</div>
			</div>
		</Drawer_.Content>
	</Drawer_.Root>

	<button
		class="bg-red-500 p-2"
		onclick={() => {
			isOpen = !isOpen;
		}}>Open</button
	>
</Story>

<Story name="Right" args={{}}>
	<Drawer_.Root
		bind:open={isOpen}
		side="right"
	>
		<Drawer_.Content
			class="border-border shadow-foreground/5 inset-y-0 flex w-md flex-col border-l p-8 whitespace-nowrap shadow-sm"
			animate={animateDrawerContent()}
			{@attach clickoutDrawer((_, bond) => {
				bond?.state?.close?.();
			})}
		>
			<div>
				<div>Svelte Fluent</div>
			</div>
		</Drawer_.Content>
	</Drawer_.Root>

	<button
		class="bg-red-500 p-2"
		onclick={() => {
			isOpen = !isOpen;
		}}>Open</button
	>
</Story>

<Story name="Bottom" args={{}}>
	<Drawer_.Root
		bind:open={isOpen}
		side="bottom"
	>
		<Drawer_.Content
			class="border-border flex w-md min-w-full flex-col border-t p-8 whitespace-nowrap shadow-md"
			animate={animateDrawerContent()}
			{@attach clickoutDrawer((_, bond) => {
				bond?.state?.close?.();
			})}
		>
			<div>
				<div>Svelte Fluent</div>
			</div>
		</Drawer_.Content>
	</Drawer_.Root>

	<button
		class="bg-red-500 p-2"
		onclick={() => {
			isOpen = !isOpen;
		}}>Open</button
	>
</Story>
