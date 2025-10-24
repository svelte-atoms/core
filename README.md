# ⚛️ @svelte-atoms/core

> A modern, modular, and accessible Svelte 5 UI component library built with composability at its core.

**@svelte-atoms/core** is a comprehensive Svelte component library that provides fundamental building blocks ("atoms") for creating sophisticated, interactive design systems. Each component is designed with accessibility, type safety, and developer experience in mind. Built with Svelte 5 runes for optimal reactivity and performance.

[![npm version](https://img.shields.io/npm/v/@svelte-atoms/core.svg)](https://www.npmjs.com/package/@svelte-atoms/core)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

## ✨ Features

### 🧱 **Bond Architecture**

Built around the concept of "Bonds" - self-contained, reusable state management classes that encapsulate component state and DOM interactions. Each component uses the Bond pattern for consistent, predictable behavior across complex interactions. Simple components like Button don't require the Bond pattern as they have minimal state management needs.

### 🔗 **Context-Driven Communication**

Components seamlessly communicate through Svelte's context API using standardized static methods (`Bond.get()` / `Bond.set()`) of the Bond class, enabling powerful parent-child relationships without prop drilling.

### ♿ **Accessibility First**

Every component includes proper ARIA attributes, keyboard navigation, and focus management out of the box.

### 🔧 **Highly Extensible**

Easily extend components with custom behaviors, animations, and styling while maintaining the core functionality.

### 🎯 **Type Safety**

Fully written in TypeScript with comprehensive type definitions for a robust development experience.

### ⚡ **Reactive by Design**

Leverages Svelte's fine-grained reactivity system for optimal performance and smooth user interactions.

### 🎨 **Headless & Stylable**

Components are headless by default, giving you complete control over styling while providing sensible defaults.

### 🧩 **Composable**

Build complex UIs by combining simple, reusable components. Each component is designed to work seamlessly with others through the Bond pattern and context API. Create sophisticated features like multi-level dropdowns, nested accordions, or custom form controls by composing atomic components together.

---

## 📦 Available Components

Our comprehensive collection of UI components with implementation status:

### Layout & Navigation

| Component                                       | Description                  | Status |
| ----------------------------------------------- | ---------------------------- | ------ |
| [**Accordion**](docs/components/accordion.md)   | Collapsible content sections | ✅     |
| [**Breadcrumb**](docs/components/breadcrumb.md) | Navigation hierarchy         | ✅     |
| [**Sidebar**](docs/components/sidebar.md)       | Collapsible side navigation  | ✅     |
| [**Tabs**](docs/components/tabs.md)             | Tabbed interfaces            | ✅     |
| [**Tree**](docs/components/tree.md)             | Hierarchical data structures | ✅     |
| **Stepper**                                     | Multi-step process indicator | ❌     |
| **Pagination**                                  | Page navigation controls     | ❌     |

### Forms & Input

| Component                                   | Description                          | Status |
| ------------------------------------------- | ------------------------------------ | ------ |
| [**Button**](docs/components/button.md)     | Interactive buttons with variants    | ✅     |
| [**Checkbox**](docs/components/checkbox.md) | Multi-select inputs                  | ✅     |
| [**Combobox**](docs/components/combobox.md) | Searchable select inputs             | ✅     |
| [**Input**](docs/components/input.md)       | Text input fields                    | ✅     |
| [**Radio**](docs/components/radio.md)       | Single-select inputs                 | ✅     |
| **Slider**                                  | Range input controls                 | ❌     |
| **Switch**                                  | Toggle controls                      | ❌     |
| [**Textarea**](docs/components/textarea.md) | Multi-line text inputs               | ✅     |
| [**Form**](docs/components/form.md)         | Form validation and state management | ✅     |
| **DatePicker**                              | Date selection component             | ❌     |
| **TimePicker**                              | Time selection component             | ❌     |
| **FileUpload**                              | File upload component                | ❌     |
| **ColorPicker**                             | Color selection component            | ❌     |
| **Rating**                                  | Star rating component                | ❌     |

### Data Display

| Component                                   | Description                 | Status |
| ------------------------------------------- | --------------------------- | ------ |
| [**Avatar**](docs/components/avatar.md)     | User profile images         | ✅     |
| [**Badge**](docs/components/badge.md)       | Status indicators           | ✅     |
| [**DataGrid**](docs/components/datagrid.md) | Advanced data tables        | ✅     |
| [**Divider**](docs/components/divider.md)   | Content separators          | ✅     |
| [**Icon**](docs/components/icon.md)         | Scalable icons              | ✅     |
| [**Label**](docs/components/label.md)       | Form labels                 | ✅     |
| [**Link**](docs/components/link.md)         | Navigation links            | ✅     |
| [**List**](docs/components/list.md)         | Structured lists            | ✅     |
| [**Card**](docs/components/card.md)         | Content containers          | ✅     |
| **Table**                                   | Simple data tables          | ❌     |
| **Chip**                                    | Compact information display | ❌     |
| **Progress**                                | Progress indicators         | ❌     |
| **Skeleton**                                | Loading placeholders        | ❌     |
| **Timeline**                                | Event timeline display      | ❌     |
| **Calendar**                                | Date display component      | ❌     |

### Overlays & Feedback

| Component                                         | Description              | Status |
| ------------------------------------------------- | ------------------------ | ------ |
| [**Dialog**](docs/components/dialog.md)           | Modal dialogs            | ✅     |
| [**Dropdown**](docs/components/dropdown.md)       | Contextual menus         | ✅     |
| [**Popover**](docs/components/popover.md)         | Contextual information   | ✅     |
| [**Toast**](docs/components/toast.md)             | Notification messages    | ✅     |
| [**Tooltip**](docs/components/tooltip.md)         | Contextual hints         | ✅     |
| [**ContextMenu**](docs/components/contextmenu.md) | Right-click menus        | ✅     |
| [**Drawer**](docs/components/drawer.md)           | Slide-out panels         | ✅     |
| [**Alert**](docs/components/alert.md)             | Alert messages           | ✅     |
| **Banner**                                        | Full-width notifications | ❌     |
| **Spotlight**                                     | Feature highlighting     | ❌     |

### Utilities & Layout

| Component                                         | Description                         | Status |
| ------------------------------------------------- | ----------------------------------- | ------ |
| [**Portal**](docs/components/portal.md)           | Declare a portal anywhere in DOM    | ✅     |
| **Teleport**                                      | Render content in a specific portal | ✅     |
| **Root**                                          | Application root container          | ✅     |
| [**Layer**](docs/components/layer.md)             | Layer management utility            | ✅     |
| [**Collapsible**](docs/components/collapsible.md) | Generic collapsible wrapper         | ✅     |
| **Container**                                     | Layout container                    | ✅     |
| [**Scrollable**](docs/components/scrollable.md)   | Custom scrollbar component          | ✅     |
| [**Stack**](docs/components/stack.md)             | Flexible layout stacking component  | ✅     |
| **Spacer**                                        | Space management utility            | ❌     |
| **VirtualList**                                   | Virtual scrolling list              | ❌     |

---

## 🏗️ Architecture

The library is organized into distinct layers for maximum maintainability and extensibility:

```
src/lib/
├── components/          # 30+ Core UI components
├── shared/         # Base classes (Bond, BondState) and utilities
├── helpers/        # Helper functions and components
├── attachments/    # DOM attachment utilities
├── runes/          # Reactive utilities (Svelte 5 runes)
├── types/          # TypeScript type definitions
└── utils/          # General utility functions
```

### Bond Pattern

Each component follows a consistent Bond pattern:

- **Bond Class**: Manages component state and DOM interactions
- **BondState Class**: Holds reactive component state using Svelte 5 runes
- **Context Methods**: Static `CONTEXT_KEY`, `get()`, and `set()` methods for component communication
- **Component Files**: Svelte components that use the Bond for behavior

```typescript
class MyComponentBond extends Bond<MyComponentBondState> {
	static CONTEXT_KEY = '@atoms/context/my-component';

	static get(): MyComponentBond | undefined {
		return getContext(MyComponentBond.CONTEXT_KEY);
	}

	static set(bond: MyComponentBond): MyComponentBond {
		return setContext(MyComponentBond.CONTEXT_KEY, bond);
	}
}
```

---

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @svelte-atoms/core

# yarn
yarn install @svelte-atoms/core

# pnpm
pnpm add @svelte-atoms/core

# bun
bun add @svelte-atoms/core
```

### Basic Usage

```svelte
<script lang="ts">
	import { Button, Dialog, Input } from '@svelte-atoms/core';

	let dialogOpen = $state(false);
	let inputValue = '';
</script>

<!-- Simple Button -->
<Button onclick={() => (dialogOpen = true)}>Open Dialog</Button>

<!-- Dialog with Input -->
<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Enter your name</Dialog.Title>
		</Dialog.Header>
		<Dialog.Body>
			<Input.Root>
				<Input.Value bind:value={inputValue} placeholder="Your name...">
			</Input.Root>
		</Dialog.Body>
		<Dialog.Footer>
			<Button.Root onclick={() => (dialogOpen = false)}>Cancel</Button.Root>
			<Button.Root variant="primary" onclick={() => (dialogOpen = false)}>Confirm</Button.Root>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
```

### Advanced Usage with Bonds

For more control, you can use the Bond system directly:

```svelte
<script lang="ts">
	import { DialogBond, DialogBondState } from '@svelte-atoms/core/dialog';

	const { open = false, disable = false } = $props();

	const bondProps = defineState(
		[
			defineProperty(
				'open',
				() => open,
				(v) => (open = v)
			),
			defineProperty('disable', () => disable)
		],
		{
			// Other props
		}
	);

	// Create dialog state
	const dialogState = new DialogBondState(() => bondProps);

	// Create dialog bond
	// Make available via context
	const dialogBond = new DialogBond(dialogState).share();
</script>

<div {...dialogBond.root()}>
	<button {...dialogBond.trigger()} onclick={() => dialogBond.state.toggle()}>
		Toggle Dialog
	</button>

	{#if open}
		<div {...dialogBond.overlay()}>
			<div {...dialogBond.content()}>
				<h2 {...dialogBond.title()}>Dialog Title</h2>
				<p>Dialog content goes here...</p>
				<button onclick={() => dialogBond.state.close()}>Close</button>
			</div>
		</div>
	{/if}
</div>
```

### Advanced Usage With Composition

This example demonstrates the power of component composition by combining `Dropdown`, `Input`, and animation capabilities to create a searchable multi-select dropdown with smooth transitions:

```svelte
<script lang="ts">
	import { Dropdown, Input, Root, filter } from '@svelte-atoms/core';
	import { flip } from 'svelte/animate';

	// Sample data
	let data = [
		{ id: 1, value: 'apple', text: 'Apple' },
		{ id: 2, value: 'banana', text: 'Banana' },
		{ id: 3, value: 'cherry', text: 'Cherry' },
		{ id: 4, value: 'date', text: 'Date' },
		{ id: 5, value: 'elderberry', text: 'Elderberry' }
	];

	let open = $state(false);
	// Filter items based on search query
	const dd = filter(
		() => data,
		(query, item) => item.text.toLowerCase().includes(query.toLowerCase())
	);
</script>

<Root class="items-center justify-center p-4">
	<!-- Multi-select dropdown with search functionality -->
	<Dropdown.Root
		bind:open
		multiple
		keys={data.map((item) => item.value)}
		onquerychange={(q) => (dd.query = q)}
	>
		{#snippet children({ dropdown })}
			<!-- Compose Dropdown.Trigger with Input.Root for a custom trigger -->
			<Dropdown.Trigger
				base={Input.Root}
				class="h-auto min-h-12 max-w-sm min-w-sm items-center gap-2 rounded-sm px-4 transition-colors duration-200"
				onclick={(ev) => {
					ev.preventDefault();

					dropdown.state.open();
				}}
			>
				<!-- Display selected values with animation -->
				{#each dropdown?.state?.selectedItems ?? [] as item (item.id)}
					<div animate:flip={{ duration: 200 }}>
						<ADropdown.Value value={item.value} class="text-foreground/80">
							{item.text}
						</ADropdown.Value>
					</div>
				{/each}

				<!-- Inline search input within the trigger -->
				<Dropdown.Query class="flex-1 px-1" placeholder="Search for fruits..." />
			</Dropdown.Trigger>

			<!-- Dropdown list with filtered items -->
			<Dropdown.List>
				{#each dd.current as item (item.id)}
					<div animate:flip={{ duration: 200 }}>
						<Dropdown.Item value={item.value}>{item.text}</Dropdown.Item>
					</div>
				{/each}
			</Dropdown.List>
		{/snippet}
	</Dropdown.Root>
</Root>
```

**Key composition features demonstrated:**

- **Component Fusion**: Using `base={Input.Root}` to compose Dropdown.Trigger with Input styling and behavior
- **Snippet Patterns**: Accessing internal state through snippets for custom rendering
- **Reactive Filtering**: Combining search query state with reactive effects for real-time filtering
- **Smooth Animations**: Using Svelte's `flip` animation for seamless list transitions
- **Multi-Select State**: Managing complex selection state through the Bond pattern

---

## 📖 Documentation

### Component Examples

#### Dropdown with Multiple Selection

```svelte
<script lang="ts">
	import { Dropdown } from '@svelte-atoms/core';

	let selectedValues = ['option1'];
	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];
</script>

<Dropdown.Root multiple bind:values={selectedValues}>
	<!-- Access internal bond -->
	{#snippet children({ dropdown })}
		<Dropdown.Trigger>
			Select options ({selectedValues.length} selected)
		</Dropdown.Trigger>

		<Dropdown.Content>
			{#each options as option}
				<Dropdown.Item value={option.value}>
					{option.label}
				</Dropdown.Item>
			{/each}
		</Dropdown.Content>
	{/snippet}
</Dropdown.Root>
```

#### Form with Validation

```svelte
<script lang="ts">
	import { Form, Input, Button } from '@svelte-atoms/core';
	import { z } from 'zod';

	const schema = z.object({
		email: z.string().email('Invalid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters')
	});

	let formData = { email: '', password: '' };
	let errors = {};
</script>

<Form {schema} bind:value={formData} bind:errors>
	<Field name="email">
		<Field.Label>Email</Field.Label>
		<Field.Control>
			<Input.Root type="email" placeholder="Enter your email" bind:value={formData.email} />
		</Field.Control>
		{#if errors.email}
			<Form.Error>{errors.email}</Form.Error>
		{/if}
	</.Field>

	<Field name="password">
		<Field.Label>Password</Field.Label>
		<Field.Control>
			<Input.Root
				type="password"
				placeholder="Enter your password"
				bind:value={formData.password}
			/>
		</Field.Control>
		{#if errors.password}
			<Field.Error>{errors.password}</Field.Error>
		{/if}
	</.Field>

	<Button type="submit">Submit</Button>
</Form>
```

#### Data Grid with Sorting and Selection

```svelte
<script lang="ts">
	import { DataGrid, Checkbox } from '@svelte-atoms/core';

	let data = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
	];

	let selectedRows = [];
</script>

<DataGrid.Root {data} bind:selectedRows multiple>
	<DataGrid.Header>
		<DataGrid.Tr>
			<DataGrid.Th>
				<Checkbox />
			</DataGrid.Th>
			<DataGrid.Th sortable="name">Name</DataGrid.Th>
			<DataGrid.Th sortable="email">Email</DataGrid.Th>
			<DataGrid.Th>Role</DataGrid.Th>
		</DataGrid.Tr>
	</DataGrid.Header>

	<DataGrid.Body>
		{#each data as row}
			<DataGrid.Tr value={row.id}>
				<DataGrid.Td>
					<Checkbox.Root value={row.id} />
				</DataGrid.Td>
				<DataGrid.Td>{row.name}</DataGrid.Td>
				<DataGrid.Td>{row.email}</DataGrid.Td>
				<DataGrid.Td>{row.role}</DataGrid.Td>
			</DataGrid.Tr>
		{/each}
	</DataGrid.Body>
</DataGrid.Root>
```

---

## 🎨 Styling

@svelte-atoms/core is completely headless, giving you full control over styling. Here are some approaches:

### Using Vanilla CSS

```css
/* Default button styles */
.btn {
	@apply rounded-md px-4 py-2 font-medium transition-colors;
}

.btn-primary {
	@apply bg-blue-600 text-white hover:bg-blue-700;
}

.btn-secondary {
	@apply bg-gray-200 text-gray-900 hover:bg-gray-300;
}
```

### Using Tailwind CSS

```svelte
<Button class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Styled Button</Button>
```

---

## 🧪 Development

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ryu-man/svelte-atoms.git
   cd svelte-atoms
   ```

2. **Install dependencies:**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Start development server:**

   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Run Storybook:**
   ```bash
   bun run storybook:dev
   # or
   npm run storybook:dev
   ```

### Building

```bash
# Build library
bun run build

# Build Storybook
bun run storybook:build
```

---

<!-- ## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details. -->

<!-- ### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `bun test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request -->

### Creating New Components

When adding new components, follow these guidelines:

1. **Create the bond structure:**

   ```
   src/lib/atoms/my-component/
   ├── bond.svelte.ts          		# Core bond logic (Bond + BondState classes)
   ├── index.ts                		# Public exports
   ├── atoms.ts          			# Component exports
   ├── my-component-root.svelte		# Use namespace pattern when building complex component
   ├── my-component-content.svelte
   └── README.md              		# Component documentation
   ```

2. **Implement accessibility features:**
   - ARIA attributes
   - Keyboard navigation
   - Focus management
   - Screen reader support

3. **Add comprehensive tests:**
   - Unit tests for bond logic
   - Component integration tests
   - Accessibility tests

4. **Create Storybook stories:**
   - Basic usage examples
   - Advanced configurations
   - Interactive demos

---

## 📚 Resources

- **[Documentation](https://svelte-atoms.dev)** - Comprehensive documentation
- **[Storybook](https://storybook.svelte-atoms.dev/)** - Interactive component documentation
- **[GitHub](https://github.com/ryu-man/svelte-atoms)** - Source code and issues
- **[@svelte-atoms/alchemist](../alchimist)** - Data visualization companion library

---

## 🗺️ Roadmap

### v1.0.0 (Current - Alpha)

- ✅ Bond architecture with Svelte 5 runes
- ✅ 35+ essential components
- ✅ TypeScript support
- ✅ Accessibility features
- ✅ Storybook documentation
- ✅ Standardized context pattern

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Svelte](https://svelte.dev/) - The amazing framework that powers this library
- [Motion](https://motion.dev/) - For handling internal default animations
- [Floating UI](https://floating-ui.com/) - For advanced positioning logic
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Storybook](https://storybook.js.org/) - For component documentation and testing
- [Vitest](https://vitest.dev/) - For fast and reliable testing
- [Playwright](https://playwright.dev/) - For end-to-end testing

---

<div align="center">
  <p>Built with ❤️ by the Svelte Atoms team</p>
  <!-- <p>
    <a href="https://github.com/ryu-man/svelte-atoms">GitHub</a> •
    <a href="https://svelte-atoms.dev">Documentation</a> •
    <a href="https://storybook.svelte-atoms.dev">Storybook</a>
  </p> -->
</div>
