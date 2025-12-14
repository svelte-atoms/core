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

	const basicCode = `<script lang="ts">
  import { Tree } from '@svelte-atoms/core/tree';
  
  let open = $state(false);
<\/script>

<Tree.Root bind:open>
  <Tree.Header>Documents</Tree.Header>
  <Tree.Body>
    <div>Resume.pdf</div>
    <div>CoverLetter.docx</div>
  </Tree.Body>
</Tree.Root>`;

	const nestedCode = `<Tree.Root>
  <Tree.Header>src</Tree.Header>
  <Tree.Body>
    <Tree.Root>
      <Tree.Header>components</Tree.Header>
      <Tree.Body>
        <div>Button.svelte</div>
        <div>Input.svelte</div>
      </Tree.Body>
    </Tree.Root>
    <div>app.ts</div>
  </Tree.Body>
</Tree.Root>`;
</script>

<svelte:head>
	<title>Tree - Svelte Atoms</title>
	<meta name="description" content="Hierarchical tree view component." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Tree' }]} />

	<PageHeader
		title="Tree"
		description="Display hierarchical data in a tree structure with expandable/collapsible nodes."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Tree &#125; from '@svelte-atoms/core/tree';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the tree appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Tree components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  'tree.root': () => ({
    class: 'space-y-1'
  }),
  'tree.header': () => ({
    class: 'cursor-pointer border-border flex items-center gap-2'
  }),
  'tree.body': () => ({
    class: 'pl-4 border-l border-border'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different tree variations">
		<div class="space-y-8">
			<DemoExample title="Basic Tree" description="Collapsible tree structure" code={basicCode}>
				<Tree.Root class="max-w-md space-y-2">
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
					<Tree.Root>
						<Tree.Header class="hover:bg-muted rounded px-3 py-2">src</Tree.Header>
						<Tree.Body class="space-y-2">
							<Tree.Root>
								<Tree.Header class="hover:bg-muted rounded px-3 py-2">components</Tree.Header>
								<Tree.Body class="space-y-1">
									<div class="px-3 py-1 text-sm">Button.svelte</div>
									<div class="px-3 py-1 text-sm">Input.svelte</div>
									<div class="px-3 py-1 text-sm">Card.svelte</div>
								</Tree.Body>
							</Tree.Root>
							<Tree.Root>
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tree.Root Props</h3>
				<Props
					data={[
						{
							name: 'open',
							type: 'boolean',
							default: 'false',
							description: 'Controls whether the tree is expanded (bindable)'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Whether the tree is disabled'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						},
						{
							name: 'children',
							type: 'Snippet',
							default: '-',
							description: 'Tree content (Header and Body components)'
						}
					]}
				/>
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tree.Header Props</h3>
				<Props
					data={[
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						},
						{
							name: 'children',
							type: 'Snippet',
							default: '-',
							description: 'Header content (clickable label)'
						},
						{
							name: 'onpointerdown',
							type: 'function',
							default: '-',
							description: 'Pointer down event handler'
						}
					]}
				/>
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tree.Body Props</h3>
				<Props
					data={[
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						},
						{
							name: 'children',
							type: 'Snippet',
							default: '-',
							description: 'Body content (nested trees or items)'
						}
					]}
				/>
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'ARIA tree role',
				'Keyboard navigation (Arrow keys)',
				'aria-expanded state',
				'Focus management',
				'Screen reader friendly'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Tooltip', href: '/docs/components/tooltip' }}
		next={{ label: 'Virtual', href: '/docs/components/virtual' }}
	/>
</div>
