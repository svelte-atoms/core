const basicCode = `
<script lang="ts">
  import { Stepper, Step } from '@svelte-atoms/core/stepper';
  
  let activeStep = $state(0);
<\/script>

<Stepper.Root bind:step={activeStep}>
  <Stepper.Header>
    {#each steps as stepData, i}
      <Step.Root index={i}>
        <Step.Header>
          <Step.Indicator />
          <Step.Title>{stepData.title}<\/Step.Title>
          <Step.Separator />
        <\/Step.Header>
        <Step.Body>
          <p>{stepData.content}<\/p>
        <\/Step.Body>
      <\/Step.Root>
    {/each}
  <\/Stepper.Header>
  
  <Stepper.Body>
    <Stepper.Content />
  <\/Stepper.Body>
  
  <Stepper.Footer>
    {#snippet children({ stepper })}
      <Button onclick={() => stepper.state.navigation.previous()}>Previous<\/Button>
      <Button onclick={() => stepper.state.navigation.next()}>Next<\/Button>
    {/snippet}
  <\/Stepper.Footer>
<\/Stepper.Root>`.trim();

const linearCode = `
<Stepper.Root bind:step={activeStep} linear={true}>
  <!-- Linear progression enforced - only next/previous allowed -->
<\/Stepper.Root>`.trim();

const verticalCode = `
<Stepper.Root bind:step={activeStep} orientation="vertical">
  <Stepper.Header class="flex-col">
    <!-- Steps arranged vertically -->
  <\/Stepper.Header>
<\/Stepper.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  stepper: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Keyboard navigation support',
	'ARIA attributes for step status',
	'Focus management',
	'Screen reader announcements for step changes'
];

const useCases = [
	{
		title: 'Use Case 1',
		description: 'TODO: Describe when and why to use this component in this scenario.'
	},
	{
		title: 'Use Case 2',
		description: 'TODO: Describe another practical application.'
	}
	// TODO: Add 4-6 use cases total
];

// TODO: Remove if simple component, or fill in for compound component
const componentsSummary = [
	{
		name: 'Stepper.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Stepper - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Stepper',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Stepper } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Stepper' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		linear: linearCode,
		vertical: verticalCode
	},
	accessibility: accessibilityFeatures
};
