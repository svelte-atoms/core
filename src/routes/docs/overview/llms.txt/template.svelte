<script lang="ts">
	import { inlineCode } from '$docs/md/template';
	import { codeBlock } from '$docs/md/template';
	import { FrontMatter } from '$docs/md/components';
	
	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# @svelte-atoms/core

> A modern, composable UI component library for Svelte 5, built on atomic design principles with accessibility and developer experience at its core.

## Introduction

{inlineCode('@svelte-atoms/core')} is a comprehensive collection of unstyled, accessible UI components designed for Svelte 5 applications. The library embraces an atomic design philosophy where components ("atoms") are small, reusable building blocks that can be composed into complex user interfaces.

## Philosophy

The library is built around two fundamental concepts inspired by chemistry:

### Atoms

**Atoms** are the smallest, indivisible UI components with a single responsibility. Each atom focuses on doing one thing exceptionally well.

**Examples**: Button, Input, Badge, Avatar, Label, Divider

### Bonds

**Bonds** are communication mechanisms that connect multiple atoms together. They manage shared state and enable seamless communication between connected components.

- **State Management**: Bonds maintain internal state accessible to all bonded atoms
- **Scope**: Bond state is available to bonded atoms and their descendant components
- **Pattern**: Bonds are typically created in {inlineCode('*-root.svelte')} components and shared via context

## Key Features

### 🎯 **Svelte 5 Native**

Built from the ground up for Svelte 5, leveraging modern runes ({inlineCode('$state')}, {inlineCode('$derived')}, {inlineCode('$effect')}) for optimal reactivity and performance.

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
- Dynamic element rendering via {inlineCode('as')} prop

### 🔗 **Composable Architecture**

Components follow a consistent compositional pattern:

{codeBlock(`
<Component.Root>
	<Component.Header />
	<Component.Body />
	<Component.Footer />
</Component.Root>
`, 'svelte')}

### 🎬 **Animation Ready**

Built-in lifecycle hooks for seamless integration with animation libraries:

- **{inlineCode('initial')}**: Set initial style state
- **{inlineCode('enter')}**: Define enter animations
- **{inlineCode('exit')}**: Define exit animations
- **{inlineCode('animate')}**: Respond to data changes

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

{codeBlock(`
# npm
npm install @svelte-atoms/core

# pnpm
pnpm add @svelte-atoms/core

# yarn
yarn add @svelte-atoms/core

# bun
bun add @svelte-atoms/core
`, 'bash')}

## Quick Start

### Basic Usage

{codeBlock(`
<script lang="ts">
	import { Button } from '@svelte-atoms/core/components/button';
</script>

<Button.Root onclick={() => console.log('clicked')}>Click me</Button.Root>
`, 'svelte')}

### Composable Components

{codeBlock(`
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
`, 'svelte')}

### With State Management

{codeBlock(`
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
`, 'svelte')}

### Custom Styling

Components accept standard HTML attributes including {inlineCode('class')}:

{codeBlock(`
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
`, 'svelte')}

## Architecture

### Component Structure

Each component follows a consistent structure:

{codeBlock(`
component/
├── atoms.ts              # Component exports (Root, Header, Body, etc.)
├── bond.svelte.ts        # State management (XBond, XState classes)
├── component-root.svelte # Root component
├── component-header.svelte
├── component-body.svelte
└── ...
`, 'plaintext')}

### Import Patterns

Components can be imported in multiple ways:

{codeBlock(`
// Named import (recommended)
import { newLine, md, inlineCode, codeBlock } from '$docs/md/template';
import { Button } from '@svelte-atoms/core/components/button';

// Direct import
import Button from '@svelte-atoms/core/components/button/atoms';

// Subcomponent import
import { Root, Header, Body } from '@svelte-atoms/core/components/card/atoms';
`, 'typescript')}

## Rendering System

All atoms are rendered using the base {inlineCode('atom.svelte')} component, which provides three rendering variants:

- **{inlineCode('Html')}** - Standard HTML elements
- **{inlineCode('Svg')}** - SVG elements
- **{inlineCode('Mathml')}** - MathML elements

### Dynamic Element Rendering

Use the {inlineCode('as')} prop to change the underlying HTML element:

{codeBlock(`
<Button.Root as="a" href="/home">Link Button</Button.Root>

<Button.Root as="div" role="button">Div Button</Button.Root>
`, 'svelte')}

## Lifecycle Hooks

All components expose lifecycle hooks with access to the host element:

### Mount & Destroy

{codeBlock(`
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
`, 'svelte')}

### Animation Hooks

{codeBlock(`
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
`, 'svelte')}

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

- {inlineCode('role')} attributes for semantic meaning
- {inlineCode('aria-label')} for accessible names
- {inlineCode('aria-expanded')} for collapsible content
- {inlineCode('aria-selected')} for selection states
- {inlineCode('aria-disabled')} for disabled states

### Focus Management

- Automatic focus management for overlays
- Focus trap for modal dialogs
- Focus restoration on close
- Visible focus indicators

## Best Practices

### State Management

Use Svelte 5 runes for local state:

{codeBlock(`
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
`, 'svelte')}

### Composition Patterns

Build reusable composed components:

{codeBlock(`
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
`, 'svelte')}

### Styling Approach

Use utility-first CSS or custom classes:

{codeBlock(`
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
`, 'svelte')}

## TypeScript Support

The library is fully typed with comprehensive TypeScript definitions:

{codeBlock(`
import type { ComponentProps } from 'svelte';
import type { Button } from '@svelte-atoms/core/components/button';

type ButtonProps = ComponentProps<typeof Button.Root>;

interface CustomButtonProps extends ButtonProps {
	variant?: 'primary' | 'secondary' | 'danger';
	size?: 'sm' | 'md' | 'lg';
}
`, 'typescript')}

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

- {inlineCode('@svelte-atoms/alchimist')} - Data visualization and charting built on top of {inlineCode('@svelte-atoms/core')}

---

**Built with ❤️ for the Svelte community**
