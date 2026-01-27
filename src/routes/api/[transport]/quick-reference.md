---
id: quick-reference
title: Quick Reference
category: reference
depth: foundational
prerequisites: []
related:
  - overview
  - usage
---

# Quick Reference Guide

> **For LLMs & Developers**: Fast lookup for common patterns and components

## 🎯 Most Common Patterns

### Basic Component Usage

```svelte
<script lang="ts">
	import { Component } from '@svelte-atoms/core/components/component';
</script>

<Component.Root>
	<Component.SubComponent />
</Component.Root>
```

### With State Binding

```svelte
<script lang="ts">
	import { Dropdown } from '@svelte-atoms/core/components/dropdown';

	let value = $state<string[]>([]);
</script>

<Dropdown.Root bind:value>
	<!-- children -->
</Dropdown.Root>
```

### With Custom Styling

```svelte
<Button.Root class="rounded bg-blue-500 px-4 py-2 text-white">Click me</Button.Root>
```

## 📦 Component Quick Lookup

### Form Components

| Component    | Import                                                              | Basic Usage                                    | Props                          |
| ------------ | ------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------ |
| **Input**    | `import { Input } from '@svelte-atoms/core/components/input'`       | `<Input.Root type="text" placeholder="..." />` | `type`, `value`, `placeholder` |
| **Textarea** | `import { Textarea } from '@svelte-atoms/core/components/textarea'` | `<Textarea.Root placeholder="..." />`          | `value`, `placeholder`, `rows` |
| **Checkbox** | `import { Checkbox } from '@svelte-atoms/core/components/checkbox'` | `<Checkbox.Root bind:checked />`               | `checked`, `disabled`          |
| **Radio**    | `import { Radio } from '@svelte-atoms/core/components/radio'`       | `<Radio.Root value="..." bind:group />`        | `value`, `group`               |
| **Form**     | `import { Form } from '@svelte-atoms/core/components/form'`         | `<Form.Root><Form.Field /></Form.Root>`        | `onsubmit`                     |

### Interactive Components

| Component     | Import                                                                | Basic Usage                                                                       | State Binding              |
| ------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------- |
| **Button**    | `import { Button } from '@svelte-atoms/core/components/button'`       | `<Button.Root onclick={...}>Text</Button.Root>`                                   | -                          |
| **Dropdown**  | `import { Dropdown } from '@svelte-atoms/core/components/dropdown'`   | `<Dropdown.Root><Dropdown.List><Dropdown.Item /></Dropdown.List></Dropdown.Root>` | `bind:value`               |
| **Combobox**  | `import { Combobox } from '@svelte-atoms/core/components/combobox'`   | `<Combobox.Root><Combobox.Input /><Combobox.List /></Combobox.Root>`              | `bind:value`, `bind:query` |
| **Accordion** | `import { Accordion } from '@svelte-atoms/core/components/accordion'` | `<Accordion.Root><Accordion.Item /></Accordion.Root>`                             | `bind:value`               |
| **Tabs**      | `import { Tabs } from '@svelte-atoms/core/components/tabs'`           | `<Tabs.Root><Tabs.Header /><Tabs.Body /></Tabs.Root>`                             | `bind:value`               |
| **Tree**      | `import { Tree } from '@svelte-atoms/core/components/tree'`           | `<Tree.Root><Tree.Header /><Tree.Body /></Tree.Root>`                             | `bind:open`                |

### Overlay Components

| Component   | Import                                                            | Basic Usage                                                           | State Binding |
| ----------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- | ------------- |
| **Dialog**  | `import { Dialog } from '@svelte-atoms/core/components/dialog'`   | `<Dialog.Root><Dialog.Content /></Dialog.Root>`                       | `bind:open`   |
| **Drawer**  | `import { Drawer } from '@svelte-atoms/core/components/drawer'`   | `<Drawer.Root><Drawer.Content /></Drawer.Root>`                       | `bind:open`   |
| **Popover** | `import { Popover } from '@svelte-atoms/core/components/popover'` | `<Popover.Root><Popover.Trigger /><Popover.Content /></Popover.Root>` | `bind:open`   |
| **Tooltip** | `import { Tooltip } from '@svelte-atoms/core/components/tooltip'` | `<Tooltip.Root><Tooltip.Trigger /><Tooltip.Content /></Tooltip.Root>` | -             |
| **Toast**   | `import { Toast } from '@svelte-atoms/core/components/toast'`     | `<Toast.Root><Toast.Title /><Toast.Description /></Toast.Root>`       | -             |

