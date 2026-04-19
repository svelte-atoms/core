<script lang="ts">
	import { Slider } from '$lib/components/slider';
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
	import { sliderProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'slider',
		title: 'Slider',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	let value = $state(42);
	let temperature = $state(22);
	let volume = $state(65);
	let progress = $state(30);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Sidebar', href: '/docs/components/sidebar' }}
	next={{ label: 'Stack', href: '/docs/components/stack' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Simple Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize slider visuals using preset slots">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore common slider patterns">
		<DocExample title="Basic Slider" description="Horizontal single-value slider with live binding" code={metadata.examples.basic}>
			<div class="space-y-2">
				<Slider bind:value min={0} max={100} step={1} class="min-w-40" />
				<p class="text-muted-foreground text-sm">Value: {value}</p>
			</div>
		</DocExample>

		<DocExample title="Custom Range" description="Slider with negative and decimal step values" code={metadata.examples.range}>
			<div class="space-y-2">
				<Slider bind:value={temperature} min={-20} max={40} step={0.5}  class="min-w-40" />
				<p class="text-muted-foreground text-sm">Temperature: {temperature}°C</p>
			</div>
		</DocExample>

		<DocExample title="Vertical Slider" description="Vertical orientation for compact control rails" code={metadata.examples.vertical}>
			<div class="flex h-48 items-end gap-4">
				<Slider bind:value={volume} orientation="vertical" class="h-40" />
				<p class="text-muted-foreground text-sm">Volume: <span class="inline-flex min-w-[5ch]">{volume}%</span></p>
			</div>
		</DocExample>

		<DocExample title="Custom Thumb and Track" description="Render custom snippets for thumb and track visuals" code={metadata.examples.custom}>
			<div class="space-y-2">
				<Slider bind:value={progress} class="min-w-40">
					{#snippet thumbContent({ value })}
						<div class="bg-background border-border relative size-full rounded-full border shadow-sm">
							<div class="bg-primary absolute inset-1 rounded-full"></div>
							<span class="sr-only">Current value: {value}</span>
						</div>
					{/snippet}

					{#snippet trackContent({ percent })}
						<div class="bg-muted relative h-2 w-full rounded-full">
							<div class="bg-primary absolute inset-y-0 left-0 rounded-full" style={`width: ${percent}%`}></div>
						</div>
					{/snippet}
				</Slider>
				<p class="text-muted-foreground text-sm">Progress: {progress}%</p>
			</div>
		</DocExample>

		<DocExample title="Disabled Slider" description="Non-interactive slider for locked or unavailable settings" code={metadata.examples.disabled}>
			<Slider value={30} disabled />
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Slider Props

**Preset Key:** `slider`, `slider.track`, `slider.fill`, `slider.thumb`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Slider Props</h3></DocOnly>
		<DocProps data={sliderProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
