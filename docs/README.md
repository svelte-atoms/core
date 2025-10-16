# @svelte-atoms/core Documentation

> **Purpose**: This documentation is optimized for both human developers and Large Language Models (LLMs) to understand and work with the `@svelte-atoms/core` library.

## 📚 Documentation Structure

This documentation follows a hierarchical structure designed for easy navigation and LLM comprehension:

### Core Documentation

1. **[Overview](./overview.md)** - High-level introduction to the library
   - What is @svelte-atoms/core
   - Key features and benefits
   - Installation and quick start
   - Architecture overview

2. **[Philosophy](./philosophy.md)** - Core design principles
   - Atoms vs Bonds concept
   - Rendering system
   - Lifecycle hooks
   - Extensibility patterns

3. **[Naming Conventions](./naming-convention.md)** - Coding standards
   - File naming (kebab-case)
   - Variable naming (camelCase)
   - Component naming (PascalCase)
   - Molecule patterns

4. **[Agent Guidelines](./agent.md)** - Instructions for LLMs and developers
   - Required documentation references
   - Git commit conventions
   - Code generation guidelines

5. **[Documentation Guide](./DOCUMENTATION_GUIDE.md)** - How to maintain docs
   - TypeScript props reference pattern
   - Component documentation structure
   - Code example guidelines

### Component Documentation

6. **[Components Index](./components/README.MD)** - Complete component catalog
   - Organized by category
   - Quick reference to all 40+ components
   - Links to detailed documentation

7. **[Individual Components](./components/)** - Detailed component docs
   - Each component has its own markdown file
   - Includes source links, API, usage examples
   - Shows both low-level Bond/State API and high-level component usage

## 🎯 For LLMs: How to Use This Documentation

### Quick Start Workflow

When asked to work with `@svelte-atoms/core`:

1. **Read `overview.md` first** - Understand the library's purpose and architecture
2. **Read `philosophy.md`** - Understand Atoms, Bonds, and the rendering system
3. **Read `naming-convention.md`** - Follow naming standards
4. **Read specific component docs** - Check `components/*.md` for the component you need

### Code Generation Guidelines

**Always Use High-Level Component API:**

```svelte
<!-- ❌ INCORRECT: Don't use low-level Bond/State API -->
<script>
  const state = new DropdownState(() => ({ ... }));
  const dropdown = new DropdownBond(state);
</script>

<!-- ✅ CORRECT: Use predefined components -->
<Dropdown.Root bind:value={selected}>
	<Dropdown.Trigger>
		<Dropdown.Value />
	</Dropdown.Trigger>
	<Dropdown.List>
		<Dropdown.Item value="1">Option 1</Dropdown.Item>
	</Dropdown.List>
</Dropdown.Root>
```

**Svelte 5 Patterns:**

- Use `$state` for reactive state
- Use `$derived` for computed values
- Use `$effect` for side effects
- Use `bind:` directives for two-way binding

**Import Pattern:**

```typescript
import { Component } from '@svelte-atoms/core/components/component';
```

**Component Structure:**

```svelte
<Component.Root>
	<Component.SubComponent />
</Component.Root>
```

## 📖 Documentation Features

### Every Component Doc Includes

- ✅ **Source Link** - Direct link to source code location
- ✅ **Features** - Key capabilities overview
- ✅ **API Reference** - Props, methods, and types
- ✅ **Usage Examples** - Real-world code samples
- ✅ **Component Pattern** - High-level predefined component usage
- ✅ **Context Utilities** - How components share state
- ✅ **Accessibility** - ARIA attributes and keyboard support

### Component Categories

**Layout & Structure** (7 components)

- Card, Stack, Layer, Divider, List, Virtual, Portal

**Form Controls** (7 components)

- Input, Textarea, Checkbox, Radio, Form, Form Field, Label

**Interactive Components** (9 components)

- Button, Dropdown, Combobox, Accordion, Collapsible, Tabs, Tree, DataGrid

**Overlay Components** (6 components)

- Dialog, Drawer, Popover, Tooltip, Toast, ContextMenu

**Navigation** (5 components)

- Menu, Breadcrumb, Sidebar, Link, Tabs

**Display Components** (5 components)

- Avatar, Badge, Icon, Alert, Scrollable

**Utilities** (2 components)

- Atom (base renderer)

## 🔍 Finding What You Need

### By Use Case

