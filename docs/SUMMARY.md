# Documentation Summary for LLMs

> **Last Updated**: October 2025  
> **Purpose**: Guide for AI assistants to effectively work with @svelte-atoms/core

## 📚 Complete Documentation Index

### Essential Documents (Read First)

1. **[README.md](./README.md)** ⭐ START HERE
   - Master index and navigation guide
   - How to use this documentation
   - Quick workflow for LLMs
   - Component categories overview

2. **[Overview.md](./overview.md)** ⭐ REQUIRED
   - Library introduction and purpose
   - Key features and architecture
   - Installation and quick start
   - Complete component catalog

3. **[Agent.md](./agent.md)** ⭐ RULES
   - Code generation rules (MUST follow)
   - Do's and don'ts
   - Git commit guidelines
   - Import patterns

4. **[Philosophy.md](./philosophy.md)** 📖 CONCEPTS
   - Atoms vs Bonds explained
   - Rendering system (Html/Svg/Mathml)
   - Lifecycle hooks
   - Extension patterns

5. **[Naming Conventions](./naming-convention.md)** 📝 STANDARDS
   - File naming: kebab-case
   - Variable naming: camelCase
   - Component naming: PascalCase
   - Molecule patterns: `Component.SubComponent`

6. **[Documentation Guide](./DOCUMENTATION_GUIDE.md)** 📚 MAINTENANCE
   - How to document components
   - TypeScript props reference pattern
   - Code example best practices
   - Review checklist

### Quick Reference

7. **[Quick Reference](./quick-reference.md)** ⚡ LOOKUP
   - Component quick lookup table
   - Common props reference
   - Styling patterns
   - Animation examples
   - Common mistakes to avoid

8. **[Common Patterns](./common-patterns.md)** 🎯 RECIPES
   - Real-world code examples
   - Forms, navigation, data display
   - Overlays, modals, lists
   - Layout patterns
   - Best practices

### Component Documentation

9. **[Components Index](./components/README.MD)** 📦 CATALOG
   - All 40+ components categorized
   - Quick links to detailed docs
   - Component relationships

10. **[Individual Component Docs](./components/)** 📄 DETAILS

- 40+ component-specific files
- Source code links
- API reference
- Usage examples
- Accessibility notes

## 🎯 Recommended Reading Flow

### For Quick Tasks (Single Component)

```
README.md → Quick Reference → Component Doc
```

### For New Projects

```
README.md → Overview → Philosophy → Agent Guidelines → Component Docs
```

### For Complex Features

```
README.md → Overview → Common Patterns → Component Docs
```

### For Understanding Architecture

```
Overview → Philosophy → Naming Conventions
```

## ✅ Critical Rules for LLMs

### 1. Always Use High-Level API

```svelte
<!-- ❌ NEVER DO THIS -->
<script>
  const state = new DropdownState(() => ({ ... }));
</script>

<!-- ✅ CORRECT -->
<Dropdown.Root bind:value={selected}>
	<Dropdown.List>
		<Dropdown.Item value="1">Option 1</Dropdown.Item>
	</Dropdown.List>
</Dropdown.Root>
```

### 2. Always Use Svelte 5 Runes

```svelte
<!-- ✅ CORRECT -->
<script lang="ts">
  let value = $state('');
  let computed = $derived(value.toUpperCase());
</script>

<!-- ❌ NEVER DO THIS -->
<script>
  import { writable } from 'svelte/store';
  const value = writable('');
</script>
```

### 3. Always Show Complete Code

```svelte
<!-- ✅ CORRECT -->
<script lang="ts">
	import { Button } from '@svelte-atoms/core/components/button';

	let count = $state(0);
</script>

<Button.Root onclick={() => count++}>
	Count: {count}
</Button.Root>

<!-- ❌ NEVER DO THIS -->
<Button.Root>
	<!-- ... rest of code ... -->
</Button.Root>
```

### 4. Follow Naming Conventions

- **Files**: `my-component.svelte` (kebab-case)
- **Variables**: `myVariable` (camelCase)
- **Components**: `MyComponent` (PascalCase)
- **Usage**: `<Component.SubComponent>` (dot notation)

### 5. Always Include Imports

```svelte
<!-- ✅ CORRECT -->
<script lang="ts">
	import { Component } from '@svelte-atoms/core/components/component';
</script>

<!-- ❌ NEVER skip imports -->
```

