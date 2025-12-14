# Combobox Module

The `Combobox` module provides a flexible and accessible combobox component built using Svelte. It extends the functionality of the `Dropdown` module and integrates with the `Popover` module for enhanced UI interactions.

## Features

- Fully accessible with ARIA attributes.
- Keyboard navigation support (Arrow keys, Escape, Enter).
- Customizable input and dropdown behavior.
- Integration with `Dropdown` and `Popover` modules.

## Installation

Ensure you have the required dependencies installed in your project. Then, import the `Combobox` module as needed.

```typescript
import { ComboboxBond, ComboboxState } from '@svelte-atoms/core';
```

## Components

### Combobox.Root

Root container for the combobox system.

**Preset Key:** `combobox`

**Props:**

{{comboboxRootProps}}

### Combobox.Trigger

Button or element that triggers the combobox dropdown.

**Preset Key:** `combobox.trigger`

**Props:**

{{comboboxTriggerProps}}

### Combobox.Input

Input field for filtering and selection.

**Preset Key:** `combobox.input`

**Props:**

{{comboboxInputProps}}

### Combobox.List

Container for combobox items.

**Preset Key:** `combobox.list`

**Props:**

{{comboboxListProps}}

### Combobox.Item

Individual combobox item.

**Preset Key:** `combobox.item`

**Props:**

{{comboboxItemProps}}

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Combobox } from '@svelte-atoms/core';

	let selected = $state<string[]>([]);
	let query = $state('');
</script>

<Combobox.Root bind:value={selected} bind:query>
	<Combobox.Trigger>
		<Combobox.Input placeholder="Select an option..." />
	</Combobox.Trigger>

	<Combobox.List>
		<Combobox.Item value="option1">Option 1</Combobox.Item>
		<Combobox.Item value="option2">Option 2</Combobox.Item>
		<Combobox.Item value="option3">Option 3</Combobox.Item>
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

- **ArrowDown/ArrowUp**: Navigate through dropdown items.
- **Escape**: Close the dropdown.
- **Enter**: Select the highlighted item.

## Accessibility

The `Combobox` module is designed with accessibility in mind. It includes ARIA attributes such as `aria-expanded`, `aria-controls`, `aria-activedescendant`, and `aria-disabled` to ensure compatibility with assistive technologies.

## License

This module is licensed under the MIT License.
