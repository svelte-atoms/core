# Accordion Module

> **Source**: [`src/lib/components/accordion`](../../src/lib/components/accordion)

The `Accordion` module provides a flexible and accessible implementation of an accordion component. It is designed to manage the state and behavior of accordion items, allowing for features like multiple open items, collapsibility, and more.

## Components

The accordion is built using a modular component architecture:

### `Accordion` (Root Component)

The main accordion container that manages the overall state.

**Props:** See [`AccordionRootProps`](../../src/lib/components/accordion/accordion-root.svelte) in the source code.

Key props include:

- `value` / `values` - Control selected items
- `multiple` - Allow multiple items open
- `collapsible` - Allow collapsing all items
- `disabled` - Disable the accordion
- `factory` - Custom factory function

### `AccordionItem` Components

#### `AccordionItem.Root`

Container for individual accordion items.

**Props:** See [`AccordionItemRootProps`](../../src/lib/components/accordion/item/accordion-item-root.svelte) in the source code.

Key props include:

- `value` - Unique identifier for the item
- `data` - Associated data for the item
- `disabled` - Disable this specific item

#### `AccordionItem.Header`

Clickable header section that toggles the item.

**Props:** See component source for full type definition.

#### `AccordionItem.Body`

Collapsible content section of the accordion item.

**Props:** See component source for full type definition.

Key props include:

- `initial` - Initial state setup function
- `enter` - Enter transition function
- `exit` - Exit transition function

#### `AccordionItem.Indicator`

Visual indicator showing the open/closed state.

**Props:** See component source for full type definition.

## Usage

### Basic

```svelte
<script>
	import { Accordion, AccordionItem } from '@svelte-atoms/core';
</script>

<Accordion class="w-full max-w-md" multiple={false} collapsible={true}>
	{#snippet children({ accordion })}
		<AccordionItem.Root value="item-1">
			<AccordionItem.Header>
				<div class="flex-1">First Item</div>
				<AccordionItem.Indicator />
			</AccordionItem.Header>

			<AccordionItem.Body>
				<div class="p-4">This is the content of the first accordion item.</div>
			</AccordionItem.Body>
		</AccordionItem.Root>

		<AccordionItem.Root value="item-2">
			<AccordionItem.Header>
				<div class="flex-1">Second Item</div>
				<AccordionItem.Indicator />
			</AccordionItem.Header>

			<AccordionItem.Body>
				<div class="p-4">This is the content of the second accordion item.</div>
			</AccordionItem.Body>
		</AccordionItem.Root>
	{/snippet}
</Accordion>
```

### Advanced

```svelte
<script>
	import { Accordion, AccordionItem, toTransitionConfig } from '@svelte-atoms/core';
	import { animate } from 'motion';
</script>

<Accordion multiple={true} collapsible={true}>
	{#snippet children({ accordion })}
		<AccordionItem.Root value="animated-1">
			<AccordionItem.Header>
				<div>Animated Item</div>
				<AccordionItem.Indicator />
			</AccordionItem.Header>

			<AccordionItem.Body
				initial={(node) => {
					node.style.opacity = '0';
					node.style.height = '0';
				}}
				enter={(node) => {
					const animation = animate(
						node,
						{ opacity: 1, height: 'auto' },
						{ duration: 0.2, easing: 'linear' }
					);
					return toTransitionConfig(animation);
				}}
				exit={(node) => {
					const animation = animate(
						node,
						{ opacity: 0, height: 0 },
						{ duration: 0.2, easing: 'linear' }
					);
					return toTransitionConfig(animation);
				}}
			>
				<div class="p-4">Content with smooth animations using Motion.</div>
			</AccordionItem.Body>
		</AccordionItem.Root>
	{/snippet}
</Accordion>
```

### Controlled State

```svelte
<script>
	import { Accordion, AccordionItem } from '@svelte-atoms/core';

	let selectedValues = $state(['item-1']);

	function handleChange(newValues) {
		selectedValues = newValues;
		console.log('Accordion values changed:', newValues);
	}
</script>

<Accordion bind:values={selectedValues} multiple={true} onchange={handleChange}>
	{#snippet children({ accordion })}
		<!-- Accordion items here -->
	{/snippet}
</Accordion>
```

## Context Management

The `AccordionBond` class provides static methods for managing context:

- `AccordionBond.getContext`: Retrieves the current accordion context.
- `AccordionBond.setContext`: Sets the accordion context.

### Custom Factory

You can provide a custom factory function to customize the accordion behavior:

```svelte
<script>
	import { Accordion } from '@svelte-atoms/core';

	function customFactory() {
		// Custom accordion state and bond setup
		const bondProps = defineState([
			defineProperty(
				'values',
				() => ['default-open'],
				(v) => (values = v)
			)
		]);

		const bondState = new AccordionState(() => bondProps);
		return new AccordionBond(bondState);
	}
</script>

<Accordion factory={customFactory}>
	<!-- Accordion content -->
</Accordion>
```

## Customizability

The Accordion component is highly customizable and provides multiple ways to adapt it to your needs:

### Styling & Appearance

- **Presets**: Define default TailwindCSS classes, HTML elements, shell components, and lifecycle methods for consistent styling across your application
- **TailwindCSS Override**: Override default styles by passing custom TailwindCSS classes when declaring the component
- **Element Transformation**: Change the root HTML element using the `as` prop (e.g., `as="button"`, `as="div"`, `as="section"`)

### Composition & Integration

- **Shell Composition**: Compose with other components via the `shell` prop to extend functionality and create more powerful compound components
- **Custom Attachments**: Add custom logic and behavior by creating your own attachments that hook into the component lifecycle

### Advanced Customization

- **Custom Factory Functions**: Provide custom factory functions to completely customize the accordion's internal state management and behavior
- **Transition Control**: Define custom enter/exit transitions for accordion items using Motion or Svelte's built-in transition system
- **Event Handling**: Implement custom event handlers for accordion state changes and user interactions

### Example Customizations

```svelte
<!-- Custom styling with TailwindCSS -->
<Accordion class="rounded-lg border bg-gray-50 shadow-sm">
	<!-- content -->
</Accordion>

<!-- Custom root element -->
<Accordion as="section" role="tablist">
	<!-- content -->
</Accordion>

<!-- With shell composition -->
<Accordion base={CustomWrapper}>
	<!-- content -->
</Accordion>
```
