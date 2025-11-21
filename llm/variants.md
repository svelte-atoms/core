# Variant System

## Overview

The variant system in @svelte-atoms/core provides a powerful way to define component styling variations. It's deeply integrated with the preset system, allowing both global theming and local customization.

## Problem Statement

Currently, creating component variants (size, variant, appearance, etc.) requires:

```svelte
<script>
	let { variant = 'primary', size = 'md' } = $props();

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

<HtmlAtom class={`${variantClasses[variant]} ${sizeClasses[size]}`} />
```

**Pain points:**

- Repeated boilerplate in every component
- No access to component state (bond) for reactive variants
- Can't return attributes, only classes
- Not type-safe

## Integration with Preset System

**Key Feature:** Variants are now integrated with the preset system, enabling global variant definitions that can be overridden locally.

### Preset Structure

Presets support the full variant structure for comprehensive theming:

```typescript
// Preset: Full variant support
{
  class: 'base-classes',
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' }
  },
  compounds: [
    { variant: 'primary', size: 'lg', class: 'shadow-lg' }
  ],
  defaults: {
    variant: 'primary',
    size: 'md'
  }
}

// Component: Same structure, overrides/extends preset
{
  class: 'component-base',
  variants: { ... },
  compoundss: [...],
  defaults: { ... }
}
```

**Merge Behavior:**

- `variants`: Deep merged (component extends preset)
- `compounds`: Concatenated (preset first, then component compounds)
- `defaults`: Deep merged (component overrides preset)

### Architecture

```
Preset (Global Theme)
  ├─ class: ClassValue (base styling)
  ├─ variants: Record<string, Record<string, ClassValue>>
  │    ├─ variant: { primary: '...', secondary: '...' }
  │    └─ size: { sm: '...', md: '...', lg: '...' }
  ├─ compounds: Array<CompoundVariant> (conditional styling)
  ├─ defaults: Record<string, string> (default values)
  ├─ base: Component (component override)
  ├─ as: string (element type)
  └─ ...other props

Component (Local)
  ├─ variants: VariantDefinition (extends/overrides preset)
  │    ├─ class: ClassValue (component-specific base)
  │    ├─ variants: { ... } (extends/overrides preset variants)
  │    ├─ compounds: [...] (appended to preset)
  │    └─ defaults: {...} (overrides preset defaults)
  └─ variant props (size, variant, etc.)

Final Output = merge(preset, component)
  - variants: deep merged
  - compounds: concatenated (preset + component)
  - defaults: deep merged (component overrides)
```

### Hierarchy

The system merges variants in this order (later overrides earlier):

1. **Preset variants** - Global theme variants
2. **Component variants** - Local component-specific variants
3. **Props** - Runtime variant prop values

### Example: Global + Local Variants

```typescript
// +layout.svelte - Global theme
import { setPreset } from '@svelte-atoms/core/context';

setPreset({
	button: () => ({
		class: 'font-medium transition-colors rounded-md focus:outline-none focus:ring-2',
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
			},
			size: {
				sm: 'h-8 px-3 text-xs',
				md: 'h-10 px-4 text-sm',
				lg: 'h-12 px-6 text-base'
			}
		},
		compounds: [
			{
				variant: 'primary',
				size: 'lg',
				class: 'shadow-lg font-semibold'
			}
		],
		defaults: {
			variant: 'primary',
			size: 'md'
		}
	})
});
```

```svelte
<!-- Button.svelte - Local override -->
<script>
  import { HtmlAtom } from '@svelte-atoms/core';
  import { defineVariants } from '@svelte-atoms/core/utils';

  // Extend preset variants with additional local variants
  const localVariants = defineVariants({
    variants: {
      variant: {
        // Add new variant not in preset
        ghost: 'hover:bg-accent hover:text-accent-foreground'
      },
      // Add new variant key
      loading: {
        true: 'opacity-50 cursor-wait',
        false: ''
      }
    }
  });

  let {
    variant = 'primary',
    size = 'md',
    loading = false,
    ...props
  } = $props();
</script>

<HtmlAtom
  preset="button"        <!-- Uses global preset -->
  variants={localVariants} <!-- Merges with preset -->
  {variant}
  {size}
  {loading}
  {...props}
>
  {@render children?.()}
</HtmlAtom>
```

