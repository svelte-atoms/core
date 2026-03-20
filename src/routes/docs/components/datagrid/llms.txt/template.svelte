<script lang="ts">
	import {  codeBlock ,  inlineCode, list} from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{list(metadata.useCases.map((uc) => `**${uc.title}**: ${uc.description}`))}

## Components

{list(metadata.componentsSummary.map((comp) => `**${comp.name}**: ${comp.description}`))}

### Datagrid.Root

**Preset Key:** {inlineCode('datagrid')}

**Props:**

<PropsTable props={data.datagridRootProps} />

### Datagrid.Header

**Preset Key:** {inlineCode('datagrid.header')}

**Props:**

<PropsTable props={data.datagridHeaderProps} />

### Datagrid.Body

**Preset Key:** {inlineCode('datagrid.body')}

**Props:**

<PropsTable props={data.datagridBodyProps} />

### Datagrid.Footer

**Preset Key:** {inlineCode('datagrid.footer')}

**Props:**

<PropsTable props={data.datagridFooterProps} />

### Datagrid.Th

**Preset Key:** {inlineCode('datagrid.th')}

**Props:**

<PropsTable props={data.datagridThProps} />

### Datagrid.Td

**Preset Key:** {inlineCode('datagrid.td')}

**Props:**

<PropsTable props={data.datagridTdProps} />

### Datagrid.Checkbox

**Preset Key:** {inlineCode('datagrid.checkbox')}

**Props:**

<PropsTable props={data.datagridCheckboxProps} />

### Datagrid.Tr

**Preset Key:** {inlineCode('datagrid.tr')}

**Props:**

<PropsTable props={data.datagridTrProps} />

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Row Selection

{codeBlock(metadata.examples.selectable, 'svelte')}

### Sortable Columns

{codeBlock(metadata.examples.sortable, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{list(metadata.accessibility)}

## License

This module is licensed under the MIT License.
