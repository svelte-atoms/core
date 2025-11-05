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

```typescript
import { defineVariants } from '@svelte-atoms/core/utils';

const buttonVariants = defineVariants({
	class: 'rounded-md font-medium transition-colors',
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
```

```svelte
<script>
	import { buttonVariants } from './variants';

	let { variant, size, ...props } = $props();

	const variantProps = buttonVariants({ variant, size });
</script>

<HtmlAtom {...variantProps} {...props}>
	{@render children?.()}
</HtmlAtom>
```

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

// Usage:
const bond = AccordionBond.get();
const variantProps = accordionVariants(bond, { state: 'open' });
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

// Returns: { class: '...', 'aria-label': '...', 'data-variant': '...', ... }
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

// Call without props - uses defaults
buttonVariants(null); // Returns variant='primary', size='md'
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

### Example 2: Local Variants Only

````svelte
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
````

### Example 4: Reactive Variants with Bond State

<script>
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
  
  const bond = null; // or get from context if needed
  const variantProps = alertVariants(bond, { variant, size });
</script>

<HtmlAtom {...variantProps} {...props}>
{@render children?.()}
</HtmlAtom>

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

  const bond = AccordionBond.get();

  // Automatically reactive - updates when bond state changes
  const variantProps = $derived(accordionVariants(bond, { state: 'open' }));
</script>

<HtmlAtom {...variantProps}>
  {@render children?.({ accordion: bond })}
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

	const bond = null; // or get from context if needed
	const variantProps = buttonVariants(bond, { variant, size });
</script>

<HtmlAtom as="button" {...variantProps} {...props}>Click me</HtmlAtom>
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

### 2. Use $derived for Reactive Variants

When using bond state, wrap the variant call in `$derived`:

```svelte
<script>
	const bond = AccordionBond.get();

	// Reactive - updates when bond state changes
	const variantProps = $derived(accordionVariants(bond, { state: 'open' }));
</script>
```

### 3. Extend with Additional Classes

Merge variant classes with custom classes:

```svelte
<script>
	const bond = null; // or get from context if needed
	const variantProps = buttonVariants(bond, { variant, size });
</script>

<HtmlAtom class={[variantProps.class, 'custom-class']} {...variantProps} />
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

## Summary

`defineVariants()` provides:

✅ **Single function** - One API for all variant needs  
✅ **Type-safe** - Automatic TypeScript inference  
✅ **Reactive** - Access bond state for dynamic styling  
✅ **Powerful** - Base classes, compound variants, defaults  
✅ **Flexible** - Return both classes and attributes  
✅ **Clean** - No manual object merging or conditionals

Inspired by Class Variance Authority but integrated with @svelte-atoms/core's bond system.
