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

The Alert module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Alert.Root

**Preset Key:** {inlineCode('alert')}

<PropsTable props={data.alertRootProps} />

### Sub-Components (Content, Title, Description, Icon, Actions, CloseButton)

<PropsTable props={data.alertSubPartProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Variants

{codeBlock(metadata.examples.variants, 'svelte')}

### Dismissible Alert

{codeBlock(metadata.examples.dismissible, 'svelte')}

### Alert with Actions

{codeBlock(metadata.examples.actions, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## License

This module is licensed under the MIT License.
