# Stack Component

> **Source**: [`src/lib/components/stack`](../../src/lib/components/stack)

The `Stack` component provides a flexible container for arranging children in vertical or horizontal layouts with consistent spacing.

## Features

- Vertical and horizontal layouts
- Configurable spacing between items
- Alignment control
- Responsive layout support
- Preset system integration

## Props

**Props:** See [`StackProps`](../../src/lib/components/stack/stack.svelte)

Key props:

- `direction?: 'row' | 'column'` - Stack direction (default: 'column')
- `spacing?: string | number` - Gap between items
- `align?: 'start' | 'center' | 'end' | 'stretch'` - Cross-axis alignment
- `justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'` - Main-axis alignment
- `as?: E extends keyof HTMLElementTagNameMap` - Element type (default: 'div')

## Usage

```svelte
<script>
	import { Stack } from '@svelte-atoms/core';
</script>

<!-- Vertical stack (default) -->
<Stack spacing={4}>
	<div>Item 1</div>
	<div>Item 2</div>
	<div>Item 3</div>
</Stack>

<!-- Horizontal stack -->
<Stack direction="row" spacing={2}>
	<button>Button 1</button>
	<button>Button 2</button>
	<button>Button 3</button>
</Stack>

<!-- Centered items -->
<Stack align="center" justify="center">
	<div>Centered content</div>
</Stack>

<!-- With custom spacing -->
<Stack spacing="1rem">
	<p>Paragraph 1</p>
	<p>Paragraph 2</p>
</Stack>
```

## Direction

### Vertical (Column)

```svelte
<Stack direction="column">
	<div>Top</div>
	<div>Middle</div>
	<div>Bottom</div>
</Stack>
```

### Horizontal (Row)

```svelte
<Stack direction="row">
	<div>Left</div>
	<div>Center</div>
	<div>Right</div>
</Stack>
```

## Spacing

Accepts various spacing values:

- Numbers: `4` (interpreted as spacing units)
- Strings: `"1rem"`, `"16px"`, `"gap-4"`

```svelte
<!-- Number spacing -->
<Stack spacing={4}>...</Stack>

<!-- String spacing -->
<Stack spacing="1.5rem">...</Stack>

<!-- Tailwind classes -->
<Stack spacing="gap-4">...</Stack>
```

## Alignment

### Cross-Axis Alignment (`align`)

```svelte
<!-- Column: horizontal alignment -->
<Stack align="start">...</Stack>
<Stack align="center">...</Stack>
<Stack align="end">...</Stack>
<Stack align="stretch">...</Stack>

<!-- Row: vertical alignment -->
<Stack direction="row" align="center">...</Stack>
```

### Main-Axis Alignment (`justify`)

```svelte
<Stack justify="start">...</Stack>
<Stack justify="center">...</Stack>
<Stack justify="end">...</Stack>
<Stack justify="between">...</Stack>
<Stack justify="around">...</Stack>
<Stack justify="evenly">...</Stack>
```

## Responsive Stacks

```svelte
<!-- Responsive direction -->
<Stack direction="column" class="md:flex-row" spacing={4}>
	<div>Responsive item 1</div>
	<div>Responsive item 2</div>
</Stack>
```

## Nested Stacks

```svelte
<Stack spacing={6}>
	<Stack direction="row" spacing={2}>
		<button>Action 1</button>
		<button>Action 2</button>
	</Stack>

	<Stack spacing={2}>
		<p>Content section 1</p>
		<p>Content section 2</p>
	</Stack>
</Stack>
```

## Customization

```typescript
const preset = {
	stack: {
		as: 'div',
		direction: 'column',
		spacing: 4,
		class: 'custom-stack-styles'
	}
};
```

## Common Patterns

### Form Layout

```svelte
<Stack spacing={4}>
	<Label>Name</Label>
	<Input />

	<Label>Email</Label>
	<Input type="email" />

	<Button type="submit">Submit</Button>
</Stack>
```

### Button Group

```svelte
<Stack direction="row" spacing={2}>
	<Button>Cancel</Button>
	<Button>Save</Button>
</Stack>
```

### Card Content

```svelte
<Card>
	<Stack spacing={4}>
		<h2>Title</h2>
		<p>Description</p>
		<Button>Action</Button>
	</Stack>
</Card>
```

## Best Practices

1. Use consistent spacing throughout your app
2. Choose appropriate direction for content flow
3. Consider responsive layouts
4. Use nested stacks for complex layouts
5. Combine with other layout components
6. Set reasonable spacing values

## Related

- Container Component
- Grid Component
- Divider Component
- Layout utilities
