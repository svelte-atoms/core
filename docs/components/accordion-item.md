# Accordion Item Module

> **Source**: [`src/lib/components/accordion/item`](../../src/lib/components/accordion/item)

The `Accordion Item` module provides the implementation for individual items within an accordion. It works in conjunction with the `Accordion` module to manage the state and behavior of each accordion item.

## Features

- **State Management**: Handles the open/close state of individual accordion items.
- **Accessibility**: Provides ARIA attributes for better accessibility.
- **Integration**: Seamlessly integrates with the `Accordion` module.

## Classes

### `AccordionItemBond`

The `AccordionItemBond` class manages the DOM elements and state of an individual accordion item.

#### Methods

- `constructor(state: AccordionItemState)`: Initializes the accordion item with the given state.
- `share()`: Shares the accordion item context.
- `root(props: Record<string, unknown>)`: Returns an object with ARIA attributes and other properties for the root element.
- `header(props: Record<string, unknown>)`: Returns an object with ARIA attributes and other properties for the header element.
- `body(props: Record<string, unknown>)`: Returns an object with ARIA attributes and other properties for the body element.
- `indicator(props: Record<string, unknown>)`: Returns an object with ARIA attributes and other properties for the indicator element.
- `static getContext`: Retrieves the accordion item context.
- `static setContext`: Sets the accordion item context.

### `AccordionItemState`

The `AccordionItemState` class manages the state of an individual accordion item.

#### Properties

- `CONTEXT_KEY`: A static key used for context management.
- `#accordion`: A private reference to the parent accordion state.

#### Methods

- `constructor(props: () => AccordionItemStateProps)`: Initializes the state with the given properties.
- `get id`: Returns the ID of the accordion item.
- `get accordionId`: Returns the ID of the parent accordion.
- `get isOpen`: Returns whether the item is open.
- `get isActive`: Returns whether the item is active.
- `get accordion`: Returns the parent accordion state.
- `mount()`: Mounts the accordion item.
- `unmount()`: Unmounts the accordion item.
- `open()`: Opens the accordion item.
- `close()`: Closes the accordion item.
- `toggle()`: Toggles the open/close state of the accordion item.

## Types

### `AccordionItemStateProps`

Defines the properties for the accordion item state.

- `value`: The value of the accordion item.
- `open`: Whether the item is open.
- `disabled`: Whether the item is disabled.

### `AccordionItemDomElements`

Defines the DOM elements used by the accordion item.

- `root`: The root element of the accordion item.
- `header`: The header element of the accordion item.
- `body`: The body element of the accordion item.
- `indicator`: The indicator element of the accordion item.

## Usage

### Basic Example

```svelte
<script>
	import { Accordion } from '@svelte-atoms/core';
</script>

<Accordion.Root>
	<Accordion.Item value="item-1">
		<Accordion.Item.Header>
			<button>Accordion Header</button>
		</Accordion.Item.Header>
		<Accordion.Item.Body>
			<div>Accordion content goes here</div>
		</Accordion.Item.Body>
	</Accordion.Item>
</Accordion.Root>
```

### Multiple Items

```svelte
<script>
	import { Accordion } from '@svelte-atoms/core';
</script>

<Accordion.Root>
	<Accordion.Item value="item-1">
		<Accordion.Item.Header>First Item</Accordion.Item.Header>
		<Accordion.Item.Body>First item content</Accordion.Item.Body>
	</Accordion.Item>

	<Accordion.Item value="item-2">
		<Accordion.Item.Header>Second Item</Accordion.Item.Header>
		<Accordion.Item.Body>Second item content</Accordion.Item.Body>
	</Accordion.Item>
</Accordion.Root>
```

## Context Management

The `AccordionItemBond` class provides static methods for managing context:

- `AccordionItemBond.getContext`: Retrieves the current accordion item context.
- `AccordionItemBond.setContext`: Sets the accordion item context.

## License

This module is licensed under the MIT License.
