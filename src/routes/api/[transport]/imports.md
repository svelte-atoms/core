---
id: imports
title: Import Guide
category: fundamentals
depth: foundational
prerequisites: []
related:
  - overview
---

# Import Guide for @svelte-atoms/core

## Package Structure

All components and utilities are exported from the main package:

```typescript
import { ComponentName, utilityName } from '@svelte-atoms/core';
```

## Common Import Patterns

### Atoms (Base Components)

```svelte
import { Button, Input, Select, Checkbox } from '@svelte-atoms/core';
```

### Bonds (Composite Components)

```svelte
import { Dropdown, Dialog, Accordion, Tabs } from '@svelte-atoms/core';
```

### Utilities

```svelte
import { clickOutside, portal, focusTrap } from '@svelte-atoms/core';
```

### Types

```typescript
import type { ButtonProps, InputProps } from '@svelte-atoms/core';
```

## Complete Example

```svelte
<script lang="ts">
  import { Button, Input, Dialog } from '@svelte-atoms/core';

  let showDialog = $state(false);
  let inputValue = $state('');
</script>

<Button onclick={() => showDialog = true}>Open Dialog</Button>

{#if showDialog}
  <Dialog onclose={() => showDialog = false}>
    <Input bind:value={inputValue} placeholder="Enter text..." />
  </Dialog>
{/if}
```

## Important Rules

1. **Always use named imports**, never default imports
2. **All exports are from the root package** '@svelte-atoms/core'
3. **Component names use PascalCase** (Button, not button)
4. **Utility names use camelCase** (clickOutside, not ClickOutside)
5. **No subpath imports** - Don't use '@svelte-atoms/core/components/button'

## Common Mistakes to Avoid

❌ **WRONG:**

```svelte
import Button from '@svelte-atoms/core'; // default import
import { Button } from '@svelte-atoms/core/components/button'; // subpath
import { button } from '@svelte-atoms/core'; // wrong case
```

✅ **CORRECT:**

```svelte
import { Button } from '@svelte-atoms/core';
import { Button } from '@svelte-atoms/core/button';
```
