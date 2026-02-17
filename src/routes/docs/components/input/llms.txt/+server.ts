import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import { inputRootProps, inputControlProps } from '../props';
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
id: input
title: Input Component
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

The Input module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Input.Root

**Preset Key:** \`input\`

${propsTable(inputRootProps)}

### Input.Control

**Preset Key:** \`input.control\`

${propsTable(inputControlProps)}

## Examples

### Basic Example

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Input Types

\`\`\`svelte
${metadata.examples.types}
\`\`\`

### With Icon

\`\`\`svelte
${metadata.examples.withIcon}
\`\`\`

### With Placeholder

\`\`\`svelte
${metadata.examples.withPlaceholder}
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
