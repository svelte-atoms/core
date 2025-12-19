# @svelte-atoms/core

> A modern, modular, and accessible Svelte 5 UI component library built with composability at its core.

[![npm version](https://img.shields.io/npm/v/@svelte-atoms/core.svg)](https://www.npmjs.com/package/@svelte-atoms/core)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/svelte-atoms/core)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features

- **Bond Architecture** - Self-contained state management with context-based communication
- **Accessible** - ARIA attributes, keyboard navigation, and focus management included
- **Type Safe** - Full TypeScript support with comprehensive type definitions
- **Headless** - Complete styling control with sensible defaults
- **Composable** - Build complex UIs by combining simple, reusable components
- **Svelte 5 Runes** - Optimized reactivity and performance

## Documentation

- **[Documentation](https://sacore.netlify.app/)** - Complete guides, API references, and examples
- **[Storybook](https://statuesque-boba-0fb888.netlify.app/)** - Interactive component playground

## Installation

```bash
npm install @svelte-atoms/core
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Button, Dialog, Input } from '@svelte-atoms/core';

	let dialogOpen = $state(false);
	let inputValue = '';
</script>

<Button onclick={() => (dialogOpen = true)}>Open Dialog</Button>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Enter your name</Dialog.Title>
		</Dialog.Header>
		<Dialog.Body>
			<Input.Root>
				<Input.Control bind:value={inputValue} placeholder="Your name..." />
			</Input.Root>
		</Dialog.Body>
		<Dialog.Footer>
			<Button onclick={() => (dialogOpen = false)}>Cancel</Button>
			<Button variant="primary" onclick={() => (dialogOpen = false)}>Confirm</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
```

### Composable Components

Combine components to create complex UIs:

```svelte
<script lang="ts">
	import { Dropdown, Input, Root, filter } from '@svelte-atoms/core';
	import { flip } from 'svelte/animate';

	let data = [
		{ id: 1, value: 'apple', text: 'Apple' },
		{ id: 2, value: 'banana', text: 'Banana' },
		{ id: 3, value: 'cherry', text: 'Cherry' }
	];

	let open = $state(false);
	const dd = filter(
		() => data,
		(query, item) => item.text.toLowerCase().includes(query.toLowerCase())
	);
</script>

<Dropdown.Root
	bind:open
	multiple
	keys={data.map((item) => item.value)}
	onquerychange={(q) => (dd.query = q)}
>
	{#snippet children({ dropdown })}
		<Dropdown.Trigger
			base={Input.Root}
			onclick={(ev) => {
				ev.preventDefault();
				dropdown.state.open();
			}}
		>
			{#each dropdown?.state?.selectedItems ?? [] as item (item.id)}
				<div animate:flip={{ duration: 200 }}>
					<Dropdown.Value value={item.value}>{item.text}</Dropdown.Value>
				</div>
			{/each}
			<Dropdown.Query placeholder="Search..." />
		</Dropdown.Trigger>

		<Dropdown.List>
			{#each dd.current as item (item.id)}
				<div animate:flip={{ duration: 200 }}>
					<Dropdown.Item value={item.value}>{item.text}</Dropdown.Item>
				</div>
			{/each}
		</Dropdown.List>
	{/snippet}
</Dropdown.Root>
```

### Extensibility with `as` and `base` Props

Transform components into any element or wrap them with custom logic:

```svelte
<script lang="ts">
	import { Button, Popover, Input } from '@svelte-atoms/core';
</script>

<!-- Use Button as Popover trigger -->
<Popover.Root>
	<Popover.Trigger base={Button} variant="outline">Open Popover</Popover.Trigger>
	<Popover.Content class="p-4">
		<h4 class="font-semibold">Settings</h4>
		<p class="text-sm">Configure your preferences here.</p>
	</Popover.Content>
</Popover.Root>

<!-- Use Input.Root as Popover trigger -->
<Popover.Root>
	<Popover.Trigger base={Input.Root}>
		<Input.Control placeholder="Click to open popover..." readonly />
	</Popover.Trigger>
	<Popover.Content class="p-4">
		<p class="text-sm">Popover triggered by an input field</p>
	</Popover.Content>
</Popover.Root>
```

### Working with Animations

Seamlessly integrate with Svelte's animation system:

```svelte
<script lang="ts">
	import { List, Button } from '@svelte-atoms/core';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';

	let items = $state([
		{ id: 1, text: 'Task 1' },
		{ id: 2, text: 'Task 2' },
		{ id: 3, text: 'Task 3' }
	]);

	function removeItem(id: number) {
		items = items.filter((item) => item.id !== id);
	}
</script>

<List.Root>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: 300 }}>
			<List.Item>
				<span>{item.text}</span>
				<Button size="sm" onclick={() => removeItem(item.id)}>Remove</Button>
			</List.Item>
		</div>
	{/each}
</List.Root>
```

Advanced animation with lifecycle hooks using Motion:

```svelte
<script lang="ts">
	import { Dialog, Button, toTransitionConfig } from '@svelte-atoms/core';
	import { animate } from 'motion';

	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Dialog</Button>

<Dialog.Root bind:open>
	<Dialog.Overlay
		initial={(node) => {
			node.style.opacity = '0';
		}}
		enter={(node) => {
			const duration = 0.2;
			const animation = animate(node, { opacity: 1 }, { duration });
			return { duration };
		}}
		exit={(node) => {
			const duration = 0.1;
			const animation = animate(node, { opacity: 0 }, { duration: 0.1 });
			return { duration };
		}}
	/>
	<Dialog.Content
		initial={(node) => {
			node.style.opacity = '0';
			node.style.scale = '0.95';
		}}
		enter={(node) => {
			const duration = 0.3;
			const animation = animate(node, { opacity: 1, scale: 1 }, { duration, easing: 'ease-out' });
			return { duration };
		}}
		exit={(node) => {
			const animation = animate(node, { opacity: 0, scale: 0.95 }, { duration, easing: 'ease-in' });
			return { duration };
		}}
	>
		<Dialog.Header>
			<Dialog.Title>Animated Dialog</Dialog.Title>
		</Dialog.Header>
		<Dialog.Body>
			<p>This dialog animates with custom Motion transitions using lifecycle hooks.</p>
		</Dialog.Body>
		<Dialog.Footer>
			<Button onclick={() => (open = false)}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
```

### Styling with Variants

Variants can be created locally at component level or globally in the preset configuration:

```typescript
import { defineVariants } from '@svelte-atoms/core/utils';

const buttonVariants = defineVariants({
	class: 'inline-flex items-center justify-center rounded-md font-medium',
	variants: {
		variant: {
			primary: 'bg-blue-500 text-white hover:bg-blue-600',
			secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
		},
		size: {
			sm: 'h-8 px-3 text-sm',
			md: 'h-10 px-4',
			lg: 'h-12 px-6 text-lg'
		}
	},
	defaults: {
		variant: 'primary',
		size: 'md'
	}
});
```

## Development

```bash
# Clone repository
git clone https://github.com/svelte-atoms/core.git
cd svelte-atoms

# Install dependencies
bun install

# Start dev server
bun dev

# Run tests
bun test

# Build library
bun run build
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by the Svelte Atoms team</p>
</div>
