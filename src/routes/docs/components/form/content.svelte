<script lang="ts">
	import { Form, Field } from '$lib/components/form';
	import { Input } from '$lib/components/input';
	import { Button } from '$lib/components/button';
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
	import { formRootProps, fieldRootProps, fieldLabelProps, fieldControlProps, fieldHelperTextProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { FieldSnippetProps } from '$lib/components/form';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'form',
		title: 'Form',
		category: 'components',
		depth: 'intermediate',
		prerequisites: [],
		related: [],
	};

	let name = $state('');
	let email = $state('');

	const commonFieldProps = {
		disabled: false,
		readonly: false,
		extend: {},
		parse: () => {}
	};
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Dropdown Menu', href: '/docs/components/dropdown-menu' }}
	next={{ label: 'Input', href: '/docs/components/input' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the form appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different form variations">
		<DocExample title="Basic Form" description="Simple form with labeled fields." code={metadata.examples.basic}>
			<div class="w-80">
				<Form class="flex flex-col gap-4" onsubmit={(e) => e.preventDefault()}>
					<Field.Root {...commonFieldProps} name="name">
						<Field.Label>Name</Field.Label>
						<Input.Root>
							<Field.Control base={Input.Control as unknown as never} bind:value={name} placeholder="Enter your name" />
						</Input.Root>
					</Field.Root>

					<Field.Root {...commonFieldProps} name="email">
						<Field.Label>Email</Field.Label>
						<Input.Root>
							<Field.Control base={Input.Control as unknown as never} bind:value={email} type="email" placeholder="Enter your email" />
						</Input.Root>
					</Field.Root>

					<Button type="submit">Submit</Button>
				</Form>
			</div>
		</DocExample>

		<DocExample title="Form with Validation Errors" description="Field with inline error messages." code={metadata.examples.validated}>
			<div class="w-80">
				<Form class="flex flex-col gap-4" onsubmit={(e) => e.preventDefault()}>
					<Field.Root {...commonFieldProps} name="email">
						{#snippet children({ field }: FieldSnippetProps)}
							<Field.Label>Email</Field.Label>
							<Input.Root>
								<Field.Control base={Input.Control as unknown as never} type="email" placeholder="Enter your email" />
							</Input.Root>
							{#if field?.state.errors.length}
								<Field.HelperText class="text-destructive">{field.state.errors[0]?.message}</Field.HelperText>
							{:else}
								<Field.HelperText>We'll only use this for account updates.</Field.HelperText>
							{/if}
						{/snippet}
					</Field.Root>

					<Button type="submit">Submit</Button>
				</Form>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Form

**Preset Key:** `form`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Form</h3></DocOnly>
		<DocProps data={formRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Field.Root

**Preset Key:** `field`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Field.Root</h3></DocOnly>
		<DocProps data={fieldRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Field.Label

**Preset Key:** `field.label`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Field.Label</h3></DocOnly>
		<DocProps data={fieldLabelProps} />

		<DocOnly for="markdown">
{newLine(2)}### Field.Control

**Preset Key:** `field.control`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Field.Control</h3></DocOnly>
		<DocProps data={fieldControlProps} />

		<DocOnly for="markdown">
{newLine(2)}### Field.HelperText

**Preset Key:** `field.helper-text`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Field.HelperText</h3></DocOnly>
		<DocProps data={fieldHelperTextProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
