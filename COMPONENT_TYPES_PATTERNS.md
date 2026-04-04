# Component Types & Extensibility Patterns

This document outlines the modern type patterns for @svelte-atoms/core components, designed for maximum extensibility and reusability.

## Core Principles

1. **Interface-based typing** - Prefer interfaces over types for better extensibility
2. **Snippet props are extensible** - Components provide base `SnippetProps` that can be overridden
3. **Children snippets use typed props** - Not just `Snippet<[]>`, but `Snippet<[YourSnippetProps]>`
4. **Clear separation** - Event props, element props, and component props are distinct

## Element Layer (Base Primitives)

### ElementChildren

Extensible children snippet type:

```typescript
import type { ElementChildren, SnippetProps } from '@svelte-atoms/core/components/element/types';

// Custom snippet props
interface CustomSnippetProps extends SnippetProps {
  value: string;
  onChange: (v: string) => void;
}

// Use in a component
interface MyComponentProps {
  children?: ElementChildren<CustomSnippetProps>;
}
```

### HtmlElementProps

Base for all HTML atom components:

```typescript
import type { HtmlElementProps } from '@svelte-atoms/core/components/element/types';

// Extend for your element
interface CustomDivProps extends HtmlElementProps<'div'> {
  children?: Snippet<[{ active: boolean }]>;
}
```

## Atom Layer (Component Components)

### HtmlAtomProps

Core props for atom-based components:

```typescript
import type { HtmlAtomProps } from '@svelte-atoms/core/components/atom/types';

interface MyAtomProps extends HtmlAtomProps<'div'> {
  // Your props here
}
```

### SnippetProps

Base interface for typed snippet contexts:

```typescript
import type { SnippetProps } from '@svelte-atoms/core/components/atom/types';

interface MySnippetProps extends SnippetProps {
  loading?: boolean;
  error?: string | null;
  value?: unknown;
}
```

## Complete Component Pattern

### Basic Component

```typescript
// types.ts
import type { HtmlAtomProps, SnippetProps } from '@svelte-atoms/core/components/atom/types';
import type { Snippet } from 'svelte';

export interface ButtonSnippetProps extends SnippetProps {
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface ButtonProps extends HtmlAtomProps<'button'> {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  children?: Snippet<[ButtonSnippetProps]>;
}
```

### Custom Button Extending Button

```typescript
// custom-button.types.ts
import type { ButtonProps, ButtonSnippetProps } from '@svelte-atoms/core/components/button';
import type { Snippet } from 'svelte';

// Extend snippet props with custom data
interface CustomButtonSnippetProps extends ButtonSnippetProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
}

// Extend button props with custom children
export interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  
  // Override children with custom snippet props
  children?: Snippet<[CustomButtonSnippetProps]>;
}
```

### Using Custom Button

```svelte
<script lang="ts">
  import { CustomButton } from './custom-button';
  import type { CustomButtonSnippetProps } from './custom-button.types';
</script>

<CustomButton variant="primary" size="lg">
  {#snippet children(props: CustomButtonSnippetProps)}
    <span class={`size-${props.size}`}>
      {#if props.loading}
        Loading...
      {:else}
        Click me ({props.variant})
      {/if}
    </span>
  {/snippet}
</CustomButton>
```

## Form Component Pattern

```typescript
import type { HtmlAtomProps, SnippetProps } from '@svelte-atoms/core/components/atom/types';
import type { Snippet } from 'svelte';

// Form context/state passed to children
export interface FormSnippetProps extends SnippetProps {
  values: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
  
  // Methods passed to children
  setFieldValue: (field: string, value: unknown) => void;
  setFieldError: (field: string, error: string) => void;
  handleSubmit: (data: Record<string, unknown>) => Promise<void>;
}

export interface FormProps extends HtmlAtomProps<'form'> {
  initialValues?: Record<string, unknown>;
  onSubmit?: (data: Record<string, unknown>) => Promise<void>;
  children?: Snippet<[FormSnippetProps]>;
}
```

## Composition Pattern

Combine multiple snippet props:

```typescript
import type { SnippetProps } from '@svelte-atoms/core/components/atom/types';
import type { Snippet } from 'svelte';

interface LoaderSnippetProps extends SnippetProps {
  isLoading: boolean;
}

interface ErrorSnippetProps extends SnippetProps {
  error: string | null;
}

interface ContainerSnippetProps extends SnippetProps {
  // Combine both
  isLoading: boolean;
  error: string | null;
}

interface ContainerProps {
  children?: Snippet<[ContainerSnippetProps]>;
}
```

## Dialog/Modal Pattern

```typescript
import type { HtmlAtomProps, SnippetProps } from '@svelte-atoms/core/components/atom/types';
import type { Snippet } from 'svelte';

export interface DialogTriggerSnippetProps extends SnippetProps {
  open: () => void;
  isOpen: boolean;
}

export interface DialogContentSnippetProps extends SnippetProps {
  close: () => void;
  isOpen: boolean;
}

export interface DialogProps extends HtmlAtomProps<'div'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  
  trigger?: Snippet<[DialogTriggerSnippetProps]>;
  content?: Snippet<[DialogContentSnippetProps]>;
  children?: never; // Use named slots instead
}
```

Usage:

```svelte
<Dialog let:open let:onOpenChange>
  {#snippet trigger({ open: isOpen })}
    <button onclick={() => onOpenChange(!isOpen)}>
      {isOpen ? 'Close' : 'Open'}
    </button>
  {/snippet}
  
  {#snippet content({ close })}
    <div class="dialog-content">
      <h2>Dialog Title</h2>
      <button onclick={close}>Close</button>
    </div>
  {/snippet}
</Dialog>
```

## Benefits of This Pattern

✅ **Type-safe children** - Snippet props are strongly typed
✅ **Easy to extend** - Components inherit and override snippet props
✅ **Clear context** - Children receive typed context data
✅ **Reusable** - Snippet props can be mixed and composed
✅ **IDE support** - Full autocomplete and intellisense
✅ **Backward compatible** - Existing code continues to work

## Migration Guide

If you have components using `Snippet<[]>`:

```typescript
// Before
interface OldProps {
  children?: Snippet<[]>;
}

// After
interface NewSnippetProps extends SnippetProps {
  // Add your context data here
}

interface NewProps {
  children?: Snippet<[NewSnippetProps]>;
}
```

This provides context to children while remaining backward compatible with empty snippets.
