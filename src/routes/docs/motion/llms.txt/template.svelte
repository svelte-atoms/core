<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */
	import { FrontMatter } from '$docs/md/components';
	import { codeBlock, inlineCode } from '$docs/md/template';
	
	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>
	// eslint-disable-next-line @typescript-eslint/no-unused-vars

<FrontMatter {frontmatter} />


# Motion & Animation System

> **Audience**: LLMs and developers working with @svelte-atoms/core

This guide explains how to implement animations and transitions using the motion system in @svelte-atoms/core. The system is built around lifecycle hooks that provide precise control over element animation states.

## Core Concepts

@svelte-atoms/core provides a powerful motion system through {inlineCode('HtmlAtom')} and {inlineCode('HtmlElement')} components. Both components expose four key animation lifecycle hooks:

- **{inlineCode('initial')}** - Set up the initial state before the element enters
- **{inlineCode('enter')}** - Define the transition when element enters the DOM
- **{inlineCode('exit')}** - Define the transition when element leaves the DOM
- **{inlineCode('animate')}** - Execute animations after enter transition completes OR when reactive state changes

## Architecture

### HtmlElement vs HtmlAtom

Both components support the same motion API, but serve different purposes:

**{inlineCode('HtmlElement')}** - Low-level primitive

- Direct control over transitions
- No preset/base styling system
- Minimal overhead
- Use for foundational components

**{inlineCode('HtmlAtom')}** - High-level building block

- Extends HtmlElement with base styling
- Preset system integration
- Root context support
- Use for UI components

## Lifecycle Hook Signatures

{codeBlock(`
type NodeFunction<T> = (node: ElementType<T>) => void | (() => void);
type TransitionFunction<T> = (node: ElementType<T>) => TransitionConfig | void;

interface TransitionConfig {
  delay?: number;
  duration?: number;
  easing?: (t: number) => number;
  css?: (t: number, u: number) => string;
  tick?: (t: number, u: number) => void;
}
`, 'typescript')}

## Animation Lifecycle Order

1. **{inlineCode('initial(node)')}** - Runs immediately when node is created (before enter)
2. **{inlineCode('enter(node)')}** - Returns transition config, runs as element enters
3. **{inlineCode('animate(node)')}** - Waits for enter to complete on first mount, then runs on reactive state changes
4. **{inlineCode('exit(node)')}** - Returns transition config, runs as element leaves

### Setting Initial State

You can set the initial state in three ways:

**1. Using the {inlineCode('initial')} hook:**

{codeBlock(`
<HtmlAtom
  initial={(node) => {
    gsap.set(node, { opacity: 0, y: 20 });
  }}
>
`, 'svelte')}

**2. Using TailwindCSS classes:**

{codeBlock(`
<HtmlAtom class="opacity-0 translate-y-5">
`, 'svelte')}

**3. Using inline styles:**

{codeBlock(`
<HtmlAtom style="opacity: 0; transform: translateY(20px);">
`, 'svelte')}

Choose based on your needs:

- **{inlineCode('initial')} hook**: Best for dynamic initial states or when using animation libraries
- **TailwindCSS**: Best for static initial states with utility classes
- **Inline styles**: Best for one-off custom initial states

### Important Behaviors

- {inlineCode('animate')} **waits for {inlineCode('enter')} to complete** on first render if {inlineCode('enter')} is defined, then runs
- {inlineCode('animate')} runs on **subsequent reactive updates** to animate state changes
- {inlineCode('onmount')} returns cleanup function, runs before {inlineCode('ondestroy')}
- {inlineCode('initial')} sets up state before any transitions occur

## Pattern 1: Svelte Native Transitions

Use Svelte's built-in transition functions from {inlineCode('svelte/transition')}.

{codeBlock(`
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
`, 'svelte')}

### Key Points

- Native Svelte transitions work out of the box
- Return value becomes the TransitionConfig
- Use {inlineCode('global={true}')} (default) to respect {inlineCode('prefers-reduced-motion')}

## Pattern 2: GSAP Animations

GSAP provides powerful animation capabilities with precise control.

### Basic GSAP Setup

**Using {inlineCode('initial')} hook:**

{codeBlock(`
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
`, 'svelte')}

**Or using TailwindCSS classes:**

{codeBlock(`
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
`, 'svelte')}

**Or using inline styles:**

{codeBlock(`
<HtmlAtom
  style="opacity: 0; transform: translateY(20px);"
  enter={(node) => {
    const tween = gsap.to(node, { opacity: 1, y: 0, duration: 0.3 });
    return { duration: tween.duration() * 1000 };
  }}
>
  Content
</HtmlAtom>
`, 'svelte')}

### GSAP with Reactive State

Common pattern for components like drawers, sidebars, accordions:

{codeBlock(`
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
`, 'svelte')}

### GSAP Helper Utility

@svelte-atoms/core provides {inlineCode('toTransitionConfig')} to convert GSAP tweens:

