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

### Scrollable.Root

**Preset Key:** \`scrollable\`

**Props:**

<PropsTable props={data.scrollableRootProps} />

### Scrollable.Container

**Preset Key:** \`scrollable.container\`

**Props:**

<PropsTable props={data.scrollableContainerProps} />

### Scrollable.Content

**Preset Key:** \`scrollable.content\`

**Props:**

<PropsTable props={data.scrollableContentProps} />

### Scrollable.Track

**Preset Key:** \`scrollable.track\`

**Props:**

<PropsTable props={data.scrollableTrackProps} />

### Scrollable.Thumb

**Preset Key:** \`scrollable.thumb\`

**Props:**

<PropsTable props={data.scrollableThumbProps} />

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
