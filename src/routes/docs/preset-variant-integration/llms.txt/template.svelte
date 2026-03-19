<script lang="ts">
	import { newLine, inlineCode, codeBlock } from '$docs/md/template';
	import { FrontMatter } from '$docs/md/components';
	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# Preset-Variant Integration

## Overview

The variant system is deeply integrated with the preset system in @svelte-atoms/core, providing a powerful theming architecture that combines:

- **Global variants** via presets (app-level theming)
- **Local variants** via component props (component-level customization)
- **Intelligent merging** that respects the hierarchy

## Architecture

{codeBlock(`┌─────────────────────────────────────────────────────┐
│ Theme Layer (Preset System)                         │
│                                                      │
│ setPreset({                                          │
│   button: () => ({                                   │
│     class: 'font-medium',  // Base styling           │
│     variants: {            // Global variant defs    │
│       base: 'rounded-md',                            │
│       variants: {                                    │
│         variant: { primary: '...', secondary: '...' }│
│         size: { sm: '...', md: '...', lg: '...' }   │
│       }                                              │
│     }                                                │
│   })                                                 │
│ })                                                   │
└─────────────────────────────────────────────────────┘
                          ↓
                    [MERGE STRATEGY]
                          ↓
┌─────────────────────────────────────────────────────┐
│ Component Layer (Local Variants)                    │
│                                                      │
│ <HtmlAtom                                            │
│   preset="button"                                    │
│   variants={localVariants} // Overrides/extends     │
│   variant="primary"                                  │
│   size="lg"                                          │
│ />                                                   │
└─────────────────────────────────────────────────────┘
                          ↓
                    [RESOLUTION]
                          ↓
┌─────────────────────────────────────────────────────┐
│ Final Output                                         │
│                                                      │
│ class: merged classes from preset + local + props   │
│ attributes: aria-*, data-*, role, etc.              │
└─────────────────────────────────────────────────────┘`)}

## Merge Strategy

### 1. Variant Definition Merging

When both preset and component define variants, they merge as follows:

{codeBlock(`{
  base: localVariants.base ?? presetVariants.base,

  variants: merge(
    presetVariants.variants ?? {},
    localVariants.variants ?? {}
  ),

  compoundVariants: [
    ...(presetVariants.compoundVariants ?? []),
    ...(localVariants.compoundVariants ?? [])
  ],

  defaultVariants: merge(
    presetVariants.defaultVariants ?? {},
    localVariants.defaultVariants ?? {}
  )
}`, 'typescript')}

**Rules:**

- Local {inlineCode('base')} overrides preset {inlineCode('base')}
- Local variants **merge** with preset variants (not replace)
- Compound variants from both are **concatenated**
- Default variants **merge** (local overrides preset)

### 2. Class Resolution Order

{codeBlock(`Final Class = [
  preset.class,              // 1. Preset base class
  preset.variants.base,      // 2. Preset variant base
  mergedVariants.base,       // 3. Merged variant base (local overrides)
  variantClasses,            // 4. Resolved variant classes
  compoundClasses,           // 5. Compound variant classes
  component.class            // 6. Component class prop (highest priority)
]`)}

### 3. Props Merging

{codeBlock(`  ...preset (excluding: class, base, as, variants),
  ...variantAttributes (aria-*, data-*, role, etc.),
  ...componentProps (user-provided props - highest priority)
`, 'typescript')}

## Usage Patterns

### Pattern 1: Pure Preset (No Local Variants)

**Best for:** Consistent components that don't need customization

{codeBlock(`// Theme.svelte
setPreset({
	badge: () => ({
		variants: {
			base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground',
					secondary: 'bg-secondary text-secondary-foreground',
					destructive: 'bg-destructive text-destructive-foreground',
					outline: 'border border-input'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	})
});`, 'typescript')}

{codeBlock(`<!-- Badge.svelte -->
<HtmlAtom preset="badge" {variant} {...props}>
	{@render children?.()}
</HtmlAtom>`, 'svelte')}

**Result:** Uses 100% preset variants, no local customization

---

### Pattern 2: Preset + Local Extension

