# Crafting Components from Scratch in @svelte-atoms/core

## Overview

Components in @svelte-atoms/core follow a **Bond-based architecture** where state, DOM element references, and component methods are centralized in Bond/BondState classes. This guide shows how to build components from scratch using the Bond pattern.

## Component Architecture

Every component consists of three layers:

1. **Bond Layer** (`bond.svelte.ts`) - State management and DOM coordination
2. **Root Component** (`component-root.svelte`) - Parent container that creates and shares the bond
3. **Child Components** (`component-title.svelte`, etc.) - Access shared bond via context

## Core Building Blocks

### 1. Base Classes

```typescript
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

// BondStateProps: Base props type with optional id
export type BondStateProps = Record<string, unknown> & { id?: string };

// BondState: Manages component props and generates unique IDs
export abstract class BondState<S extends BondStateProps = BondStateProps> {
	constructor(props: () => S, id?: string);
	get id(): string;
	get props(): S;
}

// Bond: Manages component state, DOM elements, and context sharing
export abstract class Bond<
	Props extends BondStateProps = BondStateProps,
	State extends BondState<Props> = BondState<Props>,
	Elements extends BondElements = BondElements
> {
	constructor(state: State);
	get state(): State;
	get elements(): Elements;
	abstract share(): this;
	static get(): unknown | undefined;
	static set(bond: unknown): unknown;
}
```

### 2. Utility Functions

```typescript
import { defineState, defineProperty } from '$svelte-atoms/core/utils';

// defineState: Create reactive props object
const bondProps = defineState<MyBondProps>(
  [
    defineProperty('open', () => open, (v) => { open = v; }),
    defineProperty('disabled', () => disabled)
  ],
  () => ({ extend: {} })
);

// defineProperty: Create reactive property with getter/setter
defineProperty<T, R>(
  property: keyof T,
  get: () => R,
  set?: (value: R) => void
)
```

## Step-by-Step: Building a Component

### Step 1: Define Bond Types and Classes

Create `my-component/bond.svelte.ts`:

```typescript
import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { getElementId } from '$svelte-atoms/core/utils/dom.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

// 1. Define Props Type
export type MyComponentBondProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
	variant?: 'default' | 'primary' | 'danger';
	extend?: Record<string, unknown>;
};

// 2. Define Elements Type (all DOM elements your component manages)
export type MyComponentBondElements = {
	root: HTMLElement;
	header: HTMLElement;
	title: HTMLElement;
	content: HTMLElement;
	footer: HTMLElement;
};

// 3. Define Element Kinds (for data-kind attributes and ID generation)
const MY_COMPONENT_ELEMENTS_KIND = {
	root: 'my-component-root',
	header: 'my-component-header',
	title: 'my-component-title',
	content: 'my-component-content',
	footer: 'my-component-footer'
};

// 4. Create BondState Class
export class MyComponentBondState<
	Props extends MyComponentBondProps = MyComponentBondProps
> extends BondState<Props> {
	constructor(props: () => Props) {
		super(props);
	}

	// Add component-specific methods
	open() {
		this.props.open = true;
	}

	close() {
		this.props.open = false;
	}

	toggle() {
		this.props.open = !this.props.open;
	}
}

// 5. Create Bond Class
export class MyComponentBond<
	Props extends MyComponentBondProps = MyComponentBondProps,
	State extends MyComponentBondState<Props> = MyComponentBondState<Props>
> extends Bond<Props, State, MyComponentBondElements> {
	static CONTEXT_KEY = '@atoms/context/my-component';

	constructor(state: State) {
		super(state);
	}

	// 6. Create element prop generators (return props + attachment for each element)
	root(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, MY_COMPONENT_ELEMENTS_KIND.root);
		const titleId = getElementId(this.id, MY_COMPONENT_ELEMENTS_KIND.title);

		const isOpen = this.state.props.open ?? false;
		const isDisabled = this.state.props.disabled ?? false;

		return {
			id,
			role: 'dialog',
			'aria-labelledby': titleId,
			'aria-expanded': isOpen,
			'aria-disabled': isDisabled,
			'data-kind': MY_COMPONENT_ELEMENTS_KIND.root,
			'data-variant': this.state.props.variant,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	header(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, MY_COMPONENT_ELEMENTS_KIND.header);
		return {
			id,
			'data-kind': MY_COMPONENT_ELEMENTS_KIND.header,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	title(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, MY_COMPONENT_ELEMENTS_KIND.title);
		return {
			id,
			'data-kind': MY_COMPONENT_ELEMENTS_KIND.title,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.title = node;
			}
		};
	}

	content(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, MY_COMPONENT_ELEMENTS_KIND.content);
		return {
			id,
			role: 'region',
			'data-kind': MY_COMPONENT_ELEMENTS_KIND.content,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.content = node;
			}
		};
	}

	footer(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, MY_COMPONENT_ELEMENTS_KIND.footer);
		return {
			id,
			'data-kind': MY_COMPONENT_ELEMENTS_KIND.footer,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.footer = node;
			}
		};
	}

	// 7. Implement share() to set bond in context
	share(): this {
		return MyComponentBond.set(this) as this;
	}

	// 8. Implement static get/set for context management
	static get(): MyComponentBond | undefined {
		return getContext(MyComponentBond.CONTEXT_KEY);
	}

	static set(bond: MyComponentBond): MyComponentBond {
		return setContext(MyComponentBond.CONTEXT_KEY, bond);
	}
}
```

