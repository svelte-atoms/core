# Checkbox Component

The `Checkbox` component provides a customizable checkbox input with visual feedback and animations.

## Features

- Custom styled checkbox with checkmark
- Support for indeterminate state
- Smooth transitions and animations
- Group support for multiple selections
- Bindable checked state

## Props

**Props:**

{{checkboxRootProps}}

Key props:

- `checked?: boolean` - Bindable checked state
- `indeterminate?: boolean` - Bindable indeterminate state
- `value?: any` - Bindable value
- `group?: any[]` - Bindable array for grouped checkboxes
- `checkedContent?: Snippet` - Custom checked indicator content

## Usage

```svelte
<script>
	import { Checkbox } from '@svelte-atoms/core';

	let checked = $state(false);
	let indeterminate = $state(false);
	let selectedItems = $state([]);
</script>

<!-- Basic checkbox -->
<Checkbox bind:checked>Accept terms</Checkbox>

<!-- Indeterminate state -->
<Checkbox bind:indeterminate>Select all</Checkbox>

<!-- Grouped checkboxes -->
<Checkbox bind:group={selectedItems} value="option1">Option 1</Checkbox>
<Checkbox bind:group={selectedItems} value="option2">Option 2</Checkbox>

<!-- Custom styling -->
<Checkbox
	bind:checked
	class="custom-checkbox"
	onchange={(e, data) => console.log('Checked:', data.checked)}
>
	Custom checkbox
</Checkbox>
```

## States

### Checked

The checkbox is selected.

### Unchecked

The checkbox is not selected.

### Indeterminate

The checkbox is in a partially selected state (useful for "select all" scenarios).

## Event Data

The `onchange` and `oninput` handlers receive data:

```typescript
{
  checked: boolean,
  value: boolean,
  type: 'boolean'
}
```

## Customization

Use the preset system to customize:

```typescript
const preset = {
	checkbox: {
		base: {
			/* base styles */
		},
		class: 'custom-checkbox-styles'
	},
	'checkbox.checkmark': {
		class: 'custom-checkmark-styles'
	},
	'checkbox.indeterminate': {
		class: 'custom-indeterminate-styles'
	}
};
```

## Animations

The checkbox supports transition animations via:

- Default scale animation on check/uncheck
- Custom `enter`, `exit`, and `initial` hooks
- Smooth color and state transitions

## Best Practices

1. Always provide a label for accessibility
2. Use `group` for related multiple selections
3. Use `indeterminate` for "select all" scenarios
4. Provide clear visual feedback for all states
5. Ensure sufficient click target size
6. Use proper ARIA attributes when needed

## Accessibility

- Native checkbox semantics
- Keyboard support (Space to toggle)
- Focus management
- Screen reader compatible
- Label association via `id`

## Related

- Radio Component
- Form Components
- Label Component
