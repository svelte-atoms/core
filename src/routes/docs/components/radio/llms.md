# Radio Component

The `Radio` component provides radio button inputs for single-selection scenarios.

## Features

- Custom styled radio buttons
- Group management for mutual exclusivity
- Bindable selection state
- Smooth transitions
- Accessible radio inputs

## Props

**Props:**

{{radioRootProps}}

Key props:

- `checked?: boolean` - Bindable checked state
- `value: any` - Radio button value
- `group?: any` - Bindable group value for mutual exclusivity
- `name?: string` - Input name for grouping
- `disabled?: boolean` - Disabled state

## Usage

```svelte
<script>
	import { Radio } from '@svelte-atoms/core';

	let selected = $state('option1');
</script>

<!-- Radio group -->
<Radio bind:group={selected} value="option1">Option 1</Radio>
<Radio bind:group={selected} value="option2">Option 2</Radio>
<Radio bind:group={selected} value="option3">Option 3</Radio>

<p>Selected: {selected}</p>

<!-- With labels -->
<label>
	<Radio bind:group={selected} value="a" />
	Choice A
</label>

<label>
	<Radio bind:group={selected} value="b" />
	Choice B
</label>

<!-- Disabled option -->
<Radio bind:group={selected} value="disabled" disabled>Disabled Option</Radio>
```

## Grouped Radios

Radio buttons with the same `group` binding are mutually exclusive:

```svelte
<script>
	let paymentMethod = $state('card');
</script>

<fieldset>
	<legend>Payment Method</legend>

	<Radio bind:group={paymentMethod} value="card">Credit Card</Radio>

	<Radio bind:group={paymentMethod} value="paypal">PayPal</Radio>

	<Radio bind:group={paymentMethod} value="bank">Bank Transfer</Radio>
</fieldset>
```

## Event Handling

```svelte
<Radio
	bind:group={selected}
	value="option"
	onchange={(e, data) => {
		console.log('Selected:', data.value);
		console.log('Checked:', data.checked);
	}}
>
	Option
</Radio>
```

Event data structure:

```typescript
{
  checked: boolean,
  value: any
}
```

## Customization

Use the preset system:

```typescript
const preset = {
	radio: {
		class: 'custom-radio-styles'
	},
	'radio.indicator': {
		class: 'custom-indicator-styles'
	}
};
```

## Best Practices

1. Always group related radio buttons
2. Provide clear labels for each option
3. Use fieldset and legend for grouped radios
4. Only one radio should be selected at a time
5. Provide a pre-selected default when appropriate
6. Use disabled state sparingly
7. Ensure sufficient click target size

## Accessibility

- Semantic radio input
- Keyboard navigation (Arrow keys, Tab)
- Screen reader support
- Label association via `for` or wrapping
- Fieldset and legend for grouped radios
- ARIA attributes for enhanced semantics

## Form Integration

```svelte
<form>
	<fieldset>
		<legend>Size</legend>

		<label>
			<Radio name="size" value="small" />
			Small
		</label>

		<label>
			<Radio name="size" value="medium" />
			Medium
		</label>

		<label>
			<Radio name="size" value="large" />
			Large
		</label>
	</fieldset>

	<button type="submit">Submit</button>
</form>
```

## Related

- Checkbox Component
- Label Component
- Form Components
- Input Component
