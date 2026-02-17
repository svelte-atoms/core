<script lang="ts">
	import { Dialog } from '$lib/components/dialog';
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
	import { Button } from '$svelte-atoms/core';
	import {
		dialogProps
	} from './props';
	import { metadata } from './shared';

	let basicOpen = $state(false);
	let alertOpen = $state(false);
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
		<Installation
			packageName={metadata.packageName}
			importCode={metadata.importCode}
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the dialog appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Dialog components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={metadata.examples.preset}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different dialog variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Dialog" description="Simple modal dialog" code={metadata.examples.basic}>
				<Button class="" onclick={() => (basicOpen = true)}>Open Dialog</Button>

				<Dialog.Root bind:open={basicOpen}>
					<Dialog.Content class="">
						<Dialog.Header class="mb-4">
							<h2 class="text-foreground text-xl font-semibold">Dialog Title</h2>
						</Dialog.Header>
						<Dialog.Body class="">
							<p>
								This is a modal dialog. It captures focus and requires user interaction before
								returning to the main content.
							</p>
						</Dialog.Body>
						<Dialog.Footer class="flex justify-end gap-2">
							<button class="rounded border px-4 py-2" onclick={() => (basicOpen = false)}>
								Cancel
							</button>
							<button
								class="bg-primary rounded px-4 py-2 text-white"
								onclick={() => (basicOpen = false)}
							>metadata.examples.basic
								Confirm
							</button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</DemoExample>

			<DemoExample title="Alert Dialog" description="Dialog for critical actions" code={metadata.examples.alert}>
				<Button class="" onclick={() => (alertOpen = true)}>Delete Item</Button>

				<Dialog.Root bind:open={alertOpen}>
					<Dialog.Content class="bg-background max-w-md rounded-lg p-6 shadow-lg">
						<Dialog.Header class="mb-4">
							<h2 class="text-foreground text-xl font-semibold">Are you sure?</h2>
						</Dialog.Header>
						<Dialog.Body class="text-muted-foreground mb-6">
							<p>This action cannot be undone. This will permanently delete the item.</p>
						</Dialog.Body>
						<Dialog.Footer class="flex justify-end gap-2">
							<button class="rounded border px-4 py-2" onclick={() => (alertOpen = false)}>
								Cancel
							</button>
							<button
								class="rounded bg-red-600 px-4 py-2 text-white"
								onclick={() => (alertOpen = false)}
							>
								Delete
							</button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dialog.Root Props</h3>
				<Props data={dialogProps} />
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
		prev={{ label: 'DataGrid', href: '/docs/components/datagrid' }}
		next={{ label: 'Divider', href: '/docs/components/divider' }}
	/>
</div>
