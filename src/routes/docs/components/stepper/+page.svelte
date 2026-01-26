<script lang="ts">
	import { Stepper, Step } from '$lib/components/stepper';
	import { Button } from '$lib/components/button';
	import { animate } from 'motion';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		DemoExample,
		Props,
		CodeBlock
	} from '$docs/components';

	const basicCode = `<script lang="ts">
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
<\/Stepper.Root>`;

	const linearCode = `<Stepper.Root bind:step={activeStep} linear={true}>
  <!-- Linear progression enforced - only next/previous allowed -->
<\/Stepper.Root>`;

	const verticalCode = `<Stepper.Root bind:step={activeStep} orientation="vertical">
  <Stepper.Header class="flex-col">
    <!-- Steps arranged vertically -->
  <\/Stepper.Header>
<\/Stepper.Root>`;

	let activeStep = $state(0);
	const steps = [
		{ title: 'Account', description: 'Enter your details', content: 'Account information form' },
		{ title: 'Address', description: 'Shipping details', content: 'Address form' },
		{ title: 'Payment', description: 'Payment method', content: 'Payment selection' },
		{ title: 'Review', description: 'Confirm order', content: 'Review your order', optional: true }
	];
</script>

<svelte:head>
	<title>Stepper - Svelte Atoms</title>
	<meta
		name="description"
		content="Multi-step workflow component for building guided processes and forms."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Stepper' }]} />

	<PageHeader
		title="Stepper"
		description="A flexible stepper component for building multi-step workflows, forms, and guided processes with support for linear and non-linear progression."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Stepper, Step &#125; from '@svelte-atoms/core/stepper';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the stepper appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Stepper components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core/context';

setPreset({
  'stepper': () => ({
    class: 'flex flex-col w-full'
  }),
  'stepper.header': () => ({
    class: 'flex gap-2 mb-4'
  }),
  'stepper.body': () => ({
    class: 'flex-1 p-4'
  }),
  'stepper.footer': () => ({
    class: 'flex justify-between mt-4'
  }),
  'stepper.step': () => ({
    class: 'flex-1'
  }),
  'stepper.step.indicator': () => ({
    class: 'flex items-center justify-center w-8 h-8 rounded-full bg-muted'
  }),
  'stepper.step.header': () => ({
    class: 'flex items-center gap-2'
  }),
  'stepper.step.separator': () => ({
    class: 'flex-1 h-px bg-border'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different stepper variations">
		<div class="space-y-8">
			<DemoExample title="Basic Stepper" description="Simple horizontal stepper" code={basicCode}>
				<Stepper.Root bind:step={activeStep} linear={true}>
					{#snippet children({ stepper })}
						<Stepper.Header class="flex gap-2 mb-6">
							{#each steps as item, i}
								<Step.Root index={i} optional={item.optional}>
									{#snippet children({ step })}
										{@const isActive = step?.state?.isActive}
										{@const isCompleted = step?.state?.isCompleted}

										<Step.Header class="flex flex-col gap-2 flex-1">
											<div class="flex items-center w-full">
												<Step.Indicator
													class={[
														'flex items-center justify-center w-8 h-8 rounded-full text-sm transition-colors',
														isCompleted
															? 'bg-primary text-primary-foreground'
															: isActive
																? 'bg-primary/20 text-primary border-2 border-primary'
																: 'bg-muted text-muted-foreground'
													]}
												>
													{#if isCompleted}
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														>
															<polyline points="20 6 9 17 4 12" />
														</svg>
													{:else}
														{i + 1}
													{/if}
												</Step.Indicator>
												{#if i < steps.length - 1}
													<Step.Separator
														class={[
															'flex-1 h-px mx-2 transition-colors',
															isCompleted ? 'bg-primary' : 'bg-border'
														]}
													/>
												{/if}
											</div>

											<div class="flex flex-col">
												<Step.Title
													class={[
														'text-sm font-medium',
														isActive ? 'text-foreground' : 'text-muted-foreground'
													]}
												>
													{item.title}
													{#if item.optional}
														<span class="text-xs opacity-75">(Optional)</span>
													{/if}
												</Step.Title>
												<Step.Description class="text-xs text-muted-foreground">
													{item.description}
												</Step.Description>
											</div>
										</Step.Header>

										<Step.Body>
											<div class="p-4">
												<h3 class="text-lg font-semibold mb-2">{item.title}</h3>
												<p class="text-muted-foreground">{item.content}</p>
											</div>
										</Step.Body>
									{/snippet}
								</Step.Root>
							{/each}
						</Stepper.Header>

						<Stepper.Body class="border rounded-lg min-h-[200px]">
							<Stepper.Content
								class="p-6"
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
						</Stepper.Body>

						<Stepper.Footer class="flex justify-between mt-4">
							<Button
								onclick={() => stepper.state.navigation.previous()}
								disabled={stepper.state.isFirstStep}
								class="border border-border hover:bg-muted"
							>
								Previous
							</Button>
							<div class="flex gap-2">
								{#if !stepper.state.isLastStep}
									<Button
										onclick={() => stepper.state.navigation.next()}
										class="bg-primary text-primary-foreground hover:bg-primary/90"
									>
										Next
									</Button>
								{:else}
									<Button
										onclick={() => stepper.state.navigation.reset()}
										class="bg-primary text-primary-foreground hover:bg-primary/90"
									>
										Complete
									</Button>
								{/if}
							</div>
						</Stepper.Footer>
					{/snippet}
				</Stepper.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="Component Structure">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				The Stepper component consists of two main parts:
			</p>

			<div class="rounded-lg border p-4 space-y-4">
				<div>
					<h4 class="font-semibold mb-2">Stepper Components</h4>
					<ul class="list-disc list-inside space-y-1 text-sm text-muted-foreground">
						<li><code class="text-xs">Stepper.Root</code> - Main container managing state</li>
						<li><code class="text-xs">Stepper.Header</code> - Container for step indicators</li>
						<li><code class="text-xs">Stepper.Body</code> - Container for step content</li>
						<li><code class="text-xs">Stepper.Content</code> - Active step content renderer</li>
						<li><code class="text-xs">Stepper.Footer</code> - Container for navigation buttons</li>
					</ul>
				</div>

				<div>
					<h4 class="font-semibold mb-2">Step Components</h4>
					<ul class="list-disc list-inside space-y-1 text-sm text-muted-foreground">
						<li><code class="text-xs">Step.Root</code> - Individual step container</li>
						<li><code class="text-xs">Step.Header</code> - Step header section</li>
						<li><code class="text-xs">Step.Indicator</code> - Visual step indicator</li>
						<li><code class="text-xs">Step.Title</code> - Step title text</li>
						<li><code class="text-xs">Step.Description</code> - Step description</li>
						<li><code class="text-xs">Step.Separator</code> - Visual separator between steps</li>
						<li><code class="text-xs">Step.Body</code> - Step content (shown when active)</li>
					</ul>
				</div>
			</div>
		</div>
	</Section>

	<Section title="Properties">
		<Props component="stepper" />
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Keyboard navigation support',
				'ARIA attributes for step status',
				'Focus management',
				'Screen reader announcements for step changes'
			]}
		/>
	</Section>
</div>
