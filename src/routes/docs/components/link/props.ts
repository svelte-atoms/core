export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const linkProps: PropDefinition[] = [
	{
		name: 'href',
		type: 'string',
		default: "'#'",
		description: 'Link destination'
	},
	{
		name: 'variant',
		type: "'default' | 'muted' | 'underline'",
		default: "'default'",
		description: 'Link style'
	},
	{
		name: 'size',
		type: "'sm' | 'md' | 'lg'",
		default: "'md'",
		description: 'Link size'
	},
	{
		name: 'target',
		type: 'string',
		default: '-',
		description: 'Link target (_blank, etc.)'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	}
];
