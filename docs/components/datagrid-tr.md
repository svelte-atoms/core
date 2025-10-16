# DataGridTr Module

> **Source**: [`src/lib/components/datagrid`](../../src/lib/components/datagrid)

The `DataGridTr` module is a part of the `datagrid` component in the Bond UI library. It provides functionality for managing rows (`tr`) within a data grid, including their state, context, and DOM interactions.

## Overview

This module contains two main classes:

1. **`DataGridTrBond`**: Represents a row in the data grid and manages its lifecycle, context, and DOM properties.
2. **`DataGridTrBondState`**: Manages the state of a data grid row, including its selection and header status.

## Key Features

- **Context Management**: Ensures that rows are used within the appropriate `DataGridBond` context.
- **State Management**: Handles row-specific state, such as selection and header status.
- **DOM Interaction**: Provides methods to attach DOM elements to the row.
- **Lifecycle Hooks**: Includes `mount` and `unmount` methods for managing the row's lifecycle within the data grid.

## Classes

### `DataGridTrBond`

#### Properties

- `CONTEXT_KEY`: A static key used for context management.

#### Methods

- `get datagrid`: Retrieves the parent `DataGridBond` context.
- `share()`: Shares the current row context.
- `mount()`: Mounts the row in the data grid.
- `unmount()`: Unmounts the row from the data grid.
- `props()`: Returns DOM properties for the row.

#### Static Methods

- `getContext`: Retrieves the current row context.
- `setContext`: Sets the current row context.

### `DataGridTrState`

#### Properties

- `CONTEXT_KEY`: A static key used for context management.
- `id`: Retrieves the row's unique identifier.
- `isSelected`: Checks if the row is selected.
- `isHeader`: Checks if the row is a header.
- `datagrid`: Retrieves the parent `DataGridBond` state.

#### Methods

- `select()`: Selects the row.
- `unselect()`: Unselects the row.

## Usage

Rows are used within a `DataGrid.Root` component. See the [DataGrid component](./datagrid.md) for complete usage examples.

```svelte
<script lang="ts">
	import { DataGrid } from '@svelte-atoms/core';
</script>

<DataGrid.Root>
	<DataGrid.Body>
		<DataGrid.Tr value="row-1">
			<DataGrid.Td>Cell 1</DataGrid.Td>
			<DataGrid.Td>Cell 2</DataGrid.Td>
		</DataGrid.Tr>
	</DataGrid.Body>
</DataGrid.Root>
```

## Dependencies

- `Bond` and `BondState` from `$lib/shared/bond.svelte`
- `DataGridBond` from `../bond.svelte`
- `createAttachmentKey` from `svelte/attachments`
- Context utilities from `./context`

## Notes

- Ensure that `DataGridTrBond` is used within a `DataGridBond` context to avoid runtime errors.
- The `DataGridTrState` class provides utility methods for managing row selection and header status.

## License

This module is part of the Atom UI library and is subject to its license terms.
