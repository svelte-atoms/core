# Link Component

The `Link` component provides accessible and styled hyperlinks for navigation.

## Features

- Semantic anchor element
- Router integration support
- Preset system integration
- Accessible navigation
- External link handling

## Props

**Props:** See [`LinkProps`](../../src/lib/components/link/link.svelte)

Key props:

- `href: string` - Link destination
- `as?: E extends keyof HTMLElementTagNameMap` - Element type (default: 'a')
- `target?: '_blank' | '_self' | '_parent' | '_top'` - Link target
- `external?: boolean` - Mark as external link
- `children?: Snippet` - Link content

## Usage

```svelte
<script>
	import { Link } from '@svelte-atoms/core';
</script>

<!-- Internal link -->
<Link href="/about">About Us</Link>

<!-- External link -->
<Link href="https://example.com" external>Visit Example</Link>

<!-- Styled link -->
<Link href="/products" class="text-blue-600 hover:underline">Products</Link>

<!-- Custom target -->
<Link href="/docs" target="_blank">Documentation</Link>
```

## External Links

For external links, the component automatically adds security attributes:

```svelte
<Link href="https://external.com" external>External Site</Link>
<!-- Renders with rel="noopener noreferrer" -->
```

## Router Integration

Works with SvelteKit or other routers:

```svelte
<!-- SvelteKit -->
<Link href="/dashboard">Dashboard</Link>

<!-- With data-sveltekit attributes -->
<Link href="/page" data-sveltekit-preload-data="hover">Preloaded Page</Link>
```

## Link States

Style different link states:

```svelte
<Link
	href="/page"
	class="
    text-blue-600
    visited:text-purple-600
    hover:text-blue-800
    focus:outline-blue-500
    active:text-blue-900
  "
>
	Styled Link
</Link>
```

## Customization

```typescript
const preset = {
	link: {
		as: 'a',
		class: 'custom-link-styles'
	}
};
```

## Best Practices

1. Use descriptive link text (avoid "click here")
2. Indicate external links visually
3. Use `target="_blank"` sparingly
4. Include security attributes for external links
5. Ensure sufficient color contrast
6. Provide focus indicators
7. Make link purpose clear from context

## Accessibility

```svelte
<!-- Clear link purpose -->
<Link href="/contact">Contact Us</Link>

<!-- External link indication -->
<Link href="https://external.com" external>
	External Site
	<span class="sr-only">(opens in new tab)</span>
</Link>

<!-- Download link -->
<Link href="/file.pdf" download>
	Download PDF
	<span class="sr-only">(PDF, 2MB)</span>
</Link>
```

## Security

For external links:

- Always include `rel="noopener noreferrer"` with `target="_blank"`
- Consider using `rel="nofollow"` for untrusted links
- Validate URLs when accepting user input

## Related

- Button Component
- Breadcrumb Component
- Navigation Components
