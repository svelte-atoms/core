# Field Module Overview

> **Source**: [`src/lib/components/form`](../../src/lib/components/form)

**File:** [`src/lib/components/form/bond.svelte.ts`](../../src/lib/components/form/bond.svelte.ts)

## Purpose

The `field` module provides a set of classes and types for managing form field state, validation, and DOM element references in a Svelte application. It is designed to be used as part of a larger form bond system, enabling reactive form fields with validation and context sharing.

---

## Key Components

### 1. `FieldProps`

Defines the properties for a field, including:

- `disabled`: Whether the field is disabled.
- `readonly`: Whether the field is read-only.
- `name`: Optional field name.
- `value`: Optional field value.
- `schema`: Optional validation schema.
- `schemaParser`: Function to parse/validate the schema.
- `extend`: Extension object for custom properties.

### 2. `FieldDomElements`

Tracks references to important DOM elements:

- `root`: The root element of the field.
- `label`: The label element.
- `control`: The input/control element.

### 3. `FieldBond`

Extends the base `Bond` class to manage field state and DOM elements. Key features:

- Stores references to root, label, and control elements using Svelte's attachment system.
- Provides methods (`root`, `label`, `control`) to attach DOM nodes.
- Shares itself via Svelte context for child components.
- Static methods for getting/setting context.

### 4. `FieldState`

Extends `BondState` to manage field-specific state, including validation errors.

- Stores errors in a private state.
- Provides a `validate()` method that uses the provided `schemaParser` to validate the field's schema.
- Exposes errors via a getter.

---

## Usage Example

Individual fields are used within a `Form.Root` component. See the [Form component](./form.md) for complete usage examples.

```svelte
<script lang="ts">
	import { Form } from '@svelte-atoms/core';
	import { Input } from '@svelte-atoms/core';
</script>

<Form.Root>
	<Form.Field name="email">
		<Form.Field.Label>Email Address</Form.Field.Label>
		<Form.Field.Control>
			<Input type="email" placeholder="you@example.com" />
		</Form.Field.Control>
		<Form.Field.Errors />
	</Form.Field>
</Form.Root>
```

---

## Context API

- `FieldBond.setContext(atom)`: Shares the atom instance via Svelte context.
- `FieldBond.getContext()`: Retrieves the atom instance from context.

---

## Validation

Validation is performed by calling `validate()` on a `FieldState` instance. Errors are stored and can be accessed via the `errors` getter.

---

## Summary

The `field` module is a foundational building block for form fields in Svelte Atoms, providing state management, validation, and DOM element tracking in a Svelte-friendly
