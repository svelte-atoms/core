# HtmlAtom Component

> **Source**: [`src/lib/components/atom/html-atom.svelte`](../../src/lib/components/atom/html-atom.svelte)

The `HtmlAtom` component is a higher-level building block that extends `HtmlElement` with the **base styling system** and **preset integration**. It serves as the foundation for all HTML-based UI components in svelte-atoms, providing a consistent interface for component composition and styling.

## Features

- Extends `HtmlElement` with base styling system
- Preset system integration via `base` prop
- Root context integration for customizable renderers
- Support for component or snippet-based base rendering
- Dynamic element transformation via `as` prop
- Full access to animation lifecycle hooks
- Type-safe generic element props
- Automatic class name merging

## Props

**Props:** See [`HtmlAtomProps`](../../src/lib/components/atom/html-atom.svelte)

Key props:

- `as?: E extends keyof HTMLElementTagNameMap` - Element type to render (default: 'div')
- `base?: Base` - Base component, snippet, or styling configuration
- `class?: ClassValue` - CSS classes (automatically merged)
- `enter?: (node: Element) => TransitionConfig` - Enter transition function
- `exit?: (node: Element) => TransitionConfig` - Exit transition function
- `animate?: (node: Element) => void` - Animation function
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

### With Base Styling

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { Button } from './custom-button.svelte';
</script>

<!-- Use a component as base -->
<HtmlAtom base={Button} class="custom-styles">Button with custom styles</HtmlAtom>

<!-- Use a snippet as base -->
<HtmlAtom base={mySnippet}>Content rendered through snippet</HtmlAtom>
```

### With Transitions and Animations

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { fade, slide } from 'svelte/transition';
	import { animate } from 'motion';

	let show = $state(true);

	function animateElement(node: HTMLElement) {
		animate(node, { scale: [0.8, 1] }, { duration: 0.3, easing: 'ease-out' });
	}
</script>

{#if show}
	<HtmlAtom
		enter={(node) => fade(node, { duration: 300 })}
		exit={(node) => slide(node, { duration: 200 })}
		animate={animateElement}
	>
		Animated content with Motion
	</HtmlAtom>
{/if}
```

### With Lifecycle Hooks

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';

	function handleMount(node: HTMLElement) {
		console.log('HtmlAtom mounted:', node);

		// Setup intersection observer
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('visible');
				}
			});
		});
		observer.observe(node);

		// Return cleanup function
		return () => {
			observer.disconnect();
		};
	}

	function handleDestroy(node: HTMLElement) {
		console.log('HtmlAtom destroyed');
	}
</script>

<HtmlAtom
	onmount={handleMount}
	ondestroy={handleDestroy}
	class="visible:opacity-100 opacity-0 transition-opacity"
>
	Lazy-loaded content
