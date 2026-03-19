<script lang="ts">
	import { newLine } from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />{newLine()}

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{#each metadata.useCases as uc (uc.title)}
- **{uc.title}**: {uc.description}
{/each}

## Components

The Popover module consists of the following components:

{#each metadata.componentsSummary as comp (comp.name)}
- **{comp.name}**: {comp.description}
{/each}

### Popover.Root

**Preset Key:** \`popover\`

**Props:**

<PropsTable props={data.popoverRootProps} />

### Popover.Trigger

**Preset Key:** \`popover.trigger\`

**Props:**

<PropsTable props={data.popoverTriggerProps} />

### Popover.Content

**Preset Key:** \`popover.content\`

**Props:**

<PropsTable props={data.popoverContentProps} />

### Popover.Indicator

**Preset Key:** \`popover.indicator\`

**Props:**

<PropsTable props={data.popoverIndicatorProps} />

### Popover.Arrow

**Preset Key:** \`popover.arrow\`

**Props:**

<PropsTable props={data.popoverArrowProps} />

## Classes

### \`PopoverBond\`

The main class for managing the popover's state and elements.

#### Properties

- \`position\`: Tracks the computed position of the popover.

#### Methods

- \`trigger(props)\`: Returns attributes and event handlers for the trigger element.
- \`overlay(props)\`: Returns attributes and event handlers for the overlay element.
- \`indicator(props)\`: Returns attributes and event handlers for the indicator element.
- \`arrow(props)\`: Returns attributes and event handlers for the arrow element.
- \`share()\`: Shares the popover context.

#### Static Methods

- \`PopoverBond.get\`: Retrieves the popover context.
- \`PopoverBond.set\`: Sets the popover context.

### \`PopoverState\`

Manages the state of the popover bond.

#### Properties

- \`isOpen\`: Indicates whether the popover is open.

#### Methods

- \`open()\`: Opens the popover.
- \`close()\`: Closes the popover.
- \`toggle()\`: Toggles the popover's open state.

## Types

### \`PopoverParams\`

Defines parameters for customizing the popover's behavior.

### \`PopoverStateProps\`

Extends \`StateProps\` to include popover-specific properties.

### \`TriggerParams\`

Defines parameters for the trigger element.

### \`PopoverDomElements\`

Defines the DOM elements used in the popover.

## Examples

### Basic Example

\`\`\`svelte
{metadata.examples.basic}
\`\`\`

### Popover Positions

\`\`\`svelte
{metadata.examples.positions}
\`\`\`

### Controlled Popover (User Account Menu)

\`\`\`svelte
{metadata.examples.controlled}
\`\`\`

### Preset Configuration

You can customize the default styles for Popover components by defining presets in your configuration:

\`\`\`typescript
{metadata.examples.preset}
\`\`\`

## Accessibility

The module ensures accessibility by providing ARIA attributes and keyboard navigation:

{#each metadata.accessibility as feature (feature)}
- {feature}
{/each}

## Dependencies

- \`@floating-ui/dom\`
- \`motion\`
- \`es-toolkit\`

## License

This module is licensed under the MIT License.
