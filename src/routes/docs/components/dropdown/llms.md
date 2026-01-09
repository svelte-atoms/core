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

Button or element that triggers the dropdown. Can be composed with other components using the `base` prop.

**Preset Key:** `dropdown.trigger`

**Props:**

{{dropdownTriggerProps}}

Key props include:

- `as?: string` - HTML element to render (default: 'button')
- `base?: Component` - Base component to compose with (e.g., Input.Root)

#### `Dropdown.Selections`

Displays selected items as badges/chips (typically in multiple selection mode).

**Preset Key:** `dropdown.selections`

**Props:**

{{dropdownSelectionsProps}}

#### `Dropdown.Placeholder`

Placeholder element shown when no items are selected.

**Preset Key:** `dropdown.placeholder`

**Props:**

{{dropdownPlaceholderProps}}

#### `Dropdown.Content`

Container for dropdown items (re-exported from Menu).

**Preset Key:** `menu.list`

**Props:**

{{dropdownContentProps}}

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

### Basic Example

```svelte
<script lang="ts">
	import { Dropdown } from '@svelte-atoms/core';
	import { Input } from '@svelte-atoms/core';

	let selectedValues = $state<string[]>([]);
</script>

<Dropdown.Root bind:values={selectedValues} multiple>
	<Dropdown.Trigger base={Input.Root}>
		<Dropdown.Selections class="flex flex-wrap gap-1" />
		<Dropdown.Placeholder>No items selected</Dropdown.Placeholder>
	</Dropdown.Trigger>

	<Dropdown.Content>
		<Dropdown.Item value="item1">Item 1</Dropdown.Item>
		<Dropdown.Item value="item2">Item 2</Dropdown.Item>
		<Dropdown.Item value="item3">Item 3</Dropdown.Item>
	</Dropdown.Content>
</Dropdown.Root>
```

### With Filtering

```svelte
<script lang="ts">
	import { Dropdown, filterDropdownData } from '@svelte-atoms/core';
	import { Input } from '@svelte-atoms/core';

	let selectedValues = $state<string[]>([]);
	const items = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' }
	];

	const filteredItems = filterDropdownData(
		() => items,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);
</script>

<Dropdown.Root bind:values={selectedValues} multiple>
	<Dropdown.Trigger base={Input.Root}>
		<Dropdown.Selections class="flex flex-wrap gap-1" />
		<Dropdown.Placeholder>Select items...</Dropdown.Placeholder>
	</Dropdown.Trigger>

	<Dropdown.Content>
		<input
			bind:value={filteredItems.query}
			class="border-b border-border px-4 py-3"
			placeholder="Search items..."
		/>
		{#each filteredItems.current as item (item.value)}
			<Dropdown.Item value={item.value}>{item.label}</Dropdown.Item>
		{/each}
	</Dropdown.Content>
</Dropdown.Root>
```

## Helper Functions

### `filterDropdownData`

A reactive helper function for filtering dropdown data based on a query string. Returns an object with `query` (getter/setter) and `current` (filtered results).

```typescript
import { filterDropdownData } from '@svelte-atoms/core/components/dropdown';

const items = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' }
];

const filtered = filterDropdownData(
	() => items,
	(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
);

// Usage
filtered.query = 'app'; // Set search query
filtered.current; // Returns filtered results: [{ value: 'apple', label: 'Apple' }]
```

## Context Utilities

### `Dropdown.get`

Retrieves the current dropdown context.

### `Dropdown.set`

Sets the dropdown context for child components.

## Dependencies

- `SvelteMap` from `svelte/reactivity`
- `PopoverBond` and `PopoverState` from `$svelte-atoms/core/components/popover/bond.svelte`

## File Structure

- `bond.svelte.ts`: Contains the main `DropdownBond` and `DropdownState` classes.
- `item/bond.svelte.ts`: Defines the `DropdownItemBond` type.

## License

This module is licensed under the MIT License.
