# Tab Module

> **Source**: [`src/lib/components/tabs`](../../src/lib/components/tabs)

The Tab module provides an implementation for individual tabs within a tabbed navigation system. It integrates seamlessly with the Tabs module to manage tab states, DOM elements, and context sharing.

## Features

- **State Management**: Manage individual tab states using the `TabState` class.
- **DOM Element Management**: Bind DOM elements for tab headers, bodies, and descriptions using the `TabAtom` class.
- **Context Sharing**: Share tab context across components with `getTabContext` and `setTabContext`.
- **Accessibility**: Includes ARIA attributes for better accessibility.

## Installation

To use the Tab module, ensure you have the required dependencies installed in your Svelte project.

```bash
npm install
```

## Usage

Individual tabs are used within a `Tabs.Root` component. See the [Tabs component](./tabs.md) for complete usage examples.

```svelte
<script lang="ts">
	import { Tabs } from '@svelte-atoms/core';
</script>

<Tabs.Root bind:value={selected}>
	<Tabs.Tab value="tab1">
		<Tabs.Tab.Header>Tab 1 Title</Tabs.Tab.Header>
		<Tabs.Tab.Body>
			<p>Content for tab 1</p>
		</Tabs.Tab.Body>
		<Tabs.Tab.Description>Optional description text</Tabs.Tab.Description>
	</Tabs.Tab>
</Tabs.Root>
```

## API Reference

### TabAtom

#### Methods

- `mount()`: Mounts the tab to the parent `TabsAtom`.
- `unmount()`: Unmounts the tab from the parent `TabsAtom`.
- `share()`: Shares the current tab context.
- `header(props: Record<string, unknown>)`: Returns properties for the tab header element.
- `body(props: Record<string, unknown>)`: Returns properties for the tab body element.
- `description(props: Record<string, unknown>)`: Returns properties for the tab description element.

### TabState

#### Methods

- `select()`: Selects the tab.
- `unselect()`: Unselects the tab.

#### Properties

- `isActive`: Returns whether the tab is currently active.

## Types

### TabStateProps

```typescript
type TabStateProps<T, S extends Record<string, unknown> = Record<string, unknown>> = {
	value: string;
	disabled?: boolean;
	data: T;
	extend: S;
};
```

### TabDom

```typescript
type TabDom = {
	header: HTMLElement;
	body: HTMLElement;
	description: HTMLElement;
};
```

## Contributing

Contributions are welcome! Please follow the project's guidelines for submitting issues and pull requests.

## License

This module is licensed under the MIT License.
