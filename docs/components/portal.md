# Portal Module

> **Source**: [`src/lib/components/portal`](../../src/lib/components/portal)

The `Portal` module provides functionality to render components outside their normal DOM hierarchy, useful for modals, tooltips, and overlays.

## Features

- Render content at document body or custom target
- Multiple portal support
- Maintain component context
- Flexible portal management

## Components

### `Portal`

Main portal component that renders children at a different location in the DOM.

**Props:** See [`PortalProps`](../../src/lib/components/portal/portal.svelte)

Key props:

- `target?: HTMLElement | string` - Portal target (default: document.body)
- `disabled?: boolean` - Disable portal behavior
- `children?: Snippet` - Content to portal

### `Portal.Portals`

Container component for managing multiple portals.

## Usage

```svelte
<script>
	import { Portal } from '@svelte-atoms/core';
</script>

<!-- Render at document body -->
<Portal>
	<div class="modal">Modal content rendered at body</div>
</Portal>

<!-- Custom target -->
<div id="portal-root"></div>

<Portal target="#portal-root">
	<div>Content rendered at custom target</div>
</Portal>

<!-- Conditional portal -->
<Portal disabled={!showModal}>
	<div>Only portaled when enabled</div>
</Portal>
```

## Use Cases

### Modal Dialogs

```svelte
<Portal>
	<div class="fixed inset-0 z-50">
		<div class="bg-black/50" />
		<div class="modal-content">Dialog content</div>
	</div>
</Portal>
```

### Tooltips

```svelte
{#if showTooltip}
	<Portal>
		<div class="tooltip" style="position: absolute; top: {y}px; left: {x}px;">Tooltip content</div>
	</Portal>
{/if}
```

### Toast Notifications

```svelte
<Portal target="#toast-container">
	<div class="toast">Notification message</div>
</Portal>
```

## Portal Target

### String Selector

```svelte
<Portal target="#modal-root">
	<!-- Content -->
</Portal>
```

### Element Reference

```svelte
<script>
	let portalTarget: HTMLElement;
</script>

<div bind:this={portalTarget}></div>

<Portal target={portalTarget}>
	<!-- Content -->
</Portal>
```

## Portals Container

For managing multiple portals:

```svelte
<script>
	import { Portal } from '@svelte-atoms/core';
</script>

<!-- Portal destinations -->
<Portal.Portals id="modals" />
<Portal.Portals id="tooltips" />

<!-- Portal sources -->
<Portal target="#modals">
	<Modal />
</Portal>

<Portal target="#tooltips">
	<Tooltip />
</Portal>
```

## Best Practices

1. Use portals for overlays that need to escape parent containers
2. Maintain logical component hierarchy in code
3. Consider accessibility when portaling content
4. Clean up portals when component unmounts
5. Use consistent portal targets across app
6. Consider z-index management with portals

## Accessibility

- Maintain focus management
- Preserve ARIA relationships
- Handle keyboard navigation
- Ensure screen reader compatibility
- Consider focus trapping for modals

## Common Pitfalls

1. **Styling isolation**: Portaled content may not inherit parent styles
2. **Event bubbling**: Events bubble from portal, not visual location
3. **Context preservation**: Svelte context is maintained
4. **Cleanup**: Ensure portal content is removed on unmount

## Related

- Layer Component
- Dialog Component
- Tooltip Component
- Toast Component
- Dropdown Component
