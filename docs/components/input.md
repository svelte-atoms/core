# Input Module

> **Source**: [`src/lib/components/input`](../../src/lib/components/input)

The `Input` module provides a comprehensive input component system with support for icons, placeholders, and complex input patterns.

## Features

- Bond-based state management
- Support for input icons
- Custom placeholder rendering
- Value display customization
- Form integration
- Accessible input fields

## Components

### `Input.Root`

Root container for the input system.

**Props:** See [`InputRootProps`](../../src/lib/components/input/input-root.svelte)

Key props:

- `value?: string` - Bindable input value
- `disabled?: boolean` - Disabled state
- `readonly?: boolean` - Readonly state
- `factory?: (props) => InputBond` - Custom bond factory

### `Input.Icon`

Icon component displayed within the input.

**Props:** See [`InputIconProps`](../../src/lib/components/input/input-icon.svelte)

Key props:

- `children?: Snippet` - Icon content

### `Input.Placeholder`

Custom placeholder component.

**Props:** See [`InputPlaceholderProps`](../../src/lib/components/input/input-placeholder.svelte)

Key props:

- `children?: Snippet` - Placeholder content

### `Input.Value`

Component for displaying formatted input value.

**Props:** See [`InputValueProps`](../../src/lib/components/input/input-value.svelte)

Key props:

- `children?: Snippet` - Value renderer

## Usage

```svelte
<script>
	import { Input } from '@svelte-atoms/core';
	import SearchIcon from './icons/search.svelte';

	let value = $state('');
</script>

<!-- Basic input -->
<Input.Root bind:value>
	<input type="text" placeholder="Enter text..." />
</Input.Root>

<!-- Input with icon -->
<Input.Root bind:value>
	<Input.Icon position="left">
		<SearchIcon />
	</Input.Icon>
	<input type="text" placeholder="Search..." />
</Input.Root>

<!-- Custom placeholder -->
<Input.Root bind:value>
	<Input.Placeholder>
		<span class="text-gray-400">Custom placeholder</span>
	</Input.Placeholder>
	<input type="text" />
</Input.Root>

<!-- With value display -->
<Input.Root bind:value>
	<input type="text" />
	<Input.Value>
		{value.length} characters
	</Input.Value>
</Input.Root>
```

## Bond Pattern

Access input state via bond:

```svelte
<Input.Root>
	{#snippet children({ input })}
		<input type="text" value={input.state.value} oninput={(e) => input.setValue(e.target.value)} />
		<div>Value: {input.state.value}</div>
	{/snippet}
</Input.Root>
```

## Input Types

Supports all HTML input types:

- `text`, `email`, `password`
- `number`, `tel`, `url`
- `search`, `date`, `time`
- And more...

## States

- **Normal**: Default state
- **Focused**: When input has focus
- **Disabled**: When input is disabled
- **Readonly**: When input is readonly
- **Error**: When validation fails

## Customization

```typescript
const preset = {
	'input.root': {
		class: 'custom-input-container'
	},
	'input.icon': {
		class: 'custom-icon-styles'
	}
};
```

## Best Practices

1. Always provide labels for accessibility
2. Use appropriate input types for better UX
3. Provide clear placeholder text
4. Show validation feedback
5. Use icons to enhance meaning
6. Ensure sufficient contrast
7. Support keyboard navigation

## Accessibility

- Proper label association
- ARIA attributes for enhanced semantics
- Keyboard navigation support
- Error message announcement
- Focus management

## Form Integration

```svelte
<form>
	<label for="email">Email</label>
	<Input.Root>
		<input id="email" type="email" name="email" required />
	</Input.Root>
</form>
```

## Related

- Label Component
- Form Components
- Textarea Component
- Checkbox Component
