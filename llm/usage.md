# Component Usage Patterns

## Namespace.Atom Pattern

Components follow a hierarchical naming pattern using dot notation:

```svelte
<Form.Root>
	<Form.Field>
		<Form.Label />
		<Form.Control />
	</Form.Field>
</Form.Root>
```

## Naming Convention

- **Namespace** = Component family (e.g., `Form`, `Button`, `Dropdown`)
- **Atom** = Specific component within the family (e.g., `Root`, `Field`, `Label`)

## Import Pattern

```javascript
import { Form } from '$lib/components/form';

// Usage
<Form.Root>
	<Form.Field>
		<Form.Label>Username</Form.Label>
		<Form.Control type="text" />
	</Form.Field>
</Form.Root>;
```

## Benefits

- **Clear hierarchy** - Components group logically
- **Namespace isolation** - Prevents naming conflicts
- **Discoverable API** - IDE autocomplete shows related components
- **Consistent patterns** - Same structure across all component families

## Examples

- `Button.Root`, `Button.Icon`, `Button.Text`
- `Dropdown.Root`, `Dropdown.Trigger`, `Dropdown.Content`
- `Form.Root`, `Form.Field`, `Form.Label`, `Form.Control`
