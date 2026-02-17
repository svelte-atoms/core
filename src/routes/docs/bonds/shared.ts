export const metadata = {
	title: 'Bonds - Svelte Atoms',
	description: 'Advanced state management pattern for complex component interactions.',
	pageTitle: 'Bonds',
	pageDescription:
		'Bonds are self-contained units of state and behavior that power complex component patterns in Svelte Atoms.',
	breadcrumbs: [{ label: 'Docs', href: '/docs' }, { label: 'Bonds' }],
	overview:
		'Bonds provide a structured way to manage component state, element references, and behavior. They enable complex interactions while maintaining type safety and reactivity.',
	keyFeatures: [
		'Self-contained state management',
		'Automatic element reference tracking',
		'Type-safe bond definitions',
		'Context sharing for compound components',
		'Reactive state with Svelte 5 runes',
		'Fine-grained reactivity tracking',
		'ARIA attribute generation',
		'Event handler management'
	],
	architecture: [
		{
			component: 'BondState',
			description:
				"BondState manages reactive props via a function that returns the props object. This ensures fine-grained reactivity - only tracking what's accessed.",
			responsibilities: [
				'Manage reactive component state',
				'Provide derived computed properties',
				'Handle state updates and mutations',
				'Track dependencies efficiently'
			]
		},
		{
			component: 'Bond',
			description:
				'Bond manages element references and generates element props with proper ARIA attributes, IDs, and attachment keys for automatic element capture.',
			responsibilities: [
				'Track DOM element references',
				'Generate element props and attributes',
				'Manage ARIA attributes',
				'Handle event bindings',
				'Share state via context'
			]
		},
		{
			component: 'Context Management',
			description:
				'Bonds provide static methods for context management, making it easy to share state across component trees without prop drilling.',
			responsibilities: [
				'Share bond instances via Svelte context',
				'Retrieve parent bond instances',
				'Enable compound component patterns',
				'Type-safe context access'
			]
		}
	],
	bondPatterns: [
		{
			title: 'Reactive Props with Functions',
			description:
				'Pass props as a function for fine-grained reactivity. Only accessed properties are tracked.',
			useCase: 'When you need optimal reactivity performance with selective dependency tracking'
		},
		{
			title: 'Element Props Generation',
			description:
				'Bonds generate complete props objects for elements including ARIA attributes, IDs, and event handlers.',
			useCase: 'Automatically applying accessibility attributes and proper element configuration'
		},
		{
			title: 'Context Sharing',
			description:
				'Share bond instances across component trees using Svelte context API for compound components.',
			useCase: 'Building complex components with multiple sub-components that need shared state'
		},
		{
			title: 'Bond Factories',
			description:
				'Create bond instances using factory functions for customization and initialization.',
			useCase: 'When you need to customize bond creation or provide default configurations'
		}
	]
};
