# Dropdown Item Module

> **Source**: [`src/lib/components/dropdown`](../../src/lib/components/dropdown)

The Dropdown Item module provides the `DropdownItemBond` and `DropdownItemState` classes, which are used to manage individual items within a dropdown component. These classes integrate seamlessly with the `DropdownBond` and `DropdownState` from the Dropdown module.

## Features

- **Context-Aware**: Ensures that dropdown items are used within a valid dropdown context.
- **State Management**: Manages the state of individual dropdown items, including selection and highlighting.
- **Dynamic Mounting**: Supports dynamic addition and removal of items from the dropdown.
- **Utility Methods**: Provides methods for toggling, selecting, and unselecting items.

## Components

### `DropdownItemBond`

The `DropdownItemBond` class extends the `Bond` class and represents an individual item in the dropdown.

#### Static Methods

- `getContext`: Retrieves the dropdown item context.
- `setContext`: Sets the dropdown item context.

#### Properties

- `text`: Returns the text content of the dropdown item.
- `dropdown`: Returns the parent dropdown instance.

#### Methods

- `mount()`: Mounts the item to the dropdown.
- `unmount()`: Unmounts the item from the dropdown.
- `share()`: Shares the current dropdown item context.

### `DropdownItemState`

The `DropdownItemState` class extends the `BondState` class and manages the state of an individual dropdown item.

#### Properties

- `isSelected`: Indicates whether the item is selected.
- `isHighlighted`: Indicates whether the item is highlighted.
- `dropdown`: Returns the parent dropdown state.

#### Methods

- `select()`: Selects the item.
- `unselect()`: Unselects the item.
- `toggle()`: Toggles the selection state of the item.
- `close()`: Closes the dropdown.

## Usage

### Importing

```typescript
import { Dropdown } from '@svelte-atoms/core';
```

### Example

Individual items are used within a `Dropdown.Root` component. See the [Dropdown component](./dropdown.md) for complete usage examples.

```svelte
<script lang="ts">
	import { Dropdown } from '@svelte-atoms/core';
</script>

<Dropdown.Root>
	<Dropdown.List>
		<Dropdown.Item value="item1">Item 1</Dropdown.Item>
		<Dropdown.Item value="item2">Item 2</Dropdown.Item>
		<Dropdown.Item value="item3">Item 3</Dropdown.Item>
	</Dropdown.List>
</Dropdown.Root>
```

## Context Utilities

### `getDropdownItemContext`

Retrieves the current dropdown item context.

### `setDropdownItemContext`

Sets the dropdown item context for child components.

## Dependencies

- `Bond` and `BondState` from `$lib/shared/bond.svelte`
- `DropdownBond` and `DropdownState` from `../bond.svelte`

## File Structure

- `bond.svelte.ts`: Contains the main `DropdownItemBond` and `DropdownItemState` classes.
- `context.ts`: Provides context management utilities for dropdown items.

## License

This module is licensed under the MIT License.
