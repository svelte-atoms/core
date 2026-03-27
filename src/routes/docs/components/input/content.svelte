<script lang="ts">
	import { Input } from '$lib/components/input';
	import { Icon } from '$lib/components/icon';
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
	import { inputRootProps, inputControlProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'input',
		title: 'Input',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	let value = $state('');
	let searchValue = $state('');
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Form', href: '/docs/components/form' }}
	next={{ label: 'Label', href: '/docs/components/label' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Compound Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the input appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different input variations">
		<DocExample title="Basic Input" description="Simple text input" code={metadata.examples.basic}>
			<Input.Root>
				<Input.Control bind:value type="text" placeholder="Type something..." />
			</Input.Root>
		</DocExample>

		<DocExample title="Input with Icon" description="Input with leading icon" code={metadata.examples.withIcon}>
			<Input.Root>
				<Input.Icon>
					<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
				</Input.Icon>
				<Input.Control bind:value={searchValue} type="text" placeholder="Search..." />
			</Input.Root>
		</DocExample>

		<DocExample title="Input Types" description="Various HTML input types" code={metadata.examples.types}>
			<div class="w-80 space-y-3">
				<Input.Root>
					<Input.Control type="email" placeholder="Email address" />
				</Input.Root>
				<Input.Root>
					<Input.Control type="password" placeholder="Password" />
				</Input.Root>
				<Input.Root>
					<Input.Control type="number" placeholder="Number" />
				</Input.Root>
			</div>
		</DocExample>

		<DocExample title="Disabled Input" description="Input in disabled state" code={metadata.examples.disabled}>
			<Input.Root>
				<Input.Control type="text" placeholder="Disabled input" disabled />
			</Input.Root>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Input.Root

**Preset Key:** `input`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Input.Root

**Preset Key:** `input`</h3></DocOnly>
		<DocProps data={inputRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Input.Control

**Preset Key:** `input.control`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Input.Control</h3></DocOnly>
		<DocProps data={inputControlProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
