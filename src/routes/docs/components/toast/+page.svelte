<script lang="ts">
	import { Toast } from '$lib/components/toast';
	import { Button } from '$lib/components/button';
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
	import { toastRootProps, toastTitleProps, toastDescriptionProps } from './props';
	import { metadata } from './shared';

	let showBasic = $state(false);
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
		<Installation packageName={metadata.packageName} importCode={metadata.importCode} />
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the toast appearance using presets</Section.Subtitle>
		</Section.Header>
		<CodeBlock lang="typescript" code={metadata.examples.preset} />
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Toast" description="A simple notification with title and description" code={metadata.examples.basic}>
				<div class="flex flex-col gap-4">
					<Button variant="secondary" onclick={() => (showBasic = !showBasic)}>
						{showBasic ? 'Hide Toast' : 'Show Toast'}
					</Button>
					{#if showBasic}
						<Toast.Root>
							<Toast.Title>Saved successfully</Toast.Title>
							<Toast.Description>Your changes have been saved.</Toast.Description>
						</Toast.Root>
					{/if}
				</div>
			</DemoExample>

			<DemoExample title="Toaster" description="Use Toast.Toaster to render a portal-based notification stack" code={metadata.examples.toaster}>
				<p class="text-muted-foreground text-sm">Add <code>&lt;Toast.Toaster /&gt;</code> once to your root layout to enable programmatic toasts.</p>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Toast.Root</h3>
				<Props data={toastRootProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Toast.Title</h3>
				<Props data={toastTitleProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Toast.Description</h3>
				<Props data={toastDescriptionProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo features={metadata.accessibility} />
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Textarea', href: '/docs/components/textarea' }}
		next={{ label: 'Tooltip', href: '/docs/components/tooltip' }}
	/>
</div>