### Step 2: Create Root Component

Create `my-component/my-component-root.svelte`:

```svelte
<script module lang="ts">
	import type { Factory } from '$svelte-atoms/core/types';

	export type MyComponentRootProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ myComponent: MyComponentBond }]>;
		}
	> & {
		open?: boolean;
		disabled?: boolean;
		variant?: 'default' | 'primary' | 'danger';
		onclose?: (event: Event, bond: MyComponentBond) => void;
		factory?: Factory<MyComponentBond>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import type { Override } from '$svelte-atoms/core/types';
	import { MyComponentBond, MyComponentBondState, type MyComponentBondProps } from './bond.svelte';

	// 1. Define props with defaults and $bindable for two-way binding
	let {
		open = $bindable(false),
		disabled = false,
		variant = 'default',
		children = undefined,
		class: klass = '',
		onclose = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		factory = _factory,
		...restProps
	}: MyComponentRootProps<E, B> = $props();

	// 2. Create reactive bond props using defineState and defineProperty
	const bondProps = defineState<MyComponentBondProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					open = v;
				}
			),
			defineProperty('disabled', () => disabled),
			defineProperty('variant', () => variant)
		],
		() => ({})
	);

	// 3. Create and share bond
	const bond = factory(bondProps).share();

	// 4. Merge bond props with user props
	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	// 5. Factory function to create bond
	function _factory(props: typeof bondProps) {
		const state = new MyComponentBondState(() => props);
		return new MyComponentBond(state);
	}

	// 6. Optional: Export function to access bond from parent
	export function getBond() {
		return bond;
	}

	// 7. Optional: Handle side effects
	$effect(() => {
		if (open && !disabled) {
			// Do something when opened
			console.log('Component opened');
		}
	});
</script>

<HtmlAtom
	preset="my-component"
	class={[
		'my-component bg-card border-border rounded-lg border shadow-sm',
		disabled && 'cursor-not-allowed opacity-50',
		'$preset',
		klass
	]}
	{bond}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.({ myComponent: bond })}
</HtmlAtom>
```

### Step 3: Create Child Components

Create `my-component/my-component-title.svelte`:

```svelte
<script module lang="ts">
	export type MyComponentTitleProps<
		E extends keyof HTMLElementTagNameMap = 'h3',
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'h3', B extends Base = Base">
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { MyComponentBond } from './bond.svelte';

	// 1. Get bond from context (shared by root component)
	const bond = MyComponentBond.get();

	// 2. Define props
	let {
		class: klass = '',
		as = 'h3' as E,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: MyComponentTitleProps<E, B> = $props();

	// 3. Merge bond props with user props
	const titleProps = $derived({
		...bond?.title(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="my-component.title"
	class={['my-component-title text-lg font-semibold', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...titleProps}
>
	{@render children?.()}
</HtmlAtom>
```

Create `my-component/my-component-content.svelte`:

```svelte
<script module lang="ts">
	export type MyComponentContentProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ myComponent?: MyComponentBond }]>;
		}
	>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import type { Override } from '$svelte-atoms/core/types';
	import { MyComponentBond } from './bond.svelte';

	const bond = MyComponentBond.get();

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: MyComponentContentProps<E, B> = $props();

	const contentProps = $derived({
		...bond?.content(),
		...restProps
	});
</script>

<HtmlAtom
	preset="my-component.content"
	class={['my-component-content p-4', '$preset', klass]}
	{bond}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...contentProps}
>
	{@render children?.({ myComponent: bond })}
</HtmlAtom>
```

### Step 4: Create Index Exports

Create `my-component/atoms.ts`:

