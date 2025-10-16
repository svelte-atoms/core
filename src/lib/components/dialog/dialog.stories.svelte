<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Dialog as ADialog } from '.';
	import { Dropdown } from '$svelte-atoms/core/components/dropdown';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import { dialog } from './attachements.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Dialog',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	let isDialogOpen = $state(false);
	let isDropdownOpen = $state(false);
</script>

<Story name="Dialog" args={{}}>
	<Root class="p-4">
		<div class="size-10 bg-red-500"></div>
		<button onclick={() => (isDialogOpen = !isDialogOpen)}>Open Dialog</button>

		<ADialog.Root class="bg-neutral-900/20" bind:open={isDialogOpen}>
			<ADialog.Content>
				<ADialog.Header>
					<div>Open Popover</div>
					<ADialog.CloseButton class="ml-auto"></ADialog.CloseButton>
				</ADialog.Header>

				<ADialog.Body>
					<p
						{@attach dialog((node, atom) => {
							console.log(atom);
						})}
					>
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</p>

					<Dropdown.Root open={isDialogOpen && isDropdownOpen} class="w-full">
						<Dropdown.Trigger>Hello World</Dropdown.Trigger>
						<Dropdown.List>
							<Dropdown.Item id="ar">Arabic</Dropdown.Item>
							<Dropdown.Item id="en">English</Dropdown.Item>
							<Dropdown.Item id="sp">Spanish</Dropdown.Item>
							<Dropdown.Item id="it">Italian</Dropdown.Item>
						</Dropdown.List>
					</Dropdown.Root>
				</ADialog.Body>

				<ADialog.Footer class="gap-4">
					<button onclick={() => (isDialogOpen = false)}>Cancel</button>
					<button>Save</button>
				</ADialog.Footer>
			</ADialog.Content>
		</ADialog.Root>
	</Root>
</Story>
