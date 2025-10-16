<script>
	import { DataGrid } from '$lib/components/datagrid';

	let { data = [] } = $props();
</script>

<div class="overflow-x-auto rounded-lg border border-gray-200 bg-white">
	<DataGrid.Root class="min-w-full">
		<DataGrid.Header class="bg-gray-50">
			<DataGrid.Tr>
				<DataGrid.Th
					class="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
					>Prop</DataGrid.Th
				>
				<DataGrid.Th
					class="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
					>Type</DataGrid.Th
				>
				<DataGrid.Th
					class="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
					>Default</DataGrid.Th
				>
				<DataGrid.Th
					class="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
					width="2fr">Description</DataGrid.Th
				>
			</DataGrid.Tr>
		</DataGrid.Header>

		<DataGrid.Body>
			{#each data as item (item)}
				<DataGrid.Tr>
					<DataGrid.Td class="px-6 py-4 font-mono text-sm whitespace-nowrap text-purple-600"
						>{item.name}</DataGrid.Td
					>
					<DataGrid.Td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600"
						>{item.type}</DataGrid.Td
					>
					<DataGrid.Td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600"
						>{item.default}</DataGrid.Td
					>
					<DataGrid.Td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600"
						>{item.description}</DataGrid.Td
					>
				</DataGrid.Tr>
			{/each}
		</DataGrid.Body>
	</DataGrid.Root>
</div>
