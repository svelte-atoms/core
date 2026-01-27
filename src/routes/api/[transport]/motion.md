---
id: motion
title: Motion System
category: animation
depth: intermediate
prerequisites: []
related:
  - styling
  - crafting
---

# Motion & Animation System

> **Audience**: LLMs and developers working with @svelte-atoms/core

This guide explains how to implement animations and transitions using the motion system in @svelte-atoms/core. The system is built around lifecycle hooks that provide precise control over element animation states.

## Core Concepts

@svelte-atoms/core provides a powerful motion system through `HtmlAtom` and `HtmlElement` components. Both components expose four key animation lifecycle hooks:

- **`initial`** - Set up the initial state before the element enters
- **`enter`** - Define the transition when element enters the DOM
- **`exit`** - Define the transition when element leaves the DOM
- **`animate`** - Execute animations after enter transition completes OR when reactive state changes

## Architecture

### HtmlElement vs HtmlAtom

Both components support the same motion API, but serve different purposes:

**`HtmlElement`** - Low-level primitive

- Direct control over transitions
- No preset/base styling system
- Minimal overhead
- Use for foundational components

**`HtmlAtom`** - High-level building block

- Extends HtmlElement with base styling
- Preset system integration
- Root context support
- Use for UI components

## Lifecycle Hook Signatures

```typescript
type NodeFunction<T> = (node: ElementType<T>) => void | (() => void);
type TransitionFunction<T> = (node: ElementType<T>) => TransitionConfig | void;

interface TransitionConfig {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	css?: (t: number, u: number) => string;
	tick?: (t: number, u: number) => void;
}
```

## Animation Lifecycle Order

1. **`initial(node)`** - Runs immediately when node is created (before enter)
2. **`enter(node)`** - Returns transition config, runs as element enters
3. **`animate(node)`** - Runs after enter completes (skipped on first mount if enter exists)
4. **`exit(node)`** - Returns transition config, runs as element leaves

### Setting Initial State

You can set the initial state in three ways:

**1. Using the `initial` hook:**

```svelte
<HtmlAtom
  initial={(node) => {
    gsap.set(node, { opacity: 0, y: 20 });
  }}
>
```

**2. Using TailwindCSS classes:**

```svelte
<HtmlAtom class="opacity-0 translate-y-5">
```

**3. Using inline styles:**

```svelte
<HtmlAtom style="opacity: 0; transform: translateY(20px);">
```

Choose based on your needs:

- **`initial` hook**: Best for dynamic initial states or when using animation libraries
- **TailwindCSS**: Best for static initial states with utility classes
- **Inline styles**: Best for one-off custom initial states

### Important Behaviors

- `animate` is **skipped on first render** if `enter` is defined (prevents double animation)
- `animate` runs on **subsequent reactive updates** to animate state changes
- `onmount` returns cleanup function, runs before `ondestroy`
- `initial` sets up state before any transitions occur

## Pattern 1: Svelte Native Transitions

Use Svelte's built-in transition functions from `svelte/transition`.

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { fade, slide } from 'svelte/transition';

	let show = $state(true);
</script>

