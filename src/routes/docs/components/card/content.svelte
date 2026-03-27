<script lang="ts">
	import { Card } from '$lib/components/card';
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
	import { cardRootProps, cardSubPartProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'card',
		title: 'Card',
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
	prev={{ label: 'Breadcrumb', href: '/docs/components/breadcrumb' }}
	next={{ label: 'Checkbox', href: '/docs/components/checkbox' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the card appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different card variations and use cases">
		<DocExample title="Basic Card" description="Simple card with header, body, and footer" code={metadata.examples.basic}>
			<Card.Root class="w-80">
				<Card.Header>
					<Card.Title>Card Title</Card.Title>
					<Card.Subtitle>Card subtitle</Card.Subtitle>
				</Card.Header>
				<Card.Body>
					<p class="text-sm">Main content goes here. This card has a header, body, and footer section.</p>
				</Card.Body>
				<Card.Footer class="gap-2">
					<button class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">Action</button>
					<button class="rounded border px-3 py-1 text-sm hover:bg-gray-100">Cancel</button>
				</Card.Footer>
			</Card.Root>
		</DocExample>

		<DocExample title="Card with Media" description="Card with image/media section" code={metadata.examples.withMedia}>
			<Card.Root class="w-80 overflow-hidden rounded-lg border">
				<Card.Media>
					<img src="https://picsum.photos/320/160?grayscale" alt="Card visual" class="w-full" />
				</Card.Media>
				<Card.Header>
					<Card.Title>Media Card</Card.Title>
					<Card.Description>Card with an image media section.</Card.Description>
				</Card.Header>
				<Card.Body>
					<p class="text-sm">Card body content after the media section.</p>
				</Card.Body>
			</Card.Root>
		</DocExample>

		<DocExample title="Clickable Card" description="Interactive card with click handler" code={metadata.examples.clickable}>
			<Card.Root onclick={() => alert('Card clicked!')} class="w-80 cursor-pointer">
				<Card.Header>
					<Card.Title>Clickable Card</Card.Title>
					<Card.Description>Click anywhere on this card to trigger an action.</Card.Description>
				</Card.Header>
			</Card.Root>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Card.Root

**Preset Key:** `card`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Card.Root

**Preset Key:** `card`</h3></DocOnly>
		<DocProps data={cardRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Card Sub-Parts (Header, Title, Subtitle, Description, Body, Media, Footer)

**Preset Keys:** `card.header`, `card.title`, `card.subtitle`, `card.description`, `card.body`, `card.media`, `card.footer`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Card Sub-Parts</h3></DocOnly>
		<DocProps data={cardSubPartProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
