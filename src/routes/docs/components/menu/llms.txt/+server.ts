import { propsTable } from '$docs/md/page';
import { menuItemProps, menuListProps } from '../props';
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

## Components

The Menu module consists of the following components:

${metadata.componentsSummary.map((comp) => `- **${comp.name}**: ${comp.description}`).join('\n')}

### Menu.List (Root)

**Preset Key:** \`menu\`

**Props:**

${propsTable(menuListProps)}

### Menu.Item

**Preset Key:** \`menu.item\`

**Props:**

${propsTable(menuItemProps)}

## Examples

### Basic Menu

\`\`\`svelte
${metadata.examples.basic}
\`\`\`

### Interactive Menu

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
