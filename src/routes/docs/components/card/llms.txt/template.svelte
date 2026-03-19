<script lang="ts">
	import { newLine } from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />{newLine()}

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

**Preset Key:** \`card\`

<PropsTable props={data.cardRootProps} />

### Sub-Components (Header, Title, Subtitle, Description, Body, Footer, Media)

<PropsTable props={data.cardSubPartProps} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Variants

\`\`\`svelte
{metadata.examples.variants}
\`\`\`

### Clickable Card

\`\`\`svelte
{metadata.examples.clickable}
\`\`\`

### Card with Actions

\`\`\`svelte
{metadata.examples.actions}
\`\`\`

### Preset Configuration

\`\`\`typescript
{metadata.examples.preset}
\`\`\`

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## License

This module is licensed under the MIT License.
