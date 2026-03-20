<script lang="ts">
	import {  codeBlock ,  inlineCode, list} from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{list(metadata.useCases.map((uc) => `**${uc.title}**: ${uc.description}`))}

## Components

The Collapsible module consists of the following components:

{list(metadata.componentsSummary.map((comp) => `**${comp.name}**: ${comp.description}`))}

### Collapsible.Root

**Preset Key:** {inlineCode('collapsible')}

**Props:**

<PropsTable props={data.collapsibleRootProps} />

## Examples

### Basic Collapsible

{codeBlock(metadata.examples.basic, 'svelte')}

### Controlled State

{codeBlock(metadata.examples.controlled, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## Best Practices

1. **Clear Triggers**: Make it obvious that the element can be expanded/collapsed
2. **Visual Feedback**: Provide visual indicators of the current state (open/closed)
3. **Smooth Transitions**: Use transitions to make state changes feel natural
4. **Keyboard Support**: Ensure the trigger is keyboard accessible
5. **Initial State**: Consider the appropriate default state for your use case

## License

This module is licensed under the MIT License.
