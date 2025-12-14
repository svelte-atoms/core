<script>
	import { DataGrid } from '$lib/components/datagrid';

	let { data = [] } = $props();
</script>

<div class="border-border bg-card overflow-x-auto rounded-lg border">
	<DataGrid.Root class="min-w-full" fallbackTemplate="1fr 1fr 1fr 1fr">
		<DataGrid.Header class="bg-muted">
			<DataGrid.Tr class="border-border border-b">
				<DataGrid.Th
					class="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
					>Prop</DataGrid.Th
				>
				<DataGrid.Th
					class="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
					>Type</DataGrid.Th
				>
				<DataGrid.Th
					class="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
					>Default</DataGrid.Th
				>
				<DataGrid.Th
					class="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
					width="2fr">Description</DataGrid.Th
				>
			</DataGrid.Tr>
		</DataGrid.Header>

		<DataGrid.Body>
			{#each data as item (item)}
				<DataGrid.Tr>
					<DataGrid.Td class="text-foreground px-6 py-4 font-mono text-sm whitespace-nowrap"
						>{item.name}</DataGrid.Td
					>
					<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
						>{item.type}</DataGrid.Td
					>
					<DataGrid.Td class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
						>{item.default}</DataGrid.Td
					>
					<DataGrid.Td class="text-foreground px-6 py-4 text-sm whitespace-nowrap"
						>{item.description}</DataGrid.Td
					>
				</DataGrid.Tr>
			{/each}
		</DataGrid.Body>
	</DataGrid.Root>
</div>
