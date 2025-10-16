# Slideover Module

The `slideover` module provides a flexible and composable implementation of a sliding panel component for Svelte applications. It is designed to manage state, accessibility, and DOM structure for sliding panels, enabling developers to create highly customizable and interactive UI components.

---

## Features

- **Composable API:** Modular components for building sliding panels with headers, footers, content, and more.
- **State Management:** Built-in state management for open, close, and toggle actions.
- **Accessibility:** ARIA attributes for improved accessibility.
- **Context Sharing:** Uses Svelte's context API for seamless communication between components.
- **Type Safety:** Fully typed with TypeScript for robust development.
- **Customizable:** Easily extendable with custom properties and behaviors.

---

## Components

The `slideover` module includes the following components:

1. **Root**: The main container for the slideover.
2. **Content**: The content area of the slideover.
3. **Header**: The header section of the slideover.
4. **Body**: The body section of the slideover.
5. **Footer**: The footer section of the slideover.
6. **Title**: The title element for the slideover.
7. **Description**: The description element for the slideover.

---

## API

### `SlideoverAtom`

The `SlideoverAtom` class manages the state and DOM elements of the slideover.

#### Methods

- **`root(props: Record<string, unknown>)`**: Returns properties for the root element.
- **`content(props: Record<string, unknown>)`**: Returns properties for the content element.
- **`header(props: Record<string, unknown>)`**: Returns properties for the header element.
- **`body(props: Record<string, unknown>)`**: Returns properties for the body element.
- **`footer(props: Record<string, unknown>)`**: Returns properties for the footer element.
- **`title(props: Record<string, unknown>)`**: Returns properties for the title element.
- **`description(props: Record<string, unknown>)`**: Returns properties for the description element.
- **`share()`**: Shares the atom instance via Svelte's context API.

---

### `SlideoverState`

The `SlideoverState` class manages the state of the slideover.

#### Methods

- **`open()`**: Opens the slideover.
- **`close()`**: Closes the slideover.
- **`toggle()`**: Toggles the open state of the slideover.

---

### Attachments

The module provides utility functions for attaching behaviors to DOM elements:

- **`slideoverAtom(callback)`**: Attaches a callback to the slideover atom.
- **`toggleSlideover(onclick)`**: Toggles the slideover on click.
- **`openSlideover(onclick)`**: Opens the slideover on click.
- **`closeSlideover(onclick)`**: Closes the slideover on click.
- **`clickoutSlideover(onclickout)`**: Closes the slideover when clicking outside.

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Slideover } from '$lib/atoms/slideover';

	let isOpen = false;
</script>

<Slideover.Root bind:open={isOpen} class="slideover">
	<Slideover.Header>
		<Slideover.Title>Slideover Title</Slideover.Title>
		<Slideover.Description>Slideover Description</Slideover.Description>
	</Slideover.Header>
	<Slideover.Content>
		<p>This is the content of the slideover.</p>
	</Slideover.Content>
	<Slideover.Footer>
		<button on:click={() => (isOpen = false)}>Close</button>
	</Slideover.Footer>
</Slideover.Root>
```
