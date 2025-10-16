# Icon Component

> **Source**: [`src/lib/components/icon`](../../src/lib/components/icon)

The `Icon` component provides a flexible wrapper for rendering icons with consistent styling.

## Features

- SVG icon support
- Customizable size and styling
- Preset system integration
- Accessible icon rendering

## Props

**Props:** See [`IconProps`](../../src/lib/components/icon/icon.svelte)

Key props:

- `as?: E extends keyof HTMLElementTagNameMap` - Element type (default: 'span')
- `base?: Base` - Base styling configuration
- `size?: string | number` - Icon size
- `children?: Snippet` - Icon content renderer

## Usage

```svelte
<script>
	import { Icon } from '@svelte-atoms/core';
	import CheckmarkIcon from './icons/checkmark.svelte';
</script>

<!-- Basic icon -->
<Icon>
	<CheckmarkIcon />
</Icon>

<!-- Custom size -->
<Icon size={24}>
	<CheckmarkIcon />
</Icon>

<Icon size="2rem">
	<CheckmarkIcon />
</Icon>

<!-- Styled icon -->
<Icon class="text-blue-500">
	<CheckmarkIcon />
</Icon>
```

## Size Options

The size prop accepts:

- Numbers (interpreted as pixels): `24`
- Strings with units: `"2rem"`, `"24px"`
- Preset sizes via class: `"w-6 h-6"`

## Built-in Icons

The library includes common icons:

- Checkmark
- Close/X
- Arrow (up, down, left, right)
- Menu
- Search
- And more...

Import from: `@svelte-atoms/core/icons/`

## Customization

Use the preset system:

```typescript
const preset = {
	icon: {
		as: 'span',
		class: 'inline-block',
		size: 24
	}
};
```

## Best Practices

1. Provide meaningful ARIA labels for standalone icons
2. Use consistent icon sizes across your app
3. Ensure sufficient color contrast
4. Consider icon library or design system
5. Use SVG for scalability
6. Provide text alternatives for important actions

## Accessibility

```svelte
<!-- Icon with label -->
<Icon aria-label="Success">
	<CheckmarkIcon />
</Icon>

<!-- Decorative icon -->
<Icon aria-hidden="true">
	<DecorativeIcon />
</Icon>

<!-- Icon with accompanying text -->
<button>
	<Icon><SaveIcon /></Icon>
	<span>Save</span>
</button>
```

## Related

- Button Component
- Badge Component
- Navigation Components
