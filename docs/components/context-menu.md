# Context Menu Component

> **Source**: [`src/lib/components/context-menu`](../../src/lib/components/context-menu)

The `ContextMenu` component provides a right-click menu for contextual actions. It reuses dropdown and list primitives for content and item behavior, and adds a dedicated trigger that opens the menu at the cursor position.

## Features

- Right-click activation with `contextmenu`
- Cursor-based positioning via a virtual trigger
- Reusable dropdown content and item primitives
- Keyboard navigation and focus management
- Trigger-specific preset support via `context-menu.trigger`
- Optional namespaced list and item presets via `context-menu.content` and `context-menu.item`

## Components

### `ContextMenu.Root`

Provides the shared dropdown state for the context menu.

It inherits `Dropdown.Root`, so props like `open`, `value`, `values`, `multiple`, `disabled`, `placements`, `placement`, `offset`, `keys`, `factory`, and `onquerychange` are available.

### `ContextMenu.Trigger`

Intercepts the browser `contextmenu` event, prevents the native menu, and opens the custom menu at the cursor position.

### `ContextMenu.Content` / `ContextMenu.List`

Render the menu container and list structure.

Default preset: `menu.content`. Pass `preset="context-menu.content"` if you want a context-menu-specific preset namespace.

### `ContextMenu.Item`

Represents an actionable menu item.

Default preset: `dropdown.item`. Pass `preset="context-menu.item"` if you want a context-menu-specific preset namespace.

## Usage

```svelte
<script>
	import { ContextMenu } from '@svelte-atoms/core/context-menu';
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<div>Right-click me</div>
	</ContextMenu.Trigger>

	<ContextMenu.List>
		<ContextMenu.Item preset="context-menu.item" onclick={() => console.log('Edit')}>Edit</ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item" onclick={() => console.log('Delete')}>Delete</ContextMenu.Item>
		<ContextMenu.Divider />
		<ContextMenu.Item preset="context-menu.item" disabled>Disabled Action</ContextMenu.Item>
	</ContextMenu.List>
</ContextMenu.Root>
```

## Presets

Use the following preset keys to customize the component:

- `context-menu.trigger`
- `context-menu.content`
- `context-menu.item`

## Related

- Dropdown
- List
- Popover
