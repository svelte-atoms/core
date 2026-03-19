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

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## License

This module is licensed under the MIT License.
