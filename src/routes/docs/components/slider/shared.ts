const basicCode = `
<script lang="ts">
  import { Slider } from '@svelte-atoms/core';

  let value = $state(42);
</script>

<div class="space-y-2">
  <Slider bind:value min={0} max={100} step={1} />
  <p class="text-sm text-muted-foreground">Value: {value}</p>
</div>`.trim();

const rangeCode = `
<script lang="ts">
  import { Slider } from '@svelte-atoms/core';

  let temperature = $state(22);
</script>

<div class="space-y-2">
  <Slider bind:value={temperature} min={-20} max={40} step={0.5} />
  <p>{temperature}°C</p>
</div>`.trim();

const verticalCode = `
<script lang="ts">
  import { Slider } from '@svelte-atoms/core';

  let volume = $state(65);
</script>

<div class="flex h-48 items-end gap-4">
  <Slider bind:value={volume} orientation="vertical" class="h-40" />
  <p class="text-sm">Volume: {volume}%</p>
</div>`.trim();

const customContentCode = `
<script lang="ts">
  import { Slider } from '@svelte-atoms/core';

  let progress = $state(30);
</script>

<Slider bind:value={progress}>
  {#snippet thumbContent({ value })}
		<div class="relative size-full rounded-full border border-border bg-background shadow-sm">
			<div class="absolute inset-1 rounded-full bg-primary"></div>
			<span class="sr-only">Current value: {value}</span>
    </div>
  {/snippet}

  {#snippet trackContent({ percent })}
    <div class="relative h-2 w-full rounded-full bg-muted">
			<div class="absolute inset-y-0 left-0 rounded-full bg-primary" style="width: {percent}%"></div>
    </div>
  {/snippet}
</Slider>`.trim();

const disabledCode = `
<Slider value={30} disabled />`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  slider: () => ({
    class: 'relative h-6 w-full'
  }),
  'slider.track': () => ({
    class: 'h-2 rounded-full border border-border bg-input'
  }),
  'slider.fill': () => ({
    class: 'bg-primary'
  }),
  'slider.thumb': () => ({
    class: 'size-5 rounded-full border border-border bg-background shadow'
  })
});`.trim();

const accessibilityFeatures = [
	'Uses a native hidden input type="range" for robust keyboard and assistive technology support',
	'Supports keyboard interaction through the native range input semantics',
	'Exposes aria-valuemin, aria-valuemax, and aria-valuenow based on current slider state',
	'Supports aria-disabled and disabled behavior for non-interactive states',
	'Works with labels and forms via forwarded id and name props'
];

const useCases = [
	{
		title: 'Volume and Brightness Controls',
		description:
			'Provide smooth numeric adjustments for audio volume, media brightness, and similar linear controls.'
	},
	{
		title: 'Price and Value Filters',
		description:
			'Let users choose numeric thresholds such as max price, rating cutoffs, or distance radius in discovery screens.'
	},
	{
		title: 'Progress Scrubbing',
		description:
			'Allow users to scrub through timelines such as media playback, onboarding progress, or simulation states.'
	},
	{
		title: 'Fine-tuned Settings',
		description:
			'Expose granular settings like blur radius, opacity, animation speed, or sensitivity as constrained numeric values.'
	},
	{
		title: 'Vertical Control Rails',
		description:
			'Use vertical orientation for compact dashboards, editor sidebars, and mixer-like control panels.'
	}
];

export const metadata = {
	title: 'Slider - Svelte Atoms',
	description: 'Accessible slider component for selecting numeric values across a configurable range.',
	componentTitle: 'Slider',
	componentDescription:
		'Single-value range input with bindable value, horizontal or vertical orientation, and customizable thumb and track rendering.',
	componentType: 'simple' as const,
	status: 'beta' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Slider } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Slider' }],
	useCases,
	examples: {
		basic: basicCode,
		range: rangeCode,
		vertical: verticalCode,
		custom: customContentCode,
		disabled: disabledCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
