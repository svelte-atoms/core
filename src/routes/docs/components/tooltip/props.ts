export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const tooltipTriggerProps: PropDefinition[] = [
	{
		name: 'content',
		type: 'string | Snippet<[]> | undefined',
		default: "''",
		description: 'Content'
	},
	{
		name: 'placement',
		type: '"top" | "bottom" | "left" | "right" | undefined',
		default: 'undefined',
		description: 'Placement'
	},
	{
		name: 'delay',
		type: 'number | undefined',
		default: '0',
		description: 'Delay'
	},
	{
		name: 'children',
		type: 'Snippet<[]> | undefined',
		default: 'undefined',
		description: 'Children'
	}
];
