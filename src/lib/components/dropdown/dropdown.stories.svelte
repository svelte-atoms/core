<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Dropdown as ADropdown } from '.';
	import { Input } from '$svelte-atoms/core/components/input';
	import { flip } from 'svelte/animate';
	import { filterDropdownData } from './runes.svelte';

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

	const dd = filterDropdownData(
		() => data,
		(query, item) => item.text.toLowerCase().includes(query.toLowerCase())
	);
</script>

<Story name="Dropdown" args={{}}>
	<!-- Multi-select dropdown with search functionality -->
	<div class="flex flex-col gap-4">
		<ADropdown.Root bind:open keys={data.map((item) => item.value)} multiple>
			{#snippet children({ dropdown })}
				<!-- Compose ADropdown.Trigger with Input.Root for a custom trigger -->
				<ADropdown.Trigger
					base={Input.Root}
					class="flex h-auto min-h-12 max-w-sm min-w-sm flex-col items-start gap-1 rounded-sm px-4 transition-colors duration-200"
					onclick={(ev) => {
						ev.preventDefault();

						dropdown.state.open();
					}}
				>
					<!-- Inline search input within the trigger -->
					<ADropdown.Query
						class="flex-1 px-1"
						placeholder="Search for fruits..."
						bind:value={dd.query}
					/>

					<!-- Default usage  -->
					<!-- <ADropdown.Selections class="flex flex-wrap gap-1" /> -->

					<!-- Display selected values with animation -->
					<ADropdown.Selections class="flex flex-wrap gap-1">
						{#snippet children({ selections })}
							{#each selections as selection (selection.id)}
								<div animate:flip={{ duration: 200 }}>
									<ADropdown.Selection {selection} />
								</div>
							{/each}
						{/snippet}
					</ADropdown.Selections>
				</ADropdown.Trigger>

				<!-- ADropdown list with filtered items -->
				<ADropdown.Content>
					{#each dd.current as item (item.id)}
						<div animate:flip={{ duration: 200 }}>
							<ADropdown.Item value={item.value}>{item.text}</ADropdown.Item>
						</div>
					{/each}
				</ADropdown.Content>
			{/snippet}
		</ADropdown.Root>

		<ADropdown.Root keys={data.map((item) => item.value)}>
			{#snippet children({ dropdown })}
				<!-- Compose ADropdown.Trigger with Input.Root for a custom trigger -->
				<ADropdown.Trigger
					base={Input.Root}
					class="flex h-auto min-h-12 max-w-sm min-w-sm gap-1 rounded-sm px-4 transition-colors duration-200"
					onclick={(ev) => {
						ev.preventDefault();

						dropdown.state.open();
					}}
				>
					<!-- Display selected values with animation -->
					<ADropdown.Selections class="flex flex-wrap gap-1" />

					<!-- Ability to customize the display of selected item -->
					<!-- <ADropdown.Selections class="flex flex-wrap gap-1" >
						{#snippet children({selection})}
							{selection?.text}
						{/snippet}
					</ADropdown.Selections> -->
				</ADropdown.Trigger>

				<!-- ADropdown list with filtered items -->
				<ADropdown.Content>
					<!-- Inline search input within the trigger -->
					<ADropdown.Query
						bind:value={dd.query}
						class="border-border flex-1 border-b px-4 py-3"
						placeholder="Search for fruits..."
					/>

					{#each dd.current as item (item.id)}
						<div animate:flip={{ duration: 200 }}>
							<ADropdown.Item value={item.value}>{item.text}</ADropdown.Item>
						</div>
					{/each}
				</ADropdown.Content>
			{/snippet}
		</ADropdown.Root>
	</div>
</Story>
