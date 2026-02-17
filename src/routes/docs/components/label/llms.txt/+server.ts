import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
// TODO: Import all props from props.ts
// import { labelProps } from '../props';
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
id: label
title: Label Component
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

${metadata.componentType === 'compound' ? `
## Components

The Label module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}
` : ''}

### Label.Root

**Preset Key:** \`label\`

**Props:**

TODO: Add propsTable(labelProps)

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
