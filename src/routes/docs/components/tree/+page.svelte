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
		Props
	} from '$docs/components';

	const basicCode = `<Tree>
  <Tree.Item label="Parent">
    <Tree.Item label="Child 1" />
    <Tree.Item label="Child 2" />
  <\/Tree.Item>
<\/Tree>`;

	const treeData = [
		{
			label: 'Documents',
			children: [
				{ label: 'Resume.pdf' },
				{ label: 'CoverLetter.docx' }
			]
		},
		{
			label: 'Photos',
			children: [
				{ label: 'Vacation.jpg' },
				{ label: 'Family.png' },
				{
					label: 'Events',
					children: [
						{ label: 'Birthday.jpg' },
						{ label: 'Wedding.jpg' }
					]
				}
			]
		},
		{ label: 'Notes.txt' }
	];

	let expanded = $state<string[]>([]);

	function toggleExpanded(label: string) {
		if (expanded.includes(label)) {
			expanded = expanded.filter(l => l !== label);
		} else {
			expanded = [...expanded, label];
		}
	}
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
				You can customize the default styles for Tree components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  tree: () => ({
    class: 'space-y-1'
  }),
  'tree.item': () => ({
    class: 'cursor-pointer rounded px-2 py-1 hover:bg-accent transition-colors'
  }),
  'tree.children': () => ({
    class: 'pl-4 space-y-1 border-l border-border ml-2'
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different tree variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Tree"
				description="Simple hierarchical structure"
				code={basicCode}
			>
				<Tree.Root class="border rounded p-4 max-w-md">
					<Tree.Item 
						label="Documents"
						class="py-1"
					>
						<div class="ml-4 space-y-1">
							<Tree.Item label="Resume.pdf" class="py-1" />
							<Tree.Item label="CoverLetter.docx" class="py-1" />
						</div>
					</Tree.Item>
					<Tree.Item 
						label="Photos"
						class="py-1"
					>
						<div class="ml-4 space-y-1">
							<Tree.Item label="Vacation.jpg" class="py-1" />
							<Tree.Item label="Family.png" class="py-1" />
						</div>
					</Tree.Item>
					<Tree.Item label="Notes.txt" class="py-1" />
				</Tree.Root>
			</DemoExample>

			<DemoExample
				title="Nested Tree"
				description="Multiple levels of nesting"
				code={`<Tree.Item label="Parent">
  <Tree.Item label="Child">
    <Tree.Item label="Grandchild" />
  <\/Tree.Item>
<\/Tree.Item>`}
			>
				<Tree.Root class="border rounded p-4 max-w-md">
					<Tree.Item label="src" class="py-1">
						<div class="ml-4 space-y-1">
							<Tree.Item label="components" class="py-1">
								<div class="ml-4 space-y-1">
									<Tree.Item label="Button.svelte" class="py-1" />
									<Tree.Item label="Input.svelte" class="py-1" />
								</div>
							</Tree.Item>
							<Tree.Item label="utils" class="py-1">
								<div class="ml-4 space-y-1">
									<Tree.Item label="helpers.ts" class="py-1" />
								</div>
							</Tree.Item>
							<Tree.Item label="app.ts" class="py-1" />
						</div>
					</Tree.Item>
					<Tree.Item label="package.json" class="py-1" />
				</Tree.Root>
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
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Tree.Item Props</h3>
				<Props
					data={[
						{
							name: 'label',
							type: 'string',
							default: "''",
							description: 'Item label text'
						},
						{
							name: 'expanded',
							type: 'boolean',
							default: 'false',
							description: 'Expanded state'
						},
						{
							name: 'onclick',
							type: '() => void',
							default: '-',
							description: 'Click handler'
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
