---
id: overview
title: Library Overview
category: introduction
depth: foundational
prerequisites: []
related:
  - philosophy
  - quick-reference
---

# @svelte-atoms/core

> A modern, composable UI component library for Svelte 5, built on atomic design principles with accessibility and developer experience at its core.

## Introduction

`@svelte-atoms/core` is a comprehensive collection of unstyled, accessible UI components designed for Svelte 5 applications. The library embraces an atomic design philosophy where components ("atoms") are small, reusable building blocks that can be composed into complex user interfaces.

## Philosophy

The library is built around two fundamental concepts inspired by chemistry:

### Atoms

**Atoms** are the smallest, indivisible UI components with a single responsibility. Each atom focuses on doing one thing exceptionally well.

**Examples**: Button, Input, Badge, Avatar, Label, Divider

### Bonds

**Bonds** are communication mechanisms that connect multiple atoms together. They manage shared state and enable seamless communication between connected components.

- **State Management**: Bonds maintain internal state accessible to all bonded atoms
- **Scope**: Bond state is available to bonded atoms and their descendant components
- **Pattern**: Bonds are typically created in `*-root.svelte` components and shared via context

## Key Features

### 🎯 **Svelte 5 Native**

Built from the ground up for Svelte 5, leveraging modern runes (`$state`, `$derived`, `$effect`) for optimal reactivity and performance.

### ♿ **Accessibility First**

Every component includes:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### 🎨 **Headless & Unstyled**

Components are headless by default, giving you complete control over styling:

- No CSS shipped by default
- Full TailwindCSS compatibility
- Custom styling through standard props
- Dynamic element rendering via `as` prop

### 🔗 **Composable Architecture**

Components follow a consistent compositional pattern:

```svelte
<Component.Root>
	<Component.Header />
	<Component.Body />
	<Component.Footer />
</Component.Root>
```

### 🎬 **Animation Ready**

Built-in lifecycle hooks for seamless integration with animation libraries:

- **`initial`**: Set initial style state
- **`enter`**: Define enter animations
- **`exit`**: Define exit animations
- **`animate`**: Respond to data changes

Compatible with GSAP, Motion One, anime.js, and more.

### 📦 **Type Safe**

Fully written in TypeScript with comprehensive type definitions for excellent IDE support and type safety.

### ⚡ **Lightweight**

Tree-shakeable architecture ensures you only bundle what you use. Each component is independently importable.

## Component Categories

### Layout & Structure

Build flexible layouts and content structures:

- **Card** - Container with header, body, and footer sections
- **Stack** - Vertical/horizontal content stacking
- **Layer** - Layered content management
- **Divider** - Visual content separation
- **Scrollable** - Custom scrollable containers

### Form Controls

Comprehensive form input components:

- **Input** - Text input with validation support
- **Textarea** - Multi-line text input
- **Checkbox** - Boolean selection control
- **Radio** - Single selection from multiple options
- **Form** - Form state management with field validation
- **Label** - Accessible form labels

### Interactive Components

Rich interactive UI elements:

- **Button** - Clickable actions
- **Dropdown** - Selection from options list
- **Combobox** - Searchable dropdown
- **Accordion** - Collapsible content sections
- **Collapsible** - Expandable/collapsible content
- **Tabs** - Tabbed content navigation
- **Tree** - Hierarchical data display
- **DataGrid** - Advanced tabular data display

### Overlay Components

Floating and overlay UI elements:

- **Dialog** - Modal dialogs
- **Drawer** - Slide-in panels
- **Popover** - Floating content containers
- **Tooltip** - Contextual hints
- **Toast** - Notification messages
- **Portal** - Render content in different DOM locations

### Navigation

Navigation and wayfinding components:

- **Menu** - Navigation menus
- **ContextMenu** - Right-click menus
- **Breadcrumb** - Hierarchical navigation
- **Sidebar** - Side navigation panels
- **List** - Structured list displays

### Display Components

Data and content display:

- **Avatar** - User profile images
- **Badge** - Status indicators
- **Icon** - Icon wrapper component
- **Alert** - Notification messages
- **Virtual** - Virtual scrolling for large lists

### Utilities

Core utility components:

