---
id: composition
title: Component Composition
category: architecture
depth: detailed
prerequisites:
  - philosophy
  - crafting
related:
  - motion
  - variants
---

# Component Composition in @svelte-atoms/core

## Overview

@svelte-atoms/core components are designed to be **composable** — you can combine them to extend both behavior and UI, creating powerful component combinations. This is achieved through three main patterns:

1. **Base Prop Composition** - Replace a component's root element with another component
2. **Bond Pattern** - Access and share component state across nested components
3. **Nested Children** - Compose components as siblings/parents for complex UIs

## 1. Base Prop Composition

The `base=` prop allows you to replace a component's root element with another component, **inheriting all the base component's behavior** while adding new functionality.

### Basic Pattern

```svelte
<Tooltip.Trigger base={Button}>Open Tooltip</Tooltip.Trigger>
```

The `Tooltip.Trigger` now **behaves as both** a Tooltip trigger AND a Button:

- Gets Button's styling, hover states, click handling
- Gets Tooltip.Trigger's `aria-*` attributes, open/close logic, positioning

### Form Field Composition

The most powerful example is `Field.Control`, which adapts to any input component:

```svelte
<!-- Text Input -->
<Field.Control base={Input.Value} placeholder="Enter name" />

<!-- Checkbox -->
<Field.Control base={Checkbox} />

<!-- Radio Group -->
<Field.Control base={RadioGroup}>
	<Radio value="yes" />
	<Radio value="no" />
</Field.Control>
```

`Field.Control` automatically:

- Connects the base component to form validation
- Syncs the input value with field state
- Handles validation on blur/change
- Links labels via `aria-labelledby`

### DataGrid Cell Composition

Compose table cells with interactive components:

```svelte
<DataGrid.Td base={Dropdown.Root} placement="bottom-end">
	<Dropdown.Trigger>
		<Icon src={MoreVerticalIcon} />
	</Dropdown.Trigger>
	<Dropdown.List>
		<Dropdown.Item value="edit">Edit</Dropdown.Item>
		<Dropdown.Item value="delete">Delete</Dropdown.Item>
	</Dropdown.List>
</DataGrid.Td>
```

The `DataGrid.Td` now:

- Maintains table cell semantics and styling
- Adds Dropdown positioning, open/close state
- Handles keyboard navigation and focus management

### Menu & Dropdown Triggers

```svelte
<Menu.Root>
	<Menu.Trigger base={Button}>Select Language</Menu.Trigger>
	<Menu.List>
		<Menu.Item>English</Menu.Item>
		<Menu.Item>Spanish</Menu.Item>
	</Menu.List>
</Menu.Root>
```

`Menu.Trigger` with `base={Button}`:

- Button appearance and interaction
- Menu trigger accessibility (`aria-haspopup`, `aria-expanded`)
- Menu open/close toggle on click

### How Base Prop Works

When you write:

```svelte
<Component base={BaseComponent} {...props}>
	{children}
</Component>
```

Internally, the component renders:

```svelte
<BaseComponent {...props} {...componentSpecificProps}>
	{children}
</BaseComponent>
```

All props are forwarded, and the component adds its own behavior (event handlers, ARIA attributes, state bindings) to the base component.

## 2. Bond Pattern (State Sharing)

Components expose their internal state via a **bond** object through the `{#snippet children({ bond })}` pattern. This allows parent components to access and control child component state.

### Accessing Component State

```svelte
<Popover.Root>
	{#snippet children({ popover })}
		<Popover.Trigger base={Button}>
			<div>Open Popover</div>
			<!-- Access popover state to show indicator -->
			<Popover.Indicator />
		</Popover.Trigger>

		<Popover.Content>
			<!-- Can access popover.state.isOpen, popover.state.close(), etc. -->
		</Popover.Content>
	{/snippet}
</Popover.Root>
```

The `popover` bond provides:

- `popover.state.isOpen` - Current open state
- `popover.state.close()` - Close the popover programmatically
- `popover.state.toggle()` - Toggle open/close state

### Field Validation Access

```svelte
<Field.Root name="firstName" schema={nameSchema}>
	{#snippet children({ field })}
		<Field.Label>First Name</Field.Label>

		<Input.Root>
			<Field.Control
				base={Input.Value}
				onblur={() => {
					const results = field?.state.validate();
					console.log(results);
				}}
			/>
		</Input.Root>

		<!-- Access validation errors -->
		{#if field?.state?.errors?.length > 0}
			<div class="text-xs text-red-600">
				{#each field.state.errors as error}
					<div>{error.message}</div>
				{/each}
			</div>
		{/if}
	{/snippet}
</Field.Root>
```

The `field` bond provides:

- `field.state.validate()` - Trigger validation manually
- `field.state.errors` - Array of validation errors
- `field.state.value` - Current field value

### Collapsible State Control

```svelte
<Collapsible.Root>
	{#snippet children({ collapsible })}
		<Collapsible.Trigger base={Button}>Toggle Content</Collapsible.Trigger>

		<Collapsible.Content>
			<div>Collapsible content here</div>

			<!-- Nested button that can control parent collapsible -->
			<Button onclick={() => collapsible.state.close()}>Close from inside</Button>
		</Collapsible.Content>
	{/snippet}
</Collapsible.Root>
```

### Dropdown State Inspection

```svelte
<Dropdown.Root>
	{#snippet children({ dropdown })}
		<Dropdown.Trigger base={Button}>Select Option</Dropdown.Trigger>

		<Dropdown.List>
			<Dropdown.Item value="option1">Option 1</Dropdown.Item>
			<Dropdown.Item value="option2">Option 2</Dropdown.Item>
		</Dropdown.List>

		<!-- Display selected value outside dropdown -->
		<div>Selected: {dropdown.state.value || 'None'}</div>
	{/snippet}
</Dropdown.Root>
```