## 📊 Documentation Statistics

- **Total Documents**: 50+ files
- **Component Docs**: 40+ individual components
- **Code Examples**: 100+ working examples
- **Categories**: 7 major component categories
- **Patterns**: 20+ common UI patterns

## 🔍 Finding Information Fast

### By Component Name

Check: `components/{component-name}.md`

Example: `components/dropdown.md`

### By Use Case

Check: [Common Patterns](./common-patterns.md)

- Forms → Forms section
- Navigation → Navigation section
- Data Display → Data Display section
- etc.

### By Concept

- Atoms/Bonds → [Philosophy](./philosophy.md)
- Rendering → [Philosophy](./philosophy.md)
- Styling → [Quick Reference](./quick-reference.md)
- Animation → [Quick Reference](./quick-reference.md)

### By Pattern

- Import patterns → [Agent](./agent.md)
- Component structure → [Overview](./overview.md)
- State management → [Common Patterns](./common-patterns.md)

## 🎨 Component Categories

### Layout & Structure (7)

Card, Stack, Layer, Divider, List, Virtual, Portal

### Form Controls (7)

Input, Textarea, Checkbox, Radio, Form, Form Field, Label

### Interactive (9)

Button, Dropdown, Combobox, Accordion, Collapsible, Tabs, Tree, DataGrid

### Overlay (6)

Dialog, Drawer, Popover, Tooltip, Toast, ContextMenu

### Navigation (5)

Menu, Breadcrumb, Sidebar, Link, Tabs

### Display (5)

Avatar, Badge, Icon, Alert, Scrollable

### Utilities (2)

Atom (base renderer), Button

## 🚀 Quick Start Checklist

- [ ] Read README.md for overview
- [ ] Read Agent.md for rules
- [ ] Check Quick Reference for patterns
- [ ] Find component in components/
- [ ] Follow code examples exactly
- [ ] Use high-level component API
- [ ] Use Svelte 5 runes ($state, $derived)
- [ ] Include all imports
- [ ] Show complete working code

## ⚠️ Common Pitfalls to Avoid

1. ❌ Using Bond/State classes directly
2. ❌ Using legacy Svelte stores (writable, readable)
3. ❌ Using old Svelte 4 syntax (export let)
4. ❌ Incomplete code examples with placeholders
5. ❌ Missing imports
6. ❌ Wrong naming conventions
7. ❌ Mixing Svelte versions

## 📝 Git Commit Format

```bash
# ✅ Good
git commit -m "add dropdown component"
git commit -m "fix form validation"
git commit -m "improve accessibility"

# ❌ Bad
git commit -m "updated dropdown.svelte file"
git commit -m "added new feature"
git commit -m "bug fix in the form component file"
```

Rules:

- Use present tense (add, fix, improve)
- Don't mention file names
- Keep it short and clear

## 🔗 External Resources

- **Svelte 5 Docs**: https://svelte.dev/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **ARIA Practices**: https://www.w3.org/WAI/ARIA/apg/
- **GitHub Repo**: https://github.com/ryu-man/svelte-atoms

## 📦 Package Information

- **Package**: `@svelte-atoms/core`
- **Svelte Version**: 5.x required
- **License**: MIT
- **TypeScript**: Fully typed
- **Tree-shakeable**: Yes

## 🎯 Success Criteria

Your code generation is successful when:

✅ Uses high-level component API (Component.Root pattern)  
✅ Uses Svelte 5 runes ($state, $derived, $effect)  
✅ Includes complete, working code (no placeholders)  
✅ Shows all necessary imports  
✅ Follows naming conventions  
✅ Applies appropriate styling  
✅ Handles edge cases  
✅ Includes accessibility features

## 📞 Need Help?

1. Check [Quick Reference](./quick-reference.md) for common patterns
2. Check [Common Patterns](./common-patterns.md) for recipes
3. Check specific component doc in `components/`
4. Review [Agent.md](./agent.md) for rules
5. Consult [Philosophy.md](./philosophy.md) for concepts

---

**Remember**: This library is designed for Svelte 5 with a component-first approach. Always use the high-level component API and follow the documented patterns for best results.

**Version**: 1.0.0  
**Last Updated**: October 2025
