# Label Component

> **Source**: [`src/lib/components/label`](../../src/lib/components/label)

The `Label` component provides accessible labels for form inputs and interactive elements.

## Features

- Semantic label element
- Automatic input association
- Preset system integration
- Accessible form controls

## Props

**Props:** See [`LabelProps`](../../src/lib/components/label/label.svelte)

Key props:

- `for?: string` - Associated input element ID
- `as?: E extends keyof HTMLElementTagNameMap` - Element type (default: 'label')
- `base?: Base` - Base styling configuration
- `children?: Snippet` - Label content

## Usage

```svelte
<script>
	import { Label } from '@svelte-atoms/core';
	import { Input } from '@svelte-atoms/core';
</script>

<!-- Basic label -->
<Label for="username">Username</Label>
<input id="username" type="text" />

<!-- With input component -->
<Label for="email">Email Address</Label>
<Input.Root>
	<input id="email" type="email" />
</Input.Root>

<!-- Styled label -->
<Label for="password" class="text-lg font-bold">Password</Label>
<input id="password" type="password" />

<!-- Label wrapping input -->
<Label>
	Remember me
	<input type="checkbox" />
</Label>
```

## Label Patterns

### Explicit Association

```svelte
<Label for="field-id">Label Text</Label>
<input id="field-id" type="text" />
```

### Implicit Association

```svelte
<Label>
	Label Text
	<input type="text" />
</Label>
```

## Required Fields

```svelte
<Label for="required-field">
	Field Name
	<span class="text-red-500">*</span>
</Label>
```

## Customization

Use the preset system:

```typescript
const preset = {
	label: {
		as: 'label',
		class: 'custom-label-styles'
	}
};
```

## Best Practices

1. Always provide labels for form inputs
2. Use the `for` attribute to associate with inputs
3. Make labels descriptive and concise
4. Indicate required fields clearly
5. Ensure sufficient color contrast
6. Position labels consistently (above or beside inputs)
7. Consider label length for responsive layouts

## Accessibility

- Semantic HTML (`label` element)
- Screen reader compatible
- Click label to focus associated input
- Supports assistive technologies
- ARIA attributes when needed

## Form Integration

```svelte
<form>
	<div class="form-field">
		<Label for="username">Username</Label>
		<input id="username" type="text" required />
	</div>

	<div class="form-field">
		<Label for="email">Email</Label>
		<input id="email" type="email" required />
	</div>
</form>
```

## Related

- Input Component
- Checkbox Component
- Radio Component
- Form Components
- Textarea Component
