const basicCode = `
<script lang="ts">
  import { toast } from '@svelte-atoms/core/toast';
<\/script>

<button onclick={() => toast.show('Hello!')}>
  Show Toast
<\/button>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  toast: () => ({
    class: 'pointer-events-auto flex w-full max-w-md rounded-lg border bg-background p-4 shadow-lg'
  })
});
`.trim();

const accessibilityFeatures = [
	'Uses ARIA live regions',
	'role=\'status\' for announcements',
	'Keyboard dismissible',
	'Respects prefers-reduced-motion',
	'Screen reader friendly'
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
			'Display non-critical error messages that don\'t require immediate attention or block workflow.'
	},
	{
		title: 'Background Process Updates',
		description:
			'Notify users about completed background tasks like file uploads, downloads, or data syncing.'
	},
	{
		title: 'Undo Actions',
		description:
			'Offer quick undo functionality with a toast notification after potentially destructive actions.'
	},
	{
		title: 'Status Changes',
		description:
			'Communicate real-time status updates like connection loss/restore, offline mode, or feature toggles.'
	},
	{
		title: 'Tips and Hints',
		description:
			'Show helpful tips, keyboard shortcuts, or feature discoveries without interrupting user flow.'
	}
];

export const metadata = {
	title: 'Toast - Svelte Atoms',
	description: 'Display brief, temporary notifications to users.',
	componentTitle: 'Toast',
	componentDescription:
		'A lightweight notification component that appears temporarily at the edge of the screen for non-intrusive feedback.',
	componentType: 'simple' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { toast } from '@svelte-atoms/core/toast';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Toast' }],
	useCases,
	examples: {
		basic: basicCode,
		toaster: `<!-- In your root +layout.svelte -->
<Toast.Toaster />

<!-- Then anywhere in your app -->
<script lang="ts">
  import { Toast,
		preset: presetCode
	} from '@svelte-atoms/core';
<\/script>

<Toast.Root>
  <Toast.Title>Saved</Toast.Title>
  <Toast.Description>Your changes have been saved.</Toast.Description>
</Toast.Root>`,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
