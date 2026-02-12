import { propsTable } from '$docs/md/page';
import { buttonProps } from '../props';
import { metadata } from '../shared';

export function GET() {
	return new Response(build(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}

function build(): string {
	return `
# ${metadata.componentTitle} Module

${metadata.componentDescription}

**Type**: ${metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

${metadata.useCases.map((uc) => `- **${uc.title}**: ${uc.description}`).join('\n')}

## Props

**Preset Key:** \`button\`

${propsTable(buttonProps)}

## Examples

### Basic Example

\`\`\`svelte
${metadata.examples.button}
\`\`\`

### Variants

\`\`\`svelte
${metadata.examples.variants}
\`\`\`

### Sizes

\`\`\`svelte
${metadata.examples.sizes}
\`\`\`

### States

\`\`\`svelte
${metadata.examples.states}
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
