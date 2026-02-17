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
		Props,
		CodeBlock
	} from '$docs/components';
	import {
		tabsRootProps,
		tabHeaderProps,
		tabBodyProps,
		tabsHeaderProps,
		tabsBodyProps
	} from './props';
	import { metadata } from './shared';

	let activeTab = $state('tab1');
	let exampleTab = $state('overview');
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={metadata.breadcrumbs} />

	<PageHeader
		title={metadata.componentTitle}
		description={metadata.componentDescription}
		status={metadata.status}
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName={metadata.packageName}
			importCode={metadata.importCode}
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the tabs appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Tabs components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={metadata.examples.preset}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different tab variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Tabs" description="Simple tab navigation" code={metadata.examples.basic}>
				<Tabs.Root bind:value={activeTab}>
					<Tabs.Header>
						<Tab.Root value="tab1">
							<Tab.Header
								class="border-b-2 px-4 py-2 {activeTab === 'tab1'
									? 'border-primary'
									: 'border-transparent'}"
							>
								Tab 1
							</Tab.Header>
							<Tab.Body class="p-4">
								<h3 class="mb-2 font-semibold">Tab 1 Content</h3>
								<p class="text-muted-foreground">This is the content for tab 1.</p>
							</Tab.Body>
						</Tab.Root>

						<Tab.Root value="tab2">
							<Tab.Header
								class="border-b-2 px-4 py-2 {activeTab === 'tab2'
									? 'border-primary'
									: 'border-transparent'}"
							>
								Tab 2
							</Tab.Header>
							<Tab.Body class="p-4">
								<h3 class="mb-2 font-semibold">Tab 2 Content</h3>
								<p class="text-muted-foreground">This is the content for tab 2.</p>
							</Tab.Body>
						</Tab.Root>

						<Tab.Root value="tab3">
							<Tab.Header
								class="border-b-2 px-4 py-2 {activeTab === 'tab3'
									? 'border-primary'
									: 'border-transparent'}"
							>
								Tab 3
							</Tab.Header>
							<Tab.Body class="p-4">
								<h3 class="mb-2 font-semibold">Tab 3 Content</h3>
								<p class="text-muted-foreground">This is the content for tab 3.</p>
							</Tab.Body>
						</Tab.Root>
					</Tabs.Header>
					<Tabs.Body>
						<Tabs.Content />
					</Tabs.Body>
				</Tabs.Root>
			</DemoExample>

			<DemoExample
				title="Content Example"
				description="Tabs with rich content"
			code={metadata.examples.content}
			>
				<Tabs.Root bind:value={exampleTab}>
					<Tabs.Header>
						<Tab.Root value="overview">
							<Tab.Header
								class="border-b-2 px-4 py-2 {exampleTab === 'overview'
									? 'border-primary'
									: 'border-transparent'}"
							>
								Overview
							</Tab.Header>
							<Tab.Body class="space-y-2 p-4">
								<h3 class="font-semibold">Product Overview</h3>
								<p class="text-muted-foreground text-sm">
									Learn about our amazing product and all it has to offer.
								</p>
							</Tab.Body>
						</Tab.Root>

						<Tab.Root value="features">
							<Tab.Header
								class="border-b-2 px-4 py-2 {exampleTab === 'features'
									? 'border-primary'
									: 'border-transparent'}"
							>
								Features
							</Tab.Header>
							<Tab.Body class="space-y-2 p-4">
								<h3 class="font-semibold">Features</h3>
								<ul class="text-muted-foreground list-inside list-disc space-y-1 text-sm">
									<li>Feature 1: Fast performance</li>
									<li>Feature 2: Easy to use</li>
									<li>Feature 3: Highly customizable</li>
								</ul>
							</Tab.Body>
						</Tab.Root>

						<Tab.Root value="pricing">
							<Tab.Header
								class="border-b-2 px-4 py-2 {exampleTab === 'pricing'
									? 'border-primary'
									: 'border-transparent'}"
							>
								Pricing
							</Tab.Header>
							<Tab.Body class="space-y-2 p-4">
								<h3 class="font-semibold">Pricing Plans</h3>
								<p class="text-muted-foreground text-sm">Choose the plan that's right for you.</p>
							</Tab.Body>
						</Tab.Root>
					</Tabs.Header>
					<Tabs.Body>
						<Tabs.Content />
					</Tabs.Body>
				</Tabs.Root>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tabs.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">Container for the entire tabs component.</p>
				<Props data={tabsRootProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tabs.Header</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Container for tab headers. All Tab.Header components are rendered here.
				</p>
				<Props data={tabsHeaderProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tabs.Body</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Container for Tab.Root components. Only the active tab's body is displayed.
				</p>
				<Props data={tabsBodyProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tab.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Individual tab component containing header and body.
				</p>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: 'nanoid()',
							description: 'Unique tab identifier'
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tab.Header</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Clickable header for the tab, rendered in Tabs.Header.
				</p>
				<Props data={tabHeaderProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tab.Body</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Content area for the tab, displayed when active.
				</p>
				<Props data={tabBodyProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={metadata.accessibility}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Stack', href: '/docs/components/stack' }}
		next={{ label: 'Textarea', href: '/docs/components/textarea' }}
	/>
</div>
