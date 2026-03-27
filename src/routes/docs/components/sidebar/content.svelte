<script lang="ts">
	import { Sidebar, animateSidebarContent } from '$lib/components/sidebar';
	import type { SidebarBond } from '$lib/components/sidebar/bond.svelte';
	import { LayoutDashboard, BarChart2, Settings } from 'lucide-svelte';
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
	import { sidebarRootProps, sidebarContentProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'sidebar',
		title: 'Sidebar',
		category: 'components',
		depth: 'intermediate',
		prerequisites: [],
		related: [],
	};

	let sidebarOpen = $state(true);

	const navItems = [
		{ icon: LayoutDashboard, label: 'Dashboard' },
		{ icon: BarChart2, label: 'Analytics' },
		{ icon: Settings, label: 'Settings' },
	];
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Select', href: '/docs/components/select' }}
	next={{ label: 'Stack', href: '/docs/components/stack' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Compound Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}

		## Components

		{#each metadata.componentsSummary as comp, i (i)}
		- **{comp.name}**: {comp.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the sidebar appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different sidebar variations">
		<DocExample title="Basic Sidebar" description="Collapsible sidebar with icon + text navigation. Collapses to icon-only mode." code={metadata.examples.basic}>
			<div class="flex h-64 overflow-hidden rounded-lg border border-border">
				<Sidebar.Root bind:open={sidebarOpen}>
					{#snippet children({ sidebar }: { sidebar: SidebarBond })}
						<div class="flex size-full">
							<Sidebar.Content
								animate={animateSidebarContent({ '0': '2.75rem', '1': '160px' })}
								class="overflow-hidden border-r border-border p-2"
							>
								<nav class="flex flex-col gap-1">
									{#each navItems as item (item)}
										{@const Icon = item.icon}
										<button class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted whitespace-nowrap">
											<Icon size={16} class="shrink-0" />
											{#if sidebarOpen}<span>{item.label}</span>{/if}
										</button>
									{/each}
								</nav>
							</Sidebar.Content>
							<main class="flex flex-1 flex-col gap-3 p-4">
								<p class="text-muted-foreground text-sm">Main content area</p>
								<button
									onclick={() => sidebar?.state.toggle?.()}
									class="text-sm underline"
								>
									{sidebarOpen ? 'Collapse' : 'Expand'} sidebar
								</button>
							</main>
						</div>
					{/snippet}
				</Sidebar.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Sidebar.Root

**Preset Key:** `sidebar`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Sidebar.Root</h3></DocOnly>
		<DocProps data={sidebarRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Sidebar.Content

**Preset Key:** `sidebar.content`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Sidebar.Content</h3></DocOnly>
		<DocProps data={sidebarContentProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
