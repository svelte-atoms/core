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

### Combobox.Root

**Preset Key:** \`combobox\`

**Props:**

<PropsTable props={data.comboboxRootProps} />

### Combobox.Selections

**Preset Key:** \`combobox.selections\`

**Props:**

<PropsTable props={data.comboboxSelectionsProps} />

### Combobox.Selection

**Preset Key:** \`combobox.selection\`

**Props:**

<PropsTable props={data.comboboxSelectionProps} />

### Combobox.Control

**Preset Key:** \`combobox.control\`

**Props:**

<PropsTable props={data.comboboxControlProps} />

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
