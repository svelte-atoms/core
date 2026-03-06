import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	selectRootProps,
	selectTriggerProps,
	selectItemProps,
	selectQueryProps,
	selectSelectionsProps,
	selectSelectionProps
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
id: select
title: Select Component
category: components
subcategory: overlay
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

The Select module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Select.Root

**Preset Key:** \`select\`

**Props:**

${propsTable(selectRootProps)}

### Select.Trigger

**Preset Key:** \`select.trigger\`

**Props:**

${propsTable(selectTriggerProps)}

### Select.Item

**Preset Key:** \`select.item\`

**Props:**

${propsTable(selectItemProps)}

### Select.Query

**Preset Key:** \`select.query\`

**Props:**

${propsTable(selectQueryProps)}

### Select.Selections

**Preset Key:** \`select.selections\`

**Props:**

${propsTable(selectSelectionsProps)}

### Select.Selection

**Preset Key:** \`select.selection\`

**Props:**

${propsTable(selectSelectionProps)}

## Examples

### Basic Select

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Multiple Selection with Search

\`\`\`svelte
${metadata.examples.multiple}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Utilities

### \`filterSelectData\`

Helper function for filtering select items based on a query string.

\`\`\`typescript
const filteredItems = filterSelectData(
  () => items,
  (query, item) => item.label.toLowerCase().includes(query.toLowerCase())
);
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

## Dependencies

- \`@floating-ui/dom\` (for positioning)
- \`motion\` (for animations)

## License

This module is licensed under the MIT License.
`.trim();
}