**Result:** The button will have:

- Base classes from preset
- Preset variant classes (primary, sm/md/lg)
- Local variant classes (ghost, loading)
- Merged intelligently - local overrides preset

## Basic Usage

**Key Pattern:** `defineVariants()` returns a **function** that you pass to `HtmlAtom`. The component calls this function internally with bond and props.

```svelte
<script lang="ts">
	import { HtmlAtom } from '@svelte-atoms/core';
	import { defineVariants } from '@svelte-atoms/core/utils';

	// defineVariants returns a FUNCTION
	const variants = defineVariants({
		class: 'rounded-md font-medium transition-colors',
		variants: {
			variant: {
				primary: {
					class: 'bg-blue-500 text-white hover:bg-blue-600'
				},
				secondary: {
					class: 'bg-gray-500 text-white hover:bg-gray-600'
				},
				danger: {
					class: 'bg-red-500 text-white hover:bg-red-600'
				}
			},
			size: {
				sm: 'px-2 py-1 text-sm',
				md: 'px-4 py-2 text-base',
				lg: 'px-6 py-3 text-lg'
			}
		},
		compounds: [
			{
				variant: 'primary',
				size: 'lg',
				class: 'shadow-lg' // Applied when both conditions match
			}
		],
		defaults: {
			variant: 'primary',
			size: 'md'
		}
	});

	let { variant, size, ...props } = $props();
</script>

<!-- Pass the variant FUNCTION to HtmlAtom -->
<!-- HtmlAtom will call it internally: variants(bond, { variant, size }) -->
<HtmlAtom {variants} {variant} {size} {...props}>
	{@render children?.()}
</HtmlAtom>
```

**How it works:**

1. `defineVariants(config)` → returns a function
2. You pass this function to `HtmlAtom` via `{variants}`
3. `HtmlAtom` internally calls `variants(bond, restProps)`
4. The function returns `{ class: [...], ...attributes }`
5. `HtmlAtom` applies these to the rendered element

## Key Features

### 1. Access to Component State (Bond)

Variant values can be functions that receive the component's bond for reactive styling:

```typescript
const accordionVariants = defineVariants({
	class: 'border rounded-md transition-all',
	variants: {
		state: {
			open: (bond) => ({
				class: bond?.state?.isOpen ? 'bg-blue-50 border-blue-200' : 'bg-white',
				'aria-expanded': bond?.state?.isOpen,
				'data-state': bond?.state?.isOpen ? 'open' : 'closed'
			}),
			disabled: (bond) => ({
				class: bond?.state?.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
				'aria-disabled': bond?.state?.disabled
			})
		}
	}
});

// Usage in component:
let { state = 'open', ...props } = $props();

<HtmlAtom {variants} {state} {...props}>
	{@render children?.()}
</HtmlAtom>
```

### 2. Return Both Classes and Attributes

Variants can return not just classes, but any HTML attributes:

```typescript
const buttonVariants = defineVariants({
	variants: {
		variant: {
			primary: {
				class: 'bg-blue-500 text-white',
				'aria-label': 'Primary action',
				'data-variant': 'primary'
			},
			danger: (bond) => ({
				class: bond?.state?.disabled ? 'bg-red-300' : 'bg-red-500',
				'aria-disabled': bond?.state?.disabled,
				role: 'button'
			})
		}
	}
});

// When called by HtmlAtom, returns: { class: [...], 'aria-label': '...', 'data-variant': '...', ... }
```

### 3. Compound Variants

Apply additional styling when multiple conditions match:

```typescript
const alertVariants = defineVariants({
	class: 'rounded-lg p-4 border',
	variants: {
		variant: {
			error: 'bg-red-50 border-red-200 text-red-900'
		},
		size: {
			lg: 'text-lg'
		}
	},
	compounds: [
		{
			variant: 'error',
			size: 'lg',
			class: 'font-bold', // Only applied when both variant=error AND size=lg
			role: 'alert'
		}
	]
});
```

### 4. Type Safety

Full TypeScript support with automatic type inference:

