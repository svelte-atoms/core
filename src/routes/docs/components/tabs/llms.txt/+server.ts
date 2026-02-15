import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import {
	tabsRootProps,
	tabHeaderProps,
	tabBodyProps,
	tabDescriptionProps,
	tabsHeaderProps,
	tabsBodyProps,
	tabsContentProps
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
id: tabs
title: Tabs Component
category: components
subcategory: navigation
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

The Tabs module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Tabs.Root

**Preset Key:** \`tabs\`

**Props:**

${propsTable(tabsRootProps)}

### Tabs.Header

**Preset Key:** \`tabs.header\`

**Props:**

${propsTable(tabsHeaderProps)}

### Tabs.Body

**Preset Key:** \`tabs.body\`

**Props:**

${propsTable(tabsBodyProps)}

### Tabs.Content

**Preset Key:** \`tabs.content\`

**Props:**

${propsTable(tabsContentProps)}

### Tab.Header

**Preset Key:** \`tab.header\`

**Props:**

${propsTable(tabHeaderProps)}

### Tab.Body

**Preset Key:** \`tab.body\`

**Props:**

${propsTable(tabBodyProps)}

### Tab.Description

**Preset Key:** \`tab.description\`

**Props:**

${propsTable(tabDescriptionProps)}

## Examples

### Basic Usage

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

## Best Practices

1. **Unique Tab Values**: Ensure each tab has a unique value for proper identification
2. **Meaningful Labels**: Use clear, descriptive labels for tab headers
3. **Content Organization**: Group related content logically within tabs
4. **Default Tab**: Always specify a default active tab
5. **Loading States**: Handle loading states for tab content that requires data fetching

## License

This module is licensed under the MIT License.
`.trim();
}
