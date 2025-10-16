# DataGrid Module

> **Source**: [`src/lib/components/datagrid`](../../src/lib/components/datagrid)

The `DataGrid` module provides a flexible and powerful implementation for managing and displaying tabular data in a Svelte application. It is built using the `Bond` and `BondState` classes, ensuring a reactive and modular design.

## Features

- **Reactive State Management**: Built on top of `Bond` and `BondState` for seamless reactivity.
- **Customizable Columns and Rows**: Dynamically add, remove, and manage columns and rows.
- **Selection Management**: Supports selecting and unselecting rows.
- **Sortable Columns**: Automatically derive sortable columns based on their properties.
- **Template Support**: Generate templates for column widths.
- **Context Sharing**: Share `DataGrid` state across components using Svelte's context API.

## Classes

### `DataGridBond<T>`

The main class for managing the `DataGrid` state and DOM.

#### Properties

- `CONTEXT_KEY`: A static key used for Svelte's context API.

#### Methods

- `constructor(s: DataGridBondState<T>)`: Initializes the `DataGridBond` with a given state.
- `id`: Returns the unique ID of the `DataGrid`.
- `share()`: Shares the `DataGrid` instance using Svelte's context API.
- `static getContext`: Retrieves the `DataGrid` context.
- `static setContext`: Sets the `DataGrid` context.

### `DataGridBondState<T>`

Manages the state of the `DataGrid`.

#### Properties

- `id`: A unique identifier for the `DataGrid`.
- `rows`: A map of all rows in the `DataGrid`.
- `columns`: A map of all columns in the `DataGrid`.
- `selectedRows`: A derived property for selected rows.
- `sortableColumns`: A derived property for sortable columns.
- `template`: A string representing the column width template.

#### Methods

- `mountColumn(id: string, item: DataGridThBond<I>)`: Adds a column to the `DataGrid`.
- `unmountColumn(id: string)`: Removes a column from the `DataGrid`.
- `mountRow(id: string, item: DataGridTrBond<I>)`: Adds a row to the `DataGrid`.
- `unmountRow(id: string)`: Removes a row from the `DataGrid`.
- `select(ids: string[])`: Selects rows by their IDs.
- `unselect(ids: string[])`: Unselects rows by their IDs.

## Types

### `DataGridStateProps<T>`

Defines the properties for the `DataGridState`.

- `multiple?`: Whether multiple rows can be selected.
- `template?`: A string template for column widths.
- `values?`: An array of selected row IDs.
- `selection?`: An array of selected row data.

### `DataGridDom`

Defines the DOM structure for the `DataGrid`.

- `root`: The root element of the `DataGrid`.
- `header`: The header element of the `DataGrid`.
- `body`: The body element of the `DataGrid`.
- `footer`: The footer element of the `DataGrid`.

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { DataGrid } from '@svelte-atoms/core';

	let selected = $state<string[]>([]);

	const data = [
		{ id: 'row-1', name: 'John', email: 'john@example.com', role: 'Admin' },
		{ id: 'row-2', name: 'Jane', email: 'jane@example.com', role: 'User' },
		{ id: 'row-3', name: 'Bob', email: 'bob@example.com', role: 'User' }
	];
</script>

<DataGrid.Root bind:value={selected} multiple template="1fr 2fr 1fr">
	<DataGrid.Header>
		<DataGrid.Tr>
			<DataGrid.Th sortable>Name</DataGrid.Th>
			<DataGrid.Th sortable>Email</DataGrid.Th>
			<DataGrid.Th>Role</DataGrid.Th>
		</DataGrid.Tr>
	</DataGrid.Header>

	<DataGrid.Body>
		{#each data as row}
			<DataGrid.Tr value={row.id}>
				<DataGrid.Td>{row.name}</DataGrid.Td>
				<DataGrid.Td>{row.email}</DataGrid.Td>
				<DataGrid.Td>{row.role}</DataGrid.Td>
			</DataGrid.Tr>
		{/each}
	</DataGrid.Body>
</DataGrid.Root>
```

## Context API

The `DataGrid` module uses Svelte's context API to share state across components. Use `DataGridBond.getContext` and `DataGridBond.setContext` to retrieve and set the context.

## Dependencies

- `nanoid`: For generating unique IDs.
- `SvelteMap`: A reactive map implementation.

## License

This module is licensed under the MIT License.
