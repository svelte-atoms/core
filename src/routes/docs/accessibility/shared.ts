export const metadata = {
	title: 'Accessibility - Svelte Atoms',
	description: 'Learn about accessibility features built into Svelte Atoms components.',
	pageTitle: 'Accessibility',
	pageDescription:
		'Svelte Atoms components are built with accessibility in mind, following WCAG 2.1 guidelines and best practices.',
	breadcrumbs: [{ label: 'Docs', href: '/docs' }, { label: 'Accessibility' }],
	sections: [
		{
			title: 'Keyboard Navigation',
			description:
				'All interactive components support full keyboard navigation with intuitive key bindings.'
		},
		{
			title: 'ARIA Attributes',
			description:
				'Components automatically apply proper ARIA attributes for screen reader compatibility.'
		},
		{
			title: 'Focus Management',
			description:
				'Focus is automatically managed in modals, dialogs, and other overlay components with focus trapping.'
		},
		{
			title: 'Semantic HTML',
			description:
				'Components use semantic HTML elements and can be customized with the "as" prop.'
		},
		{
			title: 'Screen Reader Support',
			description:
				'All components work seamlessly with popular screen readers like NVDA, JAWS, and VoiceOver.'
		},
		{
			title: 'Color Contrast',
			description: 'Default theme colors meet WCAG AA contrast requirements (4.5:1 minimum).'
		},
		{
			title: 'Reduced Motion',
			description: 'Components respect the prefers-reduced-motion user preference.'
		}
	],
	keyFeatures: [
		'Full keyboard navigation support',
		'Automatic ARIA attribute management',
		'Focus trapping in modals and dialogs',
		'Semantic HTML structure',
		'Screen reader optimized',
		'WCAG 2.1 AA compliant color contrast',
		'Respects reduced motion preferences',
		'Disabled state handling'
	]
};
