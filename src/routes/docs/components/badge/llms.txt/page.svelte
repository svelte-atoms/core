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

## Props

**Preset Key:** \`badge\`

<PropsTable props={data.badgeProps} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Variants

\`\`\`svelte
{metadata.examples.variants}
\`\`\`

### Sizes

\`\`\`svelte
{metadata.examples.sizes}
\`\`\`

### Notification Badge

\`\`\`svelte
{metadata.examples.notification}
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
