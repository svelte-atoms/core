# Accordion Module

The `Accordion` module provides a flexible and accessible implementation of an accordion component. It is designed to manage the state and behavior of accordion items, allowing for features like multiple open items, collapsibility, and more.

## Components

The accordion is built using a modular component architecture:

### `Accordion` (Root Component)

The main accordion container that manages the overall state.

**Preset Key:** `accordion`

**Props:**

{{accordionRootProps}}

Key props include:

- `value` / `values` - Control selected items
- `multiple` - Allow multiple items open
- `collapsible` - Allow collapsing all items
- `disabled` - Disable the accordion
- `factory` - Custom factory function

### `AccordionItem` Components

#### `AccordionItem.Root`

Container for individual accordion items.

**Preset Key:** `accordion.item`

**Props:**

{{accordionItemRootProps}}

Key props include:

- `value` - Unique identifier for the item
- `data` - Associated data for the item
- `disabled` - Disable this specific item

#### `AccordionItem.Header`

Clickable header section that toggles the item.

**Preset Key:** `accordion.item.header`

**Props:**

{{accordionItemHeaderProps}}

#### `AccordionItem.Body`

Collapsible content section of the accordion item.

**Preset Key:** `accordion.item.body`

**Props:**

{{accordionItemBodyProps}}

#### `AccordionItem.Indicator`

Visual indicator showing the open/closed state.

**Preset Key:** `accordion.item.indicator`

**Props:**

{{accordionItemIndicatorProps}}

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

### Multiple Mode

Allow multiple accordion items to be open simultaneously:

```svelte
<script>
	import { Accordion, AccordionItem } from '@svelte-atoms/core';
</script>

<Accordion class="w-full max-w-md" multiple={true}>
	{#snippet children({ accordion })}
		<AccordionItem.Root value="item-1">
			<AccordionItem.Header>
				<div class="flex-1">Section 1</div>
				<AccordionItem.Indicator />
			</AccordionItem.Header>

			<AccordionItem.Body>
				<div class="p-4">Multiple sections can be open at the same time.</div>
			</AccordionItem.Body>
		</AccordionItem.Root>

		<AccordionItem.Root value="item-2">
			<AccordionItem.Header>
				<div class="flex-1">Section 2</div>
				<AccordionItem.Indicator />
			</AccordionItem.Header>

			<AccordionItem.Body>
				<div class="p-4">Opening this section won't close the others.</div>
			</AccordionItem.Body>
		</AccordionItem.Root>

		<AccordionItem.Root value="item-3">
			<AccordionItem.Header>
				<div class="flex-1">Section 3</div>
				<AccordionItem.Indicator />
			</AccordionItem.Header>

			<AccordionItem.Body>
				<div class="p-4">All sections can remain open together.</div>
			</AccordionItem.Body>
		</AccordionItem.Root>
	{/snippet}
</Accordion>
```

### Non-Collapsible Mode

Ensure at least one item is always open:

```svelte
<script>
	import { Accordion, AccordionItem } from '@svelte-atoms/core';
</script>

<Accordion class="w-full max-w-md" multiple={false} collapsible={false}>
	{#snippet children({ accordion })}
		<AccordionItem.Root value="item-1">
			<AccordionItem.Header>
				<div class="flex-1">Always Open Item 1</div>
				<AccordionItem.Indicator />
			</AccordionItem.Header>

			<AccordionItem.Body>
				<div class="p-4">One item must always remain open in non-collapsible mode.</div>
			</AccordionItem.Body>
		</AccordionItem.Root>

		<AccordionItem.Root value="item-2">
			<AccordionItem.Header>
				<div class="flex-1">Item 2</div>
				<AccordionItem.Indicator />
			</AccordionItem.Header>

			<AccordionItem.Body>
				<div class="p-4">Clicking another item will close the currently open one.</div>
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
		console.log('Accordion values changed:', newValues);
	}
</script>

<Accordion bind:values={selectedValues} multiple={true} onchange={handleChange}>
	<!-- Accordion items here -->
</Accordion>
```

## Context Management

The `AccordionBond` class provides static methods for managing context:

- `AccordionBond.get`: Retrieves the current accordion context.
- `AccordionBond.set`: Sets the accordion context.

### Custom Factory

You can provide a custom factory function to customize the accordion behavior:

```svelte
<script>
	import { Accordion } from '@svelte-atoms/core';

	function customFactory(props) {
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

<!-- With base composition -->
<Accordion base={CustomWrapper}>
	<!-- content -->
</Accordion>

<!-- With custom preset -->
<Accordion preset="myaccordion">
	<!-- content -->
</Accordion>
```