</HtmlAtom>
```

### Building Custom Components

```svelte
<script lang="ts">
	import { HtmlAtom, type HtmlAtomProps } from '@svelte-atoms/core';

	type Props = HtmlAtomProps<'button'> & {
		variant?: 'primary' | 'secondary' | 'danger';
		size?: 'sm' | 'md' | 'lg';
	};

	let {
		variant = 'primary',
		size = 'md',
		class: klass = '',
		children,
		...restProps
	}: Props = $props();

	const variantClasses = {
		primary: 'bg-blue-500 text-white hover:bg-blue-600',
		secondary: 'bg-gray-500 text-white hover:bg-gray-600',
		danger: 'bg-red-500 text-white hover:bg-red-600'
	};

	const sizeClasses = {
		sm: 'px-2 py-1 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};
</script>

<HtmlAtom as="button" class="{variantClasses[variant]} {sizeClasses[size]} {klass}" {...restProps}>
	{@render children?.()}
</HtmlAtom>
```

### Semantic HTML Structure

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
</script>

<HtmlAtom as="header" class="site-header">
	<HtmlAtom as="nav" class="navigation">
		<HtmlAtom as="ul" class="nav-list">
			<HtmlAtom as="li" class="nav-item">
				<HtmlAtom as="a" href="/">Home</HtmlAtom>
			</HtmlAtom>
			<HtmlAtom as="li" class="nav-item">
				<HtmlAtom as="a" href="/about">About</HtmlAtom>
			</HtmlAtom>
		</HtmlAtom>
	</HtmlAtom>
</HtmlAtom>

<HtmlAtom as="main" class="main-content">
	<HtmlAtom as="article" class="article">
		<HtmlAtom as="h1">Article Title</HtmlAtom>
		<HtmlAtom as="p">Article content goes here...</HtmlAtom>
	</HtmlAtom>
</HtmlAtom>
```

## Base Prop Patterns

The `base` prop is a powerful feature that allows for flexible component composition:

### Component Base

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import CustomWrapper from './custom-wrapper.svelte';
</script>

<!-- The CustomWrapper component will be used as the base renderer -->
<HtmlAtom base={CustomWrapper} class="additional-classes">Content</HtmlAtom>
```

### Snippet Base

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';

	const customRenderer = (props) => {
		return `<div class="${props.class}">${props.children}</div>`;
	};
</script>

<HtmlAtom base={customRenderer}>Content rendered through snippet</HtmlAtom>
```

### Conditional Base

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import CardWrapper from './card-wrapper.svelte';
	import ListWrapper from './list-wrapper.svelte';

	let useCard = $state(true);
</script>

<HtmlAtom base={useCard ? CardWrapper : ListWrapper}>Dynamic base rendering</HtmlAtom>
```

## Root Context Integration

`HtmlAtom` integrates with the `Root` component context to use customizable renderers:

```svelte
<script>
	import { Root } from '@svelte-atoms/core';
	import { HtmlAtom } from '@svelte-atoms/core';
	import CustomHtmlRenderer from './custom-renderer.svelte';
</script>

<!-- Configure custom renderer at Root level -->
<Root>
	<!-- All HtmlAtom instances will use the custom renderer from Root context -->
	<HtmlAtom>This uses the custom renderer</HtmlAtom>
	<HtmlAtom>This also uses the custom renderer</HtmlAtom>

	<!-- Override with explicit base -->
	<HtmlAtom base={OtherRenderer}>This uses OtherRenderer</HtmlAtom>
</Root>
```

## Type Definitions

```typescript
export type HtmlAtomProps<
	E extends HtmlElementTagName = HtmlElementTagName,
	B extends Base<any> = Base
> = HtmlElementProps<E> & {
	base?: B;
};

export type Base<Args = any> =
	Args extends Record<string, any> ? ComponentBase : Args extends unknown[] ? SnippetBase : never;

export type ComponentBase = Component;
export type SnippetBase = Snippet;
```

## Advanced Patterns

### Composition with Multiple Atoms

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { fade } from 'svelte/transition';

	let items = $state([
		{ id: 1, title: 'Item 1' },
		{ id: 2, title: 'Item 2' },
		{ id: 3, title: 'Item 3' }
	]);
</script>

<HtmlAtom as="div" class="grid gap-4">
	{#each items as item (item.id)}
		<HtmlAtom
			as="article"
			class="card rounded-lg border p-4"
			enter={(node) => fade(node, { duration: 300 })}
		>
			<HtmlAtom as="h2" class="text-xl font-bold">
				{item.title}
			</HtmlAtom>
		</HtmlAtom>
	{/each}
</HtmlAtom>
```

### Dynamic Element with Props

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';

	let elementType = $state<'div' | 'section' | 'article'>('div');
	let elementProps = $derived({
		role: elementType === 'div' ? 'region' : undefined,
		'aria-label': 'Dynamic content area'
	});
</script>

<HtmlAtom as={elementType} class="dynamic-container" {...elementProps}>
	Content in {elementType} element
</HtmlAtom>

<select bind:value={elementType}>
	<option value="div">Div</option>
	<option value="section">Section</option>
	<option value="article">Article</option>
</select>
```

### Forwarding Events and Attributes

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';

	let clickCount = $state(0);

	function handleClick(event: MouseEvent) {
		clickCount++;
		console.log('Clicked!', event);
	}
</script>

<HtmlAtom
	as="button"
	class="interactive-button"
	onclick={handleClick}
	onmouseenter={(e) => console.log('Mouse entered')}
	onmouseleave={(e) => console.log('Mouse left')}
	disabled={clickCount >= 5}
	aria-pressed={clickCount > 0}
>
	Clicks: {clickCount}
</HtmlAtom>
```

## Best Practices

1. **Use for UI components**: `HtmlAtom` is ideal for building reusable UI components with consistent styling
2. **Leverage the base prop**: Use `base` for component composition and theming
3. **Semantic HTML**: Always use appropriate `as` values for semantic markup
4. **Class merging**: Utilize the automatic class merging for flexible styling
5. **Type safety**: Take advantage of TypeScript generics for element-specific types
6. **Root integration**: Use Root context for application-wide renderer customization
7. **Composition over inheritance**: Build complex components by composing multiple `HtmlAtom` instances
8. **Accessibility**: Always include appropriate ARIA attributes and semantic elements

## HtmlAtom vs HtmlElement

Choose the right primitive for your use case:

| Feature                   | HtmlAtom        | HtmlElement          |
| ------------------------- | --------------- | -------------------- |
| **Base styling system**   | ✅ Yes          | ❌ No                |
| **Preset integration**    | ✅ Yes          | ❌ No                |
| **Root context**          | ✅ Yes          | ❌ No                |
| **Component composition** | ✅ Yes          | ⚠️ Manual            |
| **Animation hooks**       | ✅ Yes          | ✅ Yes               |
| **Transitions**           | ✅ Yes          | ✅ Yes               |
| **Use case**              | UI components   | Low-level primitives |
| **Overhead**              | Slightly higher | Minimal              |

### When to use HtmlAtom:

- Building reusable UI components
- Need preset/base styling integration
- Want Root context customization
- Component composition patterns

### When to use HtmlElement:

- Maximum performance is critical
- Building foundational primitives
- Don't need preset system
- Want minimal abstraction

## Related Components

- [`HtmlElement`](./html-element.md) - Lower-level primitive without base system
- [`SvgAtom`](./svg-atom.md) - SVG element with base system
- [`Root`](./root.md) - Root context provider for customizable renderers
- [`Atom Module`](./atom.md) - Overview of all atom components

## Related Concepts

- [Preset System](../philosophy.md#preset-system)
- [Base Styling](../philosophy.md#base-styling)
- [Component Composition](../philosophy.md#composition)
- [Type Safety](../philosophy.md#typescript-first)

## Examples in the Wild

See how `HtmlAtom` is used in actual components:

- [Button Component](./button.md#implementation)
- [Card Component](./card.md#implementation)
- [Badge Component](./badge.md#implementation)
- [Divider Component](./divider.md#implementation)