**Best for:** Components that need additional variants beyond theme

{codeBlock(`// Theme.svelte
setPreset({
	button: () => ({
		variants: {
			base: 'rounded-md font-medium',
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground',
					secondary: 'bg-secondary text-secondary-foreground'
				},
				size: {
					sm: 'h-8 px-3',
					md: 'h-10 px-4',
					lg: 'h-12 px-6'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'md'
			}
		}
	})
});`, 'typescript')}

{codeBlock(`<!-- IconButton.svelte -->
<script>
	import { defineVariants } from '@svelte-atoms/core/utils';

	// Extend preset with icon-specific variants
	const iconVariants = defineVariants({
		variants: {
			// Add new variant key not in preset
			iconPosition: {
				left: 'flex-row',
				right: 'flex-row-reverse',
				top: 'flex-col',
				bottom: 'flex-col-reverse'
			}
		},
		defaultVariants: {
			iconPosition: 'left'
		}
	});
</script>

<HtmlAtom preset="button" variants={iconVariants} {variant} {size} {iconPosition} {...props}>
	{@render children?.()}
</HtmlAtom>`, 'svelte')}

**Result:** Gets {inlineCode('variant')} and {inlineCode('size')} from preset, adds {inlineCode('iconPosition')} locally

---

### Pattern 3: Preset Override

**Best for:** Special cases that need to completely override preset variants

{codeBlock(`// Theme.svelte
setPreset({
	button: () => ({
		variants: {
			base: 'rounded-md',
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground',
					destructive: 'bg-destructive text-destructive-foreground'
				}
			}
		}
	})
});`, 'typescript')}

{codeBlock(`<!-- GradientButton.svelte -->
<script>
	import { defineVariants } from '@svelte-atoms/core/utils';

	// Override preset variants completely
	const gradientVariants = defineVariants({
		base: 'rounded-full', // Overrides preset base
		variants: {
			variant: {
				// Overrides preset variants
				purple: 'bg-gradient-to-r from-purple-500 to-pink-500',
				blue: 'bg-gradient-to-r from-blue-500 to-cyan-500',
				green: 'bg-gradient-to-r from-green-500 to-emerald-500'
			}
		},
		defaultVariants: {
			variant: 'purple'
		}
	});
</script>

<HtmlAtom preset="button" variants={gradientVariants} {variant} {...props}>
	{@render children?.()}
</HtmlAtom>`, 'svelte')}

**Result:** Local variants completely replace preset variants for matching keys

---

### Pattern 4: Pure Local (No Preset)

**Best for:** One-off components that don't need global theming

{codeBlock(`<script>
	import { defineVariants } from '@svelte-atoms/core/utils';

	const customVariants = defineVariants({
		base: 'custom-base-class',
		variants: {
			custom: {
				a: 'class-a',
				b: 'class-b'
			}
		}
	});
</script>

<HtmlAtom variants={customVariants} custom="a" {...props}>
	{@render children?.()}
</HtmlAtom>`, 'svelte')}

**Result:** No preset used, 100% local variant definition

---

### Pattern 5: Dynamic Variants with Bond

**Best for:** Reactive variants that change based on component state

{codeBlock(`// Theme.svelte
setPreset({
	accordion: () => ({
		variants: {
			base: 'border rounded-md',
			variants: {
				state: {
					// Function receives bond for reactive styling
					open: (bond) => ({
						class: bond?.state?.isOpen ? 'bg-accent' : 'bg-background',
						'aria-expanded': bond?.state?.isOpen,
						'data-state': bond?.state?.isOpen ? 'open' : 'closed'
					})
				}
			}
		}
	})
});`, 'typescript')}

{codeBlock(`<!-- Accordion.svelte -->
<script>
	import { AccordionBond } from './bond.svelte';

	const bond = new AccordionBond(state).share();
</script>

<HtmlAtom preset="accordion" {bond} state="open" {...props}>
	{@render children?.({ accordion: bond })}
</HtmlAtom>`, 'svelte')}

**Result:** Variants reactively update when {inlineCode('bond.state.isOpen')} changes

## Advanced Features

