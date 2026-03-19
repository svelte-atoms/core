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

The Input module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Input.Root

**Preset Key:** {inlineCode('input')}

<PropsTable props={data.inputRootProps} />

### Input.Control

**Preset Key:** {inlineCode('input.control')}

<PropsTable props={data.inputControlProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Input Types

{codeBlock(metadata.examples.types, 'svelte')}

### With Icon

{codeBlock(metadata.examples.withIcon, 'svelte')}

### With Placeholder

{codeBlock(metadata.examples.withPlaceholder, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## License

This module is licensed under the MIT License.
