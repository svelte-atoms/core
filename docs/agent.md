# Instructions for LLMs & Coding Agents

> **Purpose**: Guidelines for AI assistants working with `@svelte-atoms/core` library

## 📖 Required Reading Order

When working with this library, read documentation in this order:

1. **[Overview](./overview.md)** - Understand what the library is and its architecture
2. **[Philosophy](./philosophy.md)** - Learn the Atoms & Bonds concepts
3. **[Quick Reference](./quick-reference.md)** - Common patterns and component lookup
4. **[Naming Conventions](./naming-convention.md)** - Follow coding standards
5. **[Component Docs](./components/)** - Detailed component-specific documentation

## ✅ Code Generation Rules

### ALWAYS Do This

1. **Use High-Level Component API**

   ```svelte
   <!-- ✅ CORRECT -->
   <Dropdown.Root bind:value={selected}>
   	<Dropdown.List>
   		<Dropdown.Item value="1">Option 1</Dropdown.Item>
   	</Dropdown.List>
   </Dropdown.Root>
   ```

2. **Use Svelte 5 Runes**

   ```svelte
   <!-- ✅ CORRECT -->
   <script lang="ts">
   	let value = $state('');
   	let computed = $derived(value.toUpperCase());
   </script>
   ```

3. **Include Complete Imports**

   ```svelte
   <!-- ✅ CORRECT -->
   <script lang="ts">
   	import { Component } from '@svelte-atoms/core/components/component';
   </script>
   ```

4. **Follow Naming Conventions**
   - Files: `kebab-case.svelte`
   - Variables: `camelCase`
   - Components: `PascalCase`
   - Component usage: `Component.SubComponent`

5. **Show Complete Code**
   - No placeholders like `/* ... */` or `<!-- ... -->`
   - Show full working examples
   - Include all necessary imports

### NEVER Do This

1. **Don't Use Low-Level Bond/State API**

   ```svelte
   <!-- ❌ WRONG -->
   <script>
     const state = new DropdownState(() => ({ ... }));
     const dropdown = new DropdownBond(state);
   </script>
   ```

2. **Don't Use Legacy Svelte Stores**

   ```svelte
   <!-- ❌ WRONG -->
   <script>
   	import { writable } from 'svelte/store';
   	const value = writable('');
   </script>
   ```

3. **Don't Use Outdated Syntax**

   ```svelte
   <!-- ❌ WRONG -->
   <script>
   	export let value; // Old Svelte 4 syntax
   </script>
   ```

4. **Don't Create Incomplete Examples**
   ```svelte
   <!-- ❌ WRONG -->
   <Dropdown.Root>
   	<!-- ... rest of code ... -->
   </Dropdown.Root>
   ```

## 🎯 Component Usage Patterns

### Basic Component

```svelte
<script lang="ts">
	import { Button } from '@svelte-atoms/core/components/button';
</script>

<Button.Root onclick={() => console.log('clicked')}>Click me</Button.Root>
```

### Component with State

```svelte
<script lang="ts">
	import { Dropdown } from '@svelte-atoms/core/components/dropdown';

	let selected = $state<string[]>([]);
</script>

<Dropdown.Root bind:value={selected}>
	<!-- children -->
</Dropdown.Root>
```

### Component with Styling

```svelte
<script lang="ts">
	import { Card } from '@svelte-atoms/core/components/card';
</script>

<Card.Root class="rounded-lg bg-white p-6 shadow-lg">
	<Card.Header class="text-xl font-bold">Title</Card.Header>
	<Card.Body>Content</Card.Body>
</Card.Root>
```

### Nested Components

```svelte
<script lang="ts">
	import { Accordion } from '@svelte-atoms/core/components/accordion';

	let open = $state<string[]>([]);
</script>

<Accordion.Root bind:value={open}>
	<Accordion.Item value="item-1">
		<Accordion.Item.Header>Section 1</Accordion.Item.Header>
		<Accordion.Item.Body>Content 1</Accordion.Item.Body>
	</Accordion.Item>
</Accordion.Root>
```

## 📝 Documentation References

### For Documentation Writing

