<script lang="ts">
	import { Tree } from '$lib/components/tree';
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
	import { treeRootProps, treeHeaderProps, treeBodyProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, nested: nestedCode, preset: presetCode } = metadata.examples;
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="py-8">
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
			<Section.Subtitle>Customize the tree appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Tree components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={presetCode}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different tree variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Tree" description="Collapsible tree structure" code={basicCode}>
				<Tree.Root class="max-w-md space-y-2" open>
					<Tree.Header class="hover:bg-muted rounded px-3 py-2">Documents</Tree.Header>
					<Tree.Body class="space-y-1">
						<div class="px-3 py-1 text-sm">Resume.pdf</div>
						<div class="px-3 py-1 text-sm">CoverLetter.docx</div>
					</Tree.Body>
				</Tree.Root>
			</DemoExample>

			<DemoExample
				title="Nested Tree"
				description="Multiple levels of nesting with expandable sections"
				code={nestedCode}
			>
				<div class="max-w-md space-y-2">
					<Tree.Root open>
						<Tree.Header class="hover:bg-muted rounded px-3 py-2">src</Tree.Header>
						<Tree.Body class="space-y-2">
							<Tree.Root open>
								<Tree.Header class="hover:bg-muted rounded px-3 py-2">components</Tree.Header>
								<Tree.Body class="space-y-1">
									<div class="px-3 py-1 text-sm">Button.svelte</div>
									<div class="px-3 py-1 text-sm">Input.svelte</div>
									<div class="px-3 py-1 text-sm">Card.svelte</div>
								</Tree.Body>
							</Tree.Root>
							<Tree.Root open>
								<Tree.Header class="hover:bg-muted rounded px-3 py-2">utils</Tree.Header>
								<Tree.Body class="space-y-1">
									<div class="px-3 py-1 text-sm">helpers.ts</div>
									<div class="px-3 py-1 text-sm">validators.ts</div>
								</Tree.Body>
							</Tree.Root>
							<div class="px-3 py-1 text-sm">app.ts</div>
						</Tree.Body>
					</Tree.Root>
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tree.Root Props</h3>
				<Props data={treeRootProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tree.Header Props</h3>
				<Props data={treeHeaderProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tree.Body Props</h3>
				<Props data={treeBodyProps} />
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
		prev={{ label: 'Tooltip', href: '/docs/components/tooltip' }}
		next={{ label: 'Virtual', href: '/docs/components/virtual' }}
	/>
</div>
