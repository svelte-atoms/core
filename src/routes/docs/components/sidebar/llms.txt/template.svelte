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

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Sidebar.Root

**Preset Key:** \`sidebar\`

**Props:**

<PropsTable props={data.sidebarRootProps} />

### Sidebar.Content

**Preset Key:** \`sidebar.content\`

**Props:**

<PropsTable props={data.sidebarContentProps} />

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
