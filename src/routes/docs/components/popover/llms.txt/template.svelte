<script lang="ts">
	import {  codeBlock ,  inlineCode, list, newLine } from '$docs/md/template';
	import { FrontMatter, PropsTable } from '$docs/md/components';

	let { data } = $props();
	const { metadata, frontmatter } = $derived(data);
</script>

<FrontMatter {frontmatter} />

# {metadata.componentTitle} Module

{metadata.componentDescription}

**Type**: {metadata.componentType === 'compound' ? 'Compound Component' : 'Simple Component'}

## Use Cases

{list(metadata.useCases.map((uc) => `**${uc.title}**: ${uc.description}`))}

## Components

The Popover module consists of the following components:

{list(metadata.componentsSummary.map((comp) => `**${comp.name}**: ${comp.description}`))}

### Popover.Root

**Preset Key:** {inlineCode('popover')}

**Props:**

<PropsTable props={data.popoverRootProps} />

### Popover.Trigger

**Preset Key:** {inlineCode('popover.trigger')}

**Props:**

<PropsTable props={data.popoverTriggerProps} />

### Popover.Content

**Preset Key:** {inlineCode('popover.content')}

**Props:**

<PropsTable props={data.popoverContentProps} />

### Popover.Indicator

**Preset Key:** {inlineCode('popover.indicator')}

**Props:**

<PropsTable props={data.popoverIndicatorProps} />

### Popover.Arrow

**Preset Key:** {inlineCode('popover.arrow')}

**Props:**

<PropsTable props={data.popoverArrowProps} />

## Classes

### {inlineCode('PopoverBond')}

The main class for managing the popover's state and elements.

#### Properties

- {inlineCode('position')}: Tracks the computed position of the popover.

#### Methods

- {inlineCode('trigger(props)')}: Returns attributes and event handlers for the trigger element.
- {inlineCode('overlay(props)')}: Returns attributes and event handlers for the overlay element.
- {inlineCode('indicator(props)')}: Returns attributes and event handlers for the indicator element.
- {inlineCode('arrow(props)')}: Returns attributes and event handlers for the arrow element.
- {inlineCode('share()')}: Shares the popover context.

#### Static Methods

- {inlineCode('PopoverBond.get')}: Retrieves the popover context.
- {inlineCode('PopoverBond.set')}: Sets the popover context.

### {inlineCode('PopoverState')}

Manages the state of the popover bond.

#### Properties

- {inlineCode('isOpen')}: Indicates whether the popover is open.

#### Methods

- {inlineCode('open()')}: Opens the popover.
- {inlineCode('close()')}: Closes the popover.
- {inlineCode('toggle()')}: Toggles the popover's open state.

## Types

### {inlineCode('PopoverParams')}

Defines parameters for customizing the popover's behavior.

### {inlineCode('PopoverStateProps')}

Extends {inlineCode('StateProps')} to include popover-specific properties.

### {inlineCode('TriggerParams')}

Defines parameters for the trigger element.

### {inlineCode('PopoverDomElements')}

Defines the DOM elements used in the popover.

## Examples

### Basic Example

{codeBlock(metadata.examples.basic, 'svelte')}

### Popover Positions

{codeBlock(metadata.examples.positions, 'svelte')}

### Controlled Popover (User Account Menu)

{codeBlock(metadata.examples.controlled, 'svelte')}

### Preset Configuration

You can customize the default styles for Popover components by defining presets in your configuration:

{codeBlock(metadata.examples.preset, 'typescript')}

## Accessibility

The module ensures accessibility by providing ARIA attributes and keyboard navigation:

{list(metadata.accessibility)}

## Dependencies

- {inlineCode('@floating-ui/dom')}
- {inlineCode('motion')}
- {inlineCode('es-toolkit')}

## License

This module is licensed under the MIT License.
