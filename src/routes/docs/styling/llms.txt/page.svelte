<script lang="ts">
	import { List } from '$docs/md/components';

	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: styling
title: Styling Guide
category: styling
depth: intermediate
prerequisites:
  - atoms
related:
  - variants
  - preset
  - motion
---


# {metadata.pageTitle}

{metadata.pageDescription}

## Overview

{metadata.overview}

## Key Features

<List items={metadata.keyFeatures} />

## Styling Approaches

{#each metadata.stylingApproaches as approach (approach.approach)}
### {approach.approach}

{approach.description}

**Pros:**
<List items={approach.pros || []} />

**Cons:**
<List items={approach.cons || []} />

{/each}

## Tailwind CSS (Recommended)

Svelte Atoms works perfectly with Tailwind CSS. Use utility classes directly on components:

\`\`\`svelte
<!-- Layout & spacing -->
<Card.Root class="max-w-sm p-4">
  <Card.Header>
    <Card.Title class="text-lg font-semibold">Title</Card.Title>
  </Card.Header>
</Card.Root>

<!-- Interactive states -->
<button class="bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 active:bg-primary/100">
  Action
</button>

<!-- Responsive -->
<h2 class="text-2xl md:text-3xl lg:text-4xl">Responsive heading</h2>

<!-- With opacity -->
<div class="bg-foreground/10">Subtle background</div>
\`\`\`

## Class Organization

Organize classes in a predictable order for better readability:

\`\`\`svelte
<HtmlAtom
  class={[
    'base-layout-classes',    // flex, grid, etc.
    'sizing-classes',         // w-full, px-4, etc.
    'visual-classes',         // bg-primary, border, etc.
    isOpen && 'conditional',  // Conditional classes
    '$preset',                // Preset placeholder
    klass                     // User overrides (highest priority)
  ]}
/>
\`\`\`

## cn() Utility

The \`cn()\` utility intelligently merges class names and resolves conflicts:

\`\`\`typescript
import { cn } from '@svelte-atoms/core/utils';

// Resolves conflicts automatically
cn('px-2 py-1', 'px-4'); 
// Result: 'py-1 px-4'

// Handles conditionals
cn('base', isActive && 'active', false && 'ignored');
// Result: 'base active'

// Merges arrays
cn(['text-sm', 'font-medium'], 'text-lg');
// Result: 'font-medium text-lg'
\`\`\`

## Color Tokens

Svelte Atoms uses CSS variables for theming. All color tokens are available as Tailwind utilities:

{#each metadata.colorTokens as token (token.token)}
### {token.token}

**Usage:** {token.usage}

```svelte
<div class="bg-{token.token} text-{token.token}">Content</div>
```

{/each}

### Using Color Tokens

\`\`\`svelte
<!-- Color tokens -->
<div class="bg-background text-foreground">Background color</div>
<Button class="bg-primary text-primary-foreground">Primary button</Button>

<!-- With opacity -->
<div class="bg-foreground/10 text-foreground/50">Subtle styling</div>

<!-- Borders and shadows -->
<Card.Root class="border-border border shadow-lg">Card</Card.Root>
\`\`\`

## Conditional Classes

Apply classes conditionally based on component state:

\`\`\`svelte
<script>
  let isOpen = $state(false);
  let isActive = $state(true);
</script>

<!-- Array with conditions -->
<Collapsible.Body 
  class={[
    'pointer-events-none h-0 opacity-0', 
    isOpen && 'pointer-events-auto h-auto opacity-100'
  ]}
>
  Content
</Collapsible.Body>

<!-- Ternary -->
<Tab.Root class={isActive ? 'opacity-100' : 'opacity-50'}>
  Tab content
</Tab.Root>

<!-- Multiple conditions -->
<Button 
  class={[
    'base-button',
    isActive && 'bg-primary',
    isDisabled && 'opacity-50 pointer-events-none',
    size === 'large' && 'px-6 py-3'
  ]}
>
  Button
</Button>
\`\`\`

## Variant System

Define reusable style variants at the component level:

\`\`\`typescript
<script lang="ts">
  import { defineVariants } from '@svelte-atoms/core/utils';
  import { HtmlAtom } from '@svelte-atoms/core';

  const buttonVariants = defineVariants({
    class: 'inline-flex items-center justify-center rounded-md font-medium',
    variants: {
      variant: {
        primary: { class: 'bg-primary text-primary-foreground hover:bg-primary/90' },
        secondary: { class: 'bg-secondary text-secondary-foreground hover:bg-secondary/90' },
        outline: { class: 'border border-input bg-background hover:bg-accent' }
      },
      size: {
        sm: { class: 'h-9 px-3 text-sm' },
        md: { class: 'h-10 px-4 text-base' },
        lg: { class: 'h-11 px-8 text-lg' }
      }
    },
    defaults: {
      variant: 'primary',
      size: 'md'
    }
  });

  let { variant, size, ...props } = $props();
</script>

<HtmlAtom variants={buttonVariants} {variant} {size} {...props}>
  {@render children?.()}
</HtmlAtom>
\`\`\`

## Compound Variants

Combine multiple variant conditions:

\`\`\`typescript
const alertVariants = defineVariants({
  class: 'rounded-lg p-4 border',
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      error: 'bg-destructive/10 border-destructive/50 text-destructive'
    },
    size: {
      default: 'p-4',
      sm: 'p-2'
    }
  },
  compounds: [
    {
      variant: 'error',
      size: 'sm',
      class: 'border-2'  // Applied only when both conditions match
    }
  ]
});
\`\`\`

## Reactive Variants

Create variants that respond to component state:

\`\`\`typescript
const accordionVariants = defineVariants((bond) => ({
  class: 'border rounded-md transition-all',
  variants: {
    state: {
      open: bond?.state?.isOpen ? 'bg-accent' : 'bg-background',
      active: bond?.state?.isActive ? 'border-primary' : 'border-border'
    }
  }
}));
\`\`\`

## Preset Placeholder

Control where preset classes are inserted:

\`\`\`svelte
<!-- In your component -->
<HtmlAtom
  preset="button"
  class={[
    'component-defaults',
    '$preset',  // Replaced with preset classes
    klass       // User classes override
  ]}
/>

<!-- Without $preset (preset at start) -->
<HtmlAtom
  preset="button"
  class={['component-classes', klass]}
/>

<!-- Result: preset-classes component-classes user-classes -->
\`\`\`

## Inline Styles

Use the \`style\` attribute for dynamic values:

\`\`\`svelte
<script>
  let width = $state(240);
  let opacity = $state(1);
</script>

<!-- ✅ Good: Dynamic values -->
<div style="width: {width}px; opacity: {opacity}">
  Dynamic sizing
</div>

<!-- ✅ Good: Transform values -->
<div style="transform: translateX({offset}px) rotate({angle}deg)">
  Animated element
</div>

<!-- ❌ Avoid: Static styling -->
<div style="padding: 16px; background: blue;">
  Use Tailwind instead
</div>
\`\`\`

## Best Practices

{#each metadata.bestPractices as category (category.category)}
### {category.category}

<List items={category.practices} />

{/each}

## Common Patterns

### Button Component

\`\`\`svelte
<script lang="ts">
  import { HtmlAtom, defineVariants } from '@svelte-atoms/core';
  
  const variants = defineVariants({
    class: 'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    variants: {
      variant: {
        primary: { class: 'bg-primary text-primary-foreground hover:bg-primary/90' },
        secondary: { class: 'bg-secondary text-secondary-foreground hover:bg-secondary/90' },
        outline: { class: 'border border-input hover:bg-accent' },
        ghost: { class: 'hover:bg-accent hover:text-accent-foreground' }
      },
      size: {
        sm: { class: 'h-9 px-3 text-sm' },
        md: { class: 'h-10 px-4' },
        lg: { class: 'h-11 px-8 text-lg' }
      }
    },
    defaults: {
      variant: 'primary',
      size: 'md'
    }
  });
  
  let { variant, size, class: klass, ...props } = $props();
</script>

<HtmlAtom
  as="button"
  {variants}
  {variant}
  {size}
  class={klass}
  {...props}
/>
\`\`\`

### Card Component

\`\`\`svelte
<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
  
  let { class: klass, ...props } = $props();
</script>

<HtmlAtom
  as="div"
  preset="card"
  class={['rounded-lg border bg-card text-card-foreground shadow-sm', klass]}
  {...props}
/>
\`\`\`

### Responsive Styling

\`\`\`svelte
<!-- Mobile-first responsive design -->
<div class="
  text-sm md:text-base lg:text-lg
  p-2 md:p-4 lg:p-6
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  Responsive content
</div>
\`\`\`

### Dark Mode

\`\`\`svelte
<!-- Using color tokens (automatic dark mode) -->
<div class="bg-background text-foreground">
  Automatically adapts to dark mode
</div>

<!-- Manual dark mode classes -->
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  Manual dark mode
</div>
\`\`\`

### Hover and Focus States

\`\`\`svelte
<!-- Interactive states -->
<button class="
  bg-primary text-primary-foreground
  hover:bg-primary/90
  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
  active:bg-primary/100
  disabled:opacity-50 disabled:pointer-events-none
">
  Interactive Button
</button>
\`\`\`

## Advanced Techniques

### Dynamic Class Generation

\`\`\`typescript
function getButtonClasses(variant: string, size: string) {
  const base = 'inline-flex items-center justify-center';
  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };
  const sizes = {
    sm: 'px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  };
  
  return cn(base, variants[variant], sizes[size]);
}
\`\`\`

### Custom Utility Classes

\`\`\`css
/* app.css */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
\`\`\`

### CSS Variables

\`\`\`css
/* Define custom properties */
:root {
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
}

/* Use in components */
.custom-component {
  padding: var(--spacing-md);
}
\`\`\`

## Debugging Styles

### Inspect Applied Classes

\`\`\`svelte
<script>
  import { cn } from '@svelte-atoms/core/utils';
  
  $inspect(cn('base', isActive && 'active'));
  // See what classes are actually applied
</script>
\`\`\`

### Visual Debugging

\`\`\`svelte
<!-- Add visible borders to debug layout -->
<div class="border-2 border-red-500">
  Debug me
</div>

<!-- Or use temporary background -->
<div class="bg-red-100">
  Debug container
</div>
\`\`\`

## Performance Tips

1. **Use Tailwind JIT**: Automatic purging and minimal build size
2. **Avoid Inline Styles**: Prefer classes for static values
3. **Memoize Computed Classes**: Cache expensive class computations
4. **Use Preset System**: Define common patterns once
5. **Leverage PurgeCSS**: Remove unused styles in production

## Migrating from Other Systems

### From CSS Modules

\`\`\`svelte
<!-- Before -->
<div class={styles.button}>Click</div>

<!-- After -->
<Button class="custom-button-styles">Click</Button>
\`\`\`

### From Styled Components

\`\`\`svelte
<!-- Before -->
<Styled.Button>Click</Styled.Button>

<!-- After -->
<Button class="inline-flex items-center ...">Click</Button>
\`\`\`

### From Plain CSS

\`\`\`svelte
<!-- Before -->
<style>
  .my-button {
    padding: 1rem 2rem;
    background: blue;
  }
</style>
<button class="my-button">Click</button>

<!-- After -->
<Button class="px-8 py-4 bg-blue-500">Click</Button>
\`\`\`

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Preset System](/docs/preset) - Global theming guide
- [Component Examples](/docs/components) - See styling in action
- [Color Tokens Reference](/docs/theming) - Complete token list

## Next Steps

- Master the [Preset System](/docs/preset) for global theming
- Learn about [Variants](/docs/variants) for reusable patterns
- Explore [Component Examples](/docs/components) to see styling techniques
- Read about [Accessibility](/docs/accessibility) for inclusive design
