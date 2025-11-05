# Styling Guide for @svelte-atoms/core

> **Audience**: LLMs and developers working with @svelte-atoms/core

## Core Concepts

All components accept a `class` prop that supports:

```svelte
<!-- String -->
<Button class="bg-blue-500 px-4 py-2 text-white">Click me</Button>

<!-- Array with conditionals -->
<Button class={['base-class', isActive && 'active-class', klass]}>Click me</Button>

<!-- Object -->
<Button class={{ 'bg-blue-500': isPrimary, 'bg-gray-500': !isPrimary }}>Click me</Button>
```

## 1. TailwindCSS (Primary Method)

Use Tailwind utility classes for all styling needs:

```svelte
<!-- Layout & spacing -->
<Card.Root class="max-w-sm p-4">
	<Card.Header>
		<Card.Title class="text-lg font-semibold">Title</Card.Title>
	</Card.Header>
</Card.Root>

<!-- Interactive states -->
<button class="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 active:bg-blue-700">
	Action
</button>

<!-- Responsive -->
<h2 class="text-2xl md:text-3xl lg:text-4xl">Responsive heading</h2>

<!-- With opacity -->
<div class="bg-foreground/10">Subtle background</div>
```

### Class Order Pattern

```svelte
<HtmlAtom
	class={[
		'base-layout-classes', // flex, grid, etc.
		'sizing-classes', // w-full, px-4, etc.
		'visual-classes', // bg-blue-500, border, etc.
		isOpen && 'conditional', // Conditional classes
		'$preset', // Preset placeholder (if using presets)
		klass // User overrides (highest priority)
	]}
/>
```

## 2. Preset System

Define default styles once, use everywhere:

```svelte
<script lang="ts">
	import { setPreset } from '@svelte-atoms/core/context';

	const preset = {
		// Simple preset
		button: () => ({
			class: 'bg-primary text-primary-foreground px-4 py-2 rounded'
		}),

		// With custom element
		accordion: () => ({
			as: 'ul',
			class: 'w-full max-w-md rounded-md border'
		}),

		// Dynamic with state
		'accordion.item.header': (bond) => ({
			class: bond?.state?.isActive ? 'text-foreground' : 'text-foreground/50'
		})
	};

	setPreset(preset);
</script>
```

**Using the `$preset` placeholder:**

```svelte
<!-- In your component -->
<HtmlAtom
	preset="button"
	class={[
		'component-defaults',
		'$preset', // Replaced with preset classes
		klass // User classes override
	]}
/>
```

## 3. CSS Custom Properties

Use design tokens from `root.css`:

```svelte
<!-- Color tokens -->
<div class="bg-background text-foreground">Background color</div>
<Button class="bg-primary text-primary-foreground">Primary button</Button>

<!-- With opacity -->
<div class="bg-foreground/10 text-foreground/50">Subtle styling</div>

<!-- Borders and shadows -->
<Card.Root class="border-border border shadow-lg">Card</Card.Root>
```

**Available tokens:**

- Colors: `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`
- Each color has `-foreground` variant
- Shadows: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`

## 4. Conditional Classes

Most common pattern from stories:

```svelte
<script>
	let isOpen = $state(false);
</script>

<!-- Array with conditions -->
<Collapsible.Body class={['pointer-events-none h-0 opacity-0', isOpen && 'pointer-events-auto']}>
	Content
</Collapsible.Body>

<!-- Ternary -->
<Tab.Root class={isActive ? 'opacity-100' : 'opacity-50'}>Tab content</Tab.Root>
```

## 5. Component Variants

Create reusable variants:

```svelte
<script lang="ts">
	let { variant = 'primary', size = 'md', class: klass = '' } = $props();

	const variants = {
		primary: 'bg-blue-500 text-white hover:bg-blue-600',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base'
	};
</script>

<Button class="{variants[variant]} {sizes[size]} {klass}">
	{@render children?.()}
</Button>
```

## 6. Inline Styles

Use for dynamic values only:

```svelte
<script>
	let width = $state(240);
</script>

<!-- ✅ Good: Dynamic values -->
<div style="width: {width}px; opacity: {isOpen ? 1 : 0}">Dynamic sizing</div>

<!-- ❌ Avoid: Static styling -->
<div style="padding: 16px; background: blue;">Use Tailwind instead</div>
```

## Quick Reference

| Need           | Use                                  |
| -------------- | ------------------------------------ |
| Static styling | TailwindCSS classes                  |
| Theme/defaults | Preset system                        |
| Conditional    | Array syntax with `&&`               |
| Responsive     | Tailwind breakpoints (`md:`, `lg:`)  |
| Colors         | CSS custom properties (`bg-primary`) |
| Dynamic values | Inline styles                        |
| Variants       | Computed class objects               |

## Best Practices

1. **Prefer Tailwind** - Use utility classes for 90% of styling
2. **Class order matters** - Base → Conditionals → `$preset` → User classes
3. **Use presets for consistency** - Define theme defaults once
4. **Avoid inline styles** - Use only for truly dynamic values
5. **Keep specificity low** - Avoid `!important`, let cascade work

## Class Merging

The `cn()` utility merges classes intelligently:

```typescript
import { cn } from '@svelte-atoms/core/utils';

// Resolves conflicts automatically
cn('px-2 py-1', 'px-4'); // Result: 'py-1 px-4'

// Handles conditionals
cn('base', isActive && 'active', false && 'ignored');
```
