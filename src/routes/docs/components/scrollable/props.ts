export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const scrollableRootProps: PropDefinition[] = [
	{
		name: 'factory',
		type: 'Factory<ScrollableBond>',
		default: 'undefined',
		description: 'Factory'
	},
	{
		name: 'scrollX',
		type: 'number',
		default: '0',
		description: 'Scroll X'
	},
	{
		name: 'scrollY',
		type: 'number',
		default: '0',
		description: 'Scroll Y'
	},
	{
		name: 'scrollWidth',
		type: 'number',
		default: '0',
		description: 'Scroll Width'
	},
	{
		name: 'scrollHeight',
		type: 'number',
		default: '0',
		description: 'Scroll Height'
	},
	{
		name: 'clientWidth',
		type: 'number',
		default: '0',
		description: 'Client Width'
	},
	{
		name: 'clientHeight',
		type: 'number',
		default: '0',
		description: 'Client Height'
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disabled'
	},
	{
		name: 'open',
		type: 'boolean',
		default: 'false',
		description: 'Open'
	}
];

export const scrollableContainerProps: PropDefinition[] = [
	{
		name: 'orientation',
		type: "'horizontal' | 'vertical'",
		default: '-',
		description: 'Orientation'
	}
];

export const scrollableContentProps: PropDefinition[] = [
	{
		name: 'orientation',
		type: "'horizontal' | 'vertical'",
		default: '-',
		description: 'Orientation'
	}
];

export const scrollableTrackProps: PropDefinition[] = [
	{
		name: 'orientation',
		type: "'horizontal' | 'vertical'",
		default: '-',
		description: 'Orientation'
	}
];

export const scrollableThumbProps: PropDefinition[] = [
	{
		name: 'orientation',
		type: "'horizontal' | 'vertical'",
		default: '-',
		description: 'Orientation'
	}
];