- **Link** - Enhanced anchor elements
- **Atom** - Base HTML/SVG/MathML rendering component

## Installation

```bash
# npm
npm install @svelte-atoms/core

# pnpm
pnpm add @svelte-atoms/core

# yarn
yarn add @svelte-atoms/core

# bun
bun add @svelte-atoms/core
```

## Quick Start

### Basic Usage

```svelte
<script lang="ts">
	import { Button } from '@svelte-atoms/core/components/button';
</script>

<Button.Root onclick={() => console.log('clicked')}>Click me</Button.Root>
```

### Composable Components

```svelte
<script lang="ts">
	import { Accordion } from '@svelte-atoms/core/components/accordion';

	let selected = $state<string[]>([]);
</script>

<Accordion.Root bind:value={selected}>
	<Accordion.Item value="item-1">
		<Accordion.Item.Header>Section 1</Accordion.Item.Header>
		<Accordion.Item.Body>Content for section 1</Accordion.Item.Body>
	</Accordion.Item>

	<Accordion.Item value="item-2">
		<Accordion.Item.Header>Section 2</Accordion.Item.Header>
		<Accordion.Item.Body>Content for section 2</Accordion.Item.Body>
	</Accordion.Item>
</Accordion.Root>
```

### With State Management

```svelte
<script lang="ts">
	import { Tabs } from '@svelte-atoms/core/components/tabs';

	let activeTab = $state('home');
</script>

<Tabs.Root bind:value={activeTab}>
	<Tabs.Header>
		<Tabs.Tab value="home">
			<Tabs.Tab.Header>Home</Tabs.Tab.Header>
		</Tabs.Tab>
		<Tabs.Tab value="profile">
			<Tabs.Tab.Header>Profile</Tabs.Tab.Header>
		</Tabs.Tab>
	</Tabs.Header>

	<Tabs.Body>
		<Tabs.Tab value="home">
			<Tabs.Tab.Body>Home content</Tabs.Tab.Body>
		</Tabs.Tab>
		<Tabs.Tab value="profile">
			<Tabs.Tab.Body>Profile content</Tabs.Tab.Body>
		</Tabs.Tab>
	</Tabs.Body>
</Tabs.Root>
```

### Custom Styling

Components accept standard HTML attributes including `class`:

```svelte
<script lang="ts">
	import { Card } from '@svelte-atoms/core/components/card';
</script>

<Card.Root class="rounded-lg bg-white p-6 shadow-lg">
	<Card.Header class="mb-4 text-xl font-bold">Card Title</Card.Header>
	<Card.Body class="text-gray-700">Card content goes here</Card.Body>
	<Card.Footer class="mt-4 flex gap-2">
		<button>Cancel</button>
		<button>Confirm</button>
	</Card.Footer>
</Card.Root>
```

## Architecture

### Component Structure

Each component follows a consistent structure:

```
component/
├── atoms.ts              # Component exports (Root, Header, Body, etc.)
├── bond.svelte.ts        # State management (XBond, XState classes)
├── component-root.svelte # Root component
├── component-header.svelte
├── component-body.svelte
└── ...
```

### Import Patterns

Components can be imported in multiple ways:

```typescript
// Named import (recommended)
import { Button } from '@svelte-atoms/core/components/button';

// Direct import
import Button from '@svelte-atoms/core/components/button/atoms';

// Subcomponent import
import { Root, Header, Body } from '@svelte-atoms/core/components/card/atoms';
```

## Rendering System

All atoms are rendered using the base `atom.svelte` component, which provides three rendering variants:

- **`Html`** - Standard HTML elements
- **`Svg`** - SVG elements
- **`Mathml`** - MathML elements

### Dynamic Element Rendering

Use the `as` prop to change the underlying HTML element:

```svelte
<Button.Root as="a" href="/home">Link Button</Button.Root>

<Button.Root as="div" role="button">Div Button</Button.Root>
```

## Lifecycle Hooks

All components expose lifecycle hooks with access to the host element:

### Mount & Destroy

```svelte
<Component.Root
	onmount={(element) => {
		console.log('Mounted:', element);
	}}
	ondestroy={(element) => {
		console.log('Destroyed:', element);
	}}
>
	Content
</Component.Root>
```

