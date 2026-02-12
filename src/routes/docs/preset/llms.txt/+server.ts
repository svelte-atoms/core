import { content, list } from '$docs/md/utils';
import { metadata } from '../shared';

export function GET() {
	return new Response(build(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}

function build(): string {
	return content(`
# ${metadata.pageTitle}

${metadata.pageDescription}

## Overview

${metadata.overview}

The preset system is a powerful theming mechanism that allows you to:
- Define component styles once and apply them everywhere
- Override styles at different levels (global, route, component)
- Create dynamic styles based on component state
- Maintain consistency across your application
- Support multiple themes or design variations

## Key Features

${list(metadata.keyFeatures)}

## Preset Levels

The preset system works hierarchically with three levels:

${metadata.presetLevels.map((level) => `### ${level.level}\n\n**Location:** ${level.location}\n**Scope:** ${level.scope}\n**Use Case:** ${level.useCase}\n**Priority:** ${level.priority}`).join('\n\n')}

## Setting Up Presets

### Global Preset (App Root)

Define your base theme in the root layout file:

\`\`\`svelte
// src/routes/+layout.svelte
<script>
  import { setPreset } from '@svelte-atoms/core/context';
  import { Root } from '@svelte-atoms/core/components/root';

  const theme = {
    button: () => ({
      class: 'rounded-md px-4 py-2 font-semibold transition-colors'
    }),
    
    card: () => ({
      class: 'rounded-xl border border-border bg-card shadow-sm'
    }),
    
    'card.title': () => ({
      class: 'text-xl font-bold text-card-foreground'
    })
  };

  setPreset(theme);
</script>

<Root>
  <slot />
</Root>
\`\`\`

### Route-Level Preset

Override presets for specific routes:

\`\`\`svelte
// src/routes/dashboard/+layout.svelte
<script>
  import { setPreset } from '@svelte-atoms/core/context';

  // Extends and overrides the global preset
  setPreset({
    button: () => ({
      class: 'rounded-lg shadow-md hover:shadow-lg'
    }),
    
    card: () => ({
      class: 'bg-slate-50 border-slate-200'
    })
  });
</script>

<slot />
\`\`\`

### Component-Level Preset

Override presets for specific component subtrees:

\`\`\`svelte
// components/Settings.svelte
<script>
  import { setPreset } from '@svelte-atoms/core/context';
  import { Card } from '@svelte-atoms/core/components/card';

  // Component-level preset for this subtree
  setPreset({
    'card.title': () => ({
      class: 'text-purple-600'
    })
  });
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Settings</Card.Title>
  </Card.Header>
</Card.Root>
\`\`\`

## Preset Keys

${Object.entries(metadata.presetKeys).map(([type, info]) => `### ${type.charAt(0).toUpperCase() + type.slice(1)} Components\n\n${info.description}\n\n**Examples:** \`${info.example}\``).join('\n\n')}

## Compound Component Presets

Use dot notation to style sub-components:

\`\`\`typescript
setPreset({
  // Parent component
  alert: () => ({
    class: 'rounded-lg border p-4'
  }),
  
  // Child components
  'alert.icon': () => ({
    class: 'h-4 w-4'
  }),
  
  'alert.title': () => ({
    class: 'mb-1 font-semibold leading-tight'
  }),
  
  'alert.description': () => ({
    class: 'text-sm leading-relaxed opacity-90'
  }),
  
  'alert.actions': () => ({
    class: 'mt-3 flex items-center gap-2'
  })
});
\`\`\`

## Reactive Presets (Dynamic Styling)

Access component bond state for dynamic styling:

\`\`\`typescript
import { setPreset } from '@svelte-atoms/core/context';
import { defineState, defineProperty } from '@svelte-atoms/core/utils';

setPreset({
  'accordion.item.header': (bond) => {
    const isOpen = defineState([
      defineProperty(
        () => bond?.state?.isOpen,
        (v) => (bond.state.isOpen = v),
        'isOpen'
      )
    ]);
    
    return () => ({
      class: isOpen ? 'bg-accent' : 'bg-background'
    });
  },
  
  'collapsible.trigger': (bond) => ({
    class: bond?.state?.isOpen ? 'rotate-180' : 'rotate-0'
  })
});
\`\`\`

## The $preset Placeholder

Control where preset classes are inserted:

\`\`\`svelte
<script>
  import { HtmlAtom } from '@svelte-atoms/core';

  let { class: klass = '' } = $props();
</script>

<HtmlAtom
  preset="button"
  class={[
    'my-custom-class',  // First
    '$preset',          // Preset inserted here
    klass               // User classes override everything
  ]}
/>

<!-- Result: 'my-custom-class rounded-lg px-4 py-2 font-semibold user-class' -->
\`\`\`

## Extended Attributes

Presets can set any HTML attributes, not just classes:

\`\`\`typescript
setPreset({
  button: () => ({
    class: 'rounded-lg px-4 py-2',
    'data-component': 'button',
    'data-version': '1.0',
    role: 'button',
    tabindex: 0
  }),
  
  'card.title': () => ({
    class: 'text-xl font-bold',
    role: 'heading',
    'aria-level': 2
  })
});
\`\`\`

## Extending Presets

Presets at different levels merge together:

\`\`\`typescript
// Base theme (global)
setPreset({
  button: () => ({
    class: 'rounded-md px-4 py-2 font-semibold'
  })
});

// Extended theme (route or component level)
setPreset({
  button: () => ({
    class: 'shadow-lg hover:shadow-xl'
  })
});

// Result: Classes are merged
// 'rounded-md px-4 py-2 font-semibold shadow-lg hover:shadow-xl'
\`\`\`

## Advanced Features

${metadata.advancedFeatures.map((feature) => `### ${feature.feature}\n\n${feature.description}\n\n**Example:** ${feature.example}`).join('\n\n')}

## Performance Optimization

The preset system is optimized for performance:

\`\`\`typescript
// Preset resolution is memoized
// - Only recomputes when preset key or bond changes
// - Class string interpolation is cached
// - Early exit for components without $preset placeholder

const preset = $derived.by(() => {
  if (!presetKey) return undefined;
  return getPreset(presetKey)?.apply?.(bond, [bond]);
});

const presetClassString = $derived(cn(preset?.class));

const _klass = $derived.by(() => {
  const merged = cn(klass, mergedVariants?.class ?? '');
  // Early exit if no $preset placeholder
  if (!merged.includes('$preset')) return merged;
  return merged.replaceAll('$preset', presetClassString);
});
\`\`\`

## Common Patterns

### Theme Switching

\`\`\`svelte
<script>
  import { setPreset } from '@svelte-atoms/core/context';
  
  let theme = $state('light');
  
  $effect(() => {
    const lightTheme = {
      button: () => ({ class: 'bg-white text-black' })
    };
    
    const darkTheme = {
      button: () => ({ class: 'bg-black text-white' })
    };
    
    setPreset(theme === 'light' ? lightTheme : darkTheme);
  });
</script>
\`\`\`

### Component Variants via Presets

\`\`\`typescript
setPreset({
  button: () => ({
    class: 'base-button-styles'
  }),
  
  'button.primary': () => ({
    class: 'bg-primary text-primary-foreground'
  }),
  
  'button.secondary': () => ({
    class: 'bg-secondary text-secondary-foreground'
  })
});
\`\`\`

### Conditional Presets

\`\`\`typescript
setPreset({
  card: () => {
    const isLarge = window.innerWidth > 1024;
    return {
      class: isLarge ? 'max-w-2xl' : 'max-w-md'
    };
  }
});
\`\`\`

## Best Practices

### ✅ DO

- Set global presets at app root for base theme
- Override at route level for section-specific theming
- Use dot notation for compound component specificity
- Access bond state for reactive styling
- Keep preset logic simple and focused
- Use presets for common patterns

### ❌ DON'T

- Override presets for one-off styling (use component props instead)
- Create overly complex preset functions
- Rely on presets for critical functionality
- Duplicate logic across preset levels
- Use presets for layout (use component composition)

## Examples

### Multi-Theme Setup

\`\`\`typescript
// themes/light.ts
export const lightTheme = {
  button: () => ({
    class: 'bg-white text-black border-gray-200'
  }),
  card: () => ({
    class: 'bg-white border-gray-200'
  })
};

// themes/dark.ts
export const darkTheme = {
  button: () => ({
    class: 'bg-gray-800 text-white border-gray-700'
  }),
  card: () => ({
    class: 'bg-gray-800 border-gray-700'
  })
};

// +layout.svelte
<script>
  import { setPreset } from '@svelte-atoms/core/context';
  import { lightTheme } from './themes/light';
  
  setPreset(lightTheme);
</script>
\`\`\`

### Dashboard-Specific Styling

\`\`\`svelte
// routes/dashboard/+layout.svelte
<script>
  import { setPreset } from '@svelte-atoms/core/context';
  
  setPreset({
    card: () => ({
      class: 'bg-gradient-to-br from-slate-50 to-slate-100'
    }),
    'card.title': () => ({
      class: 'text-lg font-bold text-slate-900'
    })
  });
</script>
\`\`\`

### Component Library Presets

\`\`\`typescript
// lib/presets/components.ts
export const componentPresets = {
  button: () => ({
    class: 'rounded-md transition-all duration-200'
  }),
  dialog: () => ({
    class: 'max-w-lg rounded-xl shadow-2xl'
  }),
  'dialog.overlay': () => ({
    class: 'bg-black/50 backdrop-blur-sm'
  })
};
\`\`\`

## Debugging Presets

\`\`\`typescript
import { getPreset } from '@svelte-atoms/core/context';

// Check what preset is active
const buttonPreset = getPreset('button');
console.log('Button preset:', buttonPreset);

// Check preset resolution
const Dialog.Root preset="dialog" class="debug">
  <!-- Check DevTools to see resolved classes -->
</Dialog.Root>
\`\`\`

## Migration Guide

### From Inline Styles

\`\`\`svelte
<!-- Before -->
<Button class="rounded-lg px-4 py-2 bg-primary">Click</Button>
<Button class="rounded-lg px-4 py-2 bg-primary">Another</Button>

<!-- After -->
<script>
  setPreset({
    button: () => ({
      class: 'rounded-lg px-4 py-2 bg-primary'
    })
  });
</script>

<Button>Click</Button>
<Button>Another</Button>
\`\`\`

### From CSS Classes

\`\`\`svelte
<!-- Before -->
<style>
  .my-button {
    @apply rounded-lg px-4 py-2 bg-primary;
  }
</style>

<button class="my-button">Click</button>

<!-- After -->
<script>
  setPreset({
    button: () => ({
      class: 'rounded-lg px-4 py-2 bg-primary'
    })
  });
</script>

<Button>Click</Button>
\`\`\`

## TypeScript Support

\`\`\`typescript
import type { Preset } from '@svelte-atoms/core/types';

const myPreset: Preset = {
  button: () => ({
    class: 'rounded-md px-4 py-2',
    'data-component': 'button'
  })
};

setPreset(myPreset);
\`\`\`

## Next Steps

- Learn about [Styling](/docs/styling) patterns and techniques
- Explore [Variants](/docs/styling#variants) for component-level styling
- Check out [Atoms](/docs/atoms) to understand the underlying components
- Review [Component Examples](/docs/components) to see presets in action
`);
}
