<script lang="ts">
	import { Alert } from '$lib/components/alert';
	import { Button } from '$lib/components/button';
	import { Icon } from '$lib/components/icon';
	import { cn } from '$lib/utils';
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
	import { alertRootProps, alertSubPartProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'alert',
		title: 'Alert',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	let dismissed = $state(false);

	const alertLayout = ({ children, class: klass, ...args }: any) => {
		const gridTemplateAreas = `"icon title close-button" ". description description" "content content content" "actions actions actions"`;
		const gridTemplateColumns = `auto 1fr auto`;
		return { class: cn(klass, 'grid items-center'), style: `grid-template-areas: ${gridTemplateAreas}; grid-template-columns: ${gridTemplateColumns};`, ...args };
	};
</script>

{#snippet alertLayoutSnippet({ children, class: klass, ...args }: any)}
	{@const gridTemplateAreas = `"icon title close-button" ". description description" "content content content" "actions actions actions"`}
	{@const gridTemplateColumns = `auto 1fr auto`}
	<div
		{...args}
		class={cn(klass, 'grid items-center')}
		style:grid-template-areas={gridTemplateAreas}
		style:grid-template-columns={gridTemplateColumns}
	>
		{@render children?.()}
	</div>
{/snippet}

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Accordion', href: '/docs/components/accordion' }}
	next={{ label: 'Avatar', href: '/docs/components/avatar' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the alert appearance using presets">
		<DocCode lang="typescript" code={metadata.examples.preset} />
		<DocOnly for="markdown">
**Available Preset Keys:** `alert`, `alert.icon`, `alert.title`, `alert.description`, `alert.content`, `alert.actions`, `alert.close-button`
		</DocOnly>
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different alert variations and use cases">
		<DocExample
			title="Basic Alert"
			description="Simple alert with icon and title"
			code={metadata.examples.basic}
		>
			<Alert.Root base={alertLayoutSnippet} variant="primary">
				<Alert.Icon>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
						<circle cx="12" cy="12" r="10"></circle>
						<path d="M12 16v-4M12 8h.01"></path>
					</svg>
				</Alert.Icon>
				<Alert.Title>New Feature Available</Alert.Title>
				<Alert.Description>We've added dark mode support to your dashboard.</Alert.Description>
				<Alert.Content></Alert.Content>
			</Alert.Root>
		</DocExample>

		<DocExample
			title="Alert Variants"
			description="Different alert styles for various contexts"
			code={metadata.examples.variants}
		>
			<div class="space-y-4">
				<Alert.Root base={alertLayoutSnippet} variant="primary">
					<Alert.Icon>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
							<circle cx="12" cy="12" r="10"></circle>
							<path d="M12 16v-4M12 8h.01"></path>
						</svg>
					</Alert.Icon>
					<Alert.Title>Primary Alert</Alert.Title>
					<Alert.Description>This is a primary alert message.</Alert.Description>
					<Alert.Content></Alert.Content>
				</Alert.Root>
				<Alert.Root base={alertLayoutSnippet} variant="secondary">
					<Alert.Icon>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
							<polyline points="22 4 12 14.01 9 11.01"></polyline>
						</svg>
					</Alert.Icon>
					<Alert.Title>Secondary Alert</Alert.Title>
					<Alert.Description>This is a secondary alert message.</Alert.Description>
					<Alert.Content></Alert.Content>
				</Alert.Root>
				<Alert.Root base={alertLayoutSnippet} variant="destructive">
					<Alert.Icon>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="15" y1="9" x2="9" y2="15"></line>
							<line x1="9" y1="9" x2="15" y2="15"></line>
						</svg>
					</Alert.Icon>
					<Alert.Title>Destructive Alert</Alert.Title>
					<Alert.Description>This is a destructive alert message.</Alert.Description>
					<Alert.Content></Alert.Content>
				</Alert.Root>
			</div>
		</DocExample>

		<DocExample
			title="Dismissible Alert"
			description="Alert with close button"
			code={metadata.examples.dismissible}
		>
			<div class="space-y-4">
				{#if !dismissed}
					<Alert.Root base={alertLayoutSnippet} variant="primary">
						<Alert.Icon>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
								<circle cx="12" cy="12" r="10"></circle>
								<path d="M12 16v-4M12 8h.01"></path>
							</svg>
						</Alert.Icon>
						<Alert.Title>Cookie Preferences</Alert.Title>
						<Alert.Description>We use cookies to enhance your experience.</Alert.Description>
						<Alert.Content></Alert.Content>
						<Alert.CloseButton onclick={() => (dismissed = true)}>
							<Icon class="h-full">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</Icon>
						</Alert.CloseButton>
					</Alert.Root>
				{:else}
					<Button onclick={() => (dismissed = false)}>Restore Alert</Button>
				{/if}
			</div>
		</DocExample>

		<DocExample
			title="Alert with Actions"
			description="Alert with action buttons"
			code={metadata.examples.actions}
		>
			<Alert.Root base={alertLayoutSnippet} variant="primary">
				<Alert.Icon>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
						<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
						<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
					</svg>
				</Alert.Icon>
				<Alert.Title>System Update Available</Alert.Title>
				<Alert.Description>A new version is ready to install.</Alert.Description>
				<Alert.Actions>
					<Button variant="primary" size="sm">Update Now</Button>
					<Button variant="ghost" size="sm">Remind Me Later</Button>
				</Alert.Actions>
				<Alert.Content></Alert.Content>
			</Alert.Root>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Alert.Root

**Preset Key:** `alert`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Alert.Root</h3></DocOnly>
		<DocProps data={alertRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Alert Sub-Parts (Icon, Title, Description, Content, Actions, CloseButton)

**Preset Keys:** `alert.icon`, `alert.title`, `alert.description`, `alert.content`, `alert.actions`, `alert.close-button`

</DocOnly>
		<DocOnly for="html">
			<h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Alert Sub-Part Props (Icon, Title, Description, Content, Actions, CloseButton)</h3>
		</DocOnly>
		<DocProps data={alertSubPartProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