### Animation Hooks

```svelte
<script>
	import { animate } from 'motion';

	function handleEnter(element) {
		return animate(element, { opacity: [0, 1] }, { duration: 0.3 });
	}

	function handleExit(element) {
		return animate(element, { opacity: [1, 0] }, { duration: 0.3 });
	}
</script>

<Dialog.Root
	bind:open
	initial={(el) => {
		el.style.opacity = '0';
	}}
	enter={handleEnter}
	exit={handleExit}
>
	<Dialog.Content>
		<!-- Dialog content -->
	</Dialog.Content>
</Dialog.Root>
```

## Accessibility

All components are built with accessibility in mind:

### Keyboard Navigation

Components support standard keyboard interactions:

- **Tab**: Navigate between focusable elements
- **Enter/Space**: Activate buttons and controls
- **Arrow Keys**: Navigate lists, menus, and tabs
- **Escape**: Close overlays and dropdowns
- **Home/End**: Jump to start/end of lists

### ARIA Attributes

Components automatically apply appropriate ARIA attributes:

- `role` attributes for semantic meaning
- `aria-label` for accessible names
- `aria-expanded` for collapsible content
- `aria-selected` for selection states
- `aria-disabled` for disabled states

### Focus Management

- Automatic focus management for overlays
- Focus trap for modal dialogs
- Focus restoration on close
- Visible focus indicators

## Best Practices

### State Management

Use Svelte 5 runes for local state:

```svelte
<script lang="ts">
	import { Dropdown } from '@svelte-atoms/core/components/dropdown';

	let selected = $state<string[]>([]);

	$effect(() => {
		console.log('Selection changed:', selected);
	});
</script>

<Dropdown.Root bind:value={selected} multiple>
	<Dropdown.Trigger>
		<Dropdown.Value />
	</Dropdown.Trigger>
	<Dropdown.List>
		<Dropdown.Item value="1">Option 1</Dropdown.Item>
		<Dropdown.Item value="2">Option 2</Dropdown.Item>
	</Dropdown.List>
</Dropdown.Root>
```

### Composition Patterns

Build reusable composed components:

```svelte
<!-- UserCard.svelte -->
<script lang="ts">
	import { Card } from '@svelte-atoms/core/components/card';
	import { Avatar } from '@svelte-atoms/core/components/avatar';
	import { Badge } from '@svelte-atoms/core/components/badge';

	let { user } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Avatar src={user.avatar} alt={user.name} />
		<div>
			<h3>{user.name}</h3>
			<Badge>{user.role}</Badge>
		</div>
	</Card.Header>
	<Card.Body>
		{user.bio}
	</Card.Body>
</Card.Root>
```

### Styling Approach

Use utility-first CSS or custom classes:

```svelte
<script lang="ts">
	import { Button } from '@svelte-atoms/core/components/button';

	const variants = {
		primary: 'bg-blue-500 text-white hover:bg-blue-600',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
		danger: 'bg-red-500 text-white hover:bg-red-600'
	};

	let { variant = 'primary' } = $props();
</script>

<Button.Root class="{variants[variant]} rounded px-4 py-2">
	<slot />
</Button.Root>
```

## TypeScript Support

The library is fully typed with comprehensive TypeScript definitions:

```typescript
import type { ComponentProps } from 'svelte';
import type { Button } from '@svelte-atoms/core/components/button';

type ButtonProps = ComponentProps<typeof Button.Root>;

interface CustomButtonProps extends ButtonProps {
	variant?: 'primary' | 'secondary' | 'danger';
	size?: 'sm' | 'md' | 'lg';
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

## Contributing

Contributions are welcome! Please check our [contributing guidelines](../../CONTRIBUTING.md) for details.

## License

MIT © [ryu-man](https://github.com/ryu-man)

## Resources

- [GitHub Repository](https://github.com/ryu-man/svelte-atoms)
- [Documentation](https://svelte-atoms.dev)
- [Component API Reference](./.github/components/)
- [Philosophy](./.github/philosophy.md)

## Related Packages

- `@svelte-atoms/alchimist` - Data visualization and charting built on top of `@svelte-atoms/core`

---

**Built with ❤️ for the Svelte community**
