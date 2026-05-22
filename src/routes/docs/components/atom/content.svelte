<script lang="ts">
	import { createExampleLoader } from '$docs/utils/example-loader';
	import { DocComponentPage, DocSection, DocExample, DocCode, DocPropsTabs } from '$docs/components';
	import type { PropsSection } from '$docs/components';
	import { htmlAtomProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'atom',
		title: 'Atom',
		category: 'components',
		depth: 'intermediate',
		prerequisites: [],
		related: []
	};

	const apiSections: PropsSection[] = [
		{ label: 'HtmlAtom Props', presetKey: 'atom', props: htmlAtomProps },
	];

	const _loaders = import.meta.glob('./examples/*.svelte');
	const _sources = import.meta.glob('./examples/*.svelte', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
	const ex = createExampleLoader(_loaders, _sources);
</script>

<DocComponentPage
	{contentType}
	{metadata}
	{frontmatter}
	prev={{ label: 'Alert', href: '/docs/components/alert' }}
	next={{ label: 'Avatar', href: '/docs/components/avatar' }}
>
	{#snippet examples()}
		<DocExample title="Basic Usage" description="Render any HTML element with the as prop" {...ex('./examples/basic.svelte')} />
		<DocExample title="Variants System" description="Define reusable style combinations with type-safe props" {...ex('./examples/variants.svelte')} />
	{/snippet}

	{#snippet extra()}
		<DocSection title="Component Composition">
			<DocCode code={metadata.examples.composition} lang="svelte" />
		</DocSection>

		<DocSection title="Animation &amp; Transitions">
			<DocCode code={metadata.examples.animation} lang="svelte" />
		</DocSection>

		<DocSection title="Building Custom Components">
			<DocCode code={metadata.examples.customComponent} lang="svelte" />
		</DocSection>
	{/snippet}

	{#snippet apiReference()}
		<DocPropsTabs sections={apiSections} />
	{/snippet}
</DocComponentPage>
