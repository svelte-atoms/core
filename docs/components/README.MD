# Component Documentation Index

This directory contains comprehensive documentation for all components in the `@svelte-atoms/core` package.

## Documentation Overview

Each component documentation file includes:

- **Features**: Key capabilities and highlights
- **Props**: Complete prop reference with types
- **Usage**: Practical code examples
- **Customization**: Preset system integration
- **Best Practices**: Recommended usage patterns
- **Accessibility**: ARIA and keyboard support
- **Related**: Links to related components

## Component Categories

### Core Building Blocks

- **[Atom](./atom.md)** - Base atomic component for HTML/SVG/Canvas elements

### Layout & Structure

- **[Stack](./stack.md)** - Flexible vertical/horizontal layout with spacing
- **[Layer](./layer.md)** - Z-index and position management
- **[Divider](./divider.md)** - Visual content separator
- **[List](./list.md)** - Ordered/unordered/definition lists
- **[Virtual](./virtual.md)** - Virtualized lists for large datasets
- **[Portal](./portal.md)** - Render content outside normal DOM hierarchy

### Navigation

- **[Breadcrumb](./breadcrumb.md)** - Hierarchical navigation display
- **[Link](./link.md)** - Accessible hyperlinks
- **[Menu](./menu.md)** - Navigation menu component
- **[Sidebar](./sidebar.md)** - Side navigation panel
- **[Tabs](./tabs.md)** - Tab navigation system
  - **[Tab](./tabs-tab.md)** - Individual tab item

### Form Controls

- **[Button](./button.md)** - Interactive button element
- **[Input](./input.md)** - Text input with icons and enhancements
- **[Textarea](./textarea.md)** - Multi-line text input
- **[Checkbox](./checkbox.md)** - Checkbox with custom styling
- **[Radio](./radio.md)** - Radio button for single selection
- **[Label](./label.md)** - Form labels with accessibility
- **[Form](./form.md)** - Form container and management
  - **[Form Field](./form-field.md)** - Individual form field wrapper
- **[Combobox](./combobox.md)** - Searchable select input

### Data Display

- **[Card](./card.md)** - Content container with sections
- **[Badge](./badge.md)** - Small status/label indicators
- **[Avatar](./avatar.md)** - User avatar display
- **[Icon](./icon.md)** - Icon wrapper component
- **[Datagrid](./datagrid.md)** - Data table component
  - **[Datagrid TH](./datagrid-th.md)** - Table header cell
  - **[Datagrid TR](./datagrid-tr.md)** - Table row
  - **[Datagrid TD](./datagrid-td.md)** - Table data cell
- **[Tree](./tree.md)** - Hierarchical tree view
- **[Scrollable](./scrollable.md)** - Custom scrollable container

### Overlays & Modals

- **[Dialog](./dialog.md)** - Modal dialog/popup
- **[Drawer](./drawer.md)** - Slide-in side panel
- **[Popover](./popover.md)** - Floating content container
- **[Dropdown](./dropdown.md)** - Dropdown menu system
  - **[Dropdown Item](./dropdown-item.md)** - Individual dropdown item
- **[Contextmenu](./contextmenu.md)** - Right-click context menu
- **[Tooltip](./tooltip.md)** - Hover/focus information display
- **[Toast](./toast.md)** - Temporary notifications

### Interactive

- **[Accordion](./accordion.md)** - Expandable content sections
  - **[Accordion Item](./accordion-item.md)** - Individual accordion section
- **[Collapsible](./collapsible.md)** - Expandable/collapsible content
- **[Alert](./alert.md)** - Alert/notification messages

## Key Patterns

### Bond Pattern

Many components use the **Bond pattern** for state management:

```svelte
<Dialog.Root>
	{#snippet children({ dialog })}
		<!-- Access dialog bond state -->
		<div>Open: {dialog.state.open}</div>
	{/snippet}
</Dialog.Root>
```

Components using bonds:

- Dialog
- Dropdown
- Popover
- Contextmenu
- Input
- Form
- And more...

### Preset System

All components support the **Preset system** for default styling:

```typescript
const preset = {
	button: {
		as: 'button',
		base: {
			/* base styles */
		},
		class: 'default-button-styles'
	}
};
```

### Atomic Props

Base atomic props available on most components:

- `as` - Element type transformation
- `base` - Base styling configuration
- `class` - CSS classes
- `animate` - Animation function (GSAP)
- `enter` - Enter animation hook
- `exit` - Exit animation hook
- `initial` - Initial state hook
- `onmount` - Mount lifecycle hook
- `ondestroy` - Destroy lifecycle hook

## Usage Guidelines

### Import Components

```svelte
<script>
	import { Button } from '@svelte-atoms/core';
	import { Dialog } from '@svelte-atoms/core';
</script>
```

### Modular Components

Many components are modular with sub-components:

```svelte
<Dialog.Root>
	<Dialog.Trigger>Open</Dialog.Trigger>
	<Dialog.Overlay />
	<Dialog.Content>
		<Dialog.Header>Title</Dialog.Header>
		<Dialog.Body>Content</Dialog.Body>
		<Dialog.Footer>Actions</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
```

### Accessibility

All components follow accessibility best practices:

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management

## Component Status

All documented components are:

- ✅ Production ready
- ✅ Fully typed (TypeScript)
- ✅ Accessible (WCAG compliant)
- ✅ Customizable (Preset system)
- ✅ Tested

## Contributing

When adding new components:

1. Create component in `src/lib/components/[name]/`
2. Add documentation in `.github/components/[name].md`
3. Follow existing documentation structure
4. Include comprehensive examples
5. Document all props and usage patterns

## Need Help?

- Check individual component documentation
- Review usage examples in each file
- See Storybook for interactive demos
- Refer to copilot instructions for AI assistance

---

**Total Components Documented**: 44

**Last Updated**: October 5, 2025
