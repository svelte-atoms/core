<script lang="ts">
	import { Dialog } from '$lib/components/dialog';
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
	import { dialogProps, dialogContentProps, dialogHeaderProps, dialogBodyProps, dialogFooterProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'dialog',
		title: 'Dialog',
		category: 'components',
		depth: 'intermediate',
		prerequisites: [],
		related: [],
	};
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'DataGrid', href: '/docs/components/datagrid' }}
	next={{ label: 'Divider', href: '/docs/components/divider' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the dialog appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different dialog variations and use cases">
		<DocExample title="Basic Dialog" description="Modal dialog with a trigger button — no manual open state needed." code={metadata.examples.basic}>
			<Dialog.Root>
				{#snippet trigger({ dialog })}
					<Button {...dialog.trigger()}>Open Dialog</Button>
				{/snippet}
				{#snippet children({ dialog })}
					<Dialog.Content>
						<Dialog.Header>
							<h2 class="text-foreground text-lg font-semibold">Edit Profile</h2>
							<Dialog.CloseButton class="ml-auto" />
						</Dialog.Header>
						<Dialog.Body class="text-muted-foreground text-sm">
							<p>Make changes to your profile here. Click save when you're done.</p>
						</Dialog.Body>
						<Dialog.Footer class="flex justify-end gap-2">
							<Button variant="outline" onclick={() => dialog.state.close()}>Cancel</Button>
							<Button onclick={() => dialog.state.close()}>Save changes</Button>
						</Dialog.Footer>
					</Dialog.Content>
				{/snippet}
			</Dialog.Root>
		</DocExample>

		<DocExample title="Destructive Action" description="Confirmation dialog for irreversible actions." code={metadata.examples.alert}>
			<Dialog.Root>
				{#snippet trigger({ dialog })}
					<Button variant="destructive" {...dialog.trigger()}>Delete Account</Button>
				{/snippet}
				{#snippet children({ dialog })}
					<Dialog.Content>
						<Dialog.Header>
							<h2 class="text-foreground text-lg font-semibold">Are you absolutely sure?</h2>
							<Dialog.CloseButton class="ml-auto" />
						</Dialog.Header>
						<Dialog.Body class="text-muted-foreground text-sm">
							<p>This action cannot be undone. This will permanently delete your account and remove all associated data.</p>
						</Dialog.Body>
						<Dialog.Footer class="flex justify-end gap-2">
							<Button variant="outline" onclick={() => dialog.state.close()}>Cancel</Button>
							<Button variant="destructive" onclick={() => dialog.state.close()}>Delete account</Button>
						</Dialog.Footer>
					</Dialog.Content>
				{/snippet}
			</Dialog.Root>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Dialog.Root

**Preset Key:** `dialog`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Dialog.Root</h3></DocOnly>
		<DocProps data={dialogProps} />

		<DocOnly for="markdown">
{newLine(2)}### Dialog.Content

**Preset Key:** `dialog.content`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Dialog.Content</h3></DocOnly>
		<DocProps data={dialogContentProps} />

		<DocOnly for="markdown">
{newLine(2)}### Dialog.Header

**Preset Key:** `dialog.header`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Dialog.Header</h3></DocOnly>
		<DocProps data={dialogHeaderProps} />

		<DocOnly for="markdown">
{newLine(2)}### Dialog.Body

**Preset Key:** `dialog.body`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Dialog.Body</h3></DocOnly>
		<DocProps data={dialogBodyProps} />

		<DocOnly for="markdown">
{newLine(2)}### Dialog.Footer

**Preset Key:** `dialog.footer`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Dialog.Footer</h3></DocOnly>
		<DocProps data={dialogFooterProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
