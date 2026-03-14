import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	listRootProps,
	listGroupProps,
	listItemProps,
	listTitleProps,
	listDividerProps
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
id: list
title: List Component
category: components
subcategory: layout
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

### List.Root

**Preset Key:** \`list\`

**Props:**

${propsTable(listRootProps)}

### List.Group

**Preset Key:** \`list.group\`

**Props:**

${propsTable(listGroupProps)}

### List.Item

**Preset Key:** \`list.item\`

**Props:**

${propsTable(listItemProps)}

### List.Title

**Preset Key:** \`list.title\`

**Props:**

${propsTable(listTitleProps)}

### List.Divider

**Preset Key:** \`list.divider\`

**Props:**

${propsTable(listDividerProps)}

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