```typescript
export { default as Root } from './my-component-root.svelte';
export { default as Header } from './my-component-header.svelte';
export { default as Title } from './my-component-title.svelte';
export { default as Content } from './my-component-content.svelte';
export { default as Footer } from './my-component-footer.svelte';
```

Create `my-component/index.ts`:

```typescript
export * as MyComponent from './atoms';
export {
	MyComponentBond,
	MyComponentBondState,
	type MyComponentBondProps,
	type MyComponentBondElements
} from './bond.svelte';
```

### Step 5: Usage

```svelte
<script>
	import { MyComponent } from '@svelte-atoms/core/components/my-component';
	import { Button } from '@svelte-atoms/core/components/button';

	let open = $state(false);
</script>

<MyComponent.Root bind:open>
	{#snippet children({ myComponent })}
		<MyComponent.Header>
			<MyComponent.Title>My Component Title</MyComponent.Title>
		</MyComponent.Header>

		<MyComponent.Content>
			<p>This is the content</p>

			<!-- Access bond state -->
			<p>Is open: {myComponent.state.isOpen}</p>

			<!-- Control from inside -->
			<Button onclick={() => myComponent.state.close()}>Close from inside</Button>
		</MyComponent.Content>

		<MyComponent.Footer>
			<Button>Action</Button>
		</MyComponent.Footer>
	{/snippet}
</MyComponent.Root>
```

## Key Patterns

### 1. Reactive Props with defineState

Use `defineState` and `defineProperty` to create reactive props that sync with component props:

```typescript
const bondProps = defineState<MyBondProps>(
	[
		// Two-way binding: changes in component prop update bond, vice versa
		defineProperty(
			'open',
			() => open,
			(v) => {
				open = v;
			}
		),

		// Read-only: only reads from component prop
		defineProperty('disabled', () => disabled),

		// Computed: derived from other values
		defineProperty('isActive', () => open && !disabled)
	],
	() => ({ extend: {} }) // Base props
);
```

### 2. Element Prop Generators

Each Bond method returns props object with:

- **Unique ID**: `getElementId(this.id, kind)`
- **ARIA attributes**: Accessibility attributes based on state
- **Data attributes**: `data-kind`, `data-variant`, etc.
- **Attachment key**: Captures DOM element reference

```typescript
content(props: Record<string, unknown> = {}) {
  const id = getElementId(this.id, ELEMENT_KIND.content);
  const isOpen = this.state.props.open ?? false;

  return {
    id,
    role: 'region',
    'aria-expanded': isOpen,
    'data-kind': ELEMENT_KIND.content,
    ...props, // Merge user props
    [createAttachmentKey()]: (node: HTMLElement) => {
      this.elements.content = node; // Capture element
    }
  };
}
```

### 3. Context Sharing

Bond is shared via Svelte context:

```typescript
// Root component: Create and share
const bond = factory(bondProps).share();

// Bond.share() implementation
share(): this {
  return MyComponentBond.set(this) as this;
}

static set(bond: MyComponentBond): MyComponentBond {
  return setContext(MyComponentBond.CONTEXT_KEY, bond);
}

// Child components: Access from context
const bond = MyComponentBond.get();

static get(): MyComponentBond | undefined {
  return getContext(MyComponentBond.CONTEXT_KEY);
}
```

### 4. State Methods

Add component-specific methods to BondState:

```typescript
export class MyComponentBondState extends BondState<MyComponentBondProps> {
	open() {
		this.props.open = true;
	}

	close() {
		this.props.open = false;
	}

	toggle() {
		this.props.open = !this.props.open;
	}

	// Complex state logic
	validateAndClose() {
		if (this.isValid()) {
			this.close();
		}
	}

	isValid() {
		return this.props.value !== undefined;
	}
}
```

### 5. Binding Lifecycle Hooks

Bind animation/lifecycle hooks to bond.state to pass state to callbacks:

```svelte
<HtmlAtom
  {bond}
  enter={enter?.bind(bond.state)}
  exit={exit?.bind(bond.state)}
  initial={initial?.bind(bond.state)}
  animate={animate?.bind(bond.state)}
  onmount={onmount?.bind(bond.state)}
  ondestroy={ondestroy?.bind(bond.state)}
  {...props}
>
```

This allows hooks to receive bond state as `this`:

```svelte
<MyComponent.Root
  enter={function(node) {
    // `this` is MyComponentBondState
    console.log('Opening:', this.props.open);
    return animate(node, { opacity: [0, 1] });
  }}
>
```

### 6. Factory Pattern

Allow custom bond creation via factory prop:

