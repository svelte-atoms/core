# Dropdown Module

> **Source**: [`src/lib/components/dropdown`](../../src/lib/components/dropdown)

The Dropdown module provides a flexible and reusable dropdown component built with Svelte. It is designed to handle both single and multiple selection scenarios, with support for advanced features like item highlighting and context management.

## Features

- **Single and Multiple Selection**: Supports both single and multiple item selection modes.
- **Highlighting**: Allows navigation and highlighting of dropdown items.
- **Context Management**: Provides context utilities for managing dropdown state.
- **Dynamic Item Management**: Dynamically add or remove items from the dropdown.

## Components

### `DropdownBond`

The `DropdownBond` class extends the `PopoverBond` and provides the core functionality for the dropdown component.

#### Static Methods

- `getContext`: Retrieves the dropdown context.
- `setContext`: Sets the dropdown context.

### `DropdownState`

The `DropdownState` class extends the `PopoverState` and manages the state of the dropdown.

#### Properties

- `selectedItems`: Returns the currently selected items.
- `highlightedItem`: Returns the currently highlighted item.

#### Methods

- `mountItem(id: string, item: DropdownItemBond)`: Adds an item to the dropdown.
- `unmountItem(id: string)`: Removes an item from the dropdown.
- `select(ids: string[])`: Selects one or more items.
- `unselect(ids: string[])`: Unselects one or more items.
- `highlightNextItem()`: Highlights the next item in the dropdown.
- `highlightPreviousItem()`: Highlights the previous item in the dropdown.

## Usage

### Importing

```typescript
import { Dropdown } from '@svelte-atoms/core';
```

### Example

```svelte
<script lang="ts">
	let selected = $state<string[]>([]);
</script>

<Dropdown.Root bind:value={selected} multiple>
	<Dropdown.Trigger>
		<Dropdown.Value />
	</Dropdown.Trigger>

	<Dropdown.List>
		<Dropdown.Item value="item1">Item 1</Dropdown.Item>
		<Dropdown.Item value="item2">Item 2</Dropdown.Item>
		<Dropdown.Item value="item3">Item 3</Dropdown.Item>
	</Dropdown.List>
</Dropdown.Root>
```

## Context Utilities

### `getDropdownContext`

Retrieves the current dropdown context.

### `setDropdownContext`

Sets the dropdown context for child components.

## Dependencies

- `SvelteMap` from `svelte/reactivity`
- `PopoverBond` and `PopoverState` from `$svelte-atoms/core/components/popover/bond.svelte`

## File Structure

- `bond.svelte.ts`: Contains the main `DropdownBond` and `DropdownState` classes.
- `context.ts`: Provides context management utilities.
- `item/bond.svelte.ts`: Defines the `DropdownItemBond` type.

## License

This module is licensed under the MIT License.