### 1. Nested Preset Keys

Organize related components with dot notation:

{codeBlock(`setPreset({
	card: () => ({
		/* ... */
	}),
	'card.header': () => ({
		/* ... */
	}),
	'card.body': () => ({
		/* ... */
	}),
	'card.footer': () => ({
		/* ... */
	})
});`, 'typescript')}

{codeBlock(`<HtmlAtom preset="card.header" />`, 'svelte')}

### 2. Compound Variants

Apply classes when multiple conditions match:

{codeBlock(`setPreset({
	button: () => ({
		variants: {
			variants: {
				variant: { default: '...', destructive: '...' },
				size: { sm: '...', lg: '...' }
			},
			compoundVariants: [
				{
					variant: 'destructive',
					size: 'lg',
					class: 'font-bold uppercase', // Applied ONLY when both match
					'aria-label': 'Warning'
				}
			]
		}
	})
});`, 'typescript')}

### 3. Variant Attributes

Variants can return more than just classes:

{codeBlock(`variants: {
  variant: {
    destructive: {
      class: 'bg-destructive text-destructive-foreground',
      role: 'alert',
      'aria-label': 'Destructive action',
      'data-variant': 'destructive'
    }
  }
}`, 'typescript')}

### 4. Preset Class + Variant Base

Use both for layered styling:

{codeBlock(`setPreset({
	button: () => ({
		class: 'inline-flex items-center justify-center', // Always applied
		variants: {
			base: 'rounded-md transition-colors', // Variant base (can be overridden)
			variants: {
				/* ... */
			}
		}
	})
});`, 'typescript')}

**Final class order:**

1. {inlineCode('preset.class')}
2. {inlineCode('preset.variants.base')}
3. Local variant base (if overriding)
4. Variant classes
5. Component class prop

## Migration from Old System

### Before (Old Function-based)

{codeBlock(`<script>
	const variants = (bond, props) => {
		const { variant, size } = props;
		const classes = [];

		if (variant === 'primary') classes.push('bg-blue-500');
		if (size === 'sm') classes.push('px-2 py-1');

		return { class: classes.join(' ') };
	};
</script>

<HtmlAtom {variants} {variant} {size} />`, 'svelte')}

### After (New Variant System)

{codeBlock(`// In preset (recommended)
setPreset({
	button: () => ({
		variants: {
			variants: {
				variant: {
					primary: 'bg-blue-500'
				},
				size: {
					sm: 'px-2 py-1'
				}
			}
		}
	})
});`, 'typescript')}

{codeBlock(`<HtmlAtom preset="button" {variant} {size} />`, 'svelte')}

**OR** local only:

{codeBlock(`<script>
	import { defineVariants } from '@svelte-atoms/core/utils';

	const buttonVariants = defineVariants({
		variants: {
			variant: { primary: 'bg-blue-500' },
			size: { sm: 'px-2 py-1' }
		}
	});
</script>

<HtmlAtom variants={buttonVariants} {variant} {size} />`, 'svelte')}

## Best Practices

### ✅ DO

1. **Use presets for global variants** that should be consistent across the app
2. **Use local variants** to extend or override for special cases
3. **Use {inlineCode('class')} prop in preset** for base styling that always applies
4. **Use {inlineCode('variants.base')}** for styling that can be overridden locally
5. **Return attributes from variants** (aria-_, data-_, role) for accessibility

### ❌ DON'T

1. **Don't duplicate variants** in both preset and local unless overriding
2. **Don't use {inlineCode('base')} prop for CSS classes** (conflicts with component/snippet prop)
3. **Don't over-nest presets** - keep hierarchy shallow
4. **Don't forget default variants** - they make components easier to use

## Summary

The preset-variant integration provides:

✅ **Global theming** via preset system  
✅ **Local customization** via component variants  
✅ **Intelligent merging** that respects hierarchy  
✅ **Type safety** with TypeScript  
✅ **Reactive variants** with bond state access  
✅ **Attribute support** beyond just classes  
✅ **Backward compatible** with function-based variants

This architecture gives you the flexibility of both global consistency and local control.
