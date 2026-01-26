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
		Props,
		CodeBlock
	} from '$docs/components';
	import { Button } from '$svelte-atoms/core';
	import { tooltipTriggerProps } from './props';

	const basicCode = `<Tooltip.Root>
  <Tooltip.Trigger>
    <button>Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    This is a tooltip
  </Tooltip.Content>
</Tooltip.Root>`;

	const placementCode = `<Tooltip.Root placement="top">
  <Tooltip.Trigger>
    <button>Top</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Top tooltip
  </Tooltip.Content>
</Tooltip.Root>`;
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
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core/context';

setPreset({
  'tooltip.trigger': () => ({
    class: 'cursor-pointer'
  }),
  'tooltip.content': () => ({
    class: 'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different tooltip variations">
		<div class="space-y-8">
			<DemoExample title="Basic Tooltip" description="Simple tooltip on hover" code={basicCode}>
				<Tooltip.Root>
					<Tooltip.Trigger base={Button} class="rounded border px-4 py-2">Hover me</Tooltip.Trigger>
					<Tooltip.Content class="">This is a helpful tooltip</Tooltip.Content>
				</Tooltip.Root>
			</DemoExample>

			<DemoExample
				title="Tooltip Positions"
				description="Control tooltip placement"
				code={placementCode}
			>
				<div class="flex gap-4">
					<Tooltip.Root placement="top">
						<Tooltip.Trigger base={Button} class="rounded border px-4 py-2">Top</Tooltip.Trigger>
						<Tooltip.Content class="">Top tooltip</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root placement="bottom">
						<Tooltip.Trigger base={Button} class="rounded border px-4 py-2">Bottom</Tooltip.Trigger>
						<Tooltip.Content class="">Bottom tooltip</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root placement="left">
						<Tooltip.Trigger base={Button} class="rounded border px-4 py-2">Left</Tooltip.Trigger>
						<Tooltip.Content class="">Left tooltip</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root placement="right">
						<Tooltip.Trigger base={Button} class="rounded border px-4 py-2">Right</Tooltip.Trigger>
						<Tooltip.Content class="">Right tooltip</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="With Arrow"
				description="Tooltip with arrow indicator"
				code={`<Tooltip.Root>
  <Tooltip.Trigger>
    <button>Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Tooltip with arrow
    <Tooltip.Arrow />
  </Tooltip.Content>
</Tooltip.Root>`}
			>
				<Tooltip.Root>
					<Tooltip.Trigger base={Button} class="rounded px-4 py-2">Hover for arrow</Tooltip.Trigger>
					<Tooltip.Content class="">
						Tooltip with arrow
						<Tooltip.Arrow />
					</Tooltip.Content>
				</Tooltip.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tooltip.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">Container for the tooltip component.</p>
				<Props
					data={[
						{
							name: 'open',
							type: 'boolean',
							default: 'false',
							description: 'Controls tooltip visibility (bindable)'
						},
						{
							name: 'placement',
							type: "'top' | 'bottom' | 'left' | 'right' | ...",
							default: "'top'",
							description: 'Tooltip position relative to trigger'
						},
						{
							name: 'offset',
							type: 'number',
							default: '1',
							description: 'Distance from trigger element'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable tooltip'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tooltip.Trigger</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Element that triggers the tooltip on hover.
				</p>
				<Props data={tooltipTriggerProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tooltip.Content</h3>
				<p class="text-muted-foreground mb-4 text-sm">The tooltip content that appears on hover.</p>
				<Props
					data={[
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tooltip.Arrow</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Optional arrow pointing to the trigger element.
				</p>
				<Props
					data={[
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
