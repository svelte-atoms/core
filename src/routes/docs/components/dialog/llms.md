# Dialog Module

The `Dialog` module provides a flexible and accessible implementation of a dialog/modal component. It is designed to display overlay content and supports features like focus management, keyboard navigation, and customizable transitions.

## Features

short description goes here:

- [ ] Accessible modal dialog
- [ ] Focus trap and keyboard navigation
- [ ] Customizable transitions and appearance

## Components

The dialog is built using a modular component architecture:

### `Dialog.Root` (Root Component)

The main dialog container that manages the overall state.

**Preset Key:** `dialog`

**Props:**

{{dialogRootProps}}

Key props:

- `open?: boolean` - Controls whether the dialog is open
- `disabled?: boolean` - Disable the entire dialog
- `factory?: (props: DialogBondProps) => DialogBond` - Custom factory function
- `children?: Snippet<[{ dialog: DialogBond }]>` - Content renderer

### Dialog Sub-Components

#### `Dialog.Content`

Container for the main dialog content area.

**Preset Key:** `dialog.content`

**Props:**

{{dialogContentProps}}

Key props:

- `as?: string` - Element type to render
- Animation hooks (enter, exit, animate)

#### `Dialog.Header`

Header section of the dialog.

**Preset Key:** `dialog.header`

**Props:**

{{dialogHeaderProps}}

Key props:

- `as?: string` - Element type to render

#### `Dialog.Body`

Body section of the dialog.

**Preset Key:** `dialog.body`

**Props:**

{{dialogBodyProps}}

Key props:

- `as?: string` - Element type to render

#### `Dialog.Footer`

Footer section of the dialog.

**Preset Key:** `dialog.footer`

**Props:**

{{dialogFooterProps}}

Key props:

- `as?: string` - Element type to render

#### `Dialog.CloseButton`

Button component to close the dialog.

**Preset Key:** `dialog.closeButton`

**Props:**

{{dialogCloseButtonProps}}

Key props:

- Automatically wired to close the dialog
- All standard HTML button attributes

## Usage

### Basic

```svelte
<script>
	import { Dialog } from '@svelte-atoms/core';
</script>

<Dialog.Root class="w-full max-w-md" bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<h2>Dialog Title</h2>
			<Dialog.CloseButton />
		</Dialog.Header>
		<Dialog.Body>
			<p>Basic dialog content</p>
		</Dialog.Body>
		<Dialog.Footer>
			<button>Cancel</button>
			<button>Confirm</button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
```

### Advanced

```svelte
<script>
	import { Dialog, toTransitionConfig } from '@svelte-atoms/core';
	import { animate } from 'motion';
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content
		initial={(node) => {
			node.style.opacity = '0';
		}}
		enter={(node) => {
			const animation = animate(node, { opacity: 1 }, { duration: 0.2, easing: 'linear' });
			return toTransitionConfig(animation);
		}}
	>
		<Dialog.Header>
			<h2>Advanced Dialog</h2>
			<Dialog.CloseButton />
		</Dialog.Header>
		<Dialog.Body>
			<p>Advanced dialog content with animations</p>
		</Dialog.Body>
	</Dialog.Content>
</Dialog.Root>
```

### Controlled State

```svelte
<script>
	import { Dialog } from '@svelte-atoms/core';

	let isOpen = $state(false);

	function handleToggle() {
		isOpen = !isOpen;
		console.log('Dialog state changed:', isOpen);
	}
</script>

<button onclick={handleToggle}>
	{isOpen ? 'Close' : 'Open'} Dialog
</button>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<h2>Controlled Dialog</h2>
			<Dialog.CloseButton />
		</Dialog.Header>
		<Dialog.Body>
			<p>This dialog's state is controlled externally</p>
		</Dialog.Body>
	</Dialog.Content>
</Dialog.Root>
```

## Context Management

The `DialogBond` class provides static methods for managing context:

- `DialogBond.getContext`: Retrieves the current dialog context.
- `DialogBond.setContext`: Sets the dialog context.

### Custom Factory

You can provide a custom factory function to customize the dialog behavior:

```svelte
<script>
	import { Dialog } from '@svelte-atoms/core';
	import { DialogBond, DialogBondState } from '@svelte-atoms/core';
	import { defineProperty, defineState } from '@svelte-atoms/core';

	let isOpen = $state(false);

	function customFactory(props) {
		const bondProps = defineState(
			[
				defineProperty(
					'open',
					() => isOpen,
					(v) => (isOpen = v)
				),
				defineProperty(
					'disabled',
					() => false,
					(v) => {}
				)
			],
			() => props
		);

		const bondState = new DialogBondState(() => bondProps);
		return new DialogBond(bondState);
	}
</script>

<Dialog.Root factory={customFactory}>
	<Dialog.Content>
		<!-- Dialog content with custom behavior -->
	</Dialog.Content>
</Dialog.Root>
```