### Layout Components

| Component   | Import                                                            | Basic Usage                                                          | Props              |
| ----------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------ |
| **Card**    | `import { Card } from '@svelte-atoms/core/components/card'`       | `<Card.Root><Card.Header /><Card.Body /><Card.Footer /></Card.Root>` | -                  |
| **Stack**   | `import { Stack } from '@svelte-atoms/core/components/stack'`     | `<Stack.Root direction="vertical" gap={4}>...</Stack.Root>`          | `direction`, `gap` |
| **List**    | `import { List } from '@svelte-atoms/core/components/list'`       | `<List.Root><List.Item /></List.Root>`                               | `type`             |
| **Divider** | `import { Divider } from '@svelte-atoms/core/components/divider'` | `<Divider.Root />`                                                   | `orientation`      |

### Display Components

| Component  | Import                                                          | Basic Usage                           | Props        |
| ---------- | --------------------------------------------------------------- | ------------------------------------- | ------------ |
| **Avatar** | `import { Avatar } from '@svelte-atoms/core/components/avatar'` | `<Avatar.Root src="..." alt="..." />` | `src`, `alt` |
| **Badge**  | `import { Badge } from '@svelte-atoms/core/components/badge'`   | `<Badge.Root>Text</Badge.Root>`       | `variant`    |
| **Icon**   | `import { Icon } from '@svelte-atoms/core/components/icon'`     | `<Icon src={IconComponent} />`        | `src`        |

## 🔧 Common Props

### All Components Accept

- `class` - CSS classes (string or array)
- `style` - Inline styles
- `id` - Element ID
- `as` - Change underlying HTML element

### State Management Props

- `bind:value` - Two-way binding for value
- `bind:open` - Two-way binding for open/closed state
- `bind:checked` - Two-way binding for checked state
- `bind:selected` - Two-way binding for selected items

### Animation Props

- `initial` - Set initial state before enter
- `enter` - Enter animation
- `exit` - Exit animation
- `animate` - Animate on data changes

### Lifecycle Props

- `onmount` - Called when component mounts
- `ondestroy` - Called when component unmounts

## 🎨 Styling Patterns

### TailwindCSS Classes

```svelte
<Button.Root class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
	Button
</Button.Root>
```

### Conditional Classes

```svelte
<script lang="ts">
	let active = $state(false);
</script>

<Button.Root class={active ? 'bg-blue-500' : 'bg-gray-500'}>Toggle</Button.Root>
```

### Multiple Classes

```svelte
<Card.Root class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">Content</Card.Root>
```

## 🎭 Animation Examples

### With Motion One

```svelte
<script>
	import { animate } from 'motion';

	function handleEnter(el) {
		return animate(el, { opacity: [0, 1], y: [-20, 0] }, { duration: 0.3 });
	}
</script>

<Dialog.Root bind:open enter={handleEnter}>
	<Dialog.Content>...</Dialog.Content>
</Dialog.Root>
```

### With GSAP

```svelte
<script>
	import gsap from 'gsap';

	function handleEnter(el) {
		return gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3 });
	}
</script>

<Popover.Root enter={handleEnter}>
	<Popover.Content>...</Popover.Content>
</Popover.Root>
```

## 🔍 Common Use Cases

### Building a Form

