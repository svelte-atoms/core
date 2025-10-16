# HtmlElement Component

> **Source**: [`src/lib/components/element/html-element.svelte`](../../src/lib/components/element/html-element.svelte)

The `HtmlElement` component provides a low-level primitive for creating dynamic HTML elements with enhanced animation and lifecycle capabilities. It serves as a foundational building block for all HTML-based components in svelte-atoms.

## Features

- Dynamic element transformation via `as` prop
- Svelte transition integration (enter/exit)
- Animation lifecycle hooks (initial, enter, exit, animate)
- Global vs local transition control
- Mount/unmount lifecycle management
- Type-safe generic element props
- Full TypeScript support with element type inference

## Props

**Props:** See [`HtmlElementProps`](../../src/lib/components/element/html-element.svelte)

Key props:

- `as?: T extends keyof HTMLElementTagNameMap` - Element type to render (default: 'div')
- `class?: ClassValue` - CSS classes
- `global?: boolean` - Use global transitions (default: true)
- `initial?: (node: Element) => void` - Initial state hook (runs before enter)
- `enter?: (node: Element) => TransitionConfig` - Enter transition function
- `exit?: (node: Element) => TransitionConfig` - Exit transition function
- `animate?: (node: Element) => void` - Animation function (runs after transitions)
- `onmount?: (node: Element) => void | (() => void)` - Mount lifecycle hook
- `ondestroy?: (node: Element) => void` - Destroy lifecycle hook
- `children?: Snippet` - Content renderer

## Usage

### Basic Usage

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';
</script>

<!-- Default div element -->
<HtmlElement>Content</HtmlElement>

<!-- Custom element type -->
<HtmlElement as="button">Click me</HtmlElement>

<HtmlElement as="section" class="container">
	<h1>Section Title</h1>
</HtmlElement>
```

### With Transitions

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';
	import { fade, slide } from 'svelte/transition';

	let show = $state(true);
</script>

{#if show}
	<HtmlElement
		enter={(node) => fade(node, { duration: 300 })}
		exit={(node) => slide(node, { duration: 200 })}
	>
		Animated content
	</HtmlElement>
{/if}
```

### With Initial State and Animations

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';

	function setupInitial(node: HTMLElement) {
		node.style.opacity = '0';
		node.style.transform = 'translateY(20px)';
	}

	function enterAnimation(node: HTMLElement) {
		return {
			duration: 500,
			css: (t: number) => `
				opacity: ${t};
				transform: translateY(${(1 - t) * 20}px);
			`
		};
	}

	function animate(node: HTMLElement) {
		// Runs after enter transition completes
		node.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
	}
</script>

<HtmlElement initial={setupInitial} enter={enterAnimation} {animate}>Animated content</HtmlElement>
```

### With Lifecycle Hooks

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';

	function handleMount(node: HTMLElement) {
		console.log('Element mounted:', node);

		// Setup observers, event listeners, etc.
		const observer = new IntersectionObserver((entries) => {
			// Handle intersection
		});
		observer.observe(node);

		// Return cleanup function
		return () => {
			observer.disconnect();
		};
	}

	function handleDestroy(node: HTMLElement) {
		console.log('Element destroyed:', node);
	}
</script>

<HtmlElement onmount={handleMount} ondestroy={handleDestroy}>
	Content with lifecycle management
</HtmlElement>
```

### Global vs Local Transitions

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';
	import { fade } from 'svelte/transition';
</script>

<!-- Global transition (default) - respects prefers-reduced-motion -->
<HtmlElement global={true} enter={(node) => fade(node, { duration: 300 })}>
	Global transition
</HtmlElement>

<!-- Local transition - always runs -->
<HtmlElement global={false} enter={(node) => fade(node, { duration: 300 })}>
	Local transition
</HtmlElement>
```

### Semantic HTML Elements

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';
</script>

<HtmlElement as="header">
	<HtmlElement as="nav">
		<HtmlElement as="ul">
			<HtmlElement as="li">Home</HtmlElement>
			<HtmlElement as="li">About</HtmlElement>
		</HtmlElement>
	</HtmlElement>
</HtmlElement>

<HtmlElement as="main">
	<HtmlElement as="article">
		<HtmlElement as="h1">Article Title</HtmlElement>
		<HtmlElement as="p">Article content...</HtmlElement>
	</HtmlElement>
</HtmlElement>
```

## Lifecycle Order

The component executes lifecycle hooks in the following order:

1. **Component mount** → `onmount` hook called
2. **Initial state** → `initial` function called (if transition present)
3. **Enter transition** → `enter` function called
4. **Transition complete** → `animate` function called
5. **Component unmount** → cleanup from `onmount` called → `ondestroy` hook called
6. **Exit transition** → `exit` function called

## Type Definitions

```typescript
export type HtmlElementProps<T extends HtmlElementTagName = 'div'> = {
	class?: ClassValue;
	as?: T | (string & {});
	global?: boolean;
	initial?: NodeFunction<T>;
	enter?: TransitionFunction<T>;
	exit?: TransitionFunction<T>;
	animate?: NodeFunction<T>;
	onmount?: NodeFunction<T>;
	ondestroy?: NodeFunction<T>;
	children?: Snippet;
} & HTMLAttributes<HTMLElementTagNameMap[T]>;

export type TransitionFunction<T extends ElementTagName> = (
	node: ElementType<T>
) => Partial<TransitionConfig>;

export type NodeFunction<T extends ElementTagName> = (node: ElementType<T>) => void | (() => void);
```

## Advanced Patterns

### Custom Animation Library Integration

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';
	import { animate } from 'motion';

	function motionEnter(node: HTMLElement) {
		return {
			duration: 500,
			tick: (t: number) => {
				node.style.opacity = String(t);
				node.style.transform = `translateY(${(1 - t) * 50}px)`;
			}
		};
	}

	function motionAnimate(node: HTMLElement) {
		animate(node, { scale: [1, 1.05, 1] }, { duration: 0.6, easing: 'ease-in-out' });
	}
</script>

<HtmlElement enter={motionEnter} animate={motionAnimate}>Motion animated element</HtmlElement>
```

### Conditional Rendering with Transitions

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';
	import { fade, fly } from 'svelte/transition';

	let isVisible = $state(false);
	let mode = $state<'fade' | 'fly'>('fade');
</script>

{#if isVisible}
	<HtmlElement
		enter={(node) =>
			mode === 'fade' ? fade(node, { duration: 300 }) : fly(node, { y: 20, duration: 300 })}
		exit={(node) => fade(node, { duration: 200 })}
	>
		Conditionally rendered content
	</HtmlElement>
{/if}

<button onclick={() => (isVisible = !isVisible)}> Toggle </button>
<button onclick={() => (mode = mode === 'fade' ? 'fly' : 'fade')}> Switch Mode </button>
```

### Composing Multiple Elements

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';
	import { fade, slide } from 'svelte/transition';

	let items = $state(['Item 1', 'Item 2', 'Item 3']);
</script>

<HtmlElement as="ul" class="space-y-2">
	{#each items as item, i (item)}
		<HtmlElement
			as="li"
			enter={(node) => slide(node, { delay: i * 100 })}
			exit={(node) => fade(node)}
		>
			{item}
		</HtmlElement>
	{/each}
</HtmlElement>
```

## Best Practices

1. **Use semantic HTML**: Leverage the `as` prop to render appropriate semantic elements
2. **Global transitions**: Keep `global={true}` (default) to respect user's motion preferences
3. **Cleanup in onmount**: Return a cleanup function from `onmount` for proper resource management
4. **Type safety**: Utilize TypeScript generics for element-specific type inference
5. **Animation order**: Use `initial` for setup, `enter` for transitions, `animate` for post-transition effects
6. **Performance**: Avoid complex computations in transition functions
7. **Accessibility**: Ensure transitions don't interfere with keyboard navigation or screen readers

## Differences from HtmlAtom

`HtmlElement` is a lower-level primitive compared to `HtmlAtom`:

- **HtmlElement**: Pure element with transitions and lifecycle hooks
- **HtmlAtom**: Adds base styling system, preset integration, and additional abstractions

Use `HtmlElement` when:

- You need direct control over transitions
- You don't need the preset/base styling system
- You're building foundational components

Use `HtmlAtom` when:

- You want preset system integration
- You need base styling capabilities
- You're building user-facing components

## Related Components

- [`HtmlAtom`](./atom.md) - Higher-level component with preset system
- [`SvgElement`](./svg-element.md) - SVG element primitive
- [`MathmlElement`](./mathml-element.md) - MathML element primitive

## Related Concepts

- [Svelte Transitions](https://svelte.dev/docs/svelte/transition)
- [Animation Lifecycle](../philosophy.md#animation-lifecycle)
- [Type-safe Components](../philosophy.md#typescript-first)
