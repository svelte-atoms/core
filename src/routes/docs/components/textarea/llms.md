# Textarea Component

The `Textarea` component provides a multi-line text input field.

## Features

- Multi-line text input
- Auto-resize support
- Character/word counting
- Preset system integration
- Form integration

## Props

**Props:**

{{textareaRootProps}}

Key props:

- `value?: string` - Bindable textarea value
- `rows?: number` - Number of visible text rows
- `maxlength?: number` - Maximum character length
- `resize?: 'none' | 'vertical' | 'horizontal' | 'both'` - Resize behavior
- `disabled?: boolean` - Disabled state

## Usage

```svelte
<script>
	import { Textarea } from '@svelte-atoms/core';

	let message = $state('');
</script>

<!-- Basic textarea -->
<Textarea bind:value={message} placeholder="Enter your message..." />

<!-- With rows -->
<Textarea bind:value={message} rows={5} placeholder="Type here..." />

<!-- With character limit -->
<Textarea bind:value={message} maxlength={500} />
<p>{message.length} / 500 characters</p>

<!-- Disabled resize -->
<Textarea bind:value={message} resize="none" />

<!-- Readonly -->
<Textarea value="This is readonly" readonly />
```

## Resize Behavior

Control how users can resize the textarea:

```svelte
<!-- No resize -->
<Textarea resize="none" />

<!-- Vertical only -->
<Textarea resize="vertical" />

<!-- Horizontal only -->
<Textarea resize="horizontal" />

<!-- Both directions -->
<Textarea resize="both" />
```

## Character Counting

```svelte
<script>
	let text = $state('');
	const maxChars = 280;
</script>

<Textarea bind:value={text} maxlength={maxChars} />

<div class="text-sm text-gray-500">
	{text.length} / {maxChars} characters
	{#if text.length >= maxChars}
		<span class="text-red-500">Limit reached</span>
	{/if}
</div>
```

## Auto-Growing Textarea

```svelte
<script>
	let text = $state('');

	function autoGrow(element: HTMLTextAreaElement) {
		element.style.height = 'auto';
		element.style.height = element.scrollHeight + 'px';
	}
</script>

<Textarea bind:value={text} oninput={(e) => autoGrow(e.target)} class="min-h-[100px]" />
```

## Form Integration

```svelte
<form>
	<label for="feedback">Feedback</label>
	<Textarea id="feedback" name="feedback" rows={4} required placeholder="Share your thoughts..." />

	<button type="submit">Submit</button>
</form>
```

## Customization

```typescript
const preset = {
	textarea: {
		as: 'textarea',
		rows: 3,
		resize: 'vertical',
		class: 'custom-textarea-styles'
	}
};
```

## Common Patterns

### Comment Box

```svelte
<Stack spacing={2}>
	<Label for="comment">Comment</Label>
	<Textarea id="comment" bind:value={comment} rows={4} placeholder="Write a comment..." />
	<Button onclick={submitComment}>Post Comment</Button>
</Stack>
```

### Feedback Form

```svelte
<Stack spacing={4}>
	<Textarea
		bind:value={feedback}
		rows={6}
		maxlength={1000}
		placeholder="Tell us what you think..."
	/>

	<div class="flex justify-between">
		<span>{feedback.length}/1000</span>
		<Button>Send Feedback</Button>
	</div>
</Stack>
```

## Best Practices

1. Provide appropriate default rows (3-5 typically)
2. Set reasonable maxlength for long-form content
3. Always include labels for accessibility
4. Show character count for limited inputs
5. Consider auto-growing for dynamic content
6. Use placeholder text effectively
7. Provide clear visual feedback for states

## Accessibility

- Semantic textarea element
- Label association via `for` attribute
- Keyboard navigation support
- Screen reader compatible
- ARIA attributes when needed
- Error message association

## Styling States

```svelte
<!-- Normal -->
<Textarea placeholder="Normal state" />

<!-- Focus -->
<Textarea class="focus:ring-2 focus:ring-blue-500" />

<!-- Error -->
<Textarea class="border-red-500" aria-invalid="true" />

<!-- Disabled -->
<Textarea disabled />
```

## Related

- Input Component
- Label Component
- Form Components
- Button Component