### How Bond Pattern Works

Components create a **Bond** instance that holds state and methods:

```typescript
// Inside component implementation
const bond = new PopoverBond();
bond.state.isOpen = $state(false);
bond.state.close = () => {
	bond.state.isOpen = false;
};
```

The bond is passed to children via snippet props, allowing descendants to access and modify component state.

## 3. Nested Component Composition

Components can be nested as siblings or parent-child to create complex interactions.

### Dialog with Nested Dropdown

```svelte
<Dialog.Root>
	{#snippet children({ dialog })}
		<Dialog.Trigger base={Button}>Open Dialog</Dialog.Trigger>

		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Select an option</Dialog.Title>
			</Dialog.Header>

			<!-- Dropdown inside Dialog -->
			<Dropdown.Root>
				{#snippet children({ dropdown })}
					<Dropdown.Trigger base={Button}>Choose Language</Dropdown.Trigger>
					<Dropdown.List>
						<Dropdown.Item value="en">English</Dropdown.Item>
						<Dropdown.Item value="es">Spanish</Dropdown.Item>
					</Dropdown.List>
				{/snippet}
			</Dropdown.Root>

			<Dialog.Footer>
				<Button onclick={() => dialog.state.close()}>Close</Button>
			</Dialog.Footer>
		</Dialog.Content>
	{/snippet}
</Dialog.Root>
```

Each component manages its own state independently, but both bonds are accessible for coordination.

### Scrollable with Nested Content

```svelte
<Scrollable.Root>
	{#snippet children({ scrollable })}
		<Scrollable.Content>
			<!-- Access scroll position -->
			<div>Scroll Y: {scrollable.state.scrollTop}</div>

			<!-- Nested interactive components -->
			<Accordion.Root>
				<Accordion.Item value="item1">
					<Accordion.Trigger>Section 1</Accordion.Trigger>
					<Accordion.Content>Content 1</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</Scrollable.Content>
	{/snippet}
</Scrollable.Root>
```

### Combobox with Custom Trigger

```svelte
<Combobox.Root>
	{#snippet children({ combobox })}
		<Combobox.Trigger base={Input.Root}>
			<Input.Value placeholder="Search..." />
			<Input.Icon src={SearchIcon} />
		</Combobox.Trigger>

		<Combobox.List>
			<Combobox.Item value="option1">Option 1</Combobox.Item>
			<Combobox.Item value="option2">Option 2</Combobox.Item>
		</Combobox.List>
	{/snippet}
</Combobox.Root>
```

The `Input.Root` is composed into the trigger, bringing input styling and icon support to the combobox.

## Key Principles

1. **Base Prop = Behavior Inheritance**: Use `base=` to layer component behaviors (Button + Menu.Trigger = clickable menu opener)

2. **Bond = State Access**: Use `{#snippet children({ bond })}` to access component state and methods for coordination

3. **Nesting = UI Composition**: Nest components as needed; each maintains independent state while bonds allow communication

4. **Forward Everything**: Components forward all props and classes to their base, enabling full customization

5. **Type Safety**: TypeScript infers correct props when using `base=`, providing autocompletion for both the component and the base

## Common Patterns

### Interactive Table Cell

```svelte
<DataGrid.Td base={Dropdown.Root}>
	<Dropdown.Trigger base={Button} variant="ghost" size="sm">Actions</Dropdown.Trigger>
	<Dropdown.List>
		<Dropdown.Item>Edit</Dropdown.Item>
		<Dropdown.Item>Delete</Dropdown.Item>
	</Dropdown.List>
</DataGrid.Td>
```

**Combines**: Table cell + Dropdown + Button

### Validated Form Field

```svelte
<Field.Root name="email" schema={emailSchema}>
	{#snippet children({ field })}
		<Field.Label>Email</Field.Label>
		<Field.Control
			base={Input.Value}
			type="email"
			placeholder="you@example.com"
			onblur={() => field?.state.validate()}
		/>
		{#if field?.state?.errors}
			<Field.Error />
		{/if}
	{/snippet}
</Field.Root>
```

**Combines**: Form validation + Input + Label + Error display

### Tooltip Button

```svelte
<Tooltip.Root>
	<Tooltip.Trigger base={Button} variant="outline">Delete</Tooltip.Trigger>
	<Tooltip.Content>This action cannot be undone</Tooltip.Content>
</Tooltip.Root>
```

**Combines**: Tooltip positioning + Button interaction

### Controlled Popover with Custom Content

```svelte
<Popover.Root bind:open>
	{#snippet children({ popover })}
		<Popover.Trigger base={Button}>
			Open {popover.state.isOpen ? '(Open)' : '(Closed)'}
		</Popover.Trigger>

		<Popover.Content class="w-80">
			<Card>
				<Card.Header>
					<Card.Title>Settings</Card.Title>
				</Card.Header>
				<Card.Content>
					<!-- Form fields here -->
				</Card.Content>
				<Card.Footer>
					<Button onclick={() => popover.state.close()}>Close</Button>
				</Card.Footer>
			</Card>
		</Popover.Content>
	{/snippet}
</Popover.Root>
```

**Combines**: Popover positioning + Button trigger + Card layout + Form

## Summary

- **`base=` prop**: Inherit behavior from another component (Trigger + Button = clickable trigger)
- **`{#snippet children({ bond })}`**: Access component state for coordination
- **Nesting**: Compose complex UIs by nesting components as needed
- **Composition > Configuration**: Combine simple components instead of creating complex ones with many props
