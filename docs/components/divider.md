# Divider Component

> **Source**: [`src/lib/components/divider`](../../src/lib/components/divider)

The `Divider` component provides a visual separator between content sections.

## Features

- Horizontal and vertical orientation
- Customizable styling
- Semantic HTML structure
- Preset system integration

## Props

**Props:** See [`DividerProps`](../../src/lib/components/divider/divider.svelte)

Key props:

- `orientation?: 'horizontal' | 'vertical'` - Divider direction (default: 'horizontal')
- `as?: E extends keyof HTMLElementTagNameMap` - Element type (default: 'hr')
- `base?: Base` - Base styling configuration

## Usage

```svelte
<script>
	import { Divider } from '@svelte-atoms/core';
</script>

<!-- Horizontal divider -->
<Divider />

<!-- Vertical divider -->
<Divider orientation="vertical" />

<!-- Custom styled -->
<Divider class="border-2 border-blue-500" />

<!-- As different element -->
<Divider as="div" />
```

## Use Cases

### Content Separation

```svelte
<section>Content 1</section>
<Divider />
<section>Content 2</section>
```

### Vertical Layout

```svelte
<div class="flex">
	<div>Left content</div>
	<Divider orientation="vertical" />
	<div>Right content</div>
</div>
```

## Customization

Use the preset system:

```typescript
const preset = {
	divider: {
		as: 'hr',
		class: 'custom-divider-styles'
	}
};
```

## Best Practices

1. Use semantic `hr` element for horizontal dividers
2. Ensure sufficient spacing around dividers
3. Use appropriate colors that match design system
4. Consider responsive behavior
5. Use for visual separation, not layout

## Accessibility

- Semantic HTML (`hr` element)
- Proper ARIA roles when using non-semantic elements
- Screen reader friendly

## Related

- Layout Components
- Stack Component
- Container Component
