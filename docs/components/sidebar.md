# Sidebar Module

> **Source**: [`src/lib/components/sidebar`](../../src/lib/components/sidebar)

The Sidebar module provides a flexible and reusable implementation of a sidebar component using Svelte. It includes a `SidebarBond` class for managing the state and DOM elements of the sidebar, and a `SidebarBondState` class for handling the sidebar's state transitions.

## Features

- **State Management**: The `SidebarBond` class manages the state and DOM elements of the sidebar.
- **Context Sharing**: Easily share the sidebar's state and context using `getContext` and `setContext` methods.
- **ARIA Attributes**: Automatically sets ARIA attributes for accessibility.
- **Customizable**: Extend the sidebar's properties and behavior using the `SidebarProps` interface.

## Installation

To use the Sidebar module, ensure you have the required dependencies installed in your project. Import the module as needed.

```bash
npm install
```

## Usage

```svelte
<script lang="ts">
	import { Sidebar } from '@svelte-atoms/core';

	let open = $state(false);
</script>

<button onclick={() => (open = !open)}> Toggle Sidebar </button>

<Sidebar.Root bind:open reversed={false}>
	<Sidebar.Content>
		<h2>Sidebar Content</h2>
		<nav>
			<a href="#home">Home</a>
			<a href="#about">About</a>
			<a href="#contact">Contact</a>
		</nav>
	</Sidebar.Content>
</Sidebar.Root>
```

## API Reference

### SidebarProps

The `SidebarProps` interface defines the properties of the sidebar.

| Property   | Type    | Description                      |
| ---------- | ------- | -------------------------------- |
| `open`     | boolean | Whether the sidebar is open.     |
| `disabled` | boolean | Whether the sidebar is disabled. |
| `reversed` | boolean | Whether the sidebar is reversed. |
| `extend`   | T       | Additional properties to extend. |

### SidebarBond

#### Methods

- `root(props: Record<string, unknown> = {})`: Returns attributes for the root element.
- `content(props: Record<string, unknown> = {})`: Returns attributes for the content element.
- `share()`: Shares the sidebar's context.

### SidebarState

#### Methods

- `open()`: Opens the sidebar.
- `close()`: Closes the sidebar.
- `toggle()`: Toggles the sidebar's state.

## Context API

The Sidebar module provides static methods for managing context:

- `SidebarBond.getContext`: Retrieves the sidebar's context.
- `SidebarBond.setContext`: Sets the sidebar's context.

## Accessibility

The Sidebar module includes ARIA attributes to ensure accessibility. For example:

- `aria-expanded`: Indicates whether the sidebar is expanded.
- `aria-disabled`: Indicates whether the sidebar is disabled.

## License

This module is licensed under the MIT License.
