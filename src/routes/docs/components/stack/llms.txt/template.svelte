<script lang="ts">
	import { newLine, inlineCode, codeBlock } from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: Compound Component

## Use Cases

{#each metadata.useCases as uc (uc.title)}
- **{uc.title}**: {uc.description}
{/each}

## Components

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Stack.Root

**Preset Key:** {inlineCode('stack.root')}

**Props:**

<PropsTable props={data.stackRootProps} />

### Stack.Item

**Preset Key:** {inlineCode('stack.item')}

**Props:**

<PropsTable props={data.stackItemProps} />

### StackState methods (via bond.state)

| Method | Description |
|--------|-------------|
| bringToFront(id) | Move item to the highest z-index |
| sendToBack(id) | Move item to the lowest z-index |
| bringForward(id) | Increase z-index by one step |
| sendBackward(id) | Decrease z-index by one step |
| raise(id) | Alias for bringToFront |

## Examples

### Image with Overlay

{codeBlock(metadata.examples.basic, 'svelte')}

### App Shell Navigation

{codeBlock(metadata.examples.zOrder, 'svelte')}

### Preset Configuration

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## License

This module is licensed under the MIT License.
