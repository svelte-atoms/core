# Stepper Module

The Stepper module provides a flexible and accessible implementation of multi-step workflows for Svelte applications. Perfect for forms, wizards, onboarding flows, and any guided multi-step process.

## Features

- **State Management**: Manages active step, completion states, and navigation flow
- **Flexible Layout**: Supports horizontal and vertical orientations
- **Linear & Non-Linear**: Control whether users can skip steps or must complete them sequentially
- **Step States**: Active, completed, disabled, and optional step states
- **Composable**: Mix and match components to build custom stepper interfaces
- **Accessible**: ARIA attributes and keyboard navigation support
- **Animations**: Built-in support for smooth transitions between steps

## Components

### `Stepper.Root`

Root container for the stepper system. Manages the overall state and provides context to child components.

**Preset Key:** `stepper`

**Props:**

{{stepperRootProps}}

Key props:

- `step?: number` - Active step index (0-based), bindable
- `linear?: boolean` - Enforce sequential progression (default: false)
- `disabled?: boolean` - Disable the entire stepper (default: false)
- `orientation?: 'horizontal' | 'vertical'` - Stepper orientation (default: 'horizontal')

### `Stepper.Header`

Container for step indicators and navigation. Typically displays all steps with their current state.

**Preset Key:** `stepper.header`

**Props:**

{{stepperHeaderProps}}

### `Stepper.Body`

Container for the active step's content. Renders the content of the currently active step.

**Preset Key:** `stepper.body`

**Props:**

{{stepperBodyProps}}

### `Stepper.Content`

Renders the active step's content with optional transitions. Automatically displays content from the active Step.Body.

**Preset Key:** `stepper.content`

**Props:**

{{stepperContentProps}}

Key props:

- `enter?: (node: HTMLElement) => any` - Enter animation function
- `exit?: (node: HTMLElement) => any` - Exit animation function

### `Stepper.Footer`

Container for navigation buttons and actions (Previous, Next, Complete, etc.).

**Preset Key:** `stepper.footer`

**Props:**

{{stepperFooterProps}}

### `Step.Root`

Individual step container. Manages step-specific state and provides context to child components.

**Preset Key:** `stepper.step`

**Props:**

{{stepRootProps}}

Key props:

- `index: number` - Step index in the sequence (required)
- `disabled?: boolean` - Whether this step is disabled
- `completed?: boolean` - Whether this step is completed
- `optional?: boolean` - Whether this step is optional

### `Step.Header`

Container for the step's header section, typically containing the indicator, title, and description.

**Preset Key:** `stepper.step.header`

**Props:**

{{stepHeaderProps}}

### `Step.Indicator`

Visual indicator showing the step's state (number, icon, checkmark for completed steps).

**Preset Key:** `stepper.step.indicator`

**Props:**

{{stepIndicatorProps}}

### `Step.Title`

The main title/label for the step.

**Preset Key:** `stepper.step.title`

**Props:**

{{stepTitleProps}}

### `Step.Description`

Secondary description or subtitle for the step.

**Preset Key:** `stepper.step.description`

**Props:**

{{stepDescriptionProps}}

### `Step.Separator`

Visual separator line between step indicators, typically used in horizontal steppers.

**Preset Key:** `stepper.step.separator`

**Props:**

{{stepSeparatorProps}}

### `Step.Body`

Container for the step's main content. This content is rendered in Stepper.Body when the step is active.

**Preset Key:** `stepper.step.body`

**Props:**

{{stepBodyProps}}

## Installation

```bash
npm install @svelte-atoms/core
```

## Basic Usage

```svelte
<script lang="ts">
	import { Stepper, Step } from '@svelte-atoms/core/stepper';

	let activeStep = $state(0);

	const steps = [
		{ title: 'Account', description: 'Create your account' },
		{ title: 'Profile', description: 'Set up your profile' },
		{ title: 'Preferences', description: 'Choose your preferences' }
	];
</script>

<Stepper.Root bind:step={activeStep}>
	{#snippet children({ stepper })}
		<!-- Step Indicators -->
		<Stepper.Header>
			{#each steps as stepData, i}
				<Step.Root index={i}>
					{#snippet children({ step })}
						<Step.Header>
							<Step.Indicator>{i + 1}</Step.Indicator>
							<Step.Title>{stepData.title}</Step.Title>
							<Step.Separator />
						</Step.Header>

						<Step.Body>
							<p>{stepData.description}</p>
							<!-- Your step content here -->
						</Step.Body>
					{/snippet}
				</Step.Root>
			{/each}
		</Stepper.Header>

		<!-- Active Step Content -->
		<Stepper.Body>
			<Stepper.Content />
		</Stepper.Body>

		<!-- Navigation -->
		<Stepper.Footer>
			<button onclick={() => stepper.state.navigation.previous()}>
				Previous
			</button>
			<button onclick={() => stepper.state.navigation.next()}>
				Next
			</button>
		</Stepper.Footer>
	{/snippet}
</Stepper.Root>
```

## Linear Progression

Enforce sequential step progression:

