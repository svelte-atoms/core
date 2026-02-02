<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DataGrid as DataGridCmp } from '.';
	import MoreVerticalIcon from '$svelte-atoms/core/icons/icon-more-vert.svelte';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { container } from '$svelte-atoms/core/runes/container.svelte';
	import { virtualize } from './attachments.svelte';
	import { Button } from '../button';
	import { Menu } from '../menu';
	import { extractDataKeys } from './utils';

	const { Story } = defineMeta({
		title: 'Atoms/DataGrid'
	});
</script>

<script lang="ts">
	let values = $state([]);
	$inspect($state.snapshot(values));

	const datagridContainer = container();

	// Generate large dataset for testing virtualization
	const data = $state(
		Array.from({ length: 10000 }, (_, i) => ({
			id: crypto.randomUUID(),
			name: `User ${i + 1}`,
			job: ['Software Engineer', 'Designer', 'Product Manager', 'Data Scientist', 'DevOps Engineer'][
				i % 5
			],
			contact: `+213${Math.floor(Math.random() * 1000000000)}`
		}))
	);

	// Extract keys for automatic cleanup of stale bonds
	const keys = extractDataKeys(() => data, item => item.id);

	const virtualized = virtualize(() => data, { rowHeight: 44, overscan: 32 });
</script>

<Story name="DataGrid With Virtualization">
	{#snippet children({  })}
		<DataGridCmp.Root bind:values keys={keys.current} class="overflow-y-auto max-h-svh" {@attach datagridContainer.attach} {@attach virtualized.viewport}>
			<DataGridCmp.Header class="sticky top-0 bg-background z-10">
				<DataGridCmp.Tr header>
					<DataGridCmp.Th width="auto">
						<DataGridCmp.Checkbox />
					</DataGridCmp.Th>
					<DataGridCmp.Th
						class="resize-x overflow-x-auto"
						width="auto"
						hidden={datagridContainer.current?.width
							? datagridContainer.current.width < 1024
							: false}>ID</DataGridCmp.Th
					>
					<DataGridCmp.Th>Name</DataGridCmp.Th>
					<DataGridCmp.Th width="auto">Job</DataGridCmp.Th>
					<DataGridCmp.Th width="auto">Contact</DataGridCmp.Th>
					<DataGridCmp.Th width="auto"></DataGridCmp.Th>
				</DataGridCmp.Tr>
			</DataGridCmp.Header>

			<DataGridCmp.Body {@attach virtualized.content}>
				<div class="col-span-full" style="height: {virtualized.paddingTop}px;"></div>

				{#each virtualized.current as item (item.data.id)}
					<DataGridCmp.Tr class="virtual-row h-11" value={item.data.id}>
						<DataGridCmp.Td>
							<DataGridCmp.Checkbox />
						</DataGridCmp.Td>

						<DataGridCmp.Td>{item.data.id}</DataGridCmp.Td>
						<DataGridCmp.Td>{item.data.name}</DataGridCmp.Td>
						<DataGridCmp.Td>{item.data.job}</DataGridCmp.Td>
						<DataGridCmp.Td>{item.data.contact}</DataGridCmp.Td>

						<DataGridCmp.Td base={Menu.Root} placement="bottom-end" offset={0}>
							<Menu.Trigger base={Button} variant="ghost" class="flex aspect-square items-center justify-center p-0 h-8">
								<Icon src={MoreVerticalIcon} />
							</Menu.Trigger>
							<Menu.List>
								<Menu.Item value="ar">Arabic</Menu.Item>
								<Menu.Item value="en">English</Menu.Item>
								<Menu.Item value="sp">Spanish</Menu.Item>
								<Menu.Item value="fr">Frensh</Menu.Item>
							</Menu.List>
						</DataGridCmp.Td>
					</DataGridCmp.Tr>
				{/each}

				<div class="col-span-full" style="height: {virtualized.paddingBottom}px;"></div>
			</DataGridCmp.Body>

			<DataGridCmp.Footer class="sticky bottom-0 bg-background px-8 py-4 z-10 border-t">
				<div class="col-span-full flex items-center">
					<span>{data.length} items</span> 
					<span>{virtualized.current.length} visible</span>
				</div>
			</DataGridCmp.Footer>
		</DataGridCmp.Root>
	{/snippet}
</Story>