{codeBlock(`
// $svelte-atoms/core/utils/gsap
export function toTransitionConfig(tween: gsap.core.Tween): TransitionConfig {
  return {
    delay: tween.delay() * 1000,
    duration: tween.duration() * 1000,
    easing: tween.vars.ease
  };
}
`, 'typescript')}

**Usage:**

{codeBlock(`
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
`, 'svelte')}

## Pattern 3: Motion One Library

Motion One provides a modern, performant animation API.

### Basic Motion Setup

{codeBlock(`
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
`, 'svelte')}

### Motion with Enter/Exit

{codeBlock(`
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
`, 'svelte')}

### Key Points

- Motion One animations are auto-canceled when new animations start
- Works seamlessly with Web Animations API
- Great performance with GPU acceleration

## Pattern 4: Context-Aware Animations

Access component state via {inlineCode('this')} binding for dynamic animations.

{codeBlock(`
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
`, 'svelte')}

### Binding to Component State

When building custom components, bind hooks to state:

{codeBlock(`
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
`, 'svelte')}

## Pattern 5: Staggered Animations

Animate lists with sequential delays.

{codeBlock(`
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
  {#each items as item, i (i)}
    <HtmlAtom
      as="article"
      enter={(node) => slide(node, { delay: i * 100, duration: 300 })}
      exit={(node) => fade(node)}
    >
      <HtmlAtom as="h2">{item.title}</HtmlAtom>
    </HtmlAtom>
  {/each}
</HtmlAtom>
`, 'svelte')}

## Pattern 6: Combining with Lifecycle Hooks

{inlineCode('onmount')} and {inlineCode('ondestroy')} work alongside animation hooks.

{codeBlock(`
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
`, 'svelte')}

## Pattern 7: Complex Component Animations

Real-world example from Drawer component:

{codeBlock(`
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
`, 'svelte')}

## Pattern 8: Scrollbar Animations

From Scrollable component - show/hide on hover:

{codeBlock(`
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
`, 'svelte')}

## Global vs Local Transitions

Control whether transitions respect user motion preferences:

{codeBlock(`
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
`, 'svelte')}

### Accessibility Note

- Always use {inlineCode('global={true}')} (default) for UI components
- Users with motion sensitivity will see instant transitions
- Only use {inlineCode('global={false}')} for essential animations

## Best Practices

### 1. Choose the Right Hook

- **{inlineCode('initial')}** - Set starting state (opacity: 0, transform values)
- **{inlineCode('enter')}** - One-time entrance animations
- **{inlineCode('exit')}** - Exit animations when element unmounts
- **{inlineCode('animate')}** - React to state changes (expanding/collapsing, etc.)

**Note**: You can also set initial state using TailwindCSS classes or inline styles instead of the {inlineCode('initial')} hook:

{codeBlock(`
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
`, 'svelte')}

### 2. GSAP Timing Conversion

Always convert GSAP durations from seconds to milliseconds:

{codeBlock(`
enter={(node) => {
  const tween = gsap.to(node, { opacity: 1, duration: 0.3 });
  return { duration: tween.duration() * 1000 }; // ✅ Convert to ms
}}
`, 'svelte')}

### 3. Conditional Classes with Animations

Combine CSS classes with animation hooks for pointer events, layout shifts:

{codeBlock(`
<HtmlAtom
  class={['pointer-events-none h-0 opacity-0', isOpen && 'pointer-events-auto']}
  animate={(node) => {
    animate(node, { opacity: +isOpen, height: isOpen ? 'auto' : 0 });
  }}
>
  Content
</HtmlAtom>
`, 'svelte')}

### 4. Cleanup in Animations

Use {inlineCode('onComplete')} callbacks to clean up DOM state:

{codeBlock(`
animate={(node) => {
  gsap.to(node, {
    opacity: +isOpen,
    onComplete: () => !isOpen && node.close?.() // Close dialog when hidden
  });
}}
`, 'svelte')}

### 5. Performance Considerations

- Animate transforms and opacity (GPU-accelerated)
- Avoid animating layout properties when possible
- Use {inlineCode('will-change')} CSS sparingly
- Batch multiple property changes in one animation

### 6. Type Safety

Use generics for element-specific types:

{codeBlock(`
<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */
  import { HtmlAtom, type HtmlAtomProps } from '@svelte-atoms/core';

  type Props = HtmlAtomProps<'button'> & {
    variant?: 'primary' | 'secondary';
  };

  let { animate, enter, exit, ...props }: Props = $props();
</script>

<HtmlAtom as="button" {animate} {enter} {exit} {...props}>
  {@render children?.()}
</HtmlAtom>
`, 'svelte')}

## Common Animation Patterns

### Fade In/Out

{codeBlock(`
<HtmlAtom
  enter={(node) => fade(node, { duration: 300 })}
  exit={(node) => fade(node, { duration: 200 })}
>
  Content
</HtmlAtom>
`, 'svelte')}

### Slide In/Out

