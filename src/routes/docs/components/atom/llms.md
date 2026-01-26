# Atom Component (HtmlAtom)

The `HtmlAtom` component is the foundational building block for all HTML-based components in svelte-atoms. It extends `HtmlElement` with the base styling system, preset integration, and component composition capabilities.

## Features

- Base styling system and preset integration
- Component composition via `base` prop
- Dynamic element transformation with `as` prop
- Animation lifecycle hooks (enter, exit, animate, initial)
- Root context integration for customizable renderers
- Automatic class name merging
- Type-safe generic element props

## Props

**Props:**

{{atomRootProps}}

Key props:

- `as?: E extends keyof HTMLElementTagNameMap` - Element type to render (default: 'div')
- `base?: Base` - Base component or snippet for composition
- `class?: ClassValue` - CSS classes (automatically merged)
- `preset?: PresetModuleName` - Preset configuration name
- `variants?: Variants` - Local variant definitions
- `animate?: (node: Element) => void` - Animation function
- `enter?: (node: Element) => TransitionConfig` - Enter transition
- `exit?: (node: Element) => TransitionConfig` - Exit transition
- `onmount?: (node: Element) => void | (() => void)` - Mount lifecycle hook
- `children?: Snippet` - Content renderer

## Usage

### Basic Usage

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
</script>

<!-- Default div element -->
<HtmlAtom>Content</HtmlAtom>

<!-- Custom element type -->
<HtmlAtom as="button" class="btn">Click me</HtmlAtom>

<HtmlAtom as="section" class="container mx-auto">
	<h1>Section Title</h1>
</HtmlAtom>
```

### With Styling Classes

```svelte
<HtmlAtom class="rounded-lg bg-blue-500 p-4 text-white">Styled content</HtmlAtom>

<HtmlAtom as="button" class="hover:bg-gray-100 rounded border px-4 py-2">Button</HtmlAtom>
```

### With Base Component

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import CustomWrapper from './custom-wrapper.svelte';
</script>

<!-- Use another component as base -->
<HtmlAtom base={CustomWrapper} class="additional-classes">Content</HtmlAtom>
```

### With Animation

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { fade, slide } from 'svelte/transition';

	let show = $state(true);
</script>

{#if show}
	<HtmlAtom enter={(node) => fade(node, { duration: 200 })} exit={(node) =>
			slide(node, { duration: 200 })}>
		Animated content
	</HtmlAtom>
{/if}
```

### With Lifecycle Hooks

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';

	function handleMount(node: Element) {
		console.log('Element mounted', node);
		return () => {
			console.log('Element cleanup');
		};
	}
</script>

<HtmlAtom onmount={handleMount}>Content with lifecycle</HtmlAtom>
```

### Building Custom Components

```svelte
<script lang="ts">
	import { HtmlAtom, type HtmlAtomProps } from '@svelte-atoms/core';

	type Props = HtmlAtomProps<'button'> & {
		variant?: 'primary' | 'secondary';
	};

	let { variant = 'primary', class: klass = '', children, ...restProps }: Props = $props();

	const variantClasses = {
		primary: 'bg-blue-500 text-white hover:bg-blue-600',
		secondary: 'bg-gray-500 text-white hover:bg-gray-600'
	};
</script>

<HtmlAtom as="button" class="{variantClasses[variant]} {klass}" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</HtmlAtom>
```

## Component Composition

The `base` prop enables powerful component composition:

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { Button } from '@svelte-atoms/core/button';
	import { Card } from '@svelte-atoms/core/card';
</script>

<!-- Compose Button with additional styles -->
<HtmlAtom base={Button} class="custom-button-styles">Custom Button</HtmlAtom>

<!-- Compose Card with Button -->
<Card.Root>
	<HtmlAtom base={Button} as="a" href="/learn-more">Learn More</HtmlAtom>
</Card.Root>
```

## Preset System Integration

```svelte
<script>
	import { HtmlAtom, defineVariants } from '@svelte-atoms/core';

	const variants = defineVariants({
		variants: {
			variant: {
				primary: { class: 'bg-primary text-white' },
				secondary: { class: 'bg-secondary text-white' }
			},
			size: {
				sm: { class: 'px-2 py-1 text-sm' },
				md: { class: 'px-4 py-2' },
				lg: { class: 'px-6 py-3 text-lg' }
			}
		}
	});
</script>

<HtmlAtom as="button" variants={variants} variant="primary" size="md">Styled Button</HtmlAtom>
```

## Root Context Integration

When used within a Root context, HtmlAtom can use custom renderers:

```svelte
<script>
	import { Root } from '@svelte-atoms/core/root';
	import { HtmlAtom } from '@svelte-atoms/core';
	import CustomHtmlRenderer from './custom-renderer.svelte';
</script>

<Root.Root renderers={{ html: CustomHtmlRenderer }}>
	<!-- This will use the custom renderer -->
	<HtmlAtom>Content rendered with custom renderer</HtmlAtom>
</Root.Root>
```

## Best Practices

1. **Use as foundation**: Build all custom HTML components using HtmlAtom
2. **Leverage composition**: Use the `base` prop for component composition
3. **Semantic HTML**: Always use appropriate `as` values for accessibility
4. **Type safety**: Utilize TypeScript generics for element-specific props
5. **Animation**: Use enter/exit for transitions, animate for continuous animations
6. **Lifecycle**: Return cleanup functions from onmount when needed

## Related Components

- `HtmlElement` - Lower-level primitive without base system
- `Root` - Context provider for renderer customization
- All UI components (Button, Card, Input, etc.) - Built on HtmlAtom

## Common Patterns

### Conditional Rendering with Animation

```svelte
{#if visible}
	<HtmlAtom enter={fade} exit={fade}>Toggleable content</HtmlAtom>
{/if}
```

### Element Transformation

```svelte
<HtmlAtom as={isLink ? 'a' : 'button'} href={isLink ? url : undefined}>
	Polymorphic element
</HtmlAtom>
```

### Nested Composition

```svelte
<HtmlAtom as="form" class="space-y-4">
	<HtmlAtom as="fieldset" class="border p-4">
		<HtmlAtom as="legend">Form Section</HtmlAtom>
		<HtmlAtom as="input" type="text" class="rounded border" />
	</HtmlAtom>
</HtmlAtom>
```
