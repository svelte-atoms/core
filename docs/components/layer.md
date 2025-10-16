# Layer Component

> **Source**: [`src/lib/components/layer`](../../src/lib/components/layer)

The `Layer` component provides a flexible container for layering and positioning content, particularly useful for overlays and portals.

## Features

- Z-index management
- Position control
- Portal support
- Stacking context management
- Preset system integration

## Props

**Props:** See [`LayerProps`](../../src/lib/components/layer/layer.svelte)

Key props:

- `as?: E extends keyof HTMLElementTagNameMap` - Element type (default: 'div')
- `base?: Base` - Base styling configuration
- `zIndex?: number | string` - Z-index value
- `position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'` - CSS position
- `children?: Snippet` - Content renderer

## Usage

```svelte
<script>
	import { Layer } from '@svelte-atoms/core';
</script>

<!-- Basic layer -->
<Layer zIndex={1000}>
	<div>Overlay content</div>
</Layer>

<!-- Fixed position layer -->
<Layer position="fixed" zIndex={9999}>
	<div>Modal backdrop</div>
</Layer>

<!-- Custom styling -->
<Layer position="absolute" class="inset-0" zIndex={100}>
	<div>Positioned content</div>
</Layer>
```

## Z-Index Management

Use predefined z-index levels for consistency:

```svelte
<!-- Dropdown: z-1000 -->
<Layer zIndex={1000}>
	<Dropdown />
</Layer>

<!-- Modal: z-2000 -->
<Layer zIndex={2000}>
	<Modal />
</Layer>

<!-- Tooltip: z-3000 -->
<Layer zIndex={3000}>
	<Tooltip />
</Layer>

<!-- Toast: z-4000 -->
<Layer zIndex={4000}>
	<Toast />
</Layer>
```

## Position Types

- `static` - Default positioning
- `relative` - Positioned relative to normal position
- `absolute` - Positioned relative to nearest positioned ancestor
- `fixed` - Positioned relative to viewport
- `sticky` - Positioned based on scroll position

## Common Patterns

### Overlay

```svelte
<Layer position="fixed" class="inset-0 bg-black/50" zIndex={1000}>
	<div>Overlay content</div>
</Layer>
```

### Portal Content

```svelte
<Layer position="fixed" zIndex={2000}>
	<Dialog />
</Layer>
```

### Sticky Header

```svelte
<Layer position="sticky" class="top-0" zIndex={100}>
	<header>Site header</header>
</Layer>
```

## Customization

```typescript
const preset = {
	layer: {
		as: 'div',
		position: 'relative',
		zIndex: 0
	}
};
```

## Best Practices

1. Use consistent z-index scales
2. Document z-index levels in your app
3. Avoid z-index wars (incremental values)
4. Use stacking contexts intentionally
5. Consider accessibility when overlaying content
6. Test with multiple layers active

## Stacking Context

Be aware of stacking contexts:

- Elements with `position` and `z-index`
- Elements with opacity < 1
- Elements with transforms
- Elements with filters

## Related

- Portal Component
- Dialog Component
- Dropdown Component
- Tooltip Component
- Toast Component
