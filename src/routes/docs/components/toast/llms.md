# Toast Component

The `Toast` component provides temporary notification messages that appear on screen.

## Features

- Temporary notification display
- Multiple position options
- Auto-dismiss functionality
- Action button support
- Stacking multiple toasts
- Animation transitions
- Different toast types (success, error, warning, info)

## Components

### `Toast.Root`

Root container for the toast system.

**Preset Key:** `toast`

**Props:**

{{toastRootProps}}

Key props:

- `open?: boolean` - Controls toast visibility
- `duration?: number` - Auto-dismiss duration in ms
- `position?: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left'`
- `type?: 'default' | 'success' | 'error' | 'warning' | 'info'`

### `Toast.Container`

Container for managing multiple toasts.

**Preset Key:** `toast.container`

**Props:**

{{toastContainerProps}}

Key props:

- `position?: string` - Toast container position
- `maxToasts?: number` - Maximum visible toasts

### `Toast.Action`

Action button within a toast.

**Preset Key:** `toast.action`

**Props:**

{{toastActionProps}}

Key props:

- `onclick?: () => void` - Action handler
- `children?: Snippet` - Button content

## Usage

```svelte
<script>
	import { Toast } from '@svelte-atoms/core';

	let showToast = $state(false);
</script>

<!-- Basic toast -->
<Toast.Root bind:open={showToast}>This is a notification</Toast.Root>

<button onclick={() => (showToast = true)}> Show Toast </button>

<!-- With duration -->
<Toast.Root bind:open={showToast} duration={5000}>This will disappear after 5 seconds</Toast.Root>

<!-- Different types -->
<Toast.Root type="success">✓ Operation successful!</Toast.Root>

<Toast.Root type="error">✗ An error occurred</Toast.Root>

<Toast.Root type="warning">⚠ Warning message</Toast.Root>

<Toast.Root type="info">ℹ Information message</Toast.Root>
```

## Positioning

```svelte
<!-- Top center -->
<Toast.Root position="top">Top notification</Toast.Root>

<!-- Top right -->
<Toast.Root position="top-right">Top right notification</Toast.Root>

<!-- Bottom center -->
<Toast.Root position="bottom">Bottom notification</Toast.Root>

<!-- Bottom left -->
<Toast.Root position="bottom-left">Bottom left notification</Toast.Root>
```

## With Actions

```svelte
<Toast.Root>
	Message sent successfully

	<Toast.Action onclick={() => console.log('Undo')}>Undo</Toast.Action>
</Toast.Root>
```

## Toast Container

For managing multiple toasts:

```svelte
<script>
	import { Toast } from '@svelte-atoms/core';

	let toasts = $state([]);

	function addToast(message, type) {
		toasts = [...toasts, { id: Date.now(), message, type }];
	}

	function removeToast(id) {
		toasts = toasts.filter((t) => t.id !== id);
	}
</script>

<Toast.Container position="top-right" maxToasts={3}>
	{#each toasts as toast (toast.id)}
		<Toast.Root type={toast.type} ondismiss={() => removeToast(toast.id)}>
			{toast.message}
		</Toast.Root>
	{/each}
</Toast.Container>

<button onclick={() => addToast('Success!', 'success')}> Show Success Toast </button>
```

## Auto-Dismiss

```svelte
<!-- Auto-dismiss after 3 seconds (default) -->
<Toast.Root>Auto-dismissing message</Toast.Root>

<!-- Custom duration -->
<Toast.Root duration={10000}>Displays for 10 seconds</Toast.Root>

<!-- No auto-dismiss -->
<Toast.Root duration={0}>Stays until manually closed</Toast.Root>
```

## Customization

```typescript
const preset = {
	'toast.root': {
		position: 'top-right',
		duration: 3000,
		class: 'custom-toast-styles'
	},
	'toast.success': {
		class: 'bg-green-500 text-white'
	},
	'toast.error': {
		class: 'bg-red-500 text-white'
	}
};
```

## Toast Types

### Success

```svelte
<Toast.Root type="success">✓ Changes saved successfully</Toast.Root>
```

### Error

```svelte
<Toast.Root type="error">✗ Failed to save changes</Toast.Root>
```

### Warning

```svelte
<Toast.Root type="warning">⚠ Your session will expire soon</Toast.Root>
```

### Info

```svelte
<Toast.Root type="info">ℹ New updates available</Toast.Root>
```

## Best Practices

1. Keep toast messages concise (1-2 lines)
2. Use appropriate duration based on content length
3. Limit number of simultaneous toasts
4. Use consistent positioning across app
5. Provide clear dismiss options
6. Use appropriate toast types for context
7. Include actions only when necessary
8. Consider accessibility (screen readers)

## Accessibility

- ARIA live regions for announcements
- Keyboard dismissal (Escape key)
- Focus management for actions
- Screen reader announcements
- Sufficient contrast for readability
- Clear close buttons

## Animation

Toasts support smooth animations:

- Slide in from edge
- Fade in/out
- Stack animation
- Exit animations

## Common Patterns

### Success Notification

```svelte
<Toast.Root type="success" duration={3000}>
	<Icon><CheckIcon /></Icon>
	Profile updated successfully!
</Toast.Root>
```

### Error with Action

```svelte
<Toast.Root type="error" duration={0}>
	Failed to send message

	<Toast.Action onclick={retryAction}>Retry</Toast.Action>
</Toast.Root>
```

### Progress Notification

```svelte
<Toast.Root duration={0}>
	<Stack spacing={2}>
		<p>Uploading file...</p>
		<progress value={progress} max={100} />
	</Stack>
</Toast.Root>
```

## Related

- Dialog Component
- Alert Component
- Layer Component
- Portal Component
