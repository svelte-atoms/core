# DataGridTh Module

> **Source**: [`src/lib/components/datagrid`](../../src/lib/components/datagrid)

The `DataGridTh` module is a part of the `datagrid` component in the Atom UI library. It provides functionality for managing columns (`th`) within a data grid, including their state, context, and DOM interactions.

## Overview

This module contains two main classes:

1. **`DataGridThBond`**: Represents a column in the data grid and manages its lifecycle, context, and DOM properties.
2. **`DataGridThState`**: Manages the state of a data grid column, including its sorting and visibility.

## Key Features

- **Context Management**: Ensures that columns are used within the appropriate `DataGridBond` context.
- **State Management**: Handles column-specific state, such as sorting and visibility.
- **DOM Interaction**: Provides methods to attach DOM elements to the column.
- **Lifecycle Hooks**: Includes `mount` and `unmount` methods for managing the column's lifecycle within the data grid.

## Classes

### `DataGridThBond`

#### Properties

- `CONTEXT_KEY`: A static key used for context management.

#### Methods

- `get isHidden`: Checks if the column is hidden.
- `get index`: Retrieves the column's index within its parent.
- `get text`: Retrieves the column's text content.
- `get datagrid`: Retrieves the parent `DataGridBond` context.
- `share()`: Shares the current column context.
- `mount()`: Mounts the column in the data grid.
- `unmount()`: Unmounts the column from the data grid.
- `props()`: Returns DOM properties for the column.

#### Static Methods

- `getContext`: Retrieves the current column context.
- `setContext`: Sets the current column context.

### `DataGridThState`

#### Properties

- `isSortable`: Checks if the column is sortable.

#### Methods

- `asc()`: Sets the column's sorting direction to ascending.
- `desc()`: Sets the column's sorting direction to descending.

## Usage

Table headers are used within a `DataGrid.Header` component. See the [DataGrid component](./datagrid.md) for complete usage examples.

```svelte
<script lang="ts">
	import { DataGrid } from '@svelte-atoms/core';
</script>

<DataGrid.Root>
	<DataGrid.Header>
		<DataGrid.Th sortable>Column 1</DataGrid.Th>
		<DataGrid.Th sortable>Column 2</DataGrid.Th>
		<DataGrid.Th>Column 3</DataGrid.Th>
	</DataGrid.Header>
</DataGrid.Root>
```

## Dependencies

- `Bond` and `BondState` from `$lib/shared/bond.svelte`
- `DataGridBond` and `DataGridState` from `../bond.svelte`
- `createAttachmentKey` from `svelte/attachments`
- Context utilities from `./context`

## Notes

- Ensure that `DataGridThBond` is used within a `DataGridBond` context to avoid runtime errors.
- The `DataGridThState` class provides utility methods for managing column sorting and visibility.

## License

This module is part of the Atom UI library and is subject to its license terms.
