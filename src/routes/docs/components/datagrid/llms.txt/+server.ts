import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	datagridRootProps,
	datagridHeaderProps,
	datagridBodyProps,
	datagridFooterProps,
	datagridThProps,
	datagridTdProps,
	datagridCheckboxProps,
	datagridTrProps
} from '../props';
import { metadata } from '../shared';

export function GET() {
	return new Response(build(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}

function build(): string {
	return md`
---
id: datagrid
title: Datagrid Component
category: components
subcategory: display
depth: beginner
prerequisites:
  - atoms
  - styling
related:
  - variants
  - preset
---

# ${metadata.componentTitle} Module

${metadata.componentDescription}

**Type**: ${metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

${metadata.useCases.map((uc) => `- **${uc.title}**: ${uc.description}`).join('\n')}

## Components

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Datagrid.Root

**Preset Key:** \`datagrid\`

**Props:**

${propsTable(datagridRootProps)}

### Datagrid.Header

**Preset Key:** \`datagrid.header\`

**Props:**

${propsTable(datagridHeaderProps)}

### Datagrid.Body

**Preset Key:** \`datagrid.body\`

**Props:**

${propsTable(datagridBodyProps)}

### Datagrid.Footer

**Preset Key:** \`datagrid.footer\`

**Props:**

${propsTable(datagridFooterProps)}

### Datagrid.Th

**Preset Key:** \`datagrid.th\`

**Props:**

${propsTable(datagridThProps)}

### Datagrid.Td

**Preset Key:** \`datagrid.td\`

**Props:**

${propsTable(datagridTdProps)}

### Datagrid.Checkbox

**Preset Key:** \`datagrid.checkbox\`

**Props:**

${propsTable(datagridCheckboxProps)}

### Datagrid.Tr

**Preset Key:** \`datagrid.tr\`

**Props:**

${propsTable(datagridTrProps)}

## Examples

### Basic Example

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

## License

This module is licensed under the MIT License.
`.trim();
}
