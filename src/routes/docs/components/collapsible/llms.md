# Collapsible Module

The `Collapsible` module provides a flexible and accessible way to create collapsible components in your Svelte application. It is built using the `CollapsibleBond` and `CollapsibleState` classes, which manage the state and DOM elements of the collapsible component.

## Features

- Fully accessible with ARIA attributes.
- Supports nested collapsibles with parent-child relationships.
- Customizable DOM elements for root, header, body, and indicator.
- Easy state management with `CollapsibleState`.

## Components

### `Collapsible.Root` (Root Component)

The main collapsible container that manages the state.

**Preset Key:** `collapsible`

**Props:**

{{collapsibleRootProps}}

### `Collapsible.Header`

Clickable header section that toggles the collapsible.

**Preset Key:** `collapsible.header`

**Props:**

{{collapsibleHeaderProps}}

### `Collapsible.Body`

Collapsible content section.

**Preset Key:** `collapsible.body`

**Props:**

{{collapsibleBodyProps}}

### `Collapsible.Indicator`

Visual indicator showing the open/closed state.

**Preset Key:** `collapsible.indicator`

**Props:**

{{collapsibleIndicatorProps}}

## Installation

To use the `Collapsible` module, ensure you have the necessary dependencies installed in your project. Import the required classes and functions from the module.

```svelte
<script>
	import { Collapsible } from '@svelte-atoms/core';
</script>
```

## Usage

### Basic Example

```svelte
<script>
	import { Collapsible } from '@svelte-atoms/core';

	let open = $state(false);
</script>

<Collapsible.Root bind:open>
	<Collapsible.Header>
		<button>Toggle Content</button>
		<Collapsible.Indicator />
	</Collapsible.Header>
	<Collapsible.Body>
		<div>Collapsible content goes here</div>
	</Collapsible.Body>
</Collapsible.Root>
```

### Controlled Collapsible

```svelte
<script>
	import { Collapsible } from '@svelte-atoms/core';

	let open = $state(false);
</script>

<button onclick={() => (open = !open)}> Toggle from outside </button>

<Collapsible.Root bind:open>
	<Collapsible.Header>Click to toggle</Collapsible.Header>
	<Collapsible.Body>
		<div>This content is {open ? 'open' : 'closed'}</div>
	</Collapsible.Body>
</Collapsible.Root>
```

## API

### `CollapsibleBond`

#### Properties

- `parent`: Returns the parent `CollapsibleBond` if nested.

#### Methods

- `share()`: Shares the current context.
- `root(props: Record<string, unknown>)`: Returns props for the root element.
- `header(props: Record<string, unknown>)`: Returns props for the header element.
- `body(props: Record<string, unknown>)`: Returns props for the body element.
- `indicator(props: Record<string, unknown>)`: Returns props for the indicator element.

### `CollapsibleState`

#### Methods

- `isOpen`: Returns whether the collapsible is open.
- `open()`: Opens the collapsible.
- `close()`: Closes the collapsible.
- `toggle()`: Toggles the open state of the collapsible.

## Accessibility

The `Collapsible` module is designed with accessibility in mind. It uses ARIA attributes to ensure that the collapsible components are usable by assistive technologies.

### ARIA Attributes

- `aria-expanded`: Indicates whether the collapsible is open.
- `aria-controls`: Links the header to the body.
- `aria-hidden`: Hides the body when the collapsible is closed.
- `role`: Defines the role of elements (e.g., `region`, `button`, `icon`).

## Context Management

The `CollapsibleBond` uses a context-based approach to manage nested collapsibles. Use `CollapsibleBond.getContext` and `CollapsibleBond.setContext` to manage the context.

## License

This module is licensed under the MIT License.
