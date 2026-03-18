<script lang="ts">
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{#each metadata.useCases as uc (uc.title)}
- **{uc.title}**: {uc.description}
{/each}

## Components

The Collapsible module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Collapsible.Root

**Preset Key:** \`collapsible\`

**Props:**

<PropsTable props={data.collapsibleRootProps} />

## Examples

### Basic Collapsible

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Controlled State

\`\`\`svelte
{metadata.examples.controlled}
\`\`\`

### Preset Configuration

\`\`\`typescript
{metadata.examples.preset}
\`\`\`

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## Best Practices

1. **Clear Triggers**: Make it obvious that the element can be expanded/collapsed
2. **Visual Feedback**: Provide visual indicators of the current state (open/closed)
3. **Smooth Transitions**: Use transitions to make state changes feel natural
4. **Keyboard Support**: Ensure the trigger is keyboard accessible
5. **Initial State**: Consider the appropriate default state for your use case

## License

This module is licensed under the MIT License.
