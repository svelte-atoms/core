<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Combobox as ACombobox } from '.';
	import { Input } from '$svelte-atoms/core/components/input';
	import { Divider } from '$svelte-atoms/core/components/divider';
	import { filterDropdownData } from '../dropdown';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Combobox',
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
	let array = $state([
		{ value: 'usd', label: 'US Dollar' },
		{ value: 'eur', label: 'Euro' },
		{ value: 'gbp', label: 'British Pound' },
		{ value: 'jpy', label: 'Japanese Yen' },
		{ value: 'cny', label: 'Chinese Yuan' }
	]);

	const filteredItems = filterDropdownData(
		() => array,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);

	let selectedLabels = $state([]);
</script>

<Story name="Combobox" args={{}}>
	<ACombobox.Root bind:open bind:labels={selectedLabels} multiple>
		<ACombobox.Trigger
			base={Input.Root}
			class="flex h-auto min-h-10 min-w-sm flex-col items-start gap-2"
		>
			<div class="flex">
				<Input.Icon class="text-foreground/50">$</Input.Icon>
				<Divider class="mx-1" vertical />
				<ACombobox.Control class="px-1" placeholder="Select a language" />
			</div>
			<ACombobox.Selections />
		</ACombobox.Trigger>
		<ACombobox.List>
			<ACombobox.Query
				bind:value={filteredItems.query}
				class="border-border border-b px-4 py-3"
				placeholder="Type to filter..."
			/>
			{#each filteredItems.current as item (item.value)}
				<ACombobox.Item value={item.value}>{item.label}</ACombobox.Item>
			{/each}
		</ACombobox.List>
	</ACombobox.Root>
</Story>