## Customizability

The Dialog component is highly customizable and provides multiple ways to adapt it to your needs:

### Styling & Appearance

- **Presets**: Define default TailwindCSS classes, HTML elements, shell components, and lifecycle methods for consistent styling across your application
- **TailwindCSS Override**: Override default styles by passing custom TailwindCSS classes when declaring the component
- **Element Transformation**: Change the root HTML element using the `as` prop (e.g., `as="section"`, `as="div"`)

### Composition & Integration

- **Shell Composition**: Compose with other components via the `shell` prop to extend functionality and create more powerful compound components
- **Custom Attachments**: Add custom logic and behavior by creating your own attachments that hook into the component lifecycle

### Advanced Customization

- **Custom Factory Functions**: Provide custom factory functions to completely customize the dialog's internal state management and behavior
- **Transition Control**: Define custom enter/exit transitions using Motion or Svelte's built-in transition system
- **Event Handling**: Implement custom event handlers for dialog state changes and user interactions

### Example Customizations

```svelte
<!-- Custom styling with TailwindCSS -->
<Dialog.Root class="rounded-lg border bg-gray-50 shadow-sm">
	<Dialog.Content>
		<!-- content -->
	</Dialog.Content>
</Dialog.Root>

<!-- Custom root element -->
<Dialog.Root as="section" role="dialog">
	<Dialog.Content>
		<!-- content -->
	</Dialog.Content>
</Dialog.Root>

<!-- With shell composition -->
<Dialog.Root base={CustomWrapper}>
	<Dialog.Content>
		<!-- content -->
	</Dialog.Content>
</Dialog.Root>
```

## API Reference

### Types

```typescript
interface DialogProps {
	// Core props
	open?: boolean;
	disabled?: boolean;

	// Styling props
	class?: string;
	as?: keyof HTMLElementTagNameMap;

	// Composition props
	shell?: ComponentType;
	factory?: (props: DialogBondProps) => DialogBond;
	children?: Snippet<[{ dialog: DialogBond }]>;
}

interface DialogBondProps {
	open: boolean;
	disabled: boolean;
}

interface DialogBond {
	state: DialogBondState;
	root(props: Record<string, unknown>): Record<string, unknown>;
	content(props: Record<string, unknown>): Record<string, unknown>;
	header(props: Record<string, unknown>): Record<string, unknown>;
	body(props: Record<string, unknown>): Record<string, unknown>;
	footer(props: Record<string, unknown>): Record<string, unknown>;
}
```

### Events

- `change`: Fired when the dialog state changes (via binding)

## Accessibility

The Dialog component follows WAI-ARIA guidelines and includes:

- Proper ARIA attributes and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Dialog

```svelte
<script>
	import { Dialog } from '@svelte-atoms/core';

	let isOpen = $state(false);
</script>

<button onclick={() => (isOpen = true)}>Open Dialog</button>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<h2>Simple Dialog</h2>
			<Dialog.CloseButton />
		</Dialog.Header>
		<Dialog.Body>
			<p>Dialog content goes here</p>
		</Dialog.Body>
	</Dialog.Content>
</Dialog.Root>
```

### Dialog with Custom Transition

```svelte
<script>
	import { Dialog, toTransitionConfig } from '@svelte-atoms/core';
	import { animate } from 'motion';

	let isOpen = $state(false);
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content
		initial={(node) => {
			node.style.opacity = '0';
			node.style.scale = '0.8';
		}}
		enter={(node) => toTransitionConfig(animate(node, { opacity: 1, scale: 1 }, { duration: 0.3 }))}
		exit={(node) =>
			toTransitionConfig(animate(node, { opacity: 0, scale: 0.8 }, { duration: 0.2 }))}
	>
		<Dialog.Header>
			<h2>Animated Dialog</h2>
			<Dialog.CloseButton />
		</Dialog.Header>
		<Dialog.Body>
			<p>This dialog has custom Motion animations</p>
		</Dialog.Body>
	</Dialog.Content>
</Dialog.Root>
```

## Best Practices

1. **Keep examples simple but functional**: Examples should be copy-pasteable and work out of the box
2. **Include TypeScript types**: Always provide type definitions in API Reference
3. **Document accessibility**: Include accessibility considerations for all interactive components
4. **Show real-world usage**: Include practical examples beyond basic usage
5. **Maintain consistency**: Use the same structure and style across all component documentation
6. **Update regularly**: Keep documentation in sync with component changes
