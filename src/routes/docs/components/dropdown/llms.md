# Dropdown Module

The Dropdown module provides a flexible and reusable dropdown component built with Svelte. It is designed to handle both single and multiple selection scenarios, with support for advanced features like item highlighting and context management.

## Features

- **Single and Multiple Selection**: Supports both single and multiple item selection modes.
- **Highlighting**: Allows navigation and highlighting of dropdown items.
- **Context Management**: Provides context utilities for managing dropdown state.
- **Dynamic Item Management**: Dynamically add or remove items from the dropdown.

## Components

The dropdown is built using a modular component architecture:

### `Dropdown.Root` (Root Component)

The main dropdown container that manages the overall state.

**Preset Key:** `dropdown`

**Props:**

{{dropdownRootProps}}

### Dropdown Sub-Components

#### `Dropdown.Trigger`

Button or element that triggers the dropdown.

**Preset Key:** `dropdown.trigger`

**Props:**

{{dropdownTriggerProps}}

#### `Dropdown.Value`

Displays the currently selected value(s).

**Preset Key:** `dropdown.value`

**Props:**

{{dropdownValueProps}}

#### `Dropdown.Content`

Container for dropdown items.

**Preset Key:** `Dropdown.Content`

**Props:**

{{dropdownListProps}}

#### `Dropdown.Item`

Individual dropdown item.

**Preset Key:** `dropdown.item`

**Props:**

{{dropdownItemProps}}

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

	<Dropdown.Content>
		<Dropdown.Item value="item1">Item 1</Dropdown.Item>
		<Dropdown.Item value="item2">Item 2</Dropdown.Item>
		<Dropdown.Item value="item3">Item 3</Dropdown.Item>
	</Dropdown.Content>
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
