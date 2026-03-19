<script lang="ts">
	import { newLine, inlineCode, codeBlock } from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{#each metadata.useCases as uc (uc.title)}
- **{uc.title}**: {uc.description}
{/each}

## Components

The Card module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

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

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## License

This module is licensed under the MIT License.
