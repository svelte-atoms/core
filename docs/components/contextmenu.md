# Contextmenu Component

> **Source**: [`src/lib/components/contextmenu`](../../src/lib/components/contextmenu)

The `Contextmenu` component provides a right-click context menu with customizable items and actions.

## Features

- Right-click activated menu
- Customizable menu items
- Position management
- Keyboard navigation support
- Bond-based state management

## Components

### `Contextmenu.Root`

Root container for the context menu system.

**Props:** See [`ContextmenuRootProps`](../../src/lib/components/contextmenu/contextmenu-root.svelte)

Key props:

- `factory?: (props: ContextmenuBondProps) => ContextmenuBond` - Custom factory function
- `children?: Snippet` - Content renderer

### `Contextmenu.Trigger`

Element that triggers the context menu on right-click.

**Props:** See [`ContextmenuTriggerProps`](../../src/lib/components/contextmenu/contextmenu-trigger.svelte)

Key props:

- `as?: string` - Element type to render

### `Contextmenu.Content`

The menu content container that appears on trigger.

**Props:** See [`ContextmenuContentProps`](../../src/lib/components/contextmenu/contextmenu-content.svelte)

Key props:

- `as?: string` - Element type to render
- Animation hooks (enter, exit, animate)

### `Contextmenu.Item`

Individual menu item component.

**Props:** See [`ContextmenuItemProps`](../../src/lib/components/contextmenu/contextmenu-item.svelte)

Key props:

- `onclick?: () => void` - Click handler
- `disabled?: boolean` - Disabled state

## Usage

```svelte
<script>
	import { Contextmenu } from '@svelte-atoms/core';
</script>

<Contextmenu.Root>
	<Contextmenu.Trigger>
		<div>Right-click me</div>
	</Contextmenu.Trigger>

	<Contextmenu.Content>
		<Contextmenu.Item onclick={() => console.log('Edit')}>Edit</Contextmenu.Item>
		<Contextmenu.Item onclick={() => console.log('Delete')}>Delete</Contextmenu.Item>
		<Contextmenu.Item disabled>Disabled Action</Contextmenu.Item>
	</Contextmenu.Content>
</Contextmenu.Root>
```

## Bond Pattern

The contextmenu uses the bond pattern for state management:

```svelte
<Contextmenu.Root>
	{#snippet children({ contextmenu })}
		<!-- Access contextmenu bond state -->
		<div>Menu open: {contextmenu.state.open}</div>
	{/snippet}
</Contextmenu.Root>
```

## Best Practices

1. Provide clear, action-oriented menu item labels
2. Group related items together
3. Use separators for logical grouping
4. Indicate disabled items clearly
5. Keep menus concise (5-10 items max)
6. Support keyboard navigation

## Accessibility

- Keyboard navigation (Arrow keys, Enter, Escape)
- Focus management
- ARIA attributes for menu structure
- Screen reader support

## Related

- Dropdown Component
- Menu Component
- Popover Component
