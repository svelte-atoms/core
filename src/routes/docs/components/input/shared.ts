const basicCode = `
<Input.Root>
  <Input.Control placeholder="Enter text..." />
</Input.Root>`.trim();

const typesCode = `
<Input.Root>
  <Input.Control type="text" placeholder="Text input" />
</Input.Root>

<Input.Root>
  <Input.Control type="email" placeholder="Email input" />
</Input.Root>

<Input.Root>
  <Input.Control type="password" placeholder="Password input" />
</Input.Root>

<Input.Root>
  <Input.Control type="number" placeholder="Number input" />
</Input.Root>`.trim();

const withIconCode = `
<Input.Root>
  <Input.Icon>$</Input.Icon>
  <Input.Control placeholder="0.00" />
  <Input.Icon>.00</Input.Icon>
</Input.Root>`.trim();

const withPlaceholderCode = `
<Input.Root>
  <Input.Control />
  <Input.Placeholder>Enter your email...</Input.Placeholder>
</Input.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  input: () => ({
    class: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  })
});
`.trim();

const accessibilityFeatures = [
	'Proper label association with for/id',
	'Error message linking with aria-describedby',
	'Keyboard accessible',
	'Focus visible indicators',
	'Screen reader friendly'
];

const useCases = [
	{
		title: 'Form Data Entry',
		description:
			'Collect user information in registration forms, profile updates, and data entry workflows.'
	},
	{
		title: 'Search Functionality',
		description:
			'Enable search queries in navigation bars, data tables, and content discovery interfaces.'
	},
	{
		title: 'Authentication',
		description: 'Capture credentials like email, username, and password in login and signup flows.'
	},
	{
		title: 'Settings and Configuration',
		description: 'Allow users to customize application settings, preferences, and account details.'
	},
	{
		title: 'Numeric Input',
		description:
			'Gather numeric data like quantities, prices, ages, or measurements with validation.'
	},
	{
		title: 'File Uploads',
		description: 'Enable file selection and upload functionality with the file input type variant.'
	}
];

const componentsSummary = [
	{
		name: 'Input.Root',
		description:
			'Container component that provides the input structure and manages child components.'
	},
	{
		name: 'Input.Control',
		description: 'The actual input element that accepts user text entry with various type options.'
	},
	{
		name: 'Input.Icon',
		description: 'Optional icon or prefix/suffix element displayed alongside the input control.'
	},
	{
		name: 'Input.Placeholder',
		description: 'Animated placeholder label that floats above the input when focused or filled.'
	},
	{
		name: 'Input.TextControl',
		description:
			'Plain text input, type="text" specific — the dedicated counterpart of Input.Control for text routing.'
	},
	{
		name: 'Input.FileControl',
		description:
			'File picker with customisable trigger content, accept filter, and multiple selection support.'
	},
	{
		name: 'Input.NumberControl',
		description: 'Numeric input with increment/decrement buttons and step control.'
	},
	{
		name: 'Input.UrlControl',
		description: 'URL input with protocol prefix display and focus/blur overlay.'
	},
	{
		name: 'Input.EmailControl',
		description: 'Email input with local/domain/TLD segment coloring.'
	},
	{
		name: 'Input.LocationControl',
		description:
			'Coordinate input (lat, lng) in decimal degrees or DMS format with optional geolocation button.'
	},
	{
		name: 'Input.PhoneControl',
		description:
			'Phone number input with mask format, optional digit slots, and segment color mapping.'
	},
	{
		name: 'Input.TimeControl',
		description: 'Segment-based time picker with 12/24h format and optional seconds.'
	},
	{
		name: 'Input.DateTimeControl',
		description: 'Segment-based date + time picker (datetime-local), optional seconds.'
	},
	{
		name: 'Input.DateControl',
		description: 'Segment-based date-only picker (YYYY-MM-DD).'
	},
	{
		name: 'Input.OtpControl',
		description:
			'One-time password slots with keyboard navigation, paste support, and oncomplete callback.'
	},
	{
		name: 'Input.ColorControl',
		description:
			'Segmented CSS color editor with auto-detection across 17 formats including named colors.'
	},
	{
		name: 'Input.ColorSwatch',
		description:
			'Color swatch preview inside an Input.Root, reads the current color value from bond state.'
	},
	{
		name: 'Input.CurrencyControl',
		description:
			'Locale-aware currency input with Intl.NumberFormat overlay, min/max/step, and arrow key increment.'
	}
];

export const metadata = {
	title: 'Input - Svelte Atoms',
	description: 'Compound input component for forms and data entry, supporting icons, placeholder, and all HTML input types.',
	componentTitle: 'Input',
	componentDescription:
		'A compound input component built from composable parts: Root (the styled container), Control (the native input element), Icon (prefix/suffix icons), and Placeholder (animated custom placeholders). Supports all standard HTML input types and integrates with Form.Field for accessible, validated form fields. Input.Root is intentionally reusable — other components can use it as a styled wrapper.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Input } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Input' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		types: typesCode,
		withIcon: withIconCode,
		withPlaceholder: withPlaceholderCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
