<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Dropdown as ADropdown } from '.';
	import { Root as DropdownRoot } from './atoms';
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
		{ id: '1', value: 'ar', text: 'Arabic' },
		{ id: '2', value: 'en', text: 'English' },
		{ id: '3', value: 'sp', text: 'Spanish' },
		{ id: '4', value: 'it', text: 'Italian' }
	]);

	const dd = filter(
		() => data,
		(query, item) => item.text.toLowerCase().includes(query.toLowerCase())
	);
</script>

<Story name="Dropdown" args={{}}>
	<Root class="items-center justify-center p-4">
		<ADropdown.Root
			bind:open
			keys={data.map((item) => item.value)}
			multiple
			onquerychange={(q) => (dd.query = q)}
		>
			<ADropdown.Trigger
				base={Input.Root}
				class="hover:bg-foreground/5 active:bg-foreground/10 max-w-sm min-w-sm items-center gap-2 rounded-sm px-4 transition-colors duration-200"
			>
				<ADropdown.Values>
					{#snippet children({ items })}
						{#each items as item (item.id)}
							<div animate:flip={{ duration: 200 }}>
								<ADropdown.Value value={item.value} class="text-foreground/80"
									>{item.text} - {item.value}</ADropdown.Value
								>
							</div>
						{/each}
					{/snippet}
				</ADropdown.Values>

				<ADropdown.Query class="flex-1 px-1" placeholder={'Search for items'} />
			</ADropdown.Trigger>
			<ADropdown.List>
				{#each dd.current as item (item.id)}
					<div animate:flip={{ duration: 200 }}>
						<ADropdown.Item value={item.value}>{item.text}</ADropdown.Item>
					</div>
				{/each}
			</ADropdown.List>
		</ADropdown.Root>
	</Root>
</Story>
