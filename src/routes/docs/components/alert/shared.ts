const basicCode = `
<script>
  import { Alert } from '@svelte-atoms/core';
<\/script>

<Alert.Root variant="primary">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4M12 8h.01"></path>
    </svg>
  </Alert.Icon>
  <Alert.Title>New Feature Available</Alert.Title>
  <Alert.Description>
    We've added dark mode support to your dashboard.
  </Alert.Description>
</Alert.Root>`.trim();

const variantsCode = `
<Alert.Root variant="primary">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4M12 8h.01"></path>
    </svg>
  </Alert.Icon>
  <Alert.Title>Primary Alert</Alert.Title>
  <Alert.Description>This is a primary alert message.</Alert.Description>
</Alert.Root>

<Alert.Root variant="secondary">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  </Alert.Icon>
  <Alert.Title>Secondary Alert</Alert.Title>
  <Alert.Description>This is a secondary alert message.</Alert.Description>
</Alert.Root>

<Alert.Root variant="destructive">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  </Alert.Icon>
  <Alert.Title>Destructive Alert</Alert.Title>
  <Alert.Description>This is a destructive alert message.</Alert.Description>
</Alert.Root>`.trim();

const dismissibleCode = `
<script>
  let dismissed = $state(false);
<\/script>

<Alert.Root variant="primary" dismissible bind:dismissed>
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4M12 8h.01"></path>
    </svg>
  </Alert.Icon>
  <Alert.Title>Dismissible Alert</Alert.Title>
  <Alert.Description>
    You can dismiss this alert by clicking the close button.
  </Alert.Description>
  <Alert.CloseButton>
    <Icon class="h-full">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </Icon>
  </Alert.CloseButton>
</Alert.Root>`.trim();

const actionsCode = `
<Alert.Root variant="primary">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  </Alert.Icon>
  <Alert.Title>System Update Available</Alert.Title>
  <Alert.Description>
    A new version is ready to install.
  </Alert.Description>
  <Alert.Actions>
    <Button variant="primary" size="sm">Update Now</Button>
    <Button variant="ghost" size="sm">Remind Me Later</Button>
  </Alert.Actions>
</Alert.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  alert: () => ({
    class: 'relative w-full rounded-lg border p-4'
  }),
  'alert.icon': () => ({
    class: 'h-4 w-4'
  }),
  'alert.title': () => ({
    class: 'mb-1 font-medium leading-none tracking-tight'
  }),
  'alert.description': () => ({
    class: 'text-sm opacity-90'
  })
});
`.trim();

const accessibilityFeatures = [
	'Uses appropriate ARIA role attributes',
	'Semantic HTML structure with proper heading hierarchy',
	'Sufficient color contrast ratios for all variants',
	'Keyboard accessible dismiss button with focus indicators',
	'Screen reader announcements for alert content',
	'Support for assistive technologies'
];

const useCases = [
	{
		title: 'System Notifications',
		description:
			'Display important system messages like updates, maintenance windows, or service disruptions to users.'
	},
	{
		title: 'Form Validation',
		description:
			'Show error messages, warnings, or success confirmations after form submissions or data validation.'
	},
	{
		title: 'User Feedback',
		description:
			'Provide immediate visual feedback for user actions like save operations, deletions, or updates.'
	},
	{
		title: 'Information Display',
		description:
			'Highlight important information, tips, or contextual help within the application interface.'
	},
	{
		title: 'Warning Messages',
		description:
			'Alert users to potential issues, rate limits, or actions that require their attention before proceeding.'
	},
	{
		title: 'Status Updates',
		description:
			'Communicate ongoing processes, connection status, or feature availability to users in real-time.'
	}
];

const componentsSummary = [
	{
		name: 'Alert.Root',
		description:
			'Container component that provides the alert structure and styling variant support.'
	},
	{
		name: 'Alert.Icon',
		description:
			'Optional icon container that displays visual indicators matching the alert variant.'
	},
	{
		name: 'Alert.Title',
		description:
			'Heading element for the alert message, typically bold or emphasized text.'
	},
	{
		name: 'Alert.Description',
		description:
			'Body text container providing detailed information about the alert message.'
	},
	{
		name: 'Alert.CloseButton',
		description:
			'Optional dismissal button that allows users to close or hide the alert.'
	},
	{
		name: 'Alert.Actions',
		description:
			'Container for action buttons or interactive elements related to the alert.'
	}
];

export const metadata = {
	title: 'Alert - Svelte Atoms',
	description: 'Display important messages and notifications to users.',
	componentTitle: 'Alert',
	componentDescription:
		'A compound alert component for displaying contextual feedback to users. Use it for system notifications, validation errors, success confirmations, and warnings. Supports optional icons, action buttons, dismissal, and fully customizable styling via presets.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Alert } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Alert' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		variants: variantsCode,
		dismissible: dismissibleCode,
		actions: actionsCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
