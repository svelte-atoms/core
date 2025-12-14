# Drawer Component

The `Drawer` component provides a slide-in panel for displaying content from the side of the screen.

## Features

- Slide-in panels from any direction (left, right, top, bottom)
- Backdrop overlay support
- Focus trap and keyboard navigation
- Customizable transitions
- Bond-based state management

## Components

### `Drawer.Root`

Root container for the drawer system.

**Preset Key:** `drawer`

**Props:**

{{drawerRootProps}}

Key props:

- `open?: boolean` - Controls drawer visibility
- `disabled?: boolean` - Disable the drawer
- `placement?: 'left' | 'right' | 'top' | 'bottom'` - Drawer position
- `children?: Snippet` - Content renderer

### `Drawer.Trigger`

Button or element that opens the drawer.

**Preset Key:** `drawer.trigger`

**Props:**

{{drawerTriggerProps}}

Key props:

- `as?: string` - Element type to render

### `Drawer.Content`

The drawer panel content container.

**Preset Key:** `drawer.content`

**Props:**

{{drawerContentProps}}

Key props:

- `as?: string` - Element type to render
- Animation hooks (enter, exit, animate)

### `Drawer.Overlay`

Background overlay that appears behind the drawer.

**Preset Key:** `drawer.overlay`

**Props:**

{{drawerOverlayProps}}

Key props:

- Animation hooks (enter, exit, animate)

## Usage

```svelte
<script>
	import { Drawer } from '@svelte-atoms/core';
</script>

<Drawer.Root placement="right">
	<Drawer.Trigger>Open Drawer</Drawer.Trigger>

	<Drawer.Overlay />

	<Drawer.Content>
		<h2>Drawer Title</h2>
		<p>Drawer content goes here</p>
	</Drawer.Content>
</Drawer.Root>
```

## Placement Options

- `left` - Slides in from the left edge
- `right` - Slides in from the right edge
- `top` - Slides in from the top edge
- `bottom` - Slides in from the bottom edge

## Controlled Drawer

```svelte
<script>
	let open = $state(false);
</script>

<Drawer.Root bind:open>
	<!-- drawer content -->
</Drawer.Root>

<button onclick={() => (open = true)}>Open</button>
<button onclick={() => (open = false)}>Close</button>
```

## Best Practices

1. Use appropriate placement based on content type
2. Include a clear close mechanism
3. Keep drawer width/height reasonable
4. Provide backdrop overlay for focus
5. Support Escape key to close
6. Consider mobile responsiveness

## Accessibility

- Focus trap when open
- Keyboard support (Escape to close)
- ARIA attributes for dialog
- Proper focus management

## Related

- Dialog Component
- Sidebar Component
- Popover Component