{codeBlock(`
<HtmlAtom
  initial={(node) => gsap.set(node, { x: -100, opacity: 0 })}
  enter={(node) => {
    const tween = gsap.to(node, { x: 0, opacity: 1, duration: 0.3 });
    return { duration: tween.duration() * 1000 };
  }}
>
  Content
</HtmlAtom>
`, 'svelte')}

### Scale In/Out

{codeBlock(`
<HtmlAtom
  initial={(node) => gsap.set(node, { scale: 0.8, opacity: 0 })}
  enter={(node) => {
    const tween = gsap.to(node, { scale: 1, opacity: 1, duration: 0.2 });
    return { duration: tween.duration() * 1000 };
  }}
>
  Content
</HtmlAtom>
`, 'svelte')}

### Height Auto Animation (Accordion/Collapsible)

{codeBlock(`
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
`, 'svelte')}

### Width Animation (Sidebar)

{codeBlock(`
<script>
  let isOpen = $state(false);
</script>

<HtmlAtom
  initial={(node) => gsap.set(node, { width: isOpen ? 240 : 96 })}
  animate={(node) => gsap.to(node, { width: isOpen ? 240 : 96, duration: 0.2, ease: cubicOut })}
>
  Sidebar content
</HtmlAtom>
`, 'svelte')}

### Backdrop Blur with Fade

{codeBlock(`
<HtmlAtom
  class="backdrop-blur-md"
  initial={(node) => gsap.set(node, { opacity: +isOpen })}
  animate={(node) => {
    gsap.to(node, { opacity: +isOpen, duration: 0.3 });
  }}
>
  Backdrop
</HtmlAtom>
`, 'svelte')}

## Animation Libraries Support

@svelte-atoms/core is animation-library agnostic. Common integrations:

### Svelte Transitions

{codeBlock(`
import { md } from '$docs/md/template';
import { fade, slide, scale, fly, blur } from 'svelte/transition';
`, 'typescript')}

### GSAP

{codeBlock(`
import gsap from 'gsap';
import { toTransitionConfig } from '$svelte-atoms/core/utils/gsap';
`, 'typescript')}

### Motion One

{codeBlock(`
import { animate, stagger, timeline } from 'motion';
`, 'typescript')}

### Popmotion

{codeBlock(`
import { animate, spring } from 'popmotion';
`, 'typescript')}

### Custom Animations

Implement custom transition configs:

{codeBlock(`
<HtmlAtom
  enter={(node) => {
    return {
      duration: 500,
      tick: (t) => {
        node.style.opacity = String(t);
        node.style.transform = \`translateY(\${(1 - t) * 50}px)\`;
      }
    };
  }}
>
  Custom animation
</HtmlAtom>
`, 'svelte')}

## Debugging Animations

### Log Animation Lifecycle

{codeBlock(`
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
`, 'svelte')}

### Check Sequencing Behavior

Remember: {inlineCode('animate')} waits for {inlineCode('enter')} to complete on first render when {inlineCode('enter')} exists:

{codeBlock(`
<script>
  let count = $state(0);
</script>

<HtmlAtom
  enter={(node) => fade(node, { duration: 300 })}
  animate={(node) => {
    // This will run AFTER enter completes on first mount
    // This will also run when count changes
    console.log('Animating count:', count);
  }}
>
  Count: {count}
</HtmlAtom>
`, 'svelte')}

## Migration from Other Systems

### From Svelte 4 to Svelte 5 + @svelte-atoms

**Before (Svelte 4):**

{codeBlock(`
<div in:fade={{ duration: 300 }} out:slide={{ duration: 200 }}>Content</div>
`, 'svelte')}

**After (@svelte-atoms/core):**

{codeBlock(`
<HtmlAtom
  enter={(node) => fade(node, { duration: 300 })}
  exit={(node) => slide(node, { duration: 200 })}
>
  Content
</HtmlAtom>
`, 'svelte')}

### From Manual GSAP Setup

**Before:**

{codeBlock(`
<script>
  let ref;

  $effect(() => {
    if (ref) {
      gsap.to(ref, { opacity: +isOpen });
    }
  });
</script>

<div bind:this={ref}>Content</div>
`, 'svelte')}

**After:**

{codeBlock(`
<HtmlAtom
  animate={(node) => {
    gsap.to(node, { opacity: +isOpen });
  }}
>
  Content
</HtmlAtom>
`, 'svelte')}

## Summary

The @svelte-atoms/core motion system provides:

✅ **Four lifecycle hooks**: {inlineCode('initial')}, {inlineCode('enter')}, {inlineCode('exit')}, {inlineCode('animate')}  
✅ **Library agnostic**: Works with Svelte, GSAP, Motion One, etc.  
✅ **Context-aware**: Access component state via {inlineCode('this')} binding  
✅ **Performance**: Skip unnecessary animations, GPU acceleration  
✅ **Accessibility**: Global transitions respect motion preferences  
✅ **Type-safe**: Full TypeScript support with generics  
✅ **Composable**: Nest atoms with independent animations

Use {inlineCode('HtmlElement')} for low-level control, {inlineCode('HtmlAtom')} for full-featured UI components. Both share the same motion API for consistency.
`;