<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */
	import { codeBlock } from '$docs/md/template';
	import { FrontMatter } from '$docs/md/components';

	let { data } = $props();
	const { frontmatter } = $derived(data);
</script>
	// eslint-disable-next-line @typescript-eslint/no-unused-vars

<FrontMatter {frontmatter} />

# Import Guide for @svelte-atoms/core

## Package Structure

All components and utilities are exported from the main package:

{codeBlock(`import { ComponentName, utilityName } from '@svelte-atoms/core';`, 'typescript')}

## Common Import Patterns

### Atoms (Base Components)

{codeBlock(`import { Button, Input, Select, Checkbox } from '@svelte-atoms/core';`, 'svelte')}

### Bonds (Composite Components)

{codeBlock(`import { Dropdown, Dialog, Accordion, Tabs } from '@svelte-atoms/core';`, 'svelte')}

### Utilities

{codeBlock(`import { clickOutside, portal, focusTrap } from '@svelte-atoms/core';`, 'svelte')}

### Types

{codeBlock(`import type { ButtonProps, InputProps } from '@svelte-atoms/core';`, 'typescript')}

## Complete Example

{codeBlock(`<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */
  import { Button, Input, Dialog } from '@svelte-atoms/core';

  let showDialog = $state(false);
  let inputValue = $state('');
</script>

<Button onclick={() => showDialog = true}>Open Dialog</Button>

{#if showDialog}
  <Dialog onclose={() => showDialog = false}>
    <Input bind:value={inputValue} placeholder="Enter text..." />
  </Dialog>
{/if}`, 'svelte')}

## Important Rules

1. **Always use named imports**, never default imports
2. **All exports are from the root package** '@svelte-atoms/core'
3. **Component names use PascalCase** (Button, not button)
4. **Utility names use camelCase** (clickOutside, not ClickOutside)
5. **No subpath imports** - Don't use '@svelte-atoms/core/components/button'

## Common Mistakes to Avoid

❌ **WRONG:**

{codeBlock(`import Button from '@svelte-atoms/core'; // default import
import { Button } from '@svelte-atoms/core/components/button'; // subpath
import { button } from '@svelte-atoms/core'; // wrong case`, 'svelte')}

✅ **CORRECT:**

{codeBlock(`import { Button } from '@svelte-atoms/core';
import { Button } from '@svelte-atoms/core/button';`, 'svelte')}
