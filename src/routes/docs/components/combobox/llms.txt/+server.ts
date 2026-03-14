import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	comboboxRootProps,
	comboboxSelectionsProps,
	comboboxSelectionProps,
	comboboxControlProps
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
id: combobox
title: Combobox Component
category: components
subcategory: form
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

### Combobox.Root

**Preset Key:** \`combobox\`

**Props:**

${propsTable(comboboxRootProps)}

### Combobox.Selections

**Preset Key:** \`combobox.selections\`

**Props:**

${propsTable(comboboxSelectionsProps)}

### Combobox.Selection

**Preset Key:** \`combobox.selection\`

**Props:**

${propsTable(comboboxSelectionProps)}

### Combobox.Control

**Preset Key:** \`combobox.control\`

**Props:**

${propsTable(comboboxControlProps)}

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
