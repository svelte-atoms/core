# Tabs Module

> **Source**: [`src/lib/components/tabs`](../../src/lib/components/tabs)

The Tabs module provides a flexible and accessible implementation of tabbed navigation for Svelte applications. It includes utilities for managing tab states, DOM elements, and context sharing.

## Features

- **State Management**: Manage tab states using the `TabsBondState` class.
- **DOM Element Management**: Easily bind DOM elements for tabs, headers, and bodies using the `TabsAtom` class.
- **Context Sharing**: Share tab context across components with `getTabsContext` and `setTabsContext`.
- **Accessibility**: Includes ARIA attributes for better accessibility.

## Installation

To use the Tabs module, ensure you have the required dependencies installed in your Svelte project.

```bash
npm install
```

## Usage

```svelte
<script lang="ts">
	import { Tabs } from '@svelte-atoms/core';

	let selected = $state('tab1');
</script>

<Tabs.Root bind:value={selected}>
	<Tabs.Header>
		<Tabs.Tab value="tab1">
			<Tabs.Tab.Header>Tab 1</Tabs.Tab.Header>
		</Tabs.Tab>
		<Tabs.Tab value="tab2">
			<Tabs.Tab.Header>Tab 2</Tabs.Tab.Header>
		</Tabs.Tab>
		<Tabs.Tab value="tab3">
			<Tabs.Tab.Header>Tab 3</Tabs.Tab.Header>
		</Tabs.Tab>
	</Tabs.Header>

	<Tabs.Body>
		<Tabs.Tab value="tab1">
			<Tabs.Tab.Body>Content for Tab 1</Tabs.Tab.Body>
		</Tabs.Tab>
		<Tabs.Tab value="tab2">
			<Tabs.Tab.Body>Content for Tab 2</Tabs.Tab.Body>
		</Tabs.Tab>
		<Tabs.Tab value="tab3">
			<Tabs.Tab.Body>Content for Tab 3</Tabs.Tab.Body>
		</Tabs.Tab>
	</Tabs.Body>
</Tabs.Root>
```

## API Reference

### TabsAtom

#### Methods

- `share()`: Shares the current tab context.
- `root(props: Record<string, unknown>)`: Returns properties for the root tab element.
- `header(props: Record<string, unknown>)`: Returns properties for the header element.
- `body(props: Record<string, unknown>)`: Returns properties for the body element.

### TabsBondState

#### Methods

- `mountItem(id: string, item: TabAtom)`: Mounts a tab item.
- `unmountItem(id: string)`: Unmounts a tab item.
- `select(id: string)`: Selects a tab by ID.
- `unselect()`: Unselects the currently selected tab.

## Types

### TabsStateProps

```typescript
type TabsStateProps<T extends Record<string, unknown> = Record<string, unknown>> = {
	value?: string;
	multiple?: boolean;
	extend: T;
};
```

### TabsDom

```typescript
type TabsDom = {
	root: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
};
```

## Contributing

Contributions are welcome! Please follow the project's guidelines for submitting issues and pull requests.

## License

This module is licensed under the MIT License.
