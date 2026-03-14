import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	formRootProps,
	fieldRootProps,
	fieldLabelProps,
	fieldControlProps,
	fieldErrorsProps
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
id: form
title: Form Component
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

### Form.Root

**Preset Key:** \`form\`

**Props:**

${propsTable(formRootProps)}

### Field.Root

**Preset Key:** \`field\`

**Props:**

${propsTable(fieldRootProps)}

### Field.Label

**Preset Key:** \`field.label\`

**Props:**

${propsTable(fieldLabelProps)}

### Field.Control

**Preset Key:** \`field.control\`

**Props:**

${propsTable(fieldControlProps)}

### Field.Errors

**Preset Key:** \`field.errors\`

**Props:**

${propsTable(fieldErrorsProps)}

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
