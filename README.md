# ⚛️ @svelte-atoms/core

> A modern, modular, and accessible Svelte 5 UI component library built with composability at its core.

[![npm version](https://img.shields.io/npm/v/@svelte-atoms/core.svg)](https://www.npmjs.com/package/@svelte-atoms/core)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/svelte-atoms/core)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

- **Bond Architecture** - Self-contained state management with context-based communication
- **Accessible** - ARIA attributes, keyboard navigation, and focus management included
- **Type Safe** - Full TypeScript support with comprehensive type definitions
- **Headless** - Complete styling control with sensible defaults
- **Composable** - Build complex UIs by combining simple, reusable components
- **Svelte 5 Runes** - Optimized reactivity and performance

## 📦 Components

### Layout & Navigation
**Accordion** • **Breadcrumb** • **Sidebar** • **Tabs** • **Tree**

### Forms & Input
**Button** • **Checkbox** • **Combobox** • **Input** • **Radio** • **Textarea** • **Form** • **DatePicker**

### Data Display
**Avatar** • **Badge** • **Card** • **DataGrid** • **Divider** • **Icon** • **Label** • **Link** • **List** • **Calendar** • **QRCode**

### Overlays & Feedback
**Alert** • **Dialog** • **Drawer** • **Dropdown** • **Popover** • **Toast** • **Tooltip** • **ContextMenu**

### Utilities
**Collapsible** • **Layer** • **Portal** • **Scrollable** • **Stack**

## 🚀 Installation

```bash
npm install @svelte-atoms/core
```

## 📖 Usage

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
		<Dropdown.Trigger base={Input.Root} onclick={(ev) => {
			ev.preventDefault();
			dropdown.state.open();
		}}>
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

## 🧪 Development

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

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by the Svelte Atoms team</p>
</div>