```typescript
type ButtonVariants = VariantPropsType<typeof buttonVariants>;
// Inferred type: { variant?: 'primary' | 'secondary' | 'danger'; size?: 'sm' | 'md' | 'lg' }
```

### 5. Default Variants

Specify default values that are used when no variant is provided:

```typescript
const buttonVariants = defineVariants({
	class: 'rounded-md',
	variants: {
		variant: {
			primary: 'bg-blue-500',
			secondary: 'bg-gray-500'
		},
		size: {
			sm: 'text-sm',
			md: 'text-base',
			lg: 'text-lg'
		}
	},
	defaults: {
		variant: 'primary', // Used if variant prop is undefined
		size: 'md' // Used if size prop is undefined
	}
});

// Pass to HtmlAtom - uses defaults when props not provided
<HtmlAtom {variants} {...props}>
	{@render children?.()}
</HtmlAtom>
```

## Complete Examples

### Example 1: Preset-based Button (Recommended)

```typescript
// Theme.svelte - Define global button variants
import { setPreset } from '@svelte-atoms/core/context';

setPreset({
	button: () => ({
		class:
			'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2',
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10'
			}
		},
		compounds: [
			{
				variant: 'default',
				size: 'lg',
				class: 'text-base font-semibold'
			}
		],
		defaults: {
			variant: 'default',
			size: 'default'
		}
	})
});
```

```svelte
<!-- Button.svelte - Use preset variants -->
<script lang="ts">
	import { HtmlAtom } from '@svelte-atoms/core';

	type ButtonProps = {
		variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
		size?: 'default' | 'sm' | 'lg' | 'icon';
		disabled?: boolean;
	};

	let { variant, size, disabled = false, class: klass = '', ...props }: ButtonProps = $props();
</script>

<HtmlAtom preset="button" as="button" {variant} {size} {disabled} class={klass} {...props}>
	{@render children?.()}
</HtmlAtom>
```

### Example 2: Local Variants with HtmlAtom

```svelte
<script lang="ts">
	import { HtmlAtom } from '@svelte-atoms/core';
	import { defineVariants } from '@svelte-atoms/core/utils';

	const buttonVariants = defineVariants({
		class: 'inline-flex items-center justify-center rounded-md font-medium',
		variants: {
			variant: {
				primary: 'bg-blue-500 text-white hover:bg-blue-600',
				secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
				ghost: 'hover:bg-gray-100'
			},
			size: {
				sm: 'h-8 px-3 text-sm',
				md: 'h-10 px-4',
				lg: 'h-12 px-6 text-lg'
			}
		},
		defaults: {
			variant: 'primary',
			size: 'md'
		}
	});

	let { variant, size, ...props } = $props();
</script>

<HtmlAtom {variants} as="button" {variant} {size} {...props}>
	{@render children?.()}
</HtmlAtom>
```

### Example 3: Extending Preset with Local Variants

Combine global preset variants with component-specific variants:

```svelte
<!-- special-button.svelte -->
<script>
  import { HtmlAtom } from '@svelte-atoms/core';
  import { defineVariants } from '@svelte-atoms/core/utils';

  // Local variants that extend/override preset
  const localVariants = defineVariants({
    variants: {
      variant: {
        // Add new variants not in preset
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
        neon: 'bg-black text-neon-green border-2 border-neon-green'
      },
      // Add completely new variant key
      animated: {
        true: 'animate-pulse',
        false: ''
      }
    }
  });

  let {
    variant,
    size,
    animated = false,
    ...props
  } = $props();
</script>

<HtmlAtom
  preset="button"          <!-- Gets base variants -->
  variants={localVariants}  <!-- Merges/extends -->
  {variant}
  {size}
  {animated}
  {...props}
>
  {@render children?.()}
</HtmlAtom>
```

### Example 4: Alert Component with Compound Variants

