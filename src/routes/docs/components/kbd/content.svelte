<script lang="ts">
	import { Kbd, Shortcut } from '$lib/components/kbd';
	import {
		DocPage,
		DocSection,
		DocExample,
		DocProps,
		DocOnly,
		DocInstallation,
		DocAccessibility,
		DocCode
	} from '$docs/components';
	import { kbdProps, shortcutProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'kbd',
		title: 'Kbd',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Input', href: '/docs/components/input' }}
	next={{ label: 'Label', href: '/docs/components/label' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Simple Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different use cases for Kbd and Shortcut">
		<DocExample title="Individual Keys" description="Use Kbd to represent a single keyboard key." code={metadata.examples.basic}>
			<div class="flex flex-wrap items-center gap-2">
				<Kbd>⌘</Kbd>
				<Kbd>Ctrl</Kbd>
				<Kbd>Shift</Kbd>
				<Kbd>Enter</Kbd>
			</div>
		</DocExample>

		<DocExample title="Shortcut — keys prop" description="Pass an array of keys to Shortcut to render a full key combination." code={metadata.examples.shortcutKeys}>
			<div class="flex flex-col gap-3">
				<div class="flex items-center justify-between gap-8">
					<span class="text-sm">Command Palette</span>
					<Shortcut keys={['⌘', 'K']} />
				</div>
				<div class="flex items-center justify-between gap-8">
					<span class="text-sm">Save</span>
					<Shortcut keys={['Ctrl', 'S']} />
				</div>
				<div class="flex items-center justify-between gap-8">
					<span class="text-sm">Find & Replace</span>
					<Shortcut keys={['Ctrl', 'Shift', 'H']} />
				</div>
			</div>
		</DocExample>

		<DocExample title="Custom Separator" description="Override the default '+' separator with any string." code={metadata.examples.customSeparator}>
			<div class="flex flex-col gap-2">
				<Shortcut keys={['Ctrl', 'Alt', 'Del']} separator="+" />
				<Shortcut keys={['Alt', 'Tab']} separator="→" />
			</div>
		</DocExample>

		<DocExample title="Manual Composition" description="Use the children slot for full control over the shortcut layout." code={metadata.examples.manualComposition}>
			<Shortcut>
				<Kbd>⌘</Kbd>
				<span class="text-muted-foreground text-xs">then</span>
				<Kbd>K</Kbd>
			</Shortcut>
		</DocExample>

		<DocExample title="Inline Usage" description="Kbd and Shortcut can be embedded directly within prose text." code={metadata.examples.inline}>
			<p class="text-sm leading-relaxed">
				Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette, or use
				<Shortcut keys={['Ctrl', 'Shift', 'P']} /> to access all commands.
			</p>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Kbd Props

**Preset Key:** `kbd`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Kbd Props</h3></DocOnly>
		<DocProps data={kbdProps} />

		<DocOnly for="markdown">
{newLine(2)}### Shortcut Props

**Preset Key:** `shortcut`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Shortcut Props</h3></DocOnly>
		<DocProps data={shortcutProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>
</DocPage>
