# Tooltip Component

The `Tooltip` component displays contextual information when hovering or focusing on an element.

## Features

- Hover and focus triggered tooltips
- Multiple placement options
- Automatic positioning
- Delay control
- Arrow indicator
- Bond-based state management

## Components

### `Tooltip.Root`

Root container for the tooltip system.

**Preset Key:** `tooltip`

**Props:**

{{tooltipRootProps}}

Key props:

- `open?: boolean` - Controls tooltip visibility
- `disabled?: boolean` - Disable tooltip
- `delay?: number` - Show delay in ms

### `Tooltip.Trigger`

Element that triggers the tooltip on hover/focus.

**Preset Key:** `tooltip.trigger`

**Props:**

{{tooltipTriggerProps}}

Key props:

- `as?: E` - Element type

### `Tooltip.Content`

The tooltip content container.

**Preset Key:** `tooltip.content`

**Props:**

{{tooltipContentProps}}

Key props:

- `placement?: 'top' | 'bottom' | 'left' | 'right'` - Tooltip position
- `as?: E` - Element type
- Animation hooks (enter, exit, animate)

### `Tooltip.Arrow`

Optional arrow pointer for the tooltip.

**Preset Key:** `tooltip.arrow`

**Props:**

{{tooltipArrowProps}}

## Usage

```svelte
<script>
	import { Tooltip } from '@svelte-atoms/core';
</script>

<!-- Basic tooltip -->
<Tooltip.Root>
	<Tooltip.Trigger>
		<button>Hover me</button>
	</Tooltip.Trigger>

	<Tooltip.Content>This is a tooltip</Tooltip.Content>
</Tooltip.Root>

<!-- With arrow -->
<Tooltip.Root>
	<Tooltip.Trigger>
		<Icon><InfoIcon /></Icon>
	</Tooltip.Trigger>

	<Tooltip.Content placement="top">
		<Tooltip.Arrow />
		Helpful information
	</Tooltip.Content>
</Tooltip.Root>

<!-- With delay -->
<Tooltip.Root delay={500}>
	<Tooltip.Trigger>
		<span>Hover and wait</span>
	</Tooltip.Trigger>

	<Tooltip.Content>Delayed tooltip</Tooltip.Content>
</Tooltip.Root>
```

## Placement Options

```svelte
<!-- Top (default) -->
<Tooltip.Root>
	<Tooltip.Trigger>Top</Tooltip.Trigger>
	<Tooltip.Content placement="top">Tooltip above</Tooltip.Content>
</Tooltip.Root>

<!-- Bottom -->
<Tooltip.Root>
	<Tooltip.Trigger>Bottom</Tooltip.Trigger>
	<Tooltip.Content placement="bottom">Tooltip below</Tooltip.Content>
</Tooltip.Root>

<!-- Left -->
<Tooltip.Root>
	<Tooltip.Trigger>Left</Tooltip.Trigger>
	<Tooltip.Content placement="left">Tooltip to left</Tooltip.Content>
</Tooltip.Root>

<!-- Right -->
<Tooltip.Root>
	<Tooltip.Trigger>Right</Tooltip.Trigger>
	<Tooltip.Content placement="right">Tooltip to right</Tooltip.Content>
</Tooltip.Root>
```

## Controlled Tooltip

```svelte
<script>
	let open = $state(false);
</script>

<Tooltip.Root bind:open>
	<Tooltip.Trigger>
		<button>Controlled</button>
	</Tooltip.Trigger>

	<Tooltip.Content>Programmatically controlled</Tooltip.Content>
</Tooltip.Root>

<button onclick={() => (open = !open)}> Toggle Tooltip </button>
```

## Rich Content

```svelte
<Tooltip.Root>
	<Tooltip.Trigger>
		<Icon><HelpIcon /></Icon>
	</Tooltip.Trigger>

	<Tooltip.Content class="max-w-xs">
		<Stack spacing={2}>
			<strong>Pro Tip</strong>
			<p>You can use keyboard shortcuts to speed up your workflow.</p>
			<code>Ctrl + K</code>
		</Stack>
	</Tooltip.Content>
</Tooltip.Root>
```

## Customization

```typescript
const preset = {
	'tooltip.content': {
		placement: 'top',
		class: 'custom-tooltip-styles'
	},
	'tooltip.arrow': {
		class: 'custom-arrow-styles'
	}
};
```

## Delay Control

```svelte
<!-- Immediate -->
<Tooltip.Root delay={0}>
	<Tooltip.Trigger>No delay</Tooltip.Trigger>
	<Tooltip.Content>Instant tooltip</Tooltip.Content>
</Tooltip.Root>

<!-- Short delay -->
<Tooltip.Root delay={200}>
	<Tooltip.Trigger>Short delay</Tooltip.Trigger>
	<Tooltip.Content>Quick tooltip</Tooltip.Content>
</Tooltip.Root>

<!-- Long delay -->
<Tooltip.Root delay={1000}>
	<Tooltip.Trigger>Long delay</Tooltip.Trigger>
	<Tooltip.Content>Patient tooltip</Tooltip.Content>
</Tooltip.Root>
```

## Best Practices

1. Keep tooltip content concise (1-2 sentences)
2. Use for supplementary information only
3. Don't hide critical information in tooltips
4. Provide appropriate show/hide delays
5. Ensure tooltips don't obscure important content
6. Make tooltips keyboard accessible
7. Use consistent positioning across app
8. Consider mobile devices (no hover)

## Accessibility

- Keyboard trigger (focus/blur)
- ARIA attributes (`aria-describedby`)
- Screen reader compatible
- Focus management
- Escape key to dismiss
- Touch device considerations

## Common Patterns

### Icon Tooltip

```svelte
<Tooltip.Root>
	<Tooltip.Trigger>
		<Icon><InfoIcon /></Icon>
	</Tooltip.Trigger>
	<Tooltip.Content>Additional information</Tooltip.Content>
</Tooltip.Root>
```

### Button Tooltip

```svelte
<Tooltip.Root>
	<Tooltip.Trigger>
		<button aria-label="Save">
			<Icon><SaveIcon /></Icon>
		</button>
	</Tooltip.Trigger>
	<Tooltip.Content>Save changes (Ctrl+S)</Tooltip.Content>
</Tooltip.Root>
```

### Disabled Element Tooltip

```svelte
<Tooltip.Root>
	<Tooltip.Trigger>
		<span>
			<button disabled> Disabled Action </button>
		</span>
	</Tooltip.Trigger>
	<Tooltip.Content>This action is currently unavailable</Tooltip.Content>
</Tooltip.Root>
```

## Mobile Considerations

Tooltips on mobile devices:

- Use tap to show/hide
- Consider using popovers instead
- Provide alternative information display
- Test touch interactions

## Related

- Popover Component
- Dialog Component
- Dropdown Component
- Portal Component