- Follow [Documentation Guide](./DOCUMENTATION_GUIDE.md) for best practices
- Reference TypeScript types instead of duplicating props
- Link to source code for type definitions

### For Svelte 5 Syntax

- Use `../.github/svelte.txt` for Svelte 5 & SvelteKit patterns
- Refer to [Svelte 5 Runes Docs](https://svelte.dev/docs/runes)

### For Component Usage

- Check `./components/*.md` for specific component documentation
- Each file contains:
  - Source code link
  - API reference
  - Usage examples
  - Best practices

### For Styling

- All components accept `class` prop
- Use TailwindCSS or custom CSS
- Components are unstyled by default

## 🔨 Git Commit Guidelines

When making commits:

1. **Use Short & Straightforward Messages**

   ```bash
   git commit -m "add dropdown component"
   git commit -m "fix form validation"
   git commit -m "update button styles"
   ```

2. **Do NOT Specify File Names**

   ```bash
   # ❌ WRONG
   git commit -m "update dropdown.svelte to fix bug"

   # ✅ CORRECT
   git commit -m "fix dropdown selection bug"
   ```

3. **Use Present Tense**

   ```bash
   # ❌ WRONG
   git commit -m "added feature"
   git commit -m "fixed bug"

   # ✅ CORRECT
   git commit -m "add feature"
   git commit -m "fix bug"
   ```

4. **Keep It Concise**
   ```bash
   # ✅ GOOD
   git commit -m "improve accessibility"
   git commit -m "optimize performance"
   git commit -m "add keyboard navigation"
   ```

## 🎨 Styling Best Practices

### Use Utility Classes

```svelte
<Button.Root class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Submit</Button.Root>
```

### Support Dark Mode

```svelte
<Card.Root class="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Content</Card.Root>
```

### Responsive Design

```svelte
<Stack.Root class="flex-col gap-4 md:flex-row">
	<div class="w-full md:w-1/2">Column 1</div>
	<div class="w-full md:w-1/2">Column 2</div>
</Stack.Root>
```

## 🧪 Testing Patterns

When generating test code:

```typescript
import { render, screen } from '@testing-library/svelte';
import { Button } from '@svelte-atoms/core/components/button';

test('button renders correctly', () => {
	render(Button.Root, { children: 'Click me' });
	expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

## 📦 Import Organization

Order imports logically:

```svelte
<script lang="ts">
	// 1. External libraries
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	// 2. @svelte-atoms components
	import { Button } from '@svelte-atoms/core/components/button';
	import { Card } from '@svelte-atoms/core/components/card';

	// 3. Local components
	import UserProfile from './UserProfile.svelte';

	// 4. Types
	import type { User } from './types';

	// 5. State
	let user = $state<User | null>(null);
</script>
```

## 🎯 Error Handling

Always handle edge cases:

```svelte
<script lang="ts">
	import { Dropdown } from '@svelte-atoms/core/components/dropdown';

	let selected = $state<string[]>([]);
	let loading = $state(false);
	let error = $state<string | null>(null);

	$effect(() => {
		if (selected.length > 5) {
			error = 'Maximum 5 items allowed';
		} else {
			error = null;
		}
	});
</script>

<Dropdown.Root bind:value={selected} disabled={loading}>
	<Dropdown.Trigger>Select items</Dropdown.Trigger>
	<Dropdown.List>
		<!-- items -->
	</Dropdown.List>
</Dropdown.Root>

{#if error}
	<p class="text-red-500">{error}</p>
{/if}
```

## 🔍 Debugging Tips

When helping debug issues:

1. Check if imports are correct
2. Verify Svelte 5 syntax is used
3. Ensure high-level component API is used
4. Check for proper state binding
5. Verify class names are applied correctly

## 📚 Additional Resources

- **Quick Reference**: [quick-reference.md](./quick-reference.md)
- **Philosophy**: [philosophy.md](./philosophy.md)
- **Component Index**: [components/README.MD](./components/README.MD)
- **Svelte 5 Docs**: https://svelte.dev/docs
- **TailwindCSS**: https://tailwindcss.com/docs