```svelte
<script lang="ts">
	import { HtmlAtom } from '@svelte-atoms/core';
	import { defineVariants } from '@svelte-atoms/core/utils';

	const alertVariants = defineVariants({
		class: 'rounded-lg p-4 border',
		variants: {
			variant: {
				info: 'bg-blue-50 border-blue-200 text-blue-900',
				success: 'bg-green-50 border-green-200 text-green-900',
				warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
				error: 'bg-red-50 border-red-200 text-red-900'
			},
			size: {
				sm: 'text-sm p-2',
				md: 'text-base p-4',
				lg: 'text-lg p-6'
			}
		},
		compounds: [
			{
				variant: 'error',
				size: 'lg',
				class: 'font-bold',
				role: 'alert',
				'aria-live': 'assertive'
			}
		],
		defaults: {
			variant: 'info',
			size: 'md'
		}
	});

	let { variant, size, ...props } = $props();
</script>

<HtmlAtom {variants} {variant} {size} {...props}>
	{@render children?.()}
</HtmlAtom>
```

````

### Example 3: Accordion with Reactive Bond State

```svelte
<!-- accordion-item.svelte -->
<script>
  import { HtmlAtom } from '@svelte-atoms/core';
  import { defineVariants } from '@svelte-atoms/core/utils';
  import { AccordionBond } from './bond.svelte';

  const accordionVariants = defineVariants({
    class: 'border rounded-md transition-all duration-200',
    variants: {
      state: {
        // Reactive: changes when bond.state.isOpen changes
        open: (bond) => ({
          class: bond?.state?.isOpen
            ? 'bg-blue-50 border-blue-200'
            : 'bg-white border-gray-200',
          'aria-expanded': bond?.state?.isOpen,
          'data-state': bond?.state?.isOpen ? 'open' : 'closed'
        }),
        disabled: (bond) => ({
          class: bond?.state?.disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer',
          'aria-disabled': bond?.state?.disabled
        })
      }
    }
  });

  let { state = 'open', ...props } = $props();
</script>

<HtmlAtom {variants} {state} {...props}>
  {@render children?.()}
</HtmlAtom>
````

## Migration Guide

### Before: Manual Variant Management

```svelte
<script>
	let { variant = 'primary', size = 'md' } = $props();

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

	const classes = `rounded-md ${variantClasses[variant]} ${sizeClasses[size]}`;
</script>

<button class={classes}> Click me </button>
```

### After: defineVariants

```svelte
<script>
	import { HtmlAtom } from '@svelte-atoms/core';
	import { defineVariants } from '@svelte-atoms/core/utils';

	const buttonVariants = defineVariants({
		class: 'rounded-md',
		variants: {
			variant: {
				primary: 'bg-blue-500 text-white hover:bg-blue-600',
				secondary: 'bg-gray-500 text-white hover:bg-gray-600',
				danger: 'bg-red-500 text-white hover:bg-red-600'
			},
			size: {
				sm: 'px-2 py-1 text-sm',
				md: 'px-4 py-2 text-base',
				lg: 'px-6 py-3 text-lg'
			}
		},
		defaults: {
			variant: 'primary',
			size: 'md'
		}
	});

	let { variant, size, ...props } = $props();
</script>

<!-- Pass the variant function to HtmlAtom -->
<HtmlAtom {variants} as="button" {variant} {size} {...props}>Click me</HtmlAtom>
```

### Benefits After Migration

✅ **Less boilerplate** - Define once, use everywhere  
✅ **Type safety** - Automatic type inference  
✅ **Compound variants** - Complex styling combinations  
✅ **Default values** - No need for fallback logic  
✅ **Bond integration** - Access component state for reactive variants  
✅ **Return attributes** - Not just classes, any HTML attributes

## Best Practices

### 1. Organize Variants in Separate Files

```typescript
// variants.ts
import { defineVariants } from '@svelte-atoms/core/utils';

export const buttonVariants = defineVariants({
	class: 'rounded-md font-medium transition-colors',
	variants: {
		/* ... */
	},
	defaults: {
		/* ... */
	}
});

export const cardVariants = defineVariants({
	class: 'rounded-lg border',
	variants: {
		/* ... */
	},
	defaults: {
		/* ... */
	}
});
```

### 2. Pass Variants Function to Components

Always pass the variant function (not the result) to `HtmlAtom`:

```svelte
<script>
	const variants = defineVariants({ ... });
	
	let { variant, size, ...props } = $props();
</script>

<!-- Correct: Pass the function -->
<HtmlAtom {variants} {variant} {size} {...props}>
	{@render children?.()}
