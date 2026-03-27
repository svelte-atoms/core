const basicCode = `
<script lang="ts">
  import { Dialog } from '@svelte-atoms/core/dialog';
  import { Button } from '@svelte-atoms/core/button';
<\/script>

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
</Dialog.Root>`.trim();

const alertCode = `
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
</Dialog.Root>`.trim();

const controlledCode = `
<script lang="ts">
  import { Dialog } from '@svelte-atoms/core';

  let isOpen = $state(false);

  function handleToggle() {
    isOpen = !isOpen;
    console.log('Dialog state changed:', isOpen);
  }
</script>

<button onclick={handleToggle}>
  {isOpen ? 'Close' : 'Open'} Dialog
</button>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <h2>Controlled Dialog</h2>
      <Dialog.CloseButton />
    </Dialog.Header>
    <Dialog.Body>
      <p>This dialog's state is controlled externally</p>
    </Dialog.Body>
  </Dialog.Content>
</Dialog.Root>`.trim();

const animatedCode = `
<script lang="ts">
  import { Dialog, toTransitionConfig } from '@svelte-atoms/core';
  import { animate } from 'motion';

  let isOpen = $state(false);
</script>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content
    initial={(node) => {
      node.style.opacity = '0';
      node.style.scale = '0.8';
    }}
    enter={(node) => toTransitionConfig(animate(node, { opacity: 1, scale: 1 }, { duration: 0.3 }))}
    exit={(node) =>
      toTransitionConfig(animate(node, { opacity: 0, scale: 0.8 }, { duration: 0.2 }))}
  >
    <Dialog.Header>
      <h2>Animated Dialog</h2>
      <Dialog.CloseButton />
    </Dialog.Header>
    <Dialog.Body>
      <p>This dialog has custom Motion animations</p>
    </Dialog.Body>
  </Dialog.Content>
</Dialog.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
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
});`.trim();

const accessibilityFeatures = [
	'Focus trapped within dialog',
	'Escape key to close',
	'Proper ARIA attributes (role="dialog", aria-modal)',
	'Returns focus to trigger on close',
	'Screen reader announcements',
	'Keyboard navigation support'
];

const useCases = [
	{
		title: 'Critical User Decisions',
		description:
			'Display important confirmations or warnings that require explicit user action before proceeding (e.g., delete confirmations, irreversible actions).'
	},
	{
		title: 'Form Submissions',
		description:
			'Present complex forms or multi-step workflows in a focused overlay without navigating away from the current page.'
	},
	{
		title: 'Content Previews',
		description:
			'Show detailed information, images, or media content in an expanded view while maintaining context of the main page.'
	},
	{
		title: 'Authentication Flows',
		description:
			'Handle login, registration, or password reset flows in a modal overlay for seamless user experience.'
	},
	{
		title: 'Settings and Preferences',
		description:
			'Display application or user settings that need immediate attention without navigating to a separate page.'
	},
	{
		title: 'Notifications and Alerts',
		description:
			'Show important system messages, updates, or alerts that require user acknowledgment or action.'
	}
];

const componentsSummary = [
	{
		name: 'Dialog.Root',
		description:
			'Root container that manages the dialog state, backdrop, and focus trap. Controls the open/close state and coordinates all child components.'
	},
	{
		name: 'Dialog.Content',
		description:
			'Main container for the dialog content. Positioned centrally and handles enter/exit animations.'
	},
	{
		name: 'Dialog.Header',
		description:
			'Optional header section for dialog title and close button. Typically contains the dialog title and dismiss controls.'
	},
	{
		name: 'Dialog.Body',
		description:
			'Main content area of the dialog. Contains the primary content, forms, or information.'
	},
	{
		name: 'Dialog.Footer',
		description:
			'Optional footer section for action buttons. Typically contains confirm/cancel buttons or other actions.'
	},
	{
		name: 'Dialog.Title',
		description: 'Semantic title element with proper ARIA labeling for accessibility.'
	},
	{
		name: 'Dialog.Description',
		description: 'Semantic description element for providing additional context to screen readers.'
	},
	{
		name: 'Dialog.CloseButton',
		description:
			'Pre-configured button component that closes the dialog when clicked. Automatically wired to dialog state.'
	}
];

export const metadata = {
	title: 'Dialog - Svelte Atoms',
	description: 'Modal dialog for important user interactions.',
	componentTitle: 'Dialog',
	componentDescription:
		'Modal dialog for important user interactions. Captures focus and requires user action.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Dialog } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Dialog' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		alert: alertCode,
		controlled: controlledCode,
		animated: animatedCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