```svelte
<script lang="ts">
	import { Form } from '@svelte-atoms/core/components/form';
	import { Input } from '@svelte-atoms/core/components/input';
	import { Button } from '@svelte-atoms/core/components/button';

	let formData = $state({ email: '', password: '' });
</script>

<Form.Root bind:value={formData}>
	<Form.Field name="email">
		<Form.Field.Label>Email</Form.Field.Label>
		<Form.Field.Control>
			<Input.Root type="email" />
		</Form.Field.Control>
	</Form.Field>

	<Form.Field name="password">
		<Form.Field.Label>Password</Form.Field.Label>
		<Form.Field.Control>
			<Input.Root type="password" />
		</Form.Field.Control>
	</Form.Field>

	<Button.Root type="submit">Submit</Button.Root>
</Form.Root>
```

### Creating a Modal Dialog

```svelte
<script lang="ts">
	import { Dialog } from '@svelte-atoms/core/components/dialog';
	import { Button } from '@svelte-atoms/core/components/button';

	let open = $state(false);
</script>

<Button.Root onclick={() => (open = true)}>Open Dialog</Button.Root>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<h2>Dialog Title</h2>
			<Dialog.CloseButton />
		</Dialog.Header>
		<Dialog.Body>
			<p>Dialog content goes here</p>
		</Dialog.Body>
		<Dialog.Footer>
			<Button.Root onclick={() => (open = false)}>Close</Button.Root>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
```

### Building a Dropdown Menu

```svelte
<script lang="ts">
	import { Dropdown } from '@svelte-atoms/core/components/dropdown';

	let selected = $state<string[]>([]);
</script>

<Dropdown.Root bind:value={selected}>
	<Dropdown.Trigger>
		<Dropdown.Value placeholder="Select an option" />
	</Dropdown.Trigger>

	<Dropdown.List>
		<Dropdown.Item value="option1">Option 1</Dropdown.Item>
		<Dropdown.Item value="option2">Option 2</Dropdown.Item>
		<Dropdown.Item value="option3">Option 3</Dropdown.Item>
	</Dropdown.List>
</Dropdown.Root>
```

### Creating Tabs

```svelte
<script lang="ts">
	import { Tabs } from '@svelte-atoms/core/components/tabs';

	let activeTab = $state('tab1');
</script>

<Tabs.Root bind:value={activeTab}>
	<Tabs.Header>
		<Tabs.Tab value="tab1">
			<Tabs.Tab.Header>Tab 1</Tabs.Tab.Header>
		</Tabs.Tab>
		<Tabs.Tab value="tab2">
			<Tabs.Tab.Header>Tab 2</Tabs.Tab.Header>
		</Tabs.Tab>
	</Tabs.Header>

	<Tabs.Body>
		<Tabs.Tab value="tab1">
			<Tabs.Tab.Body>Content 1</Tabs.Tab.Body>
		</Tabs.Tab>
		<Tabs.Tab value="tab2">
			<Tabs.Tab.Body>Content 2</Tabs.Tab.Body>
		</Tabs.Tab>
	</Tabs.Body>
</Tabs.Root>
```

## 🚫 Common Mistakes to Avoid

### ❌ Don't Use Low-Level API

```svelte
<!-- WRONG -->
<script>
  const state = new DropdownState(() => ({ ... }));
  const dropdown = new DropdownBond(state);
</script>
```

### ✅ Use High-Level Components

```svelte
<!-- CORRECT -->
<script>
	import { Dropdown } from '@svelte-atoms/core/components/dropdown';
	let selected = $state([]);
</script>

<Dropdown.Root bind:value={selected}>
	<!-- ... -->
</Dropdown.Root>
```

### ❌ Don't Use Legacy Stores

```svelte
<!-- WRONG -->
<script>
	import { writable } from 'svelte/store';
	const value = writable('');
</script>
```

### ✅ Use Svelte 5 Runes

```svelte
<!-- CORRECT -->
<script>
	let value = $state('');
</script>
```

## 📚 Documentation Links

- **Full Overview**: [overview.md](./overview.md)
- **Philosophy**: [philosophy.md](./philosophy.md)
- **Naming Conventions**: [naming-convention.md](./naming-convention.md)
- **Component Index**: [components/README.MD](./components/README.MD)
- **Individual Components**: [components/\*.md](./components/)

## 🔗 External Resources

- [Svelte 5 Runes Documentation](https://svelte.dev/docs/runes)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
