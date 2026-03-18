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

### Datagrid.Root

**Preset Key:** \`datagrid\`

**Props:**

<PropsTable props={data.datagridRootProps} />

### Datagrid.Header

**Preset Key:** \`datagrid.header\`

**Props:**

<PropsTable props={data.datagridHeaderProps} />

### Datagrid.Body

**Preset Key:** \`datagrid.body\`

**Props:**

<PropsTable props={data.datagridBodyProps} />

### Datagrid.Footer

**Preset Key:** \`datagrid.footer\`

**Props:**

<PropsTable props={data.datagridFooterProps} />

### Datagrid.Th

**Preset Key:** \`datagrid.th\`

**Props:**

<PropsTable props={data.datagridThProps} />

### Datagrid.Td

**Preset Key:** \`datagrid.td\`

**Props:**

<PropsTable props={data.datagridTdProps} />

### Datagrid.Checkbox

**Preset Key:** \`datagrid.checkbox\`

**Props:**

<PropsTable props={data.datagridCheckboxProps} />

### Datagrid.Tr

**Preset Key:** \`datagrid.tr\`

**Props:**

<PropsTable props={data.datagridTrProps} />

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Row Selection

\`\`\`svelte
{metadata.examples.selectable}
\`\`\`

### Sortable Columns

\`\`\`svelte
{metadata.examples.sortable}
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
