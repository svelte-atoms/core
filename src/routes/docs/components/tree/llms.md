# Tree Module

The Tree module provides a hierarchical structure for organizing and displaying data in a tree-like format. It includes utilities for managing tree states, DOM elements, and context sharing.

## Features

- **State Management**: Manage tree states using the `TreeState` class.
- **DOM Element Management**: Bind DOM elements for tree roots, headers, bodies, and indicators using the `TreeAtom` class.
- **Context Sharing**: Share tree context across components with `getTreeContext` and `setTreeContext`.
- **Accessibility**: Includes ARIA attributes for better accessibility.

## Components

### Tree.Root

Root tree node container.

**Preset Key:** `tree`

**Props:**

{{treeRootProps}}

### Tree.Header

Header section of a tree node.

**Preset Key:** `tree.header`

**Props:**

{{treeHeaderProps}}

### Tree.Body

Body section containing child nodes.

**Preset Key:** `tree.body`

**Props:**

{{treeBodyProps}}

### Tree.Indicator

Visual indicator for expandable nodes.

**Preset Key:** `tree.indicator`

**Props:**

{{treeIndicatorProps}}

## Installation

To use the Tree module, ensure you have the required dependencies installed in your Svelte project.

```bash
npm install
```

## Usage

```svelte
<script lang="ts">
	import { Tree } from '@svelte-atoms/core';

	let openNodes = $state<string[]>([]);
</script>

<Tree.Root value="root" bind:open={openNodes}>
	<Tree.Header>
		<Tree.Indicator />
		<span>Root Folder</span>
	</Tree.Header>
	<Tree.Body>
		<Tree value="folder1" bind:open={openNodes}>
			<Tree.Header>
				<Tree.Indicator />
				<span>Folder 1</span>
			</Tree.Header>
			<Tree.Body>
				<div>File 1.txt</div>
				<div>File 2.txt</div>
			</Tree.Body>
		</Tree>

		<Tree value="folder2" bind:open={openNodes}>
			<Tree.Header>
				<Tree.Indicator />
				<span>Folder 2</span>
			</Tree.Header>
			<Tree.Body>
				<div>File 3.txt</div>
			</Tree.Body>
		</Tree>
	</Tree.Body>
</Tree.Root>
```

## API Reference

### TreeAtom

#### Methods

- `share()`: Shares the current tree context.
- `root(props: Record<string, unknown>)`: Returns properties for the root tree element.
- `header(props: Record<string, unknown>)`: Returns properties for the tree header element.
- `body(props: Record<string, unknown>)`: Returns properties for the tree body element.
- `indicator(props: Record<string, unknown>)`: Returns properties for the tree indicator element.

### TreeState

#### Methods

- `open()`: Opens the tree.
- `close()`: Closes the tree.
- `toggle()`: Toggles the open/closed state of the tree.

## Types

### TreeStateProps

```typescript
type TreeStateProps = StateProps & {
	open: boolean;
	disabled: boolean;
};
```

### TreeDomElements

```typescript
type TreeDomElements = {
	root: HTMLDialogElement;
	header: HTMLElement;
	body: HTMLElement;
	indicator: HTMLElement;
};
```

## Contributing

Contributions are welcome! Please follow the project's guidelines for submitting issues and pull requests.

## License

This module is licensed under the MIT License.
