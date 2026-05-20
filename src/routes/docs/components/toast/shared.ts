const basicCode = `
<script lang="ts">
  import { Toast, Toaster } from '@svelte-atoms/core/toast';

  interface ToastData { title: string; description?: string }

  const toaster = new Toaster();
<\/script>

<button onclick={() => toaster.add('default', { data: { title: 'Hello!' } as ToastData })}>
  Default
<\/button>
<button onclick={() => toaster.add('success', { data: { title: 'Saved!' } as ToastData })}>
  Success
<\/button>

<ol class="fixed bottom-4 right-4 flex flex-col-reverse gap-2">
  {#each toaster.toasts as item (item.id)}
    {@const data = item.data as ToastData}
    <Toast.Root
      open={true}
      onclose={() => toaster.dismiss(item.id)}
      class="relative flex w-80 flex-col gap-1 rounded-md border p-4 pr-8 shadow-md"
    >
      <Toast.Title>{data.title}<\/Toast.Title>
      {#if data.description}
        <Toast.Description>{data.description}<\/Toast.Description>
      {/if}
      <Toast.Close class="absolute top-2 right-2" />
    <\/Toast.Root>
  {/each}
<\/ol>`.trim();

const declarativeCode = `
<script lang="ts">
  import { Toast } from '@svelte-atoms/core/toast';

  let open = $state(false);
<\/script>

<button onclick={() => (open = true)}>Show toast<\/button>

<Toast.Root bind:open class="...">
  <Toast.Title>Declarative toast<\/Toast.Title>
  <Toast.Description>Fully owned by markup — no manager required.<\/Toast.Description>
  <Toast.Close />
<\/Toast.Root>`.trim();

const autoDismissCode = `
<Toast.Root
  bind:open
  duration={3000}
  onclose={() => (open = false)}
  class="..."
>
  <Toast.Title>Auto-dismiss<\/Toast.Title>
  <Toast.Description>Gone in 3 seconds.<\/Toast.Description>
  <Toast.Close />
<\/Toast.Root>`.trim();

const presetCode = `
import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
	toast: () => ({
		class: 'relative flex w-80 flex-col gap-1 rounded-md border border-border bg-card p-4 pr-8 shadow-md backdrop-blur-xs',
		variants: {
			variant: {
				default: { class: 'bg-card text-card-foreground border-border' },
				info: { class: 'bg-info/5 text-info border-info/30' },
				success: { class: 'bg-success/10 text-success border-success/30' },
				warning: { class: 'bg-warning/10 text-warning border-warning/30' },
				error: { class: 'bg-destructive/10 text-destructive border-destructive/30' }
			}
		}
	}),
	'toast.title': () => ({
		class: 'text-sm font-medium leading-tight'
	}),
	'toast.description': () => ({
		class: 'text-sm opacity-80'
	}),
	'toast.close': () => ({
		class: 'absolute top-2 right-2 rounded p-1 opacity-50 transition-opacity hover:opacity-100'
	})
});`.trim();

const accessibilityFeatures = [
	'Toast.Root renders with role="status" and aria-live="polite" so screen readers announce new toasts',
	'Toast.Title and Toast.Description are linked via aria-labelledby / aria-describedby',
	'Toast.Close has aria-label="Dismiss notification" and responds to Enter / Space',
	'aria-disabled reflects the disabled state on the root element'
];

const useCases = [
	{
		title: 'Action Confirmation',
		description:
			'Provide immediate feedback after user actions like save, delete, or update operations complete successfully.'
	},
	{
		title: 'Error Notifications',
		description:
			"Display non-critical error messages that don't require immediate attention or block workflow."
	},
	{
		title: 'Background Process Updates',
		description:
			'Notify users about completed background tasks like file uploads, downloads, or data syncing.'
	},
	{
		title: 'Status Changes',
		description:
			'Communicate real-time status updates like connection loss/restore, offline mode, or feature toggles.'
	}
];

const componentsSummary = [
	{ name: 'Toast.Root', description: 'Root container for a single toast notification' },
	{ name: 'Toast.Title', description: 'Title text linked to the root via aria-labelledby' },
	{
		name: 'Toast.Description',
		description: 'Supporting text linked to the root via aria-describedby'
	},
	{
		name: 'Toast.Close',
		description: 'Dismiss button that calls bond.state.close() on click or Enter / Space'
	},
	{ name: 'Toaster', description: 'Reactive manager class for imperative toast creation' }
];

export const metadata = {
	title: 'Toast - Svelte Atoms',
	description: 'Display brief, temporary notifications to users.',
	componentTitle: 'Toast',
	componentDescription:
		'Temporary notification that appears at the screen edge for non-intrusive feedback and system messages.',
	componentType: 'simple' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Toast, Toaster } from '@svelte-atoms/core/toast';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Toast' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		declarative: declarativeCode,
		autoDismiss: autoDismissCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