```svelte
<Stepper.Root bind:step={activeStep} linear={true}>
	<!-- Users can only navigate to adjacent steps -->
</Stepper.Root>
```

## Vertical Layout

Create a vertical stepper:

```svelte
<Stepper.Root bind:step={activeStep} orientation="vertical">
	<Stepper.Header class="flex-col">
		<!-- Steps arranged vertically -->
	</Stepper.Header>
</Stepper.Root>
```

## Step States

Access step states in the render snippet:

```svelte
<Step.Root index={i}>
	{#snippet children({ step })}
		{@const isActive = step?.state?.isActive}
		{@const isCompleted = step?.state?.isCompleted}
		{@const isDisabled = step?.state?.isDisabled}

		<Step.Indicator class={isCompleted ? 'completed' : isActive ? 'active' : ''}>
			{#if isCompleted}✓{:else}{i + 1}{/if}
		</Step.Indicator>
	{/snippet}
</Step.Root>
```

## Navigation API

The stepper bond provides navigation methods:

```svelte
{#snippet children({ stepper })}
	<button onclick={() => stepper.state.navigation.next()}>Next</button>
	<button onclick={() => stepper.state.navigation.previous()}>Previous</button>
	<button onclick={() => stepper.state.navigation.goTo(2)}>Go to Step 3</button>
	<button onclick={() => stepper.state.navigation.reset()}>Reset</button>

	<!-- Check navigation state -->
	{@const isFirst = stepper.state.isFirstStep}
	{@const isLast = stepper.state.isLastStep}
{/snippet}
```

## Animations

Add smooth transitions using enter/exit animations:

```svelte
<Stepper.Content
	enter={(node) => {
		const duration = 0.3;
		animate(node, { opacity: [0, 1], y: [20, 0] }, { duration });
		return { duration: duration * 1000 };
	}}
	exit={(node) => {
		const duration = 0.2;
		animate(node, { opacity: [1, 0] }, { duration });
		return { duration: duration * 1000 };
	}}
/>
```

## Optional Steps

Mark steps as optional:

```svelte
<Step.Root index={i} optional={true}>
	{#snippet children({ step })}
		<Step.Title>
			{stepData.title}
			{#if step.state.props.optional}
				<span>(Optional)</span>
			{/if}
		</Step.Title>
	{/snippet}
</Step.Root>
```

## Customization

Use the preset system for consistent styling:

```typescript
import { setPreset } from '@svelte-atoms/core/context';

setPreset({
	stepper: () => ({
		class: 'w-full flex flex-col'
	}),
	'stepper.header': () => ({
		class: 'flex gap-4 mb-6'
	}),
	'stepper.step.indicator': () => ({
		class: 'w-10 h-10 rounded-full flex items-center justify-center',
		variants: {
			state: {
				active: { class: 'bg-primary text-primary-foreground' },
				completed: { class: 'bg-success text-success-foreground' },
				inactive: { class: 'bg-muted text-muted-foreground' }
			}
		}
	})
});
```

## Best Practices

1. **Clear Progress**: Always show users where they are in the process
2. **Validation**: Validate step content before allowing navigation to the next step
3. **Linear vs Non-Linear**: Use linear progression for critical flows (payments, legal agreements)
4. **Optional Steps**: Clearly mark optional steps to set user expectations
5. **Mobile Friendly**: Consider vertical layout or compact indicators for mobile devices
6. **Save Progress**: For long forms, consider auto-saving progress
7. **Accessibility**: Ensure keyboard navigation and screen reader support

## Accessibility

- ARIA attributes for step status and navigation
- Keyboard navigation support (Arrow keys, Tab, Enter)
- Focus management between steps
- Screen reader announcements for step changes
- Disabled state properly communicated

## Common Patterns

### Form Wizard

```svelte
<Stepper.Root bind:step={currentStep} linear={true}>
	{#snippet children({ stepper })}
		<Stepper.Header>
			<Step.Root index={0}>
				<Step.Body>
					<FormStep1 bind:data={formData.step1} />
				</Step.Body>
			</Step.Root>
			<!-- More steps -->
		</Stepper.Header>

		<Stepper.Body>
			<Stepper.Content />
		</Stepper.Body>

		<Stepper.Footer>
			<button onclick={handlePrevious}>Previous</button>
			<button onclick={handleNext}>
				{stepper.state.isLastStep ? 'Submit' : 'Next'}
			</button>
		</Stepper.Footer>
	{/snippet}
</Stepper.Root>
```

### Onboarding Flow

```svelte
<Stepper.Root bind:step={onboardingStep}>
	{#snippet children({ stepper })}
		<Stepper.Header class="justify-center gap-2">
			{#each onboardingSteps as _, i}
				<Step.Root index={i}>
					<Step.Indicator class="w-2 h-2 rounded-full" />
				</Step.Root>
			{/each}
		</Stepper.Header>

		<Stepper.Body>
			<Stepper.Content class="text-center" />
		</Stepper.Body>
	{/snippet}
</Stepper.Root>
```

## Related Components

- Form - For step content with validation
- Button - For navigation actions
- Card - For step content containers
- Tabs - Alternative for non-linear content organization
