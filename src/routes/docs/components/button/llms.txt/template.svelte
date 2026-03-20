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

## Props

**Preset Key:** {inlineCode('button')}

<PropsTable props={data.buttonProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.button, 'svelte')}

### Variants

{codeBlock(metadata.examples.variants, 'svelte')}

### Sizes

{codeBlock(metadata.examples.sizes, 'svelte')}

### States

{codeBlock(metadata.examples.states, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
