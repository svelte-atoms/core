<script lang="ts">
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

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Tree.Root

**Preset Key:** \`tree\`

**Props:**

<PropsTable props={data.treeRootProps} />

### Tree.Header

**Preset Key:** \`tree.header\`

**Props:**

<PropsTable props={data.treeHeaderProps} />

### Tree.Body

**Preset Key:** \`tree.body\`

**Props:**

<PropsTable props={data.treeBodyProps} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
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
