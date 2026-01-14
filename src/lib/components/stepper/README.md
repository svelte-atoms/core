# Stepper

A flexible stepper component for building multi-step workflows, forms, and guided processes. The stepper module provides a complete set of composable components to create linear or non-linear step-based interfaces.

## Usage

The stepper component is built with a modular architecture, allowing you to compose step-based workflows with full control over structure and behavior.

```svelte
<script>
  import { Stepper, Step } from '@svelte-atoms/core';
  import { Button } from '@svelte-atoms/core';
  
  const steps = [
    { header: 'Account Information', body: 'Enter your personal details' },
    { header: 'Address', body: 'Provide your shipping address' },
    { header: 'Review', body: 'Review and confirm', optional: true }
  ];
  
  let activeStepIndex = $state(0);
</script>

<Stepper.Root bind:activeStep={activeStepIndex} orientation="horizontal" linear={true}>
  {#snippet children({ stepper })}
    <!-- Step indicators -->
    <Stepper.Header>
      {#each steps as stepData, i}
        <Step.Root index={i} header={stepData.header} body={stepData.body}>
          {#snippet children({ step })}
            <Step.Header>
              <Step.Indicator />
              <Step.Separator />
              <Step.Title>{stepData.header}</Step.Title>
              <Step.Description>{stepData.body}</Step.Description>
            </Step.Header>
            
            <!-- Step content -->
            <Step.Body>
              <h3>Step {i + 1}: {stepData.header}</h3>
              <p>{stepData.body}</p>
            </Step.Body>
          {/snippet}
        </Step.Root>
      {/each}
    </Stepper.Header>
    
    <!-- Active step content -->
    <Stepper.Body>
      <Stepper.Content />
    </Stepper.Body>
    
    <!-- Navigation -->
    <Stepper.Footer>
      <Button 
        disabled={stepper.state.isFirstStep}
        onclick={() => stepper.state.navigation.previous()}
      >
        Previous
      </Button>
      
      <Button onclick={() => stepper.state.navigation.reset()}>
        Reset
      </Button>
      
      {#if stepper.state.isLastStep}
        <Button onclick={() => alert('Complete!')}>Complete</Button>
      {:else}
        <Button onclick={() => stepper.state.navigation.next()}>Next</Button>
      {/if}
    </Stepper.Footer>
  {/snippet}
</Stepper.Root>
```

## Components

The stepper module consists of two main components and their sub-components:

### Stepper (Root Container)

The main container component that manages the overall stepper state and layout.

- **`Stepper.Root`** - The root stepper container
- **`Stepper.Header`** - Container for step indicators/navigation
- **`Stepper.Body`** - Container for step content
- **`Stepper.Content`** - Individual step content wrapper
- **`Stepper.Footer`** - Container for navigation buttons/actions

### Step (Individual Step)

Represents a single step in the workflow with its own state and content.

- **`Step.Root`** - The root step container
- **`Step.Header`** - Step header with title/indicator
- **`Step.Title`** - Step title text
- **`Step.Description`** - Step description/subtitle
- **`Step.Indicator`** - Visual step indicator (number, icon, status)
- **`Step.Separator`** - Visual separator between steps
- **`Step.Body`** - Step content area

## Features

- **Flexible Layout** - Horizontal or vertical orientation
- **State Management** - Built-in step state (active, completed, disabled, optional)
- **Navigation Control** - Linear or non-linear step progression
- **Composable** - Mix and match components to build custom steppers
- **Accessible** - ARIA attributes and keyboard navigation support
- **Customizable** - Full control over styling and behavior through the atoms system