**Building Forms?**

- Read: `form.md`, `form-field.md`, `input.md`, `textarea.md`, `checkbox.md`, `radio.md`

**Creating Navigation?**

- Read: `menu.md`, `sidebar.md`, `tabs.md`, `breadcrumb.md`, `link.md`

**Need Overlays?**

- Read: `dialog.md`, `drawer.md`, `popover.md`, `tooltip.md`, `toast.md`

**Data Display?**

- Read: `datagrid.md`, `list.md`, `virtual.md`, `tree.md`

**Interactive Selections?**

- Read: `dropdown.md`, `combobox.md`, `accordion.md`, `collapsible.md`

### By Pattern

**Need State Management?**

- Every component supports `bind:value` for reactive state
- Use Svelte 5 `$state` runes for local state
- Bonds handle shared state automatically

**Need Animations?**

- All components support: `initial`, `enter`, `exit`, `animate` hooks
- Compatible with GSAP, Motion One, anime.js

**Need Styling?**

- All components accept `class` prop
- Headless by default - bring your own styles
- Full TailwindCSS compatibility

**Need Accessibility?**

- All components include ARIA attributes
- Keyboard navigation built-in
- Focus management automatic

## 🚀 Common Tasks

### Creating a New Component

1. Check if base component exists in `components/`
2. Import the component
3. Use the high-level component API (`Component.Root`, `Component.SubComponent`)
4. Add `class` prop for styling
5. Use `bind:` for state management

### Composing Multiple Components

```svelte
<script lang="ts">
	import { Card } from '@svelte-atoms/core/components/card';
	import { Avatar } from '@svelte-atoms/core/components/avatar';
	import { Badge } from '@svelte-atoms/core/components/badge';
	import { Button } from '@svelte-atoms/core/components/button';
</script>

<Card.Root>
	<Card.Header>
		<Avatar src="/avatar.jpg" alt="User" />
		<Badge>Pro</Badge>
	</Card.Header>
	<Card.Body>Content here</Card.Body>
	<Card.Footer>
		<Button.Root>Action</Button.Root>
	</Card.Footer>
</Card.Root>
```

### Adding Interactivity

```svelte
<script lang="ts">
	import { Dropdown } from '@svelte-atoms/core/components/dropdown';

	let selected = $state<string[]>([]);

	// React to changes
	$effect(() => {
		console.log('Selection:', selected);
	});
</script>

<Dropdown.Root bind:value={selected} multiple>
	<!-- ... -->
</Dropdown.Root>
```

## 🎨 Styling Patterns

### Utility-First (TailwindCSS)

```svelte
<Button.Root class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
	Click me
</Button.Root>
```

### CSS Modules

```svelte
<script>
	import styles from './Button.module.css';
</script>

<Button.Root class={styles.button}>Click me</Button.Root>
```

### Custom Classes

```svelte
<Button.Root class="my-custom-button primary large">Click me</Button.Root>
```

## ⚠️ Important Notes

### For LLMs

1. **ALWAYS use high-level component API** - Never instantiate Bond/State classes directly in usage examples
2. **Use Svelte 5 syntax** - Use runes (`$state`, `$derived`, `$effect`), not legacy stores
3. **Follow naming conventions** - kebab-case for files, camelCase for variables, PascalCase for components
4. **Include imports** - Always show the import statement in code examples
5. **Show complete examples** - Don't use placeholders like `/* ... */` or `<!-- ... -->`

### For Developers

1. **Components are headless** - You must provide your own styling
2. **TypeScript is included** - Full type safety out of the box
3. **Tree-shakeable** - Import only what you need
4. **Svelte 5 required** - This library uses Svelte 5 runes
5. **Accessibility built-in** - But you can customize/extend it

## 📝 Version Information

- **Library**: @svelte-atoms/core
- **Svelte Version**: 5.x
- **License**: MIT
- **Repository**: [github.com/ryu-man/svelte-atoms](https://github.com/ryu-man/svelte-atoms)

## 🔗 Additional Resources

- [GitHub Repository](https://github.com/ryu-man/svelte-atoms)
- [NPM Package](https://www.npmjs.com/package/@svelte-atoms/core)
- [Contributing Guidelines](../../CONTRIBUTING.md)
- [License](../../LICENSE)

---

**Last Updated**: October 2025  
**Documentation Version**: 1.0.0
