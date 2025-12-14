export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const tooltipTriggerProps: PropDefinition[] = [
	{
		name: 'content',
		type: 'string | Snippet<[]>',
		default: "''",
		description: 'Content'
	},
	{
		name: 'placement',
		type: "'top' | 'bottom' | 'left' | 'right'",
		default: 'undefined',
		description: 'Placement'
	},
	{
		name: 'delay',
		type: 'number',
		default: '0',
		description: 'Delay'
	},
	{
		name: 'children',
		type: 'Snippet<[]>',
		default: 'undefined',
		description: 'Children'
	}
];
