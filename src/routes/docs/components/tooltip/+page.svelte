<script lang="ts">
	import { Tooltip } from '$lib/components/tooltip';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props
	} from '$docs/components';

	const basicCode = `<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>`;

	const placementCode = `<Tooltip content="Top tooltip" placement="top">
  <button>Top</button>
</Tooltip>`;
</script>

<svelte:head>
	<title>Tooltip - Svelte Atoms</title>
	<meta name="description" content="Contextual information on hover." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Tooltip' }]} />

	<PageHeader
		title="Tooltip"
		description="Contextual information that appears when hovering over elements. Use for supplementary information."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Tooltip &#125; from '@svelte-atoms/core/tooltip';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the tooltip appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Tooltip components by defining presets in your
				configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  tooltip: () => ({
    class: 'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95'
  })
});`}</code
					></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different tooltip variations">
		<div class="space-y-8">
			<DemoExample title="Basic Tooltip" description="Simple tooltip on hover" code={basicCode}>
				<Tooltip content="This is a helpful tooltip">
					<button class="rounded border px-4 py-2"> Hover me </button>
				</Tooltip>
			</DemoExample>

			<DemoExample
				title="Tooltip Positions"
				description="Control tooltip placement"
				code={placementCode}
			>
				<div class="flex gap-4">
					<Tooltip content="Top tooltip" placement="top">
						<button class="rounded border px-4 py-2">Top</button>
					</Tooltip>
					<Tooltip content="Bottom tooltip" placement="bottom">
						<button class="rounded border px-4 py-2">Bottom</button>
					</Tooltip>
					<Tooltip content="Left tooltip" placement="left">
						<button class="rounded border px-4 py-2">Left</button>
					</Tooltip>
					<Tooltip content="Right tooltip" placement="right">
						<button class="rounded border px-4 py-2">Right</button>
					</Tooltip>
				</div>
			</DemoExample>

			<DemoExample
				title="Custom Delay"
				description="Control show delay"
				code={`<Tooltip content="Quick" delay={0}>
  <button>Instant<\/button>
<\/Tooltip>`}
			>
				<div class="flex gap-4">
					<Tooltip content="Instant tooltip" delay={0}>
						<button class="rounded border px-4 py-2">No delay</button>
					</Tooltip>
					<Tooltip content="Delayed tooltip" delay={1000}>
						<button class="rounded border px-4 py-2">1s delay</button>
					</Tooltip>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tooltip Props</h3>
				<Props
					data={[
						{
							name: 'content',
							type: 'string',
							default: "''",
							description: 'Tooltip text'
						},
						{
							name: 'placement',
							type: "'top' | 'bottom' | 'left' | 'right'",
							default: "'top'",
							description: 'Tooltip position'
						},
						{
							name: 'delay',
							type: 'number',
							default: '200',
							description: 'Show delay (ms)'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable tooltip'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Uses aria-describedby for association',
				'Not shown on keyboard focus by default',
				'Non-essential information only',
				'Clear on mouse leave',
				'Screen reader compatible'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Toast', href: '/docs/components/toast' }}
		next={{ label: 'Tree', href: '/docs/components/tree' }}
	/>
</div>