</HtmlAtom>
```

### 3. Extend with Additional Classes

Merge variant classes with custom classes:

```svelte
<script>
	let { variant, size, class: klass = '', ...props } = $props();
</script>

<HtmlAtom {variants} {variant} {size} class={['custom-class', klass]} {...props}>
	{@render children?.()}
</HtmlAtom>
```

### 4. Type Props from Variants

Extract variant types for component props:

```typescript
import { VariantPropsType } from '@svelte-atoms/core/utils';
import { buttonVariants } from './variants';

type ButtonProps = VariantPropsType<typeof buttonVariants> & {
	disabled?: boolean;
	// other props...
};
```

## Creating Variants: Local vs Global

### Local Variants (Component-Specific)

Create variants directly in your component file when they're only used in one place:

```svelte
<!-- my-button.svelte -->
<script lang="ts">
	import { HtmlAtom } from '@svelte-atoms/core';
	import { defineVariants, type VariantPropsType } from '@svelte-atoms/core/utils';

	// Define variants locally
	const buttonVariants = defineVariants({
		class: 'inline-flex items-center justify-center rounded-md font-medium',
		variants: {
			variant: {
				primary: 'bg-blue-500 text-white hover:bg-blue-600',
				secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
				ghost: 'hover:bg-gray-100'
			},
			size: {
				sm: 'h-8 px-3 text-sm',
				md: 'h-10 px-4',
				lg: 'h-12 px-6 text-lg'
			}
		},
		compounds: [
			{
				variant: 'primary',
				size: 'lg',
				class: 'shadow-md font-semibold'
			},
			{
				variant: 'secondary',
				size: 'sm',
				class: 'text-xs'
			}
		],
		defaults: {
			variant: 'primary',
			size: 'md'
		}
	});

	// Extract variant prop types
	type ButtonVariantProps = VariantPropsType<typeof buttonVariants>;

	// Define component props extending variant props
	type ButtonProps = ButtonVariantProps & {
		disabled?: boolean;
		onclick?: (e: MouseEvent) => void;
		class?: string;
	};

	let { variant, size, disabled = false, class: klass = '', ...props }: ButtonProps = $props();

	const variants = buttonVariants; // The variant function
</script>

<HtmlAtom {variants} as="button" {variant} {size} {disabled} class={klass} {...props}>
	{@render children?.()}
</HtmlAtom>
```

**Use local variants when:**

- The component is unique and won't be reused elsewhere
- You need quick prototyping
- Variants are tightly coupled to the component logic

### Global Variants (Preset-Based)

Define variants globally in your theme/preset configuration for reusable components:

```typescript
// +layout.svelte or theme.svelte
import { setPreset } from '@svelte-atoms/core/context';

setPreset({
	// Global button variants
	button: () => ({
		class:
			'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline: 'border border-input bg-background hover:bg-accent',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 px-3',
				lg: 'h-11 px-8',
				icon: 'h-10 w-10'
			}
		},
		compounds: [
			{
				variant: 'default',
				size: 'lg',
				class: 'text-base font-semibold'
			}
		],
		defaults: {
			variant: 'default',
			size: 'default'
		}
	}),

	// Global card variants
	card: () => ({
		class: 'rounded-lg border bg-card text-card-foreground shadow-sm',
		variants: {
			variant: {
				default: 'border-border',
				elevated: 'shadow-lg',
				outlined: 'border-2'
			}
		},
		defaults: {
			variant: 'default'
		}
	})
});
```

```svelte
<!-- button.svelte - Consume global variants -->
<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';

  // Type-safe props based on preset
  type ButtonProps = {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    disabled?: boolean;
    class?: string;
  };

  let {
    variant,
    size,
    disabled = false,
    class: klass = '',
    ...props
  }: ButtonProps = $props();
</script>

<HtmlAtom
  preset="button"  <!-- Uses global preset variants -->
  as="button"
  {variant}
  {size}
  {disabled}
  class={klass}
  {...props}
>
  {@render children?.()}
