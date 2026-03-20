<script lang="ts">
	import { FrontMatter } from '$docs/md/components';
	import { codeBlock } from '$docs/md/template';
	
	let { data } = $props();
	const { frontmatter } = $derived(data);

	// These examples are provided as static strings that represent code
	// The <script> tags are part of the example code, not actual component scripts
</script>



<FrontMatter {frontmatter} />

# Variant System

## Overview

The variant system in @svelte-atoms/core provides a powerful way to define component styling variations. It's deeply integrated with the [preset system](./preset.md), allowing both global theming and local customization.

Using variants, you can:
- Define multiple style combinations for a single component
- Share variant definitions across your application
- Compose variants with custom classes
- Override defaults through the preset system
- Keep your styling logic DRY and maintainable

## The Problem

Building reusable components with multiple style variations often leads to repetitive, hard-to-maintain code:

{codeBlock(`<` + `script>
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
</` + `script>

<button class={\`btn \${variantClasses[variant]} \${sizeClasses[size]}\`}>
	Click me
</button>`, 'svelte')}

This approach has several issues:
- **Verbose**: Lots of boilerplate for simple styling logic
- **Unmaintainable**: Changes to variants scattered throughout components
- **Error-prone**: Easy to introduce inconsistencies between components
- **Inflexible**: Difficult to override or extend variants globally

## The Solution: `createVariant`

The `createVariant` utility provides a clean, type-safe way to define and manage component variants:

{codeBlock(`<` + `script>
	import { createVariant } from '@svelte-atoms/core';

	const variants = createVariant({
		base: 'btn font-semibold rounded transition-colors',
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
		defaultVariants: {
			variant: 'primary',
			size: 'md'
		}
	});

	let { variant = 'primary', size = 'md' } = $props();
</` + `script>

<button class={variants({ variant, size })}>
	Click me
</button>`, 'svelte')}

### Key Features

- **Declarative**: Define all variants in one place
- **Type-safe**: Full TypeScript support with autocompletion
- **Composable**: Combine multiple variant definitions
- **Flexible**: Mix variants with custom classes using the `class` parameter
- **Themeable**: Integrate with the preset system for global customization

## Advanced Usage

### Composing Variants with Custom Classes

Combine variant classes with custom styles:

{codeBlock(`<` + `script>
	import { createVariant } from '@svelte-atoms/core';

	const buttonVariants = createVariant({
		base: 'btn font-semibold rounded',
		variants: {
			variant: {
				primary: 'bg-blue-500 text-white',
				secondary: 'bg-gray-500 text-white'
			},
			size: {
				sm: 'px-2 py-1 text-sm',
				lg: 'px-6 py-3 text-lg'
			}
		}
	});

	const customClasses = 'hover:shadow-lg border-2 border-blue-300';
	let { variant = 'primary', size = 'sm' } = $props();
</` + `script>

<button class={buttonVariants({ variant, size, class: customClasses })}>
	Click me
</button>`, 'svelte')}

### Nested Variants (Compound States)

Use boolean variants to represent different component states:

{codeBlock(`<` + `script>
	import { createVariant } from '@svelte-atoms/core';

	const cardVariants = createVariant({
		base: 'card rounded-lg shadow',
		variants: {
			elevated: {
				true: 'shadow-lg',
				false: 'shadow'
			},
			padding: {
				tight: 'p-2',
				normal: 'p-4',
				loose: 'p-6'
			}
		}
	});

	let { elevated = true, padding = 'normal' } = $props();
</` + `script>

<div class={cardVariants({ elevated, padding })}>
	Card content
</div>`, 'svelte')}

### Global Preset Integration

Override default variants application-wide:

{codeBlock(`<` + `script>
	import { setComponentPreset } from '@svelte-atoms/core';

	// Set global variant defaults
	setComponentPreset('Button', {
		variant: 'secondary',
		size: 'lg'
	});
</` + `script>`, 'svelte')}

## Best Practices

1. **Define at module level**: Create variant definitions outside component logic
2. **Use descriptive names**: Make variant purposes clear (`elevated`, `padding` vs `p1`, `p2`)
3. **Group related variants**: Organize variants by component role or feature
4. **Document defaults**: Clearly specify default variant values
5. **Consider composition**: Break complex variants into smaller, reusable pieces
6. **Type variants strictly**: Use specific values instead of generic numbers/strings

## See Also

- [Preset System](./preset.md) - Learn how to theme variants globally
- [Component API](./components.md) - Full component documentation
