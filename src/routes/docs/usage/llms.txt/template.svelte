<script lang="ts">
	import { codeBlock, inlineCode } from '$docs/md/template';
	import { FrontMatter } from '$docs/md/components';
	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# Component Usage Patterns

## Namespace.Atom Pattern

Components follow a hierarchical naming pattern using dot notation:

{codeBlock(`<Form.Root>
	<Form.Field>
		<Form.Label />
		<Form.Control />
	</Form.Field>
</Form.Root>`, 'svelte')}

## Naming Convention

- **Namespace** = Component family (e.g., {inlineCode('Form')}, {inlineCode('Button')}, {inlineCode('Dropdown')})
- **Atom** = Specific component within the family (e.g., {inlineCode('Root')}, {inlineCode('Field')}, {inlineCode('Label')})

## Import Pattern

{codeBlock(`import { newLine, md, inlineCode, codeBlock } from '$docs/md/template';
import { Form } from '$lib/components/form';

// Usage
<Form.Root>
	<Form.Field>
		<Form.Label>Username</Form.Label>
		<Form.Control type="text" />
	</Form.Field>
</Form.Root>;`, 'javascript')}

## Benefits

- **Clear hierarchy** - Components group logically
- **Namespace isolation** - Prevents naming conflicts
- **Discoverable API** - IDE autocomplete shows related components
- **Consistent patterns** - Same structure across all component families

## Examples

- {inlineCode('Button.Root')}, {inlineCode('Button.Icon')}, {inlineCode('Button.Text')}
- {inlineCode('Dropdown.Root')}, {inlineCode('Dropdown.Trigger')}, {inlineCode('Dropdown.Content')}
- {inlineCode('Form.Root')}, {inlineCode('Form.Field')}, {inlineCode('Form.Label')}, {inlineCode('Form.Control')}
