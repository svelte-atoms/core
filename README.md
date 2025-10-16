# ⚛️ @svelte-atoms/core

> A modern, modular, and accessible Svelte 5 UI component library built with composability at its core.

**@svelte-atoms/core** is a comprehensive Svelte component library that provides fundamental building blocks ("atoms") for creating sophisticated, interactive design systems. Each component is designed with accessibility, type safety, and developer experience in mind. Built with Svelte 5 runes for optimal reactivity and performance.

[![npm version](https://img.shields.io/npm/v/@svelte-atoms/core.svg)](https://www.npmjs.com/package/@svelte-atoms/core)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

## ✨ Features

### 🧱 **Bond Architecture**

Built around the concept of "Bonds" - self-contained, reusable state management classes that encapsulate component state and DOM interactions. Each component uses the Bond pattern for consistent, predictable behavior.

### 🔗 **Context-Driven Communication**

Components seamlessly communicate through Svelte's context API using standardized static methods (`Bond.get()` / `Bond.set()`), enabling powerful parent-child relationships without prop drilling.

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

---

## 📦 Available Components

Our comprehensive collection of UI components with implementation status:

### Layout & Navigation

- ✅ **Accordion** - Collapsible content sections
- ✅ **Breadcrumb** - Navigation hierarchy
- ✅ **Sidebar** - Collapsible side navigation
- ✅ **Tabs** - Tabbed interfaces
- ✅ **Tree** - Hierarchical data structures
- ❌ **Stepper** - Multi-step process indicator
- ❌ **Pagination** - Page navigation controls

### Forms & Input

- ✅ **Button** - Interactive buttons with variants
- ✅ **Checkbox** - Multi-select inputs
- ✅ **Combobox** - Searchable select inputs
- ✅ **Input** - Text input fields
- ✅ **Radio** - Single-select inputs
- ✅ **Slider** - Range input controls
- ✅ **Switch** - Toggle controls
- ✅ **Textarea** - Multi-line text inputs
- ✅ **Form** - Form validation and state management
- ❌ **DatePicker** - Date selection component
- ❌ **TimePicker** - Time selection component
- ❌ **FileUpload** - File upload component
- ❌ **ColorPicker** - Color selection component
- ❌ **Rating** - Star rating component

### Data Display

- ✅ **Avatar** - User profile images
- ✅ **Badge** - Status indicators
- ✅ **DataGrid** - Advanced data tables
- ✅ **Divider** - Content separators
- ✅ **Icon** - Scalable icons
- ✅ **Label** - Form labels
- ✅ **Link** - Navigation links
- ✅ **List** - Structured lists
- ✅ **Card** - Content containers
- ❌ **Table** - Simple data tables
- ❌ **Chip** - Compact information display
- ❌ **Progress** - Progress indicators
- ❌ **Skeleton** - Loading placeholders
- ❌ **Timeline** - Event timeline display
- ❌ **Calendar** - Date display component
- ❌ **Stats** - Statistical data display

### Overlays & Feedback

- ✅ **Dialog** - Modal dialogs
- ✅ **Dropdown** - Contextual menus
- ✅ **Popover** - Contextual information
- ✅ **Slideover** - Side panel overlays
- ✅ **Toast** - Notification messages
- ✅ **Tooltip** - Contextual hints
- ✅ **ContextMenu** - Right-click menus
- ❌ **Alert** - Alert messages
- ❌ **Banner** - Full-width notifications
- ❌ **Modal** - Standard modal dialogs
- ❌ **Drawer** - Slide-out panels
- ❌ **Notification** - System notifications
- ❌ **Spotlight** - Feature highlighting

### Utilities & Layout

- ✅ **Portal** - Declare a portal anywhere in DOM
- ✅ **Teleport** - Render content in a specific portal
- ✅ **Root** - Application root container
- ✅ **Layer** - Layer management utility
- ✅ **Collapsible** - Generic collapsible wrapper
- ✅ **Container** - Layout container
- ✅ **Scrollable** - Custom scrollbar component
- ❌ **Spacer** - Space management utility
- ❌ **Responsive** - Responsive utilities
- ❌ **VirtualList** - Virtual scrolling list

### Status: **35/65** components implemented (54%)

---

## 🏗️ Architecture

The library is organized into distinct layers for maximum maintainability and extensibility:

```
src/lib/
├── atoms/          # 30+ Core UI components
├── shared/         # Base classes (Bond, BondState) and utilities
├── helpers/        # Helper functions and components
├── actions/        # Svelte actions for behaviors
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
npm install @svelte-atoms/core
```

### Basic Usage

```svelte
<script lang="ts">
	import { Button, Dialog, Input } from '@svelte-atoms/core';

	let dialogOpen = $state(false);
	let inputValue = '';
</script>

<!-- Simple Button -->
<Button.Root onclick={() => (dialogOpen = true)}>Open Dialog</Button.Root>

<!-- Dialog with Input -->
<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Enter your name</Dialog.Title>
		</Dialog.Header>
		<Dialog.Body>
			<Input.Root bind:value={inputValue} placeholder="Your name..." />
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

	// Create dialog state
	const dialogState = new DialogBondState(() => ({
		open: false,
		disabled: false,
		extend: {}
	}));

	// Create dialog bond
	const dialogBond = new DialogBond(dialogState);
	DialogBond.set(dialogBond); // Make available via context

	// Reactive values
	const isOpen = $derived(dialogBond.state.props.open);
</script>

<div {...dialogBond.root()}>
	<button {...dialogBond.trigger()} onclick={() => dialogBond.state.toggle()}>
		Toggle Dialog
	</button>

	{#if isOpen}
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

<Form.Root {schema} bind:value={formData} bind:errors>
	<Form.Field name="email">
		<Form.Label>Email</Form.Label>
		<Form.Control>
			<Input.Root type="email" placeholder="Enter your email" bind:value={formData.email} />
		</Form.Control>
		{#if errors.email}
			<Form.Error>{errors.email}</Form.Error>
		{/if}
	</Form.Field>

	<Form.Field name="password">
		<Form.Label>Password</Form.Label>
		<Form.Control>
			<Input.Root
				type="password"
				placeholder="Enter your password"
				bind:value={formData.password}
			/>
		</Form.Control>
		{#if errors.password}
			<Form.Error>{errors.password}</Form.Error>
		{/if}
	</Form.Field>

	<Button.Root type="submit">Submit</Button.Root>
</Form.Root>
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
		<DataGrid.Row>
			<DataGrid.HeaderCell>
				<Checkbox.Root />
			</DataGrid.HeaderCell>
			<DataGrid.HeaderCell sortable="name">Name</DataGrid.HeaderCell>
			<DataGrid.HeaderCell sortable="email">Email</DataGrid.HeaderCell>
			<DataGrid.HeaderCell>Role</DataGrid.HeaderCell>
		</DataGrid.Row>
	</DataGrid.Header>

	<DataGrid.Body>
		{#each data as row}
			<DataGrid.Row value={row.id}>
				<DataGrid.Cell>
					<Checkbox.Root value={row.id} />
				</DataGrid.Cell>
				<DataGrid.Cell>{row.name}</DataGrid.Cell>
				<DataGrid.Cell>{row.email}</DataGrid.Cell>
				<DataGrid.Cell>{row.role}</DataGrid.Cell>
			</DataGrid.Row>
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
<Button.Root class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
	Styled Button
</Button.Root>
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
   bun storybook
   # or
   npm run storybook
   ```

### Building

```bash
# Build library
bun run build

# Build Storybook
bun run build-storybook
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `bun test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Creating New Components

When adding new components, follow these guidelines:

1. **Create the bond structure:**

   ```
   src/lib/atoms/my-component/
   ├── bond.svelte.ts          # Core bond logic (Bond + BondState classes)
   ├── index.ts                # Public exports
   ├── components.ts          # Component exports
   ├── my-component-root.svelte
   ├── my-component-content.svelte
   └── README.md              # Component documentation
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
- [Floating UI](https://floating-ui.com/) - For advanced positioning logic
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Storybook](https://storybook.js.org/) - For component documentation and testing
- [Vitest](https://vitest.dev/) - For fast and reliable testing
- [Playwright](https://playwright.dev/) - For end-to-end testing

---

<div align="center">
  <p>Built with ❤️ by the Svelte Atoms team</p>
  <p>
    <a href="https://github.com/ryu-man/svelte-atoms">GitHub</a> •
    <a href="https://svelte-atoms.dev">Documentation</a> •
    <a href="https://storybook.svelte-atoms.dev">Storybook</a>
  </p>
</div>