</HtmlAtom>
```

**Use global variants when:**

- Building a design system with consistent styling
- Components are used across multiple pages/features
- You want centralized theme control
- You need to support theme switching

### Extending Global Variants Locally

Combine the best of both worlds - use global presets as a base and extend with local variants:

```svelte
<!-- special-button.svelte -->
<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
  import { defineVariants, type VariantPropsType } from '@svelte-atoms/core/utils';

  // Local variants that extend the global preset
  const extendedVariants = defineVariants({
    variants: {
      variant: {
        // Add new variants not in preset
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
        neon: 'bg-black text-green-400 border-2 border-green-400 hover:bg-green-400 hover:text-black',
        glass: 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20'
      },
      // Add new variant dimension
      animated: {
        true: 'animate-pulse',
        false: ''
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg'
      }
    },
    defaults: {
      animated: false,
      shadow: 'none'
    }
  });

  // Extract extended variant types
  type ExtendedVariantProps = VariantPropsType<typeof extendedVariants>;

  // Combine preset variants with extended variants
  type SpecialButtonProps = {
    // Preset variant types
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient' | 'neon' | 'glass';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    // Extended variant types
    animated?: boolean;
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    class?: string;
  };

  let {
    variant,
    size,
    animated,
    shadow,
    disabled = false,
    class: klass = '',
    ...props
  }: SpecialButtonProps = $props();
</script>

<HtmlAtom
  preset="button"              <!-- Gets base global variants -->
  variants={extendedVariants}  <!-- Extends with local variants -->
  as="button"
  {variant}
  {size}
  {animated}
  {shadow}
  {disabled}
  class={klass}
  {...props}
>
  {@render children?.()}
</HtmlAtom>
```

## Type-Safe Component Props with Variants

### Method 1: Manual Type Definition (Preset-based)

When using presets, manually define the variant types based on your preset configuration:

```svelte
<script lang="ts">
	import { HtmlAtom } from '@svelte-atoms/core';

	// Manually typed based on preset definition
	type ButtonProps = {
		variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
		size?: 'default' | 'sm' | 'lg' | 'icon';
		disabled?: boolean;
		class?: string;
		onclick?: (e: MouseEvent) => void;
	};

	let { variant, size, disabled = false, class: klass = '', ...props }: ButtonProps = $props();
</script>

<HtmlAtom preset="button" as="button" {variant} {size} {disabled} class={klass} {...props}>
	{@render children?.()}
</HtmlAtom>
```

### Method 2: Extract Types from defineVariants

For local variants, use `VariantPropsType` to automatically extract types:

```svelte
<script lang="ts">
	import { HtmlAtom } from '@svelte-atoms/core';
	import { defineVariants, type VariantPropsType } from '@svelte-atoms/core/utils';

	const buttonVariants = defineVariants({
		class: 'rounded-md',
		variants: {
			variant: {
				primary: 'bg-blue-500',
				secondary: 'bg-gray-500',
				danger: 'bg-red-500'
			},
			size: {
				sm: 'text-sm',
				md: 'text-base',
				lg: 'text-lg'
			},
			fullWidth: {
				true: 'w-full',
				false: 'w-auto'
			}
		},
		defaults: {
			variant: 'primary',
			size: 'md',
			fullWidth: false
		}
	});

	// Automatically extract variant prop types
	type ButtonVariantProps = VariantPropsType<typeof buttonVariants>;
	// Result: { variant?: 'primary' | 'secondary' | 'danger'; size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean }

	// Extend with additional props
	type ButtonProps = ButtonVariantProps & {
		disabled?: boolean;
		onclick?: (e: MouseEvent) => void;
		class?: string;
	};

	let {
		variant,
		size,
		fullWidth,
		disabled = false,
		class: klass = '',
		...props
	}: ButtonProps = $props();
</script>

<HtmlAtom {variants} as="button" {variant} {size} {fullWidth} {disabled} class={klass} {...props}>
	{@render children?.()}
</HtmlAtom>
```

### Method 3: Shared Variant Types

Create reusable variant type definitions:

```typescript
// types/button.ts
import { defineVariants, type VariantPropsType } from '@svelte-atoms/core/utils';

