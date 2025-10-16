# List Component

> **Source**: [`src/lib/components/list`](../../src/lib/components/list)

The `List` component provides a flexible container for rendering lists of items with consistent styling.

## Features

- Ordered and unordered lists
- Custom list styling
- Nested list support
- Preset system integration
- Accessible list structure

## Props

**Props:** See [`ListRootProps`](../../src/lib/components/list/list-root.svelte)

Key props:

- `as?: 'ul' | 'ol' | 'dl'` - List element type (default: 'ul')
- `base?: Base` - Base styling configuration
- `children?: Snippet` - List items

## Usage

### Basic List

```svelte
<script>
	import { List } from '@svelte-atoms/core';
</script>

<!-- Simple list with items -->
<List.Root>
	<List.Item>Item 1</List.Item>
	<List.Item>Item 2</List.Item>
	<List.Item>Item 3</List.Item>
</List.Root>
```

### List with Title

```svelte
<script>
	import { List } from '@svelte-atoms/core';
</script>

<List.Root>
	<List.Title>My List</List.Title>
	<List.Item>First item</List.Item>
	<List.Item>Second item</List.Item>
	<List.Item>Third item</List.Item>
</List.Root>
```

### Grouped Lists

```svelte
<script>
	import { List } from '@svelte-atoms/core';
</script>

<List.Root>
	<List.Group>
		<List.Title>Fruits</List.Title>
		<List.Item>Apple</List.Item>
		<List.Item>Banana</List.Item>
		<List.Item>Orange</List.Item>
	</List.Group>

	<List.Divider />

	<List.Group>
		<List.Title>Vegetables</List.Title>
		<List.Item>Carrot</List.Item>
		<List.Item>Broccoli</List.Item>
		<List.Item>Spinach</List.Item>
	</List.Group>
</List.Root>
```

### Ordered List

```svelte
<script>
	import { List } from '@svelte-atoms/core';
</script>

<List.Root as="ol" class="list-inside list-decimal">
	<List.Item>First step</List.Item>
	<List.Item>Second step</List.Item>
	<List.Item>Third step</List.Item>
</List.Root>
```

### Styled List Items

```svelte
<script>
	import { List } from '@svelte-atoms/core';
	import { Icon } from '@svelte-atoms/core';
</script>

<List.Root class="space-y-2">
	<List.Item class="items-center">
		<Icon src={CheckIcon} />
		<span>Feature 1</span>
	</List.Item>
	<List.Item class="items-center">
		<Icon src={CheckIcon} />
		<span>Feature 2</span>
	</List.Item>
	<List.Item class="items-center">
		<Icon src={CheckIcon} />
		<span>Feature 3</span>
	</List.Item>
</List.Root>
```

### Interactive List

```svelte
<script>
	import { List } from '@svelte-atoms/core';

	let selectedItem = $state(null);
</script>

<List.Root>
	<List.Item
		as="button"
		class="transition-colors hover:bg-gray-100"
		onclick={() => (selectedItem = 'item1')}
	>
		Item 1
	</List.Item>
	<List.Item
		as="button"
		class="transition-colors hover:bg-gray-100"
		onclick={() => (selectedItem = 'item2')}
	>
		Item 2
	</List.Item>
	<List.Item
		as="button"
		class="transition-colors hover:bg-gray-100"
		onclick={() => (selectedItem = 'item3')}
	>
		Item 3
	</List.Item>
</List.Root>

{#if selectedItem}
	<p>Selected: {selectedItem}</p>
{/if}
```

## List Types

### Unordered List (`ul`)

For items without specific order:

```svelte
<List.Root>
	<List.Item>Apple</List.Item>
	<List.Item>Banana</List.Item>
	<List.Item>Orange</List.Item>
</List.Root>
```

### Ordered List (`ol`)

For sequential items:

```svelte
<List.Root as="ol" class="list-inside list-decimal">
	<List.Item>Preparation</List.Item>
	<List.Item>Implementation</List.Item>
	<List.Item>Review</List.Item>
</List.Root>
```

### Definition List (`dl`)

For term-definition pairs:

```svelte
<List.Root as="dl">
	<dt class="font-semibold">HTML</dt>
	<dd class="ml-4">HyperText Markup Language</dd>
	<dt class="font-semibold">CSS</dt>
	<dd class="ml-4">Cascading Style Sheets</dd>
</List.Root>
```

## Nested Lists

```svelte
<List.Root>
	<List.Item>
		Parent item 1
		<List.Root class="mt-2 ml-4">
			<List.Item>Child item 1</List.Item>
			<List.Item>Child item 2</List.Item>
		</List.Root>
	</List.Item>
	<List.Item>Parent item 2</List.Item>
</List.Root>
```

## Custom Markers

```svelte
<!-- Custom bullets -->
<List.Root class="list-none">
	<List.Item class="before:mr-2 before:content-['→']">Item 1</List.Item>
	<List.Item class="before:mr-2 before:content-['→']">Item 2</List.Item>
</List.Root>

<!-- Icon markers -->
<List.Root class="space-y-2">
	<List.Item class="items-center">
		<Icon src={CheckIcon} />
		<span>Completed task</span>
	</List.Item>
	<List.Item class="items-center">
		<Icon src={CheckIcon} />
		<span>In progress task</span>
	</List.Item>
</List.Root>
```

## Customization

```typescript
const preset = {
	list: {
		as: 'ul',
		class: 'custom-list-styles'
	}
};
```

## Best Practices

1. Use appropriate list type for content
2. Keep list items concise
3. Use consistent formatting within lists
4. Consider visual hierarchy for nested lists
5. Provide sufficient spacing between items
6. Use semantic HTML for list structure

## Accessibility

- Semantic HTML elements (`ul`, `ol`, `dl`)
- Screen reader announces list and item count
- Proper nesting structure
- Consider ARIA attributes for custom lists

## Styling Patterns

```svelte
<!-- Spaced list -->
<List.Root class="space-y-4">
	<List.Item>Item with spacing</List.Item>
	<List.Item>Another item</List.Item>
</List.Root>

<!-- Inline list -->
<List.Root class="flex flex-row gap-4">
	<List.Item>Inline item 1</List.Item>
	<List.Item>Inline item 2</List.Item>
</List.Root>

<!-- Bordered list -->
<List.Root class="divide-y overflow-hidden rounded border">
	<List.Item>List item 1</List.Item>
	<List.Item>List item 2</List.Item>
	<List.Item>List item 3</List.Item>
</List.Root>

<!-- Compact list with dividers -->
<List.Root>
	<List.Item>First item</List.Item>
	<List.Divider />
	<List.Item>Second item</List.Item>
	<List.Divider />
	<List.Item>Third item</List.Item>
</List.Root>
```

## Related

- Stack Component
- Menu Component
- Navigation Components
