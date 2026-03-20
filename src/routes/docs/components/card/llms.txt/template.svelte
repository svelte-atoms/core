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

The Card module consists of the following components:

{list(metadata.componentsSummary.map((comp) => `**${comp.name}**: ${comp.description}`))}

### Card.Root

**Preset Key:** {inlineCode('card')}

<PropsTable props={data.cardRootProps} />

### Sub-Components (Header, Title, Subtitle, Description, Body, Footer, Media)

<PropsTable props={data.cardSubPartProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Variants

{codeBlock(metadata.examples.variants, 'svelte')}

### Clickable Card

{codeBlock(metadata.examples.clickable, 'svelte')}

### Card with Actions

{codeBlock(metadata.examples.actions, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
