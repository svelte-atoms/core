<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Select as ASelect } from '.';
	import { Input } from '$svelte-atoms/core/components/input';
	import { flip } from 'svelte/animate';
	import { filterSelectData } from './runes.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Select',
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
		{ id: 1, value: 'apple', label: 'Apple' },
		{ id: 2, value: 'banana', label: 'Banana' },
		{ id: 3, value: 'cherry', label: 'Cherry' },
		{ id: 4, value: 'date', label: 'Date' },
		{ id: 5, value: 'elderberry', label: 'Elderberry' }
	]);

	const dd = filterSelectData(
		() => data,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);
</script>

<Story name="Select" args={{}}>
	<!-- Multi-select with search functionality -->
	<div class="flex flex-col gap-4">
		<ASelect.Root bind:open keys={data.map((item) => item.value)} multiple>
			{#snippet children({ select })}
				<!-- Compose ASelect.Trigger with Input.Root for a custom trigger -->
				<ASelect.Trigger
					base={Input.Root}
					class="flex h-auto min-h-12 max-w-sm min-w-sm flex-col items-start gap-1 rounded-sm px-4 transition-colors duration-200"
					onclick={(ev) => {
						ev.preventDefault();

						select.state.open();
					}}
				>
					<!-- Inline search input within the trigger -->
					<input
						class="w-full flex-1 px-1 outline-none"
						placeholder="Search for fruits..."
						bind:value={dd.query}
					/>

					<!-- Display selected values with animation -->
					<ASelect.Selections class="flex flex-wrap gap-1">
						{#snippet children({ selections })}
							{#each selections as selection (selection.id)}
								<div animate:flip={{ duration: 200 }}>
									<ASelect.Selection {selection} />
								</div>
							{/each}
						{/snippet}
					</ASelect.Selections>
				</ASelect.Trigger>

				<!-- Select list with filtered items -->
				<ASelect.Content>
					{#each dd.current as item (item.id)}
						<div animate:flip={{ duration: 200 }}>
							<ASelect.Item value={item.value}>{item.label}</ASelect.Item>
						</div>
					{/each}
				</ASelect.Content>
			{/snippet}
		</ASelect.Root>

		<ASelect.Root keys={data.map((item) => item.value)}>
			{#snippet children({ select })}
				<!-- Compose ASelect.Trigger with Input.Root for a custom trigger -->
				<ASelect.Trigger
					base={Input.Root}
					class="flex h-auto min-h-12 max-w-sm min-w-sm gap-1 rounded-sm px-4 transition-colors duration-200"
					onclick={(ev) => {
						ev.preventDefault();

						select.state.open();
					}}
				>
					<!-- Display selected values with animation -->
					<ASelect.Selections class="flex flex-wrap gap-1" />
				</ASelect.Trigger>

				<!-- Select list with filtered items -->
				<ASelect.Content>
					<!-- Inline search input within the content -->
					<input
						bind:value={dd.query}
						class="border-border flex-1 border-b px-4 py-3"
						placeholder="Search for fruits..."
					/>

					{#each dd.current as item (item.id)}
						<div animate:flip={{ duration: 200 }}>
							<ASelect.Item value={item.value}>{item.label}</ASelect.Item>
						</div>
					{/each}
				</ASelect.Content>
			{/snippet}
		</ASelect.Root>
	</div>
</Story>
