# Popover Module

The Popover module provides a flexible and customizable implementation of popovers for your Svelte application. It is built using the `Bond` and `BondState` classes, and leverages the `@floating-ui/dom` library for positioning and middleware.

## Features

- **Trigger and Overlay Management**: Provides trigger and overlay elements with accessibility attributes.
- **Positioning**: Uses `@floating-ui/dom` for precise positioning with middleware like `offset`, `flip`, and `arrow`.
- **Customizable**: Allows custom behavior through props and event handlers.
- **Throttling**: Optimized performance with throttled position updates.
- **Motion Integration**: Supports animations using Motion library.

## Components

### Popover.Root

Root container for the popover system.

**Preset Key:** `popover`

**Props:**

{{popoverRootProps}}

### Popover.Trigger

Element that triggers the popover.

**Preset Key:** `popover.trigger`

**Props:**

{{popoverTriggerProps}}

### Popover.Content

The popover content container.

**Preset Key:** `popover.content`

**Props:**

{{popoverContentProps}}

### Popover.Arrow

Optional arrow pointer for the popover.

**Preset Key:** `popover.arrow`

**Props:**

{{popoverArrowProps}}

## Classes

### `PopoverBond`

The main class for managing the popover's state and elements.

#### Properties

- `position`: Tracks the computed position of the popover.

#### Methods

- `trigger(props)`: Returns attributes and event handlers for the trigger element.
- `overlay(props)`: Returns attributes and event handlers for the overlay element.
- `indicator(props)`: Returns attributes and event handlers for the indicator element.
- `arrow(props)`: Returns attributes and event handlers for the arrow element.
- `share()`: Shares the popover context.

#### Static Methods

- `getContext`: Retrieves the popover context.
- `setContext`: Sets the popover context.

### `PopoverState`

Manages the state of the popover.

#### Properties

- `isOpen`: Indicates whether the popover is open.
- `canRenderOverlay`: Indicates whether the overlay can be rendered.

#### Methods

- `open()`: Opens the popover.
- `close()`: Closes the popover.
- `toggle()`: Toggles the popover's open state.

## Types

### `PopoverParams`

Defines parameters for customizing the popover's behavior.

### `PopoverStateProps`

Extends `StateProps` to include popover-specific properties.

### `TriggerParams`

Defines parameters for the trigger element.

### `PopoverDomElements`

Defines the DOM elements used in the popover.

## Usage

### Basic Example

```svelte
<script>
	import { Popover } from '@svelte-atoms/core';

	let open = $state(false);
</script>

<Popover.Root bind:open placement="top" offset={10}>
	<Popover.Trigger>
		Open Popover
		<Popover.Indicator />
	</Popover.Trigger>

	<Popover.Content>
		<div>Popover content goes here</div>
		<Popover.Arrow />
	</Popover.Content>
</Popover.Root>
```

### With Custom Styling

```svelte
<script>
	import { Popover } from '@svelte-atoms/core';

	let open = $state(false);
</script>

<Popover.Root bind:open placement="bottom" offset={8}>
	<Popover.Trigger class="rounded bg-blue-500 px-4 py-2 text-white">
		Click me
		<Popover.Indicator />
	</Popover.Trigger>

	<Popover.Content class="rounded-lg border bg-white p-4 shadow-lg">
		<h3>Popover Title</h3>
		<p>This is a styled popover with custom classes.</p>
		<Popover.Arrow />
	</Popover.Content>
</Popover.Root>
```

### With Animations (Motion)

```svelte
<script>
	import { Popover, clickoutPopover } from '@svelte-atoms/core';
	import { animate } from 'motion';

	let open = $state(false);
</script>

<Popover.Root bind:open placement="top">
	<Popover.Trigger class="rounded bg-purple-500 px-4 py-2 text-white">
		Animated Popover
		<Popover.Indicator />
	</Popover.Trigger>

	<Popover.Content
		{@attach clickoutPopover((ev, atom) => {
			atom.state.close();
		})}
		class="rounded-lg bg-white p-4 shadow-lg"
		animate={function (node) {
			const isOpen = this.isOpen;

			animate(
				node,
				{
					y: (isOpen ? 0 : -1) * 8,
					opacity: +isOpen
				},
				{
					duration: 0.2
				}
			);
		}}
	>
		<div>Animated content with smooth transitions</div>
		<Popover.Arrow />
	</Popover.Content>
</Popover.Root>
```

### Controlled Popover

```svelte
<script>
	import { Popover } from '@svelte-atoms/core';

	let open = $state(false);

	function openPopover() {
		open = true;
	}

	function closePopover() {
		open = false;
	}
</script>

<button onclick={openPopover}>Open from outside</button>
<button onclick={closePopover}>Close from outside</button>

<Popover.Root bind:open>
	<Popover.Trigger>Controlled Popover</Popover.Trigger>

	<Popover.Content class="rounded bg-white p-4 shadow-lg">
		<p>This popover can be controlled externally</p>
		<button onclick={closePopover}>Close</button>
	</Popover.Content>
</Popover.Root>
```

## Accessibility

The module ensures accessibility by providing ARIA attributes such as `aria-expanded`, `aria-controls`, and `aria-modal`. It also supports keyboard navigation by managing `tabindex` and `role` attributes.

## Dependencies

- `@floating-ui/dom`
- `motion`
- `es-toolkit`

## License

This module is licensed under the MIT License.
