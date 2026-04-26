const basicCode = `
<Kbd>⌘</Kbd>
<Kbd>Ctrl</Kbd>
<Kbd>Shift</Kbd>
<Kbd>Enter</Kbd>`.trim();

const shortcutKeysCode = `
<Shortcut keys={['⌘', 'K']} />
<Shortcut keys={['Ctrl', 'S']} />
<Shortcut keys={['Ctrl', 'Shift', 'H']} />`.trim();

const customSeparatorCode = `
<Shortcut keys={['Ctrl', 'Alt', 'Del']} separator="+" />
<Shortcut keys={['Alt', 'Tab']} separator="→" />`.trim();

const manualCompositionCode = `
<Shortcut>
  <Kbd>⌘</Kbd>
  <span class="text-muted-foreground text-xs">then</span>
  <Kbd>K</Kbd>
</Shortcut>`.trim();

const inlineCode = `
<p>
  Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette,
  or use <Shortcut keys={['Ctrl', 'Shift', 'P']} /> to access all commands.
</p>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

setPreset({
  kbd: () => ({
    class: 'rounded border px-1.5 py-0.5 font-mono text-xs font-medium'
  }),
  shortcut: () => ({
    class: 'inline-flex items-center gap-1'
  })
});
`.trim();

const accessibilityFeatures = [
	'Uses semantic <kbd> HTML element for keyboard input',
	'Shortcut renders a <span> with an aria-label listing all keys',
	'Screen reader announces the full shortcut via aria-label',
	'Sufficient color contrast for key labels'
];

const useCases = [
	{
		title: 'Keyboard Shortcuts',
		description: 'Display keyboard shortcuts in help menus, tooltips, or command palettes.'
	},
	{
		title: 'Hotkey Hints',
		description: 'Show inline hotkey hints next to menu items or toolbar actions.'
	},
	{
		title: 'Documentation',
		description: 'Document key bindings in tutorials or reference guides with semantic markup.'
	},
	{
		title: 'Command Palettes',
		description: 'Render shortcut hints alongside command entries in search or palette UIs.'
	}
];

export const metadata = {
	title: 'Kbd - Svelte Atoms',
	description: 'Keyboard key and shortcut display components.',
	componentTitle: 'Kbd',
	componentDescription:
		'Semantic keyboard key and shortcut components. Use Kbd for individual keys and Shortcut to compose multi-key combinations.',
	componentType: 'simple' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Kbd, Shortcut } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Kbd' }],
	useCases,
	examples: {
		basic: basicCode,
		shortcutKeys: shortcutKeysCode,
		customSeparator: customSeparatorCode,
		manualComposition: manualCompositionCode,
		inline: inlineCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