```typescript
type MyComponentRootProps = {
  factory?: Factory<MyComponentBond>;
};

function _factory(props: typeof bondProps) {
  const state = new MyComponentBondState(() => props);
  return new MyComponentBond(state);
}

// User can extend
<MyComponent.Root
  factory={(props) => {
    const state = new CustomBondState(() => props);
    return new CustomBond(state);
  }}
>
```

### 7. Attachment Key Pattern

Use `createAttachmentKey()` to capture DOM elements in bond:

```typescript
[createAttachmentKey()]: (node: HTMLElement) => {
  this.elements.content = node;

  // Optional: Do setup
  node.addEventListener('scroll', handleScroll);

  // Optional: Return cleanup
  return () => {
    node.removeEventListener('scroll', handleScroll);
  };
}
```

## Advanced Patterns

### Extending Existing Bonds

Create component that extends another:

```typescript
// Dropdown extends Popover
export class DropdownBond<
	Props extends DropdownBondProps = DropdownBondProps,
	State extends DropdownBondState<Props> = DropdownBondState<Props>,
	Elements extends DropdownBondElements = DropdownBondElements
> extends PopoverBond<Props, State, Elements> {
	// Add dropdown-specific functionality
	selectItem(value: string) {
		this.state.props.value = value;
		this.state.close();
	}
}

export class DropdownBondState<
	Props extends DropdownBondProps = DropdownBondProps
> extends PopoverState<Props> {
	// Inherit open/close/toggle from PopoverState
	// Add dropdown-specific state
}
```

### Multiple Element References

Track multiple instances of same element type:

```typescript
export type ListBondElements = {
	root: HTMLElement;
	items: HTMLElement[]; // Array of items
};

export class ListBond extends Bond<ListBondProps, ListBondState, ListBondElements> {
	constructor(state: ListBondState) {
		super(state);
		this.elements.items = []; // Initialize array
	}

	item(index: number, props: Record<string, unknown> = {}) {
		return {
			id: getElementId(this.id, `item-${index}`),
			'data-index': index,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.items[index] = node;
			}
		};
	}
}
```

### Validation Integration

Add validation to component state:

```typescript
export class FieldBondState extends BondState<FieldBondProps> {
	#errors = $state<ValidationError[]>([]);

	get errors() {
		return this.#errors;
	}

	validate(): ValidationResult {
		const { schema, validator, value } = this.props;

		if (!schema || !validator) {
			return { success: true, errors: [] };
		}

		const result = validator.validate(schema, value);
		this.#errors = result.errors;

		this.props.onvalidation?.(result.errors);

		return result;
	}

	async validateAsync(): Promise<ValidationResult> {
		const { schema, validator, value } = this.props;

		if (!schema || !validator?.validateAsync) {
			return this.validate();
		}

		const result = await validator.validateAsync(schema, value);
		this.#errors = result.errors;

		this.props.onvalidation?.(result.errors);

		return result;
	}
}
```

## Component Checklist

When creating a new component:

- [ ] Define `MyComponentBondProps` type with all component props
- [ ] Define `MyComponentBondElements` type with all managed DOM elements
- [ ] Create element kinds object for consistent `data-kind` attributes
- [ ] Create `MyComponentBondState` class extending `BondState`
- [ ] Add state methods (open, close, validate, etc.)
- [ ] Create `MyComponentBond` class extending `Bond`
- [ ] Implement element prop generators (root, title, content, etc.)
- [ ] Implement `share()` method
- [ ] Implement static `get()` and `set()` methods with unique `CONTEXT_KEY`
- [ ] Create root component with `defineState`/`defineProperty` for reactive props
- [ ] Create factory function to instantiate bond
- [ ] Call `bond.share()` to set in context
- [ ] Create child components that access bond via `MyComponentBond.get()`
- [ ] Merge bond props with user props using `$derived`
- [ ] Bind lifecycle hooks to `bond.state`
- [ ] Export all components in `atoms.ts`
- [ ] Export bond classes and types in `index.ts`
- [ ] Add ARIA attributes for accessibility
- [ ] Add `data-kind` attributes for styling hooks
- [ ] Generate unique IDs using `getElementId()`

## Summary

The Bond pattern centralizes component state and DOM coordination:

1. **BondState**: Manages props and state methods
2. **Bond**: Manages DOM elements, generates props, shares via context
3. **Root Component**: Creates bond, shares via context, renders with children snippet
4. **Child Components**: Access bond from context, merge with own props

Benefits:

- **Centralized state**: All state and methods in one place
- **Type-safe**: Full TypeScript support across all components
- **Context-based**: Child components automatically access shared state
- **Composable**: Components can extend existing bonds
- **Accessible**: ARIA attributes automatically generated
- **Flexible**: User props override bond defaults
