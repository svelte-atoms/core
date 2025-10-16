# Atom Module

> **Source**: [`src/lib/components/atom`](../../src/lib/components/atom)

The `Atom` module provides the foundational building blocks for all components in svelte-atoms. It offers low-level primitives for creating HTML, SVG, and Canvas elements with enhanced capabilities.

## Features

- Base components for HTML, SVG, and Canvas elements
- Dynamic element transformation via `as` prop
- Animation lifecycle hooks (enter, exit, initial, animate)
- Base styling system integration
- Type-safe generic element props

## Components

### `HtmlAtom`

Base component for HTML elements with enhanced capabilities.

**Props:** See [`HtmlAtomProps`](../../src/lib/components/atom/html-atom.svelte)

Key props:

- `as?: E extends keyof HTMLElementTagNameMap` - Element type to render (default: 'div')
- `base?: Base` - Base styling configuration
- `animate?: (node: HTMLElement) => void` - Animation function
- `enter?: (node: HTMLElement) => void` - Enter animation hook
- `exit?: (node: HTMLElement) => void` - Exit animation hook

**Usage:**

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { animate } from 'motion';
</script>

<HtmlAtom as="button" class="my-button">Click me</HtmlAtom>

<HtmlAtom as="div" animate={(node) => animate(node, { opacity: 1 })}>Animated content</HtmlAtom>
```

## Type Definitions

```typescript
export type HtmlAtomProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base> = {
	as?: E;
	base?: B;
	class?: string | string[];
	animate?: (node: HTMLElement) => void;
	enter?: (node: HTMLElement) => void;
	exit?: (node: HTMLElement) => void;
	initial?: (node: HTMLElement) => void;
	onmount?: (node: HTMLElement) => void;
	ondestroy?: (node: HTMLElement) => void;
	children?: Snippet;
} & HTMLAttributes<HTMLElementTagNameMap[E]>;
```

## Best Practices

1. Use `HtmlAtom` as the base for custom components
2. Leverage the `as` prop for semantic HTML
3. Combine with preset system for consistent styling
4. Use animation hooks for complex transitions
5. Bind lifecycle hooks to component state when needed

## Related

- Preset System
- Base Styling
- Animation System
