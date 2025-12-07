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
	let value = $state<string | undefined>('ar');
	let array = $state([
		{ value: 'ar', label: 'Arabic' },
		{ value: 'en', label: 'English' },
		{ value: 'sp', label: 'Spanish' },
		{ value: 'it', label: 'Italian' }
	]);
</script>

<Story name="Combobox" args={{}}>
	<ACombobox.Root bind:open bind:value>
		{#snippet children({ combobox })}
			<ACombobox.Trigger
				base={Input.Root}
				class="h-10 min-w-sm items-center gap-0 rounded-sm p-1 transition-colors duration-200"
			>
				<Input.Icon class="text-foreground/50">$</Input.Icon>
				<Divider class="mx-1" vertical />
				<ACombobox.Input class="px-1" placeholder="Select a language" />
			</ACombobox.Trigger>
			<ACombobox.List>
				{#each array.filter((item) => !combobox.state.query || item.label
							.toLowerCase()
							.includes(combobox.state.query)) as item (item.value)}
					<ACombobox.Item value={item.value}>{item.label}</ACombobox.Item>
				{/each}
			</ACombobox.List>
		{/snippet}
	</ACombobox.Root>
</Story>
