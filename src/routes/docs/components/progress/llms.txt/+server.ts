import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import { progressLinearProps, progressCircularProps } from '../props';
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
id: progress
title: Progress Component
category: components
subcategory: feedback
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

**Type**: Simple Component

## Use Cases

${metadata.useCases.map((uc) => `- **${uc.title}**: ${uc.description}`).join('\n')}

## Components

- **ProgressLinear** – horizontal bar indicator. Preset key: \`progress.linear\`
- **ProgressCircular** – circular / spinner indicator. Preset key: \`progress.circular\`

## ProgressLinear Props

${propsTable(progressLinearProps)}

## ProgressCircular Props

${propsTable(progressCircularProps)}

## Examples

### Linear – Basic

\`\`\`svelte
${metadata.examples.linearBasic}
\`\`\`

### Linear – Indeterminate

\`\`\`svelte
${metadata.examples.linearIndeterminate}
\`\`\`

### Circular – Basic

\`\`\`svelte
${metadata.examples.circularBasic}
\`\`\`

### Circular – Indeterminate

\`\`\`svelte
${metadata.examples.circularIndeterminate}
\`\`\`

### Custom Label (Composition)

\`\`\`svelte
${metadata.examples.compositionLabel}
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
