# Badge Component

> **Source**: [`src/lib/components/badge`](../../src/lib/components/badge)

The `Badge` component displays small labels or indicators to highlight information or status.

## Features

- Inline display for labels and status indicators
- Customizable via preset system
- Dynamic element transformation via `as` prop
- Consistent styling across themes

## Props

**Props:** See [`BadgeProps`](../../src/lib/components/badge/badge.svelte)

Key props:

- `as?: E extends keyof HTMLElementTagNameMap` - Element type to render (default: 'span')
- `base?: Base` - Base styling configuration
- `children?: Snippet` - Content renderer

## Usage

```svelte
<script>
	import { Badge } from '@svelte-atoms/core';
</script>

<Badge>New</Badge>

<Badge class="bg-blue-500 text-white">Premium</Badge>

<Badge as="div">Status: Active</Badge>
```

## Default Styling

The badge comes with default styling:

- Inline-flex display
- Rounded full corners
- Small padding and text size
- Semi-transparent background

## Customization

Use the preset system to customize default badge styling:

```typescript
const preset = {
	badge: {
		as: 'span',
		class: 'custom-badge-styles'
	}
};
```

## Best Practices

1. Use badges for status indicators, counts, or labels
2. Keep badge content concise (1-2 words)
3. Use appropriate colors for different statuses
4. Consider accessibility with sufficient contrast

## Related

- Button Component
- Label Component
- Preset System
