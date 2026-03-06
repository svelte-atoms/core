import { propsTable } from '$docs/md/page';
import { md } from '$docs/md/template';
import { dropdownMenuItemProps, dropdownMenuListProps } from '../props';
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
id: dropdown-menu
title: Dropdown Menu Component
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

The Dropdown Menu module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### DropdownMenu.List (Root)

**Preset Key:** \`dropdown-menu\`

**Props:**

${propsTable(dropdownMenuListProps)}

### DropdownMenu.Item

**Preset Key:** \`dropdown-menu.item\`

**Props:**

${propsTable(dropdownMenuItemProps)}

## Examples

### Basic Dropdown Menu

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Interactive Dropdown Menu

\`\`\`svelte
${metadata.examples.interactive}
\`\`\`

### Preset Configuration

\`\`\`typescript
${metadata.examples.preset}
\`\`\`

## Accessibility

${metadata.accessibility.map((feature) => `- ${feature}`).join('\n')}

## Best Practices

1. **Clear Labels**: Use descriptive, action-oriented labels for menu items
2. **Grouping**: Group related menu items together
3. **Keyboard Support**: Ensure all menu items are keyboard accessible
4. **Visual Feedback**: Provide clear hover and focus states
5. **Disabled Items**: Clearly indicate disabled menu items

## Dependencies

- Built on top of Popover module for positioning
- Uses \`@floating-ui/dom\` for positioning calculations

## License

This module is licensed under the MIT License.
`.trim();
}
