<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Combobox as ACombobox } from '.';
	import { Input } from '$svelte-atoms/core/components/input';
	import { Divider } from '$svelte-atoms/core/components/divider';

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
	let value = $state<string | undefined>('usd');
	let query = $state('');
	let array = $state([
		{ value: 'usd', label: 'US Dollar' },
		{ value: 'eur', label: 'Euro' },
		{ value: 'gbp', label: 'British Pound' },
		{ value: 'jpy', label: 'Japanese Yen' },
		{ value: 'cny', label: 'Chinese Yuan' }
	]);

	const filteredItems = $derived(
		array.filter((item) => !query || item.label.toLowerCase().includes(query))
	);
</script>

<Story name="Combobox" args={{}}>
	<ACombobox.Root bind:open bind:value bind:query>
		<ACombobox.Trigger base={Input.Root} class="h-10 min-w-sm">
			<Input.Icon class="text-foreground/50">$</Input.Icon>
			<Divider class="mx-1" vertical />
			<ACombobox.Control class="px-1" placeholder="Select a language" />
		</ACombobox.Trigger>
		<ACombobox.List>
			{#each filteredItems as item (item.value)}
				<ACombobox.Item value={item.value}>{item.label}</ACombobox.Item>
			{/each}
		</ACombobox.List>
	</ACombobox.Root>
</Story>