{#if show}
	<HtmlAtom
		enter={(node) => fade(node, { duration: 300 })}
		exit={(node) => slide(node, { duration: 200 })}
	>
		Animated content
	</HtmlAtom>
{/if}
```

### Key Points

- Native Svelte transitions work out of the box
- Return value becomes the TransitionConfig
- Use `global={true}` (default) to respect `prefers-reduced-motion`

## Pattern 2: GSAP Animations

GSAP provides powerful animation capabilities with precise control.

### Basic GSAP Setup

**Using `initial` hook:**

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import gsap from 'gsap';

	let isOpen = $state(false);
</script>

<HtmlAtom
	initial={(node) => {
		gsap.set(node, { opacity: 0, y: 20 });
	}}
	enter={(node) => {
		const tween = gsap.to(node, {
			opacity: 1,
			y: 0,
			duration: 0.3,
			ease: 'power2.out'
		});

		return {
			duration: tween.duration() * 1000 // Convert to ms
		};
	}}
	exit={(node) => {
		const tween = gsap.to(node, {
			opacity: 0,
			y: -20,
			duration: 0.2
		});

		return {
			duration: tween.duration() * 1000
		};
	}}
>
	Content
</HtmlAtom>
```

**Or using TailwindCSS classes:**

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import gsap from 'gsap';
</script>

<HtmlAtom
	class="translate-y-5 opacity-0"
	enter={(node) => {
		const tween = gsap.to(node, {
			opacity: 1,
			y: 0,
			duration: 0.3,
			ease: 'power2.out'
		});

		return {
			duration: tween.duration() * 1000
		};
	}}
>
	Content
</HtmlAtom>
```

**Or using inline styles:**

```svelte
<HtmlAtom
	style="opacity: 0; transform: translateY(20px);"
	enter={(node) => {
		const tween = gsap.to(node, { opacity: 1, y: 0, duration: 0.3 });
		return { duration: tween.duration() * 1000 };
	}}
>
	Content
</HtmlAtom>
```

### GSAP with Reactive State

Common pattern for components like drawers, sidebars, accordions:

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import gsap from 'gsap';
	import { cubicOut } from 'svelte/easing';

	let isOpen = $state(false);
</script>

<HtmlAtom
	initial={(node) => {
		gsap.set(node, { opacity: +isOpen });
	}}
	animate={(node) => {
		gsap.to(node, {
			opacity: +isOpen,
			duration: 0.3,
			onComplete: () => !isOpen && node.close?.()
		});
	}}
>
	Backdrop
</HtmlAtom>

<HtmlAtom
	class="drawer-content"
	initial={(node) => {
		gsap.set(node, { xPercent: isOpen ? 0 : -100 });
	}}
	animate={(node) => {
		gsap.to(node, {
			xPercent: isOpen ? 0 : -100,
			duration: 0.2,
			ease: cubicOut
		});
	}}
>
	Drawer content
</HtmlAtom>
```

### GSAP Helper Utility

@svelte-atoms/core provides `toTransitionConfig` to convert GSAP tweens:

```typescript
// $svelte-atoms/core/utils/gsap
export function toTransitionConfig(tween: gsap.core.Tween): TransitionConfig {
	return {
		delay: tween.delay() * 1000,
		duration: tween.duration() * 1000,
		easing: tween.vars.ease
	};
}
```

**Usage:**

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import gsap from 'gsap';
	import { toTransitionConfig } from '$svelte-atoms/core/utils/gsap';
	import { linear } from 'svelte/easing';
</script>

<HtmlAtom
	initial={(node) => {
		gsap.set(node, { opacity: 0, height: 0 });
	}}
	enter={(node) => {
		const tween = gsap.to(node, {
			opacity: 1,
			height: 'auto',
			duration: 0.2,
			ease: linear
		});
		return toTransitionConfig(tween);
	}}
	exit={(node) => {
		const tween = gsap.to(node, {
			opacity: 0,
			height: 0,
			duration: 0.2,
			ease: linear
		});
		return toTransitionConfig(tween);
	}}
>
	Collapsible content
</HtmlAtom>
```

## Pattern 3: Motion One Library

Motion One provides a modern, performant animation API.

### Basic Motion Setup

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { animate } from 'motion';

	let isOpen = $state(false);
</script>

<HtmlAtom
	animate={(node) => {
		animate(
			node,
			{
				y: (isOpen ? 0 : -1) * 8,
				opacity: +isOpen
			},
			{
				duration: 0.1
			}
		);
	}}
>
	Content
</HtmlAtom>
```

### Motion with Enter/Exit

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { animate } from 'motion';

	let isOpen = $state(false);
</script>

<HtmlAtom
	class={['pointer-events-none h-0 opacity-0', isOpen && 'pointer-events-auto']}
	enter={(node) => {
		animate(
			node,
			{ opacity: +isOpen, height: isOpen ? 'auto' : 0 },
			{ duration: 0.2, ease: 'linear' }
		);
		return { duration: 200 };
	}}
	exit={(node) => {
		animate(node, { opacity: 0, height: 0 }, { duration: 0.2, ease: 'linear' });
		return { duration: 200 };
	}}
	animate={(node) => {
		animate(
			node,
			{ opacity: +isOpen, height: isOpen ? 'auto' : 0 },
			{ duration: 0.2, ease: 'linear' }
		);
	}}
>
	Collapsible body
</HtmlAtom>
```

### Key Points

- Motion One animations are auto-canceled when new animations start
- Works seamlessly with Web Animations API
- Great performance with GPU acceleration

## Pattern 4: Context-Aware Animations

Access component state via `this` binding for dynamic animations.

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import gsap from 'gsap';
</script>

<HtmlAtom
	enter={function (node) {
		// 'this' refers to the component context/bond
		const isOpen = this.isOpen;

		const tween = gsap.to(node, {
			opacity: +isOpen,
			height: isOpen ? 'auto' : 0,
			duration: 0.2
		});

		return toTransitionConfig(tween);
	}}
>
	Context-aware content
</HtmlAtom>
```

### Binding to Component State

When building custom components, bind hooks to state:

```svelte
<script>
  import { HtmlAtom } from '@svelte-atoms/core';

  let bond = /* ... component bond ... */;
</script>

<HtmlAtom
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
>
	Content
</HtmlAtom>
```

## Pattern 5: Staggered Animations

Animate lists with sequential delays.

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { fade, slide } from 'svelte/transition';

	let items = $state([
		{ id: 1, title: 'Item 1' },
		{ id: 2, title: 'Item 2' },
		{ id: 3, title: 'Item 3' }
	]);
</script>

<HtmlAtom as="div" class="grid gap-4">
	{#each items as item, i (item.id)}
		<HtmlAtom
			as="article"
			enter={(node) => slide(node, { delay: i * 100, duration: 300 })}
			exit={(node) => fade(node)}
		>
			<HtmlAtom as="h2">{item.title}</HtmlAtom>
		</HtmlAtom>
	{/each}
</HtmlAtom>
```

## Pattern 6: Combining with Lifecycle Hooks

`onmount` and `ondestroy` work alongside animation hooks.

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { fade } from 'svelte/transition';

	function handleMount(node) {
		console.log('Mounted:', node);

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
</script>

<HtmlAtom
	onmount={handleMount}
	enter={(node) => fade(node, { duration: 600 })}
	class="visible:opacity-100 opacity-0"
>
	Lazy-loaded content
</HtmlAtom>
```

## Pattern 7: Complex Component Animations

Real-world example from Drawer component:

```svelte
<script>
	import { HtmlElement } from '@svelte-atoms/core';
	import gsap from 'gsap';
	import { cubicOut } from 'svelte/easing';

	let isOpen = $state(false);
</script>

<!-- Backdrop -->
<HtmlElement
	as="dialog"
	class="border backdrop-blur-md"
	initial={(node) => {
		gsap.set(node, { opacity: +isOpen });
	}}
	animate={(node) => {
		gsap.to(node, {
			opacity: +isOpen,
			duration: 0.3,
			onComplete: () => !isOpen && node.close?.()
		});
	}}
>
	<!-- Drawer content -->
	<HtmlElement
		class="drawer-panel"
		initial={(node) => {
			gsap.set(node, { xPercent: isOpen ? 0 : -100, left: 0 });
		}}
		animate={(node) => {
			gsap.to(node, {
				xPercent: isOpen ? 0 : -100,
				left: 0,
				duration: 0.2,
				ease: cubicOut
			});
		}}
	>
		Drawer content
	</HtmlElement>
</HtmlElement>
```

## Pattern 8: Scrollbar Animations

From Scrollable component - show/hide on hover:

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import gsap from 'gsap';
</script>

<HtmlAtom
	class="scrollbar-track"
	initial={(node) => gsap.set(node, { opacity: 0, right: 0, top: 0, bottom: 0 })}
	enter={(node) => {
		const tween = gsap.to(node, {
			opacity: 1,
			right: 8,
			top: 8,
			bottom: 8,
			duration: 0.3,
			ease: 'power2.out'
		});

		return { duration: tween.duration() * 1000 };
	}}
	exit={(node) => {
		const tween = gsap.to(node, {
			opacity: 0,
			right: 0,
			top: 0,
			bottom: 0,
			duration: 0.3,
			ease: 'power2.out'
		});

		return { duration: tween.duration() * 1000 };
	}}
>
	<HtmlAtom class="scrollbar-thumb" />
</HtmlAtom>
```

## Global vs Local Transitions

Control whether transitions respect user motion preferences:

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

### Accessibility Note

- Always use `global={true}` (default) for UI components
- Users with motion sensitivity will see instant transitions
- Only use `global={false}` for essential animations

## Best Practices

### 1. Choose the Right Hook

- **`initial`** - Set starting state (opacity: 0, transform values)
- **`enter`** - One-time entrance animations
- **`exit`** - Exit animations when element unmounts
- **`animate`** - React to state changes (expanding/collapsing, etc.)

**Note**: You can also set initial state using TailwindCSS classes or inline styles instead of the `initial` hook:

```svelte
<!-- Using initial hook -->
<HtmlAtom
	initial={(node) => gsap.set(node, { opacity: 0, x: -20 })}
	enter={(node) => {
		/* ... */
	}}
/>

<!-- Using TailwindCSS -->
<HtmlAtom
	class="-translate-x-5 opacity-0"
	enter={(node) => {
		/* ... */
	}}
/>

<!-- Using inline styles -->
<HtmlAtom
	style="opacity: 0; transform: translateX(-20px);"
	enter={(node) => {
		/* ... */
	}}
/>
```

### 2. GSAP Timing Conversion

Always convert GSAP durations from seconds to milliseconds:

```svelte
enter={(node) => {
	const tween = gsap.to(node, { opacity: 1, duration: 0.3 });
	return { duration: tween.duration() * 1000 }; // ✅ Convert to ms
}}
```

### 3. Conditional Classes with Animations

Combine CSS classes with animation hooks for pointer events, layout shifts:

```svelte
<HtmlAtom
	class={['pointer-events-none h-0 opacity-0', isOpen && 'pointer-events-auto']}
	animate={(node) => {
		animate(node, { opacity: +isOpen, height: isOpen ? 'auto' : 0 });
	}}
>
	Content
</HtmlAtom>
```

### 4. Cleanup in Animations

Use `onComplete` callbacks to clean up DOM state:

```svelte
animate={(node) => {
	gsap.to(node, {
		opacity: +isOpen,
		onComplete: () => !isOpen && node.close?.() // Close dialog when hidden
	});
}}
```

### 5. Performance Considerations

- Animate transforms and opacity (GPU-accelerated)
- Avoid animating layout properties when possible
- Use `will-change` CSS sparingly
- Batch multiple property changes in one animation

### 6. Type Safety

Use generics for element-specific types:

```svelte
<script lang="ts">
	import { HtmlAtom, type HtmlAtomProps } from '@svelte-atoms/core';

	type Props = HtmlAtomProps<'button'> & {
		variant?: 'primary' | 'secondary';
	};

	let { animate, enter, exit, ...props }: Props = $props();
</script>

<HtmlAtom as="button" {animate} {enter} {exit} {...props}>
	{@render children?.()}
</HtmlAtom>
```

## Common Animation Patterns

### Fade In/Out

```svelte
<HtmlAtom
	enter={(node) => fade(node, { duration: 300 })}
	exit={(node) => fade(node, { duration: 200 })}
>
	Content
</HtmlAtom>
```

### Slide In/Out

```svelte
<HtmlAtom
	initial={(node) => gsap.set(node, { x: -100, opacity: 0 })}
	enter={(node) => {
		const tween = gsap.to(node, { x: 0, opacity: 1, duration: 0.3 });
		return { duration: tween.duration() * 1000 };
	}}
>
	Content
</HtmlAtom>
```

### Scale In/Out

```svelte
<HtmlAtom
	initial={(node) => gsap.set(node, { scale: 0.8, opacity: 0 })}
	enter={(node) => {
		const tween = gsap.to(node, { scale: 1, opacity: 1, duration: 0.2 });
		return { duration: tween.duration() * 1000 };
	}}
>
	Content
</HtmlAtom>
```

### Height Auto Animation (Accordion/Collapsible)

```svelte
<HtmlAtom
	initial={(node) => gsap.set(node, { height: 0, opacity: 0 })}
	enter={(node) => {
		const tween = gsap.to(node, { height: 'auto', opacity: 1, duration: 0.2 });
		return toTransitionConfig(tween);
	}}
	exit={(node) => {
		const tween = gsap.to(node, { height: 0, opacity: 0, duration: 0.2 });
		return toTransitionConfig(tween);
	}}
>
	Collapsible content
</HtmlAtom>
```

### Width Animation (Sidebar)

```svelte
<script>
	let isOpen = $state(false);
</script>

<HtmlAtom
	initial={(node) => gsap.set(node, { width: isOpen ? 240 : 96 })}
	animate={(node) => gsap.to(node, { width: isOpen ? 240 : 96, duration: 0.2, ease: cubicOut })}
>
	Sidebar content
</HtmlAtom>
```

### Backdrop Blur with Fade

```svelte
<HtmlAtom
	class="backdrop-blur-md"
	initial={(node) => gsap.set(node, { opacity: +isOpen })}
	animate={(node) => {
		gsap.to(node, { opacity: +isOpen, duration: 0.3 });
	}}
>
	Backdrop
</HtmlAtom>
```

## Animation Libraries Support

@svelte-atoms/core is animation-library agnostic. Common integrations:

### Svelte Transitions

```typescript
import { fade, slide, scale, fly, blur } from 'svelte/transition';
```

### GSAP

```typescript
import gsap from 'gsap';
import { toTransitionConfig } from '$svelte-atoms/core/utils/gsap';
```

### Motion One

```typescript
import { animate, stagger, timeline } from 'motion';
```

### Popmotion

```typescript
import { animate, spring } from 'popmotion';
```

### Custom Animations

Implement custom transition configs:

```svelte
<HtmlAtom
	enter={(node) => {
		return {
			duration: 500,
			tick: (t) => {
				node.style.opacity = String(t);
				node.style.transform = `translateY(${(1 - t) * 50}px)`;
			}
		};
	}}
>
	Custom animation
</HtmlAtom>
```

## Debugging Animations

### Log Animation Lifecycle

```svelte
<HtmlAtom
	initial={(node) => {
		console.log('Initial:', node);
		gsap.set(node, { opacity: 0 });
	}}
	enter={(node) => {
		console.log('Enter:', node);
		const tween = gsap.to(node, { opacity: 1, duration: 0.3 });
		return { duration: tween.duration() * 1000 };
	}}
	animate={(node) => {
		console.log('Animate:', node);
	}}
	onmount={(node) => {
		console.log('Mount:', node);
	}}
	ondestroy={(node) => {
		console.log('Destroy:', node);
	}}
>
	Debug content
</HtmlAtom>
```

### Check Skip Behavior

Remember: `animate` is skipped on first render when `enter` exists:

```svelte
<script>
	let count = $state(0);
</script>

<HtmlAtom
	enter={(node) => fade(node, { duration: 300 })}
	animate={(node) => {
		// This will NOT run on first mount (because enter exists)
		// This WILL run when count changes
		console.log('Animating count:', count);
	}}
>
	Count: {count}
</HtmlAtom>
```

## Migration from Other Systems

### From Svelte 4 to Svelte 5 + @svelte-atoms

**Before (Svelte 4):**

```svelte
<div in:fade={{ duration: 300 }} out:slide={{ duration: 200 }}>Content</div>
```

**After (@svelte-atoms/core):**

```svelte
<HtmlAtom
	enter={(node) => fade(node, { duration: 300 })}
	exit={(node) => slide(node, { duration: 200 })}
>
	Content
</HtmlAtom>
```

### From Manual GSAP Setup

**Before:**

```svelte
<script>
	let ref;

	$effect(() => {
		if (ref) {
			gsap.to(ref, { opacity: +isOpen });
		}
	});
</script>

<div bind:this={ref}>Content</div>
```

**After:**

```svelte
<HtmlAtom
	animate={(node) => {
		gsap.to(node, { opacity: +isOpen });
	}}
>
	Content
</HtmlAtom>
```

## Summary

The @svelte-atoms/core motion system provides:

✅ **Four lifecycle hooks**: `initial`, `enter`, `exit`, `animate`  
✅ **Library agnostic**: Works with Svelte, GSAP, Motion One, etc.  
✅ **Context-aware**: Access component state via `this` binding  
✅ **Performance**: Skip unnecessary animations, GPU acceleration  
✅ **Accessibility**: Global transitions respect motion preferences  
✅ **Type-safe**: Full TypeScript support with generics  
✅ **Composable**: Nest atoms with independent animations

Use `HtmlElement` for low-level control, `HtmlAtom` for full-featured UI components. Both share the same motion API for consistency.
