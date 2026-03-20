<script lang="ts">
	import {  codeBlock ,  inlineCode, list, newLine } from '$docs/md/template';
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

## Props

**Preset Key:** {inlineCode('badge')}

<PropsTable props={data.badgeProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Variants

{codeBlock(metadata.examples.variants, 'svelte')}

### Sizes

{codeBlock(metadata.examples.sizes, 'svelte')}

### Notification Badge

{codeBlock(metadata.examples.notification, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
