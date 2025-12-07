<script lang="ts">
	import { Tabs, Tab } from '$lib/components/tabs';
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

	const basicCode = `<script lang="ts">
  let activeTab = $state('tab1');
<\/script>

<Tabs.Root value={activeTab}>
  <Tabs.Header>
    <Tab value="tab1">Tab 1<\/Tab>
    <Tab value="tab2">Tab 2<\/Tab>
  <\/Tabs.Header>
  <Tabs.Body value="tab1">Content 1<\/Tabs.Body>
  <Tabs.Body value="tab2">Content 2<\/Tabs.Body>
<\/Tabs.Root>`;

	let activeTab = $state('tab1');
	let exampleTab = $state('overview');
</script>

<svelte:head>
	<title>Tabs - Svelte Atoms</title>
	<meta name="description" content="Organize content into multiple panels." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Tabs' }]} />

	<PageHeader
		title="Tabs"
		description="Organize content into separate views that users can switch between."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Tabs &#125; from '@svelte-atoms/core/tabs';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the tabs appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Tabs components by defining presets in your
				configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  tab: () => ({
    class: 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
  }),
  'tabs.list': () => ({
    class: 'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'
  }),
  'tabs.content': () => ({
    class: 'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
  })
});`}</code
					></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different tab variations">
		<div class="space-y-8">
			<DemoExample title="Basic Tabs" description="Simple tab navigation" code={basicCode}>
				<Tabs.Root value={activeTab} onchange={(v: string) => (activeTab = v)}>
					<Tabs.Header class="flex gap-1 border-b">
						<Tab
							value="tab1"
							class="border-b-2 px-4 py-2 {activeTab === 'tab1'
								? 'border-primary'
								: 'border-transparent'}"
						>
							Tab 1
						</Tab>
						<Tab
							value="tab2"
							class="border-b-2 px-4 py-2 {activeTab === 'tab2'
								? 'border-primary'
								: 'border-transparent'}"
						>
							Tab 2
						</Tab>
						<Tab
							value="tab3"
							class="border-b-2 px-4 py-2 {activeTab === 'tab3'
								? 'border-primary'
								: 'border-transparent'}"
						>
							Tab 3
						</Tab>
					</Tabs.Header>

					<Tabs.Body value="tab1" class="p-4">
						<h3 class="mb-2 font-semibold">Tab 1 Content</h3>
						<p class="text-muted-foreground">This is the content for tab 1.</p>
					</Tabs.Body>
					<Tabs.Body value="tab2" class="p-4">
						<h3 class="mb-2 font-semibold">Tab 2 Content</h3>
						<p class="text-muted-foreground">This is the content for tab 2.</p>
					</Tabs.Body>
					<Tabs.Body value="tab3" class="p-4">
						<h3 class="mb-2 font-semibold">Tab 3 Content</h3>
						<p class="text-muted-foreground">This is the content for tab 3.</p>
					</Tabs.Body>
				</Tabs.Root>
			</DemoExample>

			<DemoExample
				title="Content Example"
				description="Tabs with rich content"
				code={`<Tabs.Root value={exampleTab} onchange={(v) => exampleTab = v}>
  <Tabs.Header>
    <Tab value="overview">Overview<\/Tab>
    <Tab value="features">Features<\/Tab>
  <\/Tabs.Header>
  <Tabs.Body value="overview">Content<\/Tabs.Body>
  <Tabs.Body value="features">More content<\/Tabs.Body>
<\/Tabs.Root>`}
			>
				<Tabs.Root value={exampleTab} onchange={(v: string) => (exampleTab = v)}>
					<Tabs.Header class="flex gap-1 border-b">
						<Tab
							value="overview"
							class="border-b-2 px-4 py-2 {exampleTab === 'overview'
								? 'border-primary'
								: 'border-transparent'}"
						>
							Overview
						</Tab>
						<Tab
							value="features"
							class="border-b-2 px-4 py-2 {exampleTab === 'features'
								? 'border-primary'
								: 'border-transparent'}"
						>
							Features
						</Tab>
						<Tab
							value="pricing"
							class="border-b-2 px-4 py-2 {exampleTab === 'pricing'
								? 'border-primary'
								: 'border-transparent'}"
						>
							Pricing
						</Tab>
					</Tabs.Header>

					<Tabs.Body value="overview" class="space-y-2 p-4">
						<h3 class="font-semibold">Product Overview</h3>
						<p class="text-muted-foreground text-sm">
							Learn about our amazing product and all it has to offer.
						</p>
					</Tabs.Body>
					<Tabs.Body value="features" class="space-y-2 p-4">
						<h3 class="font-semibold">Features</h3>
						<ul class="text-muted-foreground list-inside list-disc space-y-1 text-sm">
							<li>Feature 1: Fast performance</li>
							<li>Feature 2: Easy to use</li>
							<li>Feature 3: Highly customizable</li>
						</ul>
					</Tabs.Body>
					<Tabs.Body value="pricing" class="space-y-2 p-4">
						<h3 class="font-semibold">Pricing Plans</h3>
						<p class="text-muted-foreground text-sm">Choose the plan that's right for you.</p>
					</Tabs.Body>
				</Tabs.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tabs.Root Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: "''",
							description: 'Active tab value'
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
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tab Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: "''",
							description: 'Tab identifier'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable tab'
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
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tabs.Body Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: "''",
							description: 'Content identifier matching Tab value'
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
				'ARIA tabs pattern (role="tablist", "tab", "tabpanel")',
				'Keyboard navigation (Arrow keys)',
				'aria-selected state',
				'Focus management',
				'Screen reader friendly'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Stack', href: '/docs/components/stack' }}
		next={{ label: 'Textarea', href: '/docs/components/textarea' }}
	/>
</div>
