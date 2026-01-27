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
		dialogProps,
		dialogContentProps,
		dialogHeaderProps,
		dialogBodyProps,
		dialogFooterProps,
		dialogTitleProps,
		dialogDescriptionProps,
		dialogCloseButtonProps
	} from './props';

	const basicCode = `<script lang="ts">
  let open = $state(false);
<\/script>

<button onclick={() => open = true}>Open Dialog</button>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <h2>Dialog Title</h2>
    </Dialog.Header>
    <Dialog.Body>
      <p>Dialog content goes here.</p>
    </Dialog.Body>
    <Dialog.Footer>
      <button onclick={() => open = false}>Close</button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`;

	const alertCode = `<Dialog.Root bind:open variant="alert">
  <Dialog.Content>
    <Dialog.Header>
      <h2>Are you sure?</h2>
    </Dialog.Header>
    <Dialog.Body>
      <p>This action cannot be undone.</p>
    </Dialog.Body>
    <Dialog.Footer>
      <button>Cancel</button>
      <button>Confirm</button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`;

	let basicOpen = $state(false);
	let alertOpen = $state(false);
</script>

<svelte:head>
	<title>Dialog - Svelte Atoms</title>
	<meta name="description" content="Modal dialog for important user interactions." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Dialog' }]} />

	<PageHeader
		title="Dialog"
		description="Modal dialog for important user interactions. Captures focus and requires user action."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Dialog &#125; from '@svelte-atoms/core/dialog';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the dialog appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Dialog components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  dialog: () => ({
    class: 'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'
  }),
  'dialog.content': () => ({
    class: 'relative z-50 w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg'
  }),
  'dialog.header': () => ({
    class: 'flex flex-col space-y-1.5 text-center sm:text-left'
  }),
  'dialog.title': () => ({
    class: 'text-lg font-semibold leading-none tracking-tight'
  }),
  'dialog.body': () => ({
    class: 'py-4 text-sm text-muted-foreground'
  }),
  'dialog.footer': () => ({
    class: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different dialog variations">
		<div class="space-y-8">
			<DemoExample title="Basic Dialog" description="Simple modal dialog" code={basicCode}>
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
							>
								Confirm
							</button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</DemoExample>

			<DemoExample title="Alert Dialog" description="Dialog for critical actions" code={alertCode}>
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dialog.Root Props</h3>
				<Props data={dialogProps} />
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Focus trapped within dialog',
				'Escape key to close',
				'Proper ARIA attributes (role="dialog", aria-modal)',
				'Returns focus to trigger on close',
				'Screen reader announcements',
				'Keyboard navigation support'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'DataGrid', href: '/docs/components/datagrid' }}
		next={{ label: 'Divider', href: '/docs/components/divider' }}
	/>
</div>
