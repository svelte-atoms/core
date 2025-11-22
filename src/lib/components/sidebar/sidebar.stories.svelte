<script module>
	import { cubicOut } from 'svelte/easing';
	import gsap from 'gsap';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Sidebar as Sidebar_ } from '.';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import { on } from '$lib/attachments';
	import { SidebarBond } from './bond.svelte';

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
	$inspect(isOpen);
</script>

<Story name="Sidebar" args={{}}>
	<Root class="">
		<Sidebar_.Root class="" bind:open={isOpen}>
			<div class="flex size-full">
				<Sidebar_.Content
					class="flex flex-col border-r px-6 py-10 whitespace-nowrap"
					initial={(node) => gsap.set(node, { width: isOpen ? 240 : 96 })}
					animate={(node) =>
						gsap.to(node, { width: isOpen ? 240 : 96, duration: 0.2, ease: cubicOut })}
				>
					<div>
						<button
							{@attach (node) => {
								const bond = SidebarBond.get();
								return on('click', (ev) => {
									bond?.state.toggle?.();
								})(node);
							}}>Open</button
						>
					</div>
				</Sidebar_.Content>

				<main class="bg-foreground/2 flex-1 p-8">Hello World!</main>
			</div>
		</Sidebar_.Root>
	</Root>
</Story>
