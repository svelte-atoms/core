<script lang="ts">
	import { DataGrid } from '$lib/components/datagrid';
</script>

<div class="w-full max-w-xs">
	<DataGrid.Root class="text-xs w-full">
		<DataGrid.Header>
			<DataGrid.Row header>
				<DataGrid.Column>Name</DataGrid.Column>
				<DataGrid.Column>Role</DataGrid.Column>
				<DataGrid.Column>Status</DataGrid.Column>
			</DataGrid.Row>
		</DataGrid.Header>
		<DataGrid.Body>
			<DataGrid.Row value="1">
				<DataGrid.Td>Alice</DataGrid.Td>
				<DataGrid.Td>Admin</DataGrid.Td>
				<DataGrid.Td>Active</DataGrid.Td>
			</DataGrid.Row>
			<DataGrid.Row value="2">
				<DataGrid.Td>Bob</DataGrid.Td>
				<DataGrid.Td>Editor</DataGrid.Td>
				<DataGrid.Td>Idle</DataGrid.Td>
			</DataGrid.Row>
		</DataGrid.Body>
	</DataGrid.Root>
</div>
