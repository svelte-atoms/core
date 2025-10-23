<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Dropdown as ADropdown } from '.';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import { Input } from '$svelte-atoms/core/components/input';
	import { flip } from 'svelte/animate';
	import { filter } from './runes.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Dropdown',
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
		{ id: 1, value: 'apple', text: 'Apple' },
		{ id: 2, value: 'banana', text: 'Banana' },
		{ id: 3, value: 'cherry', text: 'Cherry' },
		{ id: 4, value: 'date', text: 'Date' },
		{ id: 5, value: 'elderberry', text: 'Elderberry' }
	]);

	const dd = filter(
		() => data,
		(query, item) => item.text.toLowerCase().includes(query.toLowerCase())
	);
</script>

<Story name="Dropdown" args={{}}>
	<Root class="items-center justify-center p-4">
		<!-- Multi-select dropdown with search functionality -->
		<ADropdown.Root
			bind:open
			keys={data.map((item) => item.value)}
			multiple
			onquerychange={(q) => (dd.query = q)}
		>
			{#snippet children({ dropdown })}
				<!-- Compose ADropdown.Trigger with Input.Root for a custom trigger -->
				<ADropdown.Trigger
					base={Input.Root}
					class="h-auto min-h-12 max-w-sm min-w-sm items-center gap-2 rounded-sm px-4 transition-colors duration-200"
					onclick={(ev) => {
						ev.preventDefault();

						dropdown.state.open();
					}}
				>
					<!-- Display selected values with animation -->
					<ADropdown.Values>
						{#snippet children({ items })}
							{#each items as item (item.id)}
								<div animate:flip={{ duration: 200 }}>
									<ADropdown.Value value={item.value} class="text-foreground/80">
										{item.text}
									</ADropdown.Value>
								</div>
							{/each}
						{/snippet}
					</ADropdown.Values>

					<!-- Inline search input within the trigger -->
					<ADropdown.Query class="flex-1 px-1" placeholder="Search for fruits..." />
				</ADropdown.Trigger>

				<!-- ADropdown list with filtered items -->
				<ADropdown.List>
					{#each dd.current as item (item.id)}
						<div animate:flip={{ duration: 200 }}>
							<ADropdown.Item value={item.value}>{item.text}</ADropdown.Item>
						</div>
					{/each}
				</ADropdown.List>
			{/snippet}
		</ADropdown.Root>
	</Root>
</Story>