export const buttonVariants = defineVariants({
	class: 'inline-flex items-center justify-center rounded-md font-medium',
	variants: {
		variant: {
			primary: 'bg-blue-500 text-white',
			secondary: 'bg-gray-200 text-gray-900',
			ghost: 'hover:bg-gray-100'
		},
		size: {
			sm: 'h-8 px-3 text-sm',
			md: 'h-10 px-4',
			lg: 'h-12 px-6 text-lg'
		}
	},
	defaults: {
		variant: 'primary',
		size: 'md'
	}
});

// Export the variant types
export type ButtonVariantProps = VariantPropsType<typeof buttonVariants>;

// Export full component props
export type ButtonProps = ButtonVariantProps & {
	disabled?: boolean;
	onclick?: (e: MouseEvent) => void;
	class?: string;
};
```

```svelte
<!-- button.svelte -->
<script lang="ts">
	import { HtmlAtom } from '@svelte-atoms/core';
	import { buttonVariants, type ButtonProps } from './types/button';

	const variants = buttonVariants; // The function from the shared file

	let { variant, size, disabled = false, class: klass = '', ...props }: ButtonProps = $props();
</script>

<HtmlAtom {variants} as="button" {variant} {size} {disabled} class={klass} {...props}>
	{@render children?.()}
</HtmlAtom>
```

### Method 4: Component with Bond State Types

For components using the Bond pattern:

```typescript
// accordion-item.svelte
<script lang="ts">
  import { HtmlAtom } from '@svelte-atoms/core';
  import { defineVariants, type VariantPropsType } from '@svelte-atoms/core/utils';
  import { AccordionBond } from './bond.svelte';

  const accordionVariants = defineVariants({
    class: 'border rounded-md',
    variants: {
      state: {
        open: (bond) => ({
          class: bond?.state?.isOpen ? 'bg-blue-50' : 'bg-white',
          'aria-expanded': bond?.state?.isOpen
        })
      },
      bordered: {
        true: 'border-2',
        false: 'border'
      }
    },
    defaults: {
      bordered: false
    }
  });

  // Extract variant types
  type AccordionVariantProps = VariantPropsType<typeof accordionVariants>;

  // Extend with component-specific props
  type AccordionItemProps = Omit<AccordionVariantProps, 'state'> & {
    value: string;
    disabled?: boolean;
    class?: string;
  };

  let {
    value,
    bordered,
    disabled = false,
    class: klass = '',
    ...props
  }: AccordionItemProps = $props();

  const variants = accordionVariants; // The variant function
</script>

<HtmlAtom {variants} {bordered} class={klass} {...props}>
  {@render children?.()}
</HtmlAtom>
```

### Best Practices for Typed Variants

1. **Always extract types from defineVariants**

   ```typescript
   const variants = defineVariants({...});
   type VariantProps = VariantPropsType<typeof variants>;
   ```

2. **Extend variant types with component props**

   ```typescript
   type ComponentProps = VariantProps & {
   	disabled?: boolean;
   	onclick?: () => void;
   };
   ```

3. **Use Omit for bond-driven variants**

   ```typescript
   // Remove 'state' from props since it's driven by bond
   type Props = Omit<VariantProps, 'state'> & { ... };
   ```

4. **Share types across related components**

   ```typescript
   // types/card.ts
   export type CardVariantProps = VariantPropsType<typeof cardVariants>;
   export type CardHeaderProps = { class?: string };
   export type CardBodyProps = { class?: string };
   ```

5. **Document variant options in JSDoc**
   ```typescript
   /**
    * Button component with multiple variants
    * @param variant - Visual style: 'primary' | 'secondary' | 'ghost'
    * @param size - Size variant: 'sm' | 'md' | 'lg'
    */
   type ButtonProps = VariantPropsType<typeof buttonVariants> & {...};
   ```

## Summary

`defineVariants()` provides:

✅ **Single function** - One API for all variant needs  
✅ **Type-safe** - Automatic TypeScript inference  
✅ **Reactive** - Access bond state for dynamic styling  
✅ **Powerful** - Base classes, compound variants, defaults  
✅ **Flexible** - Return both classes and attributes  
✅ **Clean** - No manual object merging or conditionals  
✅ **Extensible** - Combine global presets with local variants  
✅ **Type extraction** - Use `VariantPropsType` for automatic type inference

Inspired by Class Variance Authority but integrated with @svelte-atoms/core's bond system.
