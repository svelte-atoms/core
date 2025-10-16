# Card Component

> **Source**: [`src/lib/components/card`](../../src/lib/components/card)

A flexible and modular card component built following the atomic design pattern. The Card component provides a container for displaying content in a structured and visually appealing way.

## Features

- **Modular Architecture**: Built with atomic components that can be composed together
- **Multiple Variants**: Support for different visual styles (default, outlined, elevated, filled)
- **Flexible Sizing**: Small, medium, and large sizes
- **Configurable Padding**: Control internal spacing
- **Interactive States**: Support for clickable and disabled states
- **Accessibility**: Full ARIA support with proper semantics
- **TypeScript Support**: Fully typed with comprehensive prop definitions

## Usage

### Basic Card

```svelte
<script>
	import { Card } from '@svelte-atoms/core';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Card Title</Card.Title>
		<Card.Description>This is a card description.</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>Main content goes here.</p>
	</Card.Content>
</Card.Root>
```

### Card with Media

```svelte
<Card.Root>
	<Card.Media>
		<img src="image.jpg" alt="Description" class="h-48 w-full object-cover" />
	</Card.Media>
	<Card.Header>
		<Card.Title>Image Card</Card.Title>
		<Card.Subtitle>Photography</Card.Subtitle>
	</Card.Header>
	<Card.Content>
		<p>Content with an image.</p>
	</Card.Content>
</Card.Root>
```

### Clickable Card

```svelte
<Card.Root clickable onclick={() => console.log('Card clicked!')}>
	<Card.Header>
		<Card.Title>Clickable Card</Card.Title>
		<Card.Description>Click anywhere on this card.</Card.Description>
	</Card.Header>
</Card.Root>
```

### Card with Actions

```svelte
<Card.Root>
	<Card.Header>
		<Card.Title>Action Card</Card.Title>
	</Card.Header>
	<Card.Content>
		<p>Content with actions.</p>
	</Card.Content>
	<Card.Actions>
		<button>Primary Action</button>
		<button>Secondary</button>
	</Card.Actions>
</Card.Root>
```

## Components

### Card.Root

The main container component.

**Props:** See [`CardRootProps`](../../src/lib/components/card/card-root.svelte)

Key props:

- `variant?: 'default' | 'outlined' | 'elevated' | 'filled'` - Visual variant
- `size?: 'sm' | 'md' | 'lg'` - Text size
- `padding?: 'none' | 'sm' | 'md' | 'lg'` - Internal padding
- `clickable?: boolean` - Makes the card clickable
- `disabled?: boolean` - Disables the card

### Card.Header

Container for the card's header content.

### Card.Title

The main title of the card. Renders as `<h3>` by default.

### Card.Subtitle

A secondary title or category label.

### Card.Description

Descriptive text for the card content.

### Card.Content

The main content area of the card.

### Card.Media

Container for media content (images, videos, etc.).

### Card.Actions

Container for action buttons or interactive elements.

### Card.Footer

Footer area for additional information or metadata.

## Variants

### Default

Standard card with border and subtle shadow.

### Outlined

Card with a prominent border and no background.

### Elevated

Card with enhanced shadow for a floating appearance.

### Filled

Card with a background color and no border.

## Accessibility

The Card component includes comprehensive accessibility features:

- Proper ARIA attributes for screen readers
- Keyboard navigation support for clickable cards
- Focus management and visual indicators
- Semantic HTML structure

## Bond System

The Card component uses the Bond pattern for state management and element coordination:

- **CardBond**: Manages component state and element references
- **CardBondState**: Handles state mutations and business logic
- **Context**: Provides component communication throughout the tree

## Styling

The component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. Overriding classes with the `class` prop
2. Using CSS custom properties for theme customization
3. Extending the variant styles in the component

## Examples

See the Storybook stories for comprehensive examples of all features and variants.
