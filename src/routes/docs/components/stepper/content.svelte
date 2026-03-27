<script lang="ts">
	import { Stepper, Step } from '$lib/components/stepper';
	import { Button } from '$lib/components/button';
	import {
		DocPage,
		DocSection,
		DocExample,
		DocProps,
		DocOnly,
		DocInstallation,
		DocAccessibility,
		DocCode,
	} from '$docs/components';
	import { stepperRootProps, stepperHeaderProps, stepperBodyProps, stepperContentProps, stepperFooterProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';
	import type { StepperBond } from '$lib/components/stepper/bond.svelte';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'stepper',
		title: 'Stepper',
		category: 'components',
		depth: 'intermediate',
		prerequisites: [],
		related: []
	};

	const steps = [
		{ header: 'Account',  body: 'Enter your account details.' },
		{ header: 'Profile',  body: 'Fill in your profile information.' },
		{ header: 'Confirm',  body: 'Review and submit.' },
	];

	let activeStep = $state(0);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Stack', href: '/docs/components/stack' }}
	next={{ label: 'Tabs', href: '/docs/components/tabs' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Compound Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the stepper appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Multi-step wizard component">
		<DocExample title="Basic Stepper" description="Navigate through steps with Previous / Next controls." code={metadata.examples.basic}>
			<div class="w-full max-w-lg">
				<Stepper.Root bind:step={activeStep} linear>
					<Stepper.Header class="flex justify-between">
						{#each steps as stepData, i (i)}
							<Step.Root index={i} header={stepData.header} body={stepData.body}>
								<Step.Header class="flex flex-col gap-2 flex-1">
									<div class="flex items-center w-full">
										<Step.Indicator />
										{#if i < steps.length - 1}
											<Step.Separator />
										{/if}
									</div>
									<Step.Title class="text-xs">{stepData.header}</Step.Title>
								</Step.Header>
							</Step.Root>
						{/each}
					</Stepper.Header>

					<Stepper.Body class="mt-4">
						{#each steps as stepData, i (i)}
							<Stepper.Content value={i}>
								<p class="text-muted-foreground py-4 text-sm">{stepData.body}</p>
							</Stepper.Content>
						{/each}
					</Stepper.Body>

					<Stepper.Footer class="mt-4 flex justify-between">
						{#snippet children({ stepper })}
							<Button variant="outline" onclick={() => stepper.state.navigation.previous()} disabled={activeStep === 0}>
								Previous
							</Button>
							<Button onclick={() => stepper.state.navigation.next()} disabled={activeStep === steps.length - 1}>
								Next
							</Button>
						{/snippet}
					</Stepper.Footer>
				</Stepper.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Stepper.Root

**Preset Key:** `stepper`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Stepper.Root

**Preset Key:** `stepper`</h3></DocOnly>
		<DocProps data={stepperRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Stepper.Header

**Preset Key:** `stepper.header`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Stepper.Header</h3></DocOnly>
		<DocProps data={stepperHeaderProps} />

		<DocOnly for="markdown">
{newLine(2)}### Stepper.Body

**Preset Key:** `stepper.body`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Stepper.Body</h3></DocOnly>
		<DocProps data={stepperBodyProps} />

		<DocOnly for="markdown">
{newLine(2)}### Stepper.Content

**Preset Key:** `stepper.content`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Stepper.Content</h3></DocOnly>
		<DocProps data={stepperContentProps} />

		<DocOnly for="markdown">
{newLine(2)}### Stepper.Footer

**Preset Key:** `stepper.footer`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Stepper.Footer</h3></DocOnly>
		<DocProps data={stepperFooterProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
