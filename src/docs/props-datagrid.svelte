<script>
	let { data = [] } = $props();
</script>

<div class="border-border bg-card overflow-x-auto rounded-lg border">
	<DataGrid.Root class="min-w-full" fallbackTemplate="1fr 1fr 1fr 1fr">
		<DataGrid.Header class="bg-muted">
			<DataGrid.Row class="border-border border-b">
				<DataGrid.Column
					class="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
					>Prop</DataGrid.Column
				>
				<DataGrid.Column
					class="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
					>Type</DataGrid.Column
				>
				<DataGrid.Column
					class="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
					>Default</DataGrid.Column
				>
				<DataGrid.Column
					class="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
					width="2fr">Description</DataGrid.Column
				>
			</DataGrid.Row>
		</DataGrid.Header>

		<DataGrid.Body>
			{#each data as item (item)}
				<DataGrid.Row>
					<DataGrid.Cell class="text-foreground px-6 py-4 font-mono text-sm whitespace-nowrap"
						>{item.name}</DataGrid.Cell
					>
					<DataGrid.Cell class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
						>{item.type}</DataGrid.Cell
					>
					<DataGrid.Cell class="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap"
						>{item.default}</DataGrid.Cell
					>
					<DataGrid.Cell class="text-foreground px-6 py-4 text-sm whitespace-nowrap"
						>{item.description}</DataGrid.Cell
					>
				</DataGrid.Row>
			{/each}
		</tbody>
	</table>
</div>
