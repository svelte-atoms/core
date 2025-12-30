# Combobox Module

The `Combobox` module provides a flexible and accessible combobox component built using Svelte. It extends the functionality of the `Dropdown` module and integrates with the `Popover` module for enhanced UI interactions.

## Features

- Fully accessible with ARIA attributes
- Keyboard navigation support (Arrow keys, Escape, Enter)
- Single and multiple selection modes
- Custom filtering with `Query` component
- Selection management with `Selections` component
- Integration with `Dropdown` and `Popover` modules
- Composable with `Input` component for flexible styling

## Installation

Ensure you have the required dependencies installed in your project. Then, import the `Combobox` module as needed.

```typescript
import { Combobox } from '@svelte-atoms/core';
```

## Components

### Combobox.Root

Root container for the combobox system. Manages the state and context for all child components.

**Preset Key:** `combobox`

**Props:**

{{comboboxRootProps}}

### Combobox.Trigger

Button or element that triggers the combobox dropdown. Can be composed with other components using the `base` prop.

**Preset Key:** `dropdown.trigger` (inherits from Dropdown)

**Props:**

{{comboboxTriggerProps}}

Inherits all props from Dropdown.Trigger

### Combobox.Control

Input field for filtering and selection. Automatically manages ARIA attributes for accessibility.

**Preset Key:** `combobox.control`

**Props:**

{{comboboxControlProps}}

### Combobox.List

Container for combobox items. Re-exported from Dropdown.List component.

**Preset Key:** `dropdown.list`

**Props:**

Inherits all props from Dropdown.List

### Combobox.Item

Individual combobox item. Handles selection and display of option values.

**Preset Key:** `combobox.item`

**Props:**

Inherits all props from Dropdown.Item

### Combobox.Selections

Displays selected items in multiple selection mode. Shows tags/chips for each selected value.

**Preset Key:** `dropdown.selections`

**Props:**

{{comboboxSelectionsProps}}

### Combobox.Selection

Individual selection item within Selections component.

**Preset Key:** `dropdown.selection`

**Props:**

{{comboboxSelectionProps}}

### Combobox.Query

Input field for filtering items in the dropdown list.

**Preset Key:** `dropdown.query`

**Props:**

Inherits all props from Dropdown.Query

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Combobox } from '@svelte-atoms/core';
	import { Input } from '@svelte-atoms/core';

	let value = $state<string | undefined>();
	const options = ['Option 1', 'Option 2', 'Option 3'];
</script>

<Combobox.Root bind:value>
	<Combobox.Trigger base={Input.Root}>
		<Combobox.Control placeholder="Select an option..." />
	</Combobox.Trigger>

	<Combobox.List>
		{#each options as option}
			<Combobox.Item value={option}>{option}</Combobox.Item>
		{/each}
	</Combobox.List>
</Combobox.Root>
```

### Multiple Selection

The bond class that manages the combobox state and interactions. Extends `DropdownBond`.

#### Methods

- `control(): Record<string, unknown>`
  - Returns the properties to bind to the control/input element
  - Includes ARIA attributes and keyboard handlers
  - Automatically manages focus and selection state

#### Properties

- `state: ComboboxBondState` - The state instance managing the combobox data

### `ComboboxBondState`

The state class that manages combobox data. Extends `DropdownBondState`.

#### Key Properties

- `props.open: boolean` - Whether the dropdown is open
- `props.value: unknown` - Current selected value (single mode)
- `props.values: unknown[]` - Current selected values (multiple mode)
- `props.text: string` - Text representation of selected item
- `props.control: string` - Current input control value
- `props.multiple: boolean` - Whether multiple selection is enabled
- `props.disabled: boolean` - Whether the combobox is disabled

#### Methods

- `addSelection(text: string): void` - Add a user-defined selection
- `deleteSelection(id: string): void` - Remove a user-defined selection
- `userSelections: ComboboxSelection[]` - Get user-created selections
- `allSelections: ComboboxSelection[]` - Get all selections (items + user-created)ents/dropdown';

```svelte
<script lang="ts">
	let value = $state<string | undefined>();
	let options = [
		{ value: 'usd', label: 'US Dollar' },
		{ value: 'eur', label: 'Euro' },
		{ value: 'gbp', label: 'British Pound' }
	];

	const filteredItems = filter(
		() => options,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);
</script>

<Combobox.Root bind:value>
	<Combobox.Trigger base={Input.Root}>
		<Combobox.Control placeholder="Select a currency..." />
	</Combobox.Trigger>

	<Combobox.List>
		<Combobox.Query bind:value={filteredItems.query} placeholder="Type to filter..." />
		{#each filteredItems.current as item (item.value)}
			<Combobox.Item value={item.value}>{item.label}</Combobox.Item>
		{/each}
	</Combobox.List>
</Combobox.Root>
```

## API

### `ComboboxBond`

#### Constructor

```typescript
new ComboboxBond<T>(state: ComboboxState<T>)
```

- `state`: The state object for the combobox.

#### Methods

- `input(props: Record<string, unknown>): Record<string, unknown>`
  - Returns the properties to bind to the input element.

### `ComboboxState`

#### Constructor

```typescript
new ComboboxState<T>(props: () => ComboboxStateProps)
```

- `props`: A function returning the state properties.

#### Properties

- `value: string`
  - The current value of the combobox.
- `query: string`
  - The current query string entered in the input.

## Keyboard Support

- **ArrowDown/ArrowUp**: Navigate through dropdown items
- **Escape**: Close the dropdown
- **Enter**:
  - In Control: Add custom selection (if input has text)
  - In List: Select the highlighted item
- **Tab**: Move focus and close dropdown
- **Space**: Toggle item selection (when focused on an item)

## Accessibility

The `Combobox` module is designed with accessibility in mind:

- **ARIA Attributes**:
  - `role="combobox"` on the control element
  - `aria-autocomplete="list"` for autocomplete behavior
  - `aria-expanded` reflects the dropdown state
  - `aria-controls` links to the dropdown list
  - `aria-activedescendant` tracks the focused item
  - `aria-disabled` reflects the disabled state

- **Keyboard Navigation**: Full keyboard support for navigation and selection
- **Focus Management**: Proper focus handling for accessibility
- **Screen Reader Support**: Announcements for state changes and selections

## License

This module is licensed under the MIT License.
