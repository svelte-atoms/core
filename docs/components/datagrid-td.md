# DataGridTd Module

> **Source**: [`src/lib/components/datagrid`](../../src/lib/components/datagrid)

The `DataGridTd` module is a part of the `datagrid` component in the Atom UI library. It provides functionality for managing cells (`td`) within a data grid, including their state, context, and DOM interactions.

## Overview

This module contains two main classes:

1. **`DataGridThBond`**: Represents a cell in the data grid and manages its lifecycle, context, and DOM properties.
2. **`DataGridThState`**: Manages the state of a data grid cell, including its sorting and associated data.

## Key Features

- **Context Management**: Ensures that cells are used within the appropriate `DataGridBond` context.
- **State Management**: Handles cell-specific state, such as sorting and associated data.
- **DOM Interaction**: Provides methods to attach DOM elements to the cell.
- **Lifecycle Hooks**: Includes `mount` and `unmount` methods for managing the cell's lifecycle within the data grid.

## Classes

### `DataGridThBond`

#### Properties

- `CONTEXT_KEY`: A static key used for context management.

#### Methods

- `share()`: Shares the current cell context.
- `mount()`: Mounts the cell in the data grid.
- `unmount()`: Unmounts the cell from the data grid.

#### Static Methods

- `getContext`: Retrieves the current cell context.
- `setContext`: Sets the current cell context.

### `DataGridThState`

#### Properties

- `#datagrid`: The parent `DataGridState` instance.

#### Constructor

- Accepts a function returning `DataGridThStateProps` to initialize the state.

## Usage

Table cells are used within a `DataGrid.Tr` component. See the [DataGrid component](./datagrid.md) for complete usage examples.

```svelte
<script lang="ts">
	import { DataGrid } from '@svelte-atoms/core';
</script>

<DataGrid.Root>
	<DataGrid.Body>
		<DataGrid.Tr value="row-1">
			<DataGrid.Td>Cell Data 1</DataGrid.Td>
			<DataGrid.Td>Cell Data 2</DataGrid.Td>
			<DataGrid.Td>Cell Data 3</DataGrid.Td>
		</DataGrid.Tr>
	</DataGrid.Body>
</DataGrid.Root>
```

## Dependencies

- `DataGridBond` and `DataGridState` from `../bond.svelte`
- Svelte's context API

## Notes

- Ensure that `DataGridThBond` is used within a `DataGridBond` context to avoid runtime errors.
- The `DataGridThState` class provides utility methods for managing cell sorting and associated data.

## License

This module is part of the Atom UI library and is subject to its license terms.
