<script lang="ts">
	import { Drawer } from '$lib/components/drawer';
	import { Button } from '$lib/components/button';
	import { Home, Folder, Users, Settings, LogOut, Moon, Zap } from 'lucide-svelte';
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
	import { slideoverRootProps, slideoverContentProps, slideoverHeaderProps, drawerBodyProps, slideoverFooterProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'drawer',
		title: 'Drawer',
		category: 'components',
		depth: 'intermediate',
		prerequisites: [],
		related: []
	};

	let rightOpen = $state(false);
	let leftOpen = $state(false);
	let bottomOpen = $state(false);

	const notifications = [
		{ title: 'New message from Alex', time: '2 min ago', read: false },
		{ title: 'Your report is ready', time: '1 hour ago', read: false },
		{ title: 'Deployment succeeded', time: '3 hours ago', read: true },
	];

	const navLinks = [
		{ section: 'Main', items: [
			{ label: 'Dashboard', href: '#', icon: Home },
			{ label: 'Projects', href: '#', icon: Folder },
			{ label: 'Team', href: '#', icon: Users },
		]},
		{ section: 'Settings', items: [
			{ label: 'Preferences', href: '#', icon: Settings },
			{ label: 'Appearance', href: '#', icon: Moon },
			{ label: 'Performance', href: '#', icon: Zap },
		]},
	];
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Divider', href: '/docs/components/divider' }}
	next={{ label: 'Dropdown', href: '/docs/components/dropdown' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the drawer appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different drawer variations">
		<DocExample title="Notifications Drawer" description="Right-side drawer showing a notification list." code={metadata.examples.basic}>
			<div class="flex flex-wrap gap-3">
				<Button onclick={() => (rightOpen = true)}>Open Notifications</Button>
				<Drawer.Root bind:open={rightOpen}>
					<Drawer.Content class="w-80 flex flex-col">
						<Drawer.Header class="border-b border-border px-6 py-4">
							<div class="flex items-center justify-between">
								<div>
									<Drawer.Title>Notifications</Drawer.Title>
									<Drawer.Description class="mt-1">You have {notifications.filter(n => !n.read).length} unread</Drawer.Description>
								</div>
							</div>
						</Drawer.Header>
						<Drawer.Body class="flex-1 overflow-y-auto px-4 py-3">
							<div class="space-y-2">
								{#each notifications as n, i (i)}
									<div class="flex items-start gap-3 rounded-lg p-3 transition-colors {n.read ? 'bg-muted/30 hover:bg-muted/50' : 'bg-primary/5 hover:bg-primary/10 border border-primary/20'}">
										<div class="mt-1.5 size-2.5 shrink-0 rounded-full {n.read ? 'bg-muted-foreground/40' : 'bg-primary'}"></div>
										<div class="flex-1 min-w-0">
											<p class="text-sm font-medium {n.read ? 'text-muted-foreground' : 'text-foreground'} leading-tight">{n.title}</p>
											<p class="text-muted-foreground text-xs mt-1">{n.time}</p>
										</div>
									</div>
								{/each}
							</div>
						</Drawer.Body>
						<Drawer.Footer class="border-t border-border px-6 py-4">
							<Button variant="primary" class="w-full" onclick={() => (rightOpen = false)}>Mark all as read</Button>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Root>
			</div>
		</DocExample>

		<DocExample title="Navigation Drawer" description="Left-side drawer used as a mobile nav menu." code={metadata.examples.sides}>
			<div class="flex flex-wrap gap-3">
				<Button onclick={() => (leftOpen = true)}>Open Nav</Button>
				<Button variant="outline" onclick={() => (bottomOpen = true)}>Delete Item</Button>

				<Drawer.Root bind:open={leftOpen}>
					<Drawer.Content side="left" class="w-72 flex flex-col">
						<Drawer.Header class="border-b border-border px-6 py-4">
							<Drawer.Title>Navigation</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body class="flex-1 overflow-y-auto px-4 py-6">
							<nav class="space-y-6">
								{#each navLinks as section, i (i)}
									<div>
										<h4 class="text-foreground/60 mb-2 px-2 text-xs font-semibold uppercase tracking-wider">{section.section}</h4>
										<div class="space-y-1">
											{#each section.items as link (link.label)}
												{@const Icon = link.icon}
												<a
													href={link.href}
													class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted active:bg-muted/80"
													onclick={() => (leftOpen = false)}
												>
													<Icon class="w-4 h-4 shrink-0" />
													<span>{link.label}</span>
												</a>
											{/each}
										</div>
									</div>
								{/each}
							</nav>
						</Drawer.Body>
						<Drawer.Footer class="border-t border-border px-6 py-4 mt-auto">
							<Button variant="ghost" class="w-full flex items-center gap-2 justify-center" onclick={() => (leftOpen = false)}>
								<LogOut class="w-4 h-4" />
								<span>Sign Out</span>
							</Button>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Root>

				<Drawer.Root bind:open={bottomOpen}>
					<Drawer.Content side="bottom" class="mx-auto max-w-lg rounded-t-2xl">
						<Drawer.Header class="border-b border-border px-6 pt-6 pb-4">
							<div>
								<Drawer.Title class="text-lg font-semibold">Delete this item?</Drawer.Title>
								<Drawer.Description class="text-muted-foreground mt-2 text-sm leading-relaxed">This action cannot be undone. The item will be permanently removed from your account.</Drawer.Description>
							</div>
						</Drawer.Header>
						<Drawer.Footer class="flex gap-3 px-6 pb-8">
							<Button variant="destructive" class="flex-1 font-medium" onclick={() => (bottomOpen = false)}>Delete</Button>
							<Button variant="outline" class="flex-1" onclick={() => (bottomOpen = false)}>Cancel</Button>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Drawer.Root

**Preset Key:** `drawer`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Drawer.Root

**Preset Key:** `drawer`</h3></DocOnly>
		<DocProps data={slideoverRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Drawer.Content

**Preset Key:** `drawer.content`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Drawer.Content</h3></DocOnly>
		<DocProps data={slideoverContentProps} />

		<DocOnly for="markdown">
{newLine(2)}### Drawer.Header

**Preset Key:** `drawer.header`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Drawer.Header</h3></DocOnly>
		<DocProps data={slideoverHeaderProps} />

		<DocOnly for="markdown">
{newLine(2)}### Drawer.Body

**Preset Key:** `drawer.body`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Drawer.Body</h3></DocOnly>
		<DocProps data={drawerBodyProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
