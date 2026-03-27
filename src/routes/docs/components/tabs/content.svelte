<script lang="ts">
	import { Tabs as ATabs, Tab } from '$lib/components/tabs';
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
	import {
		tabsRootProps,
		tabHeaderProps,
		tabBodyProps,
		tabDescriptionProps,
		tabsHeaderProps,
		tabsBodyProps,
		tabsContentProps
	} from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'tabs',
		title: 'Tabs',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	const apiTabs = [
		{ value: 'tabs-root',        label: 'Tabs.Root',        props: tabsRootProps },
		{ value: 'tabs-header',      label: 'Tabs.Header',      props: tabsHeaderProps },
		{ value: 'tabs-body',        label: 'Tabs.Body',        props: tabsBodyProps },
		{ value: 'tabs-content',     label: 'Tabs.Content',     props: tabsContentProps },
		{ value: 'tab-header',       label: 'Tab.Header',       props: tabHeaderProps },
		{ value: 'tab-body',         label: 'Tab.Body',         props: tabBodyProps },
		{ value: 'tab-description',  label: 'Tab.Description',  props: tabDescriptionProps },
	];

	const demoTabs = [
		{ value: 'overview', label: 'Overview', content: 'High-level summary of your component.' },
		{ value: 'details',  label: 'Details',  content: 'In-depth details and configuration options.' },
		{ value: 'settings', label: 'Settings', content: 'Configure preferences and defaults.' },
	];

	let activeTab = $state(demoTabs[0].value);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Stepper', href: '/docs/components/stepper' }}
	next={{ label: 'Textarea', href: '/docs/components/textarea' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the tabs appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different tabs variations">
		<DocExample title="Basic Tabs" description="Standard tabbed navigation." code={metadata.examples.basic}>
			<div class="w-full max-w-lg">
				<ATabs.Root bind:value={activeTab}>
					<ATabs.Header class="border-b">
						{#each demoTabs as tab, i (i)}
							<Tab.Root value={tab.value}>
								<Tab.Header class="px-4 py-2 text-sm">{tab.label}</Tab.Header>
								<Tab.Body class="p-4">
									<p class="text-muted-foreground text-sm">{tab.content}</p>
								</Tab.Body>
							</Tab.Root>
						{/each}
					</ATabs.Header>
					<ATabs.Body>
						<ATabs.Content />
					</ATabs.Body>
				</ATabs.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="html">
			<ATabs.Root value={apiTabs[0].value} class="mt-2">
				<ATabs.Header class="border-b">
					{#each apiTabs as tab, i (i)}
						<Tab.Root value={tab.value}>
							<Tab.Header class="px-3 py-2 text-xs">{tab.label}</Tab.Header>
							<Tab.Body>
								<DocProps data={tab.props} />
							</Tab.Body>
						</Tab.Root>
					{/each}
				</ATabs.Header>
				<ATabs.Content class="pt-4" />
			</ATabs.Root>
		</DocOnly>

		{#each apiTabs as tab, i (i)}
			<DocOnly for="markdown">
{newLine(2)}### {tab.label}

</DocOnly>
			<DocOnly for="markdown"><DocProps data={tab.props} /></DocOnly>
		{/each}
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
