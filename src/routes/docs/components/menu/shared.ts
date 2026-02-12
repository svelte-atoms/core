const basicCode = `
<Menu.Root>
  <Menu.Trigger base={Button}>Open Menu</Menu.Trigger>
  <Menu.Content class="max-w-xs rounded-lg border">
    <Menu.Item>New File</Menu.Item>
    <Menu.Item>Open File</Menu.Item>
    <Menu.Item>Save</Menu.Item>
    <Menu.Item>Save As...</Menu.Item>
    <Menu.Item class="text-red-600">Exit</Menu.Item>
  </Menu.Content>
</Menu.Root>`.trim();

const interactiveCode = `
<Menu.Root>
  <Menu.Trigger base={Button}>Open Menu</Menu.Trigger>
  <Menu.Content class="max-w-xs rounded-lg border">
    <Menu.Item onclick={() => alert('Profile clicked')}>Profile</Menu.Item>
    <Menu.Item onclick={() => alert('Settings clicked')}>Settings</Menu.Item>
    <Menu.Item onclick={() => alert('Logout clicked')}>Logout</Menu.Item>
  </Menu.Content>
</Menu.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  menu: () => ({
    class: 'flex flex-col rounded-md border border-border bg-background py-1 text-popover-foreground shadow-md outline-none'
  }),
  'menu.content': () => ({
    class: 'flex flex-col gap-1 p-1'
  }),
  'menu.item': () => ({
    class: 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
  })
});`.trim();

const accessibilityFeatures = [
	'Keyboard navigation (Arrow keys, Home, End, Escape)',
	'ARIA attributes (role="menu", role="menuitem")',
	'Focus management',
	'Screen reader support',
	'Click outside to close'
];

const useCases = [
	{
		title: 'Context Menus',
		description:
			'Show contextual actions available for specific UI elements or data items (right-click menus).'
	},
	{
		title: 'Action Lists',
		description:
			'Display a list of available actions or commands that users can select from.'
	},
	{
		title: 'Navigation Menus',
		description:
			'Create dropdown navigation menus for site navigation or application menu bars.'
	},
	{
		title: 'Command Palettes',
		description:
			'Build command palettes or quick action menus accessible via keyboard shortcuts or buttons.'
	},
	{
		title: 'Option Selectors',
		description:
			'Present a list of options or choices without using traditional select elements.'
	},
	{
		title: 'Toolbars',
		description:
			'Create toolbar menus with grouped actions for text editors, design tools, or applications.'
	}
];

const componentsSummary = [
	{
		name: 'Menu.Root',
		description:
			'Root container that manages menu state and coordinates child components. Built on top of Popover.'
	},
	{
		name: 'Menu.Trigger',
		description:
			'Interactive element that opens/closes the menu. Can be composed with Button or other components.'
	},
	{
		name: 'Menu.Content',
		description:
			'Container for menu items. Positioned relative to trigger using floating-ui.'
	},
	{
		name: 'Menu.Item',
		description:
			'Individual menu item that can execute actions when clicked. Supports keyboard navigation.'
	}
];

export const metadata = {
	title: 'Menu - Svelte Atoms',
	description: 'Navigation menu component.',
	componentTitle: 'Menu',
	componentDescription:
		'Display a list of navigation items or actions in a menu format.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Menu } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Menu' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		interactive: interactiveCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
