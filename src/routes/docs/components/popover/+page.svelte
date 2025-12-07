<script lang="ts">
	import { Popover } from '$lib/components/popover';
	import { Button } from '$lib/components/button';
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

	const basicCode = `<Popover>
  <Button slot="trigger">Open Popover<\/Button>
  <div>Popover content here</div>
</Popover>`;

	let isOpen = $state(false);
</script>

<svelte:head>
	<title>Popover - Svelte Atoms</title>
	<meta name="description" content="Floating content panel triggered by user interaction." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Popover' }]} />

	<PageHeader
		title="Popover"
		description="Floating panel that displays rich content near a trigger element. Use for contextual information or actions."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Popover &#125; from '@svelte-atoms/core/popover';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the popover appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Popover components by defining presets in your
				configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  popover: () => ({
    class: 'z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none'
  }),
  'popover.trigger': () => ({
    class: 'inline-flex items-center justify-center rounded-md'
  }),
  'popover.content': () => ({
    class: 'w-full'
  })
});`}</code
					></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different popover variations">
		<div class="space-y-8">
			<DemoExample title="Basic Popover" description="Simple popover with content" code={basicCode}>
				<Popover>
					<Button slot="trigger">Open Popover</Button>
					<div class="max-w-xs p-4">
						<h4 class="mb-2 font-semibold">Popover Title</h4>
						<p class="text-muted-foreground text-sm">
							This is the popover content with some helpful information.
						</p>
					</div>
				</Popover>
			</DemoExample>

			<DemoExample
				title="Popover Positions"
				description="Control popover placement"
				code={`<Popover placement="top">
  <Button slot="trigger">Top<\/Button>
  <div>Content</div>
</Popover>`}
			>
				<div class="flex flex-wrap gap-4">
					<Popover placement="top">
						<Button slot="trigger" variant="outline">Top</Button>
						<div class="p-3 text-sm">Top popover</div>
					</Popover>
					<Popover placement="bottom">
						<Button slot="trigger" variant="outline">Bottom</Button>
						<div class="p-3 text-sm">Bottom popover</div>
					</Popover>
					<Popover placement="left">
						<Button slot="trigger" variant="outline">Left</Button>
						<div class="p-3 text-sm">Left popover</div>
					</Popover>
					<Popover placement="right">
						<Button slot="trigger" variant="outline">Right</Button>
						<div class="p-3 text-sm">Right popover</div>
					</Popover>
				</div>
			</DemoExample>

			<DemoExample
				title="Controlled Popover"
				description="Programmatic control"
				code={`<script lang="ts">
  let isOpen = $state(false);
<\/script>

<Popover bind:open={isOpen}>
  <Button slot="trigger">Toggle</Button>
  <div>Content</div>
</Popover>`}
			>
				<div class="space-y-4">
					<Popover bind:open={isOpen}>
						<Button slot="trigger">Toggle Popover</Button>
						<div class="p-4">
							<p class="mb-3 text-sm">Controlled popover content</p>
							<Button size="sm" onclick={() => (isOpen = false)}>Close</Button>
						</div>
					</Popover>
					<p class="text-muted-foreground text-sm">
						Popover is {isOpen ? 'open' : 'closed'}
					</p>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Popover Props</h3>
				<Props
					data={[
						{
							name: 'open',
							type: 'boolean',
							default: 'false',
							description: 'Popover open state'
						},
						{
							name: 'placement',
							type: "'top' | 'bottom' | 'left' | 'right'",
							default: "'bottom'",
							description: 'Popover position'
						},
						{
							name: 'offset',
							type: 'number',
							default: '8',
							description: 'Distance from trigger (px)'
						},
						{
							name: 'closeOnClickOutside',
							type: 'boolean',
							default: 'true',
							description: 'Close on outside click'
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
				'ARIA attributes (aria-expanded, aria-haspopup)',
				'Keyboard navigation (Escape to close)',
				'Focus management',
				'Screen reader announcements',
				'Click outside to dismiss'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Menu', href: '/docs/components/menu' }}
		next={{ label: 'Radio', href: '/docs/components/radio' }}
	/>
</div>
