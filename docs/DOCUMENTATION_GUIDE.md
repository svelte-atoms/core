# Component Documentation Guidelines

> Best practices for maintaining component documentation

## TypeScript Props Reference

### ✅ Recommended Approach

Instead of duplicating prop definitions in markdown documentation, reference the TypeScript types directly from the source code.

**Benefits:**

- ✅ Single source of truth
- ✅ Always up-to-date
- ✅ Less maintenance overhead
- ✅ Compile-time validation ensures accuracy

### Format

```markdown
**Props:** See [`ComponentNameProps`](../../src/lib/components/component/component-root.svelte) in the source code.

Key props include:

- `propName` - Brief description
- `anotherProp` - Brief description
```

### Example

```markdown
### Button Component

**Props:** See [`ButtonRootProps`](../../src/lib/components/button/button-root.svelte) in the source code.

Key props include:

- `type` - Button type ('button', 'submit', 'reset')
- `disabled` - Disable the button
- `onclick` - Click event handler
```

### Full Example

```markdown
# Accordion Component

> **Source**: [`src/lib/components/accordion`](../../src/lib/components/accordion)

## Components

### `Accordion.Root`

Main accordion container.

**Props:** See [`AccordionRootProps`](../../src/lib/components/accordion/accordion-root.svelte) in the source code.

Key props include:

- `value` / `values` - Control selected items
- `multiple` - Allow multiple items open
- `collapsible` - Allow collapsing all items

### Usage

\`\`\`svelte

<script lang="ts">
  import { Accordion } from '@svelte-atoms/core/components/accordion';
</script>

<Accordion.Root bind:value={selected}>

  <!-- content -->

</Accordion.Root>
\`\`\`
```

## Structure Guidelines

### Order of Sections

1. **Title** - Component name as H1
2. **Source Link** - Blockquote with source code link
3. **Description** - Brief overview
4. **Components** - List of sub-components with props
5. **Usage** - Code examples (basic to advanced)
6. **API Reference** - Advanced features (optional)
7. **Accessibility** - A11y features (optional)
8. **Related Components** - Links to related docs (optional)

### Props Section Format

For each component:

```markdown
### ComponentName

Description of what this component does.

**Props:** See [`ComponentNameProps`](../../src/path/to/component.svelte) in the source code.

Key props include:

- `prop1` - Description
- `prop2` - Description
- `prop3` - Description
```

**When to list props:**

- List 3-5 most important/commonly used props
- Skip obvious inherited props (like `class`, `style`, `id`)
- Skip internal/advanced props unless critical

### Usage Examples

**Guidelines:**

- Show complete, working examples
- Start with basic usage
- Progress to advanced patterns
- Include imports
- Use TypeScript
- Show state management with `$state`

**Example structure:**

```markdown
## Usage

### Basic

\`\`\`svelte

<script lang="ts">
  import { Component } from '@svelte-atoms/core/components/component';
</script>

<Component.Root>
Basic example
</Component.Root>
\`\`\`

### With State

\`\`\`svelte

<script lang="ts">
  import { Component } from '@svelte-atoms/core/components/component';
  
  let value = $state('');
</script>

<Component.Root bind:value>
With state binding
</Component.Root>
\`\`\`

### Advanced

\`\`\`svelte

<script lang="ts">
  import { Component } from '@svelte-atoms/core/components/component';
  import { animate } from 'motion';
  
  let value = $state('');
  
  function handleEnter(el: HTMLElement) {
    return animate(el, { opacity: [0, 1] });
  }
</script>

<Component.Root bind:value enter={handleEnter}>
With animations
</Component.Root>
\`\`\`
```

## Code Examples

### Required Elements

Every code example must include:

1. **Import statements** - Show all imports
2. **Type annotations** - Use TypeScript
3. **Complete code** - No placeholders or `...`
4. **Working example** - Can be copy-pasted
5. **Svelte 5 syntax** - Use runes (`$state`, `$derived`, `$effect`)

### ❌ Bad Examples

```markdown
\`\`\`svelte
<Component.Root>

  <!-- ... rest of code ... -->

</Component.Root>
\`\`\`
```

```markdown
\`\`\`svelte

<script>
  // imports here
  let value;
</script>
```

### ✅ Good Examples

```markdown
\`\`\`svelte

<script lang="ts">
  import { Component } from '@svelte-atoms/core/components/component';
  
  let value = $state('');
</script>

<Component.Root bind:value>
Content here
</Component.Root>
\`\`\`
```

## Maintenance

### When to Update Documentation

- ✅ When adding new components
- ✅ When changing component APIs
- ✅ When adding new features
- ✅ When fixing bugs that affect usage

### What NOT to Update

- ❌ Individual prop definitions (maintain in TypeScript only)
- ❌ Type definitions (maintain in source code)
- ❌ Internal implementation details

### Review Checklist

Before committing documentation:

- [ ] Source link is correct and working
- [ ] Props reference TypeScript types
- [ ] Code examples are complete and working
- [ ] Using Svelte 5 syntax (runes)
- [ ] No placeholders in code
- [ ] All imports are shown
- [ ] TypeScript types are used

## Related Documents

- [Overview](./overview.md) - Library overview
- [Philosophy](./philosophy.md) - Design principles
- [Quick Reference](./quick-reference.md) - Common patterns
- [Agent Guidelines](./agent.md) - LLM instructions
