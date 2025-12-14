# Form Module Overview

**File:** [`src/lib/components/form/bond.svelte.ts`](../../src/lib/components/form/bond.svelte.ts)

## Purpose

The `form` module provides classes and types for managing the state and lifecycle of a form and its fields in a Svelte application. It is designed to coordinate multiple field bonds, handle validation, and share context across components.

---

## Key Components

### 1. `FormProps`

Defines the properties for a form, including:

- `disabled`: Whether the form is disabled.
- `readonly`: Whether the form is read-only.
- `name`: Optional form name.
- `value`: Optional form value.
- `validator`: Optional custom validator.
- `extend`: Extension object for custom properties.

### 2. `FieldDomElements`

Tracks references to form-related DOM elements:

- `trigger`
- `overlay`
- `indicator`
- `arrow`

### 3. `FormBond`

Extends the base `Bond` class to manage form state and DOM elements. Key features:

- Provides methods (`root`, `label`, `control`) for DOM node attachment (currently empty).
- Shares itself via Svelte context for child components.
- Static methods for getting/setting context.

### 4. `FormState`

Extends `BondState` to manage form-specific state and field bonds.

- Maintains a map of field bonds (`#fields`).
- Methods to mount and unmount fields (`mountField`, `unmountField`).
- `validate()` method calls validation on all mounted fields.
- Exposes all field bonds via the `fields` getter.

## Components

### Form.Root

The main form container that manages the overall state.

**Preset Key:** `form`

**Props:**

{{formRootProps}}

### Form.Field

Individual form field container.

**Preset Key:** `form.field`

**Props:**

{{formFieldProps}}

### Form.Field.Label

Label for a form field.

**Preset Key:** `form.field.label`

**Props:**

{{formFieldLabelProps}}

### Form.Field.Control

Container for the form input control.

**Preset Key:** `form.field.control`

**Props:**

{{formFieldControlProps}}

### Form.Field.Errors

Displays validation errors for a field.

**Preset Key:** `form.field.errors`

**Props:**

{{formFieldErrorsProps}}

---

## Usage Example

```svelte
<script lang="ts">
	import { Form } from '@svelte-atoms/core';
	import { Input } from '@svelte-atoms/core';

	let formValue = $state({
		email: '',
		password: ''
	});
</script>

<Form.Root
	bind:value={formValue}
	onsubmit={(e) => {
		e.preventDefault();
		console.log('Form submitted:', formValue);
	}}
>
	<Form.Field name="email">
		<Form.Field.Label>Email</Form.Field.Label>
		<Form.Field.Control>
			<Input type="email" placeholder="Enter your email" />
		</Form.Field.Control>
		<Form.Field.Errors />
	</Form.Field>

	<Form.Field name="password">
		<Form.Field.Label>Password</Form.Field.Label>
		<Form.Field.Control>
			<Input type="password" placeholder="Enter your password" />
		</Form.Field.Control>
		<Form.Field.Errors />
	</Form.Field>

	<button type="submit">Submit</button>
</Form.Root>
```

---

## Context API

- `FormBond.setContext(atom)`: Shares the form atom instance via Svelte context.
- `FormBond.getContext()`: Retrieves the form atom instance from context.

---

## Validation

Validation is performed by calling `validate()` on a `FormState` instance. This triggers validation on all registered field bonds.

---

## Summary

The `form` module is a central piece for managing forms in Svelte Atoms, providing state management, field coordination, validation, and context sharing for
