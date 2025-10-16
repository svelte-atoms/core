# Breadcrumb Module

> **Source**: [`src/lib/components/breadcrumb`](../../src/lib/components/breadcrumb)

The `Breadcrumb` module provides navigation components to display the current page location within a hierarchy.

## Features

- Hierarchical navigation display
- Customizable separators
- Accessible navigation structure
- Modular component architecture

## Components

### `Breadcrumb.Root`

Container component for breadcrumb navigation.

**Props:** See [`BreadcrumbRootProps`](../../src/lib/components/breadcrumb/breadcrumb-root.svelte)

Key props:

- `as?: string` - Element type to render
- `children?: Snippet` - Content renderer

### `Breadcrumb.Item`

Individual breadcrumb item component.

**Props:** See [`BreadcrumbItemProps`](../../src/lib/components/breadcrumb/breadcrumb-item.svelte)

Key props:

- `as?: string` - Element type to render
- `children?: Snippet` - Content renderer

### `Breadcrumb.Separator`

Separator component between breadcrumb items.

**Props:** See [`BreadcrumbSeparatorProps`](../../src/lib/components/breadcrumb/breadcrumb-separator.svelte)

Key props:

- `as?: string` - Element type to render
- `children?: Snippet` - Content renderer

## Usage

```svelte
<script>
	import { Breadcrumb } from '@svelte-atoms/core';
</script>

<Breadcrumb.Root>
	<Breadcrumb.Item>
		<a href="/">Home</a>
	</Breadcrumb.Item>
	<Breadcrumb.Separator>/</Breadcrumb.Separator>
	<Breadcrumb.Item>
		<a href="/products">Products</a>
	</Breadcrumb.Item>
	<Breadcrumb.Separator>/</Breadcrumb.Separator>
	<Breadcrumb.Item>Current Page</Breadcrumb.Item>
</Breadcrumb.Root>
```

## Customization

```svelte
<!-- Custom separator -->
<Breadcrumb.Separator>→</Breadcrumb.Separator>

<!-- Styled items -->
<Breadcrumb.Item class="text-blue-600 hover:underline">
	<a href="/section">Section</a>
</Breadcrumb.Item>
```

## Best Practices

1. Use semantic HTML with links for navigable items
2. Make the current page non-clickable
3. Keep breadcrumb hierarchy shallow (3-5 levels)
4. Ensure proper ARIA attributes for accessibility
5. Use appropriate separators (/, >, →)

## Related

- Link Component
- Navigation patterns
