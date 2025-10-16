# Button Component

> **Source**: [`src/lib/components/button`](../../src/lib/components/button)

The `Button` component provides an interactive element for user actions.

## Features

- Semantic button element
- Preset system integration
- Support for different button types
- Customizable styling and behavior

## Props

**Props:** See [`ButtonProps`](../../src/lib/components/button/button.svelte)

Key props:

- `type?: 'button' | 'submit' | 'reset'` - Button type (default: 'button')
- `base?: Base` - Base styling configuration
- `children?: Snippet` - Content renderer

## Usage

```svelte
<script>
	import { Button } from '@svelte-atoms/core';
</script>

<Button>Click me</Button>

<Button type="submit">Submit Form</Button>

<Button onclick={() => console.log('clicked')}>Action Button</Button>

<Button class="bg-blue-500 hover:bg-blue-600">Custom Styled</Button>
```

## Default Styling

The button comes with default interactive styling:

- Hover and active states
- Smooth transitions
- Rounded corners
- Appropriate padding

## Button Types

- `button` - Default, for general actions
- `submit` - For form submission
- `reset` - For form reset

## Customization

Use the preset system:

```typescript
const preset = {
	button: {
		base: {
			// base styles
		},
		class: 'custom-button-styles'
	}
};
```

## Best Practices

1. Always specify meaningful button text or labels
2. Use appropriate button types for forms
3. Ensure sufficient click target size (min 44x44px)
4. Provide clear hover/active states
5. Consider disabled states when needed
6. Use semantic HTML (avoid div with onclick)

## Accessibility

- Native keyboard support (Enter, Space)
- Focus management
- Screen reader compatible

## Related

- Link Component
- Icon Component
- Form Components
