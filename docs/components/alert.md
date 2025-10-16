# Alert Component

> **Source**: [`src/lib/components/alert`](../../src/lib/components/alert)

A modular and scalable Alert UI component built following the atomic design pattern with bond-based state management.

## Features

- **Multiple Variants**: Info, Success, Warning, Error
- **Dismissible**: Optional close functionality
- **Accessible**: Full ARIA support and keyboard navigation
- **Customizable**: Flexible styling and content
- **Action Support**: Built-in actions container
- **Animation**: Smooth dismiss transitions
- **Modular**: Composable atomic components

## Architecture

The Alert component follows the established patterns in this library:

- **Bond System**: Centralized state management with `AlertBond` and `AlertBondState`
- **Context**: Shared state between sub-components using Svelte context
- **Atomic Structure**: Modular sub-components that can be composed together
- **Accessibility**: ARIA attributes and semantic HTML
- **TypeScript**: Full type safety with generic props

## Basic Usage

```svelte
<script>
	import { Alert } from '@svelte-atoms/core';
</script>

<Alert.Root variant="info">
	<Alert.Icon />
	<Alert.Content>
		<Alert.Title>Information</Alert.Title>
		<Alert.Description>This is an important message for you.</Alert.Description>
	</Alert.Content>
</Alert.Root>
```

## Dismissible Alert

```svelte
<script>
	import { Alert } from '@svelte-atoms/core';

	let dismissed = $state(false);
</script>

<Alert.Root variant="warning" dismissible bind:dismissed>
	<Alert.Icon />
	<Alert.Content>
		<Alert.Title>Warning</Alert.Title>
		<Alert.Description>Please review your changes before continuing.</Alert.Description>
	</Alert.Content>
	<Alert.CloseButton />
</Alert.Root>
```

## Alert with Actions

```svelte
<script>
	import { Alert, Button } from '@svelte-atoms/core';
</script>

<Alert.Root variant="error" dismissible>
	<Alert.Icon />
	<Alert.Content>
		<Alert.Title>Confirm Deletion</Alert.Title>
		<Alert.Description>This action cannot be undone. Are you sure?</Alert.Description>
		<Alert.Actions>
			<Button variant="outline" size="sm">Cancel</Button>
			<Button variant="destructive" size="sm">Delete</Button>
		</Alert.Actions>
	</Alert.Content>
	<Alert.CloseButton />
</Alert.Root>
```

## Component Structure

### Alert.Root

The main container that provides context and handles state management.

### Alert.Icon

Optional icon display with default icons per variant or custom content.

### Alert.Content

Main content container for title, description, and actions.

### Alert.Title

Semantic heading for the alert message.

### Alert.Description

Descriptive text content of the alert.

### Alert.Actions

Container for action buttons and controls.

### Alert.CloseButton

Dismiss button that automatically handles close functionality.

## Variants

- `info` (default): Blue color scheme for informational messages
- `success`: Green color scheme for success confirmations
- `warning`: Yellow color scheme for warnings and cautions
- `error`: Red color scheme for errors and critical messages

## Accessibility Features

- Proper ARIA roles and attributes
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML structure
- Focus management for dismissible alerts

## Styling

The component uses Tailwind CSS classes with support for dark mode. Each variant has its own color scheme that adapts to the current theme.

## Integration

The Alert component integrates seamlessly with other components in the library and follows the same patterns for consistency and maintainability.
