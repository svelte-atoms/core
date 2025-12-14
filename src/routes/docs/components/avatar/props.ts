export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const avatarProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Class'
	},
	{
		name: 'src',
		type: 'string | Component',
		default: "''",
		description: 'Src'
	},
	{
		name: 'alt',
		type: 'string',
		default: "''",
		description: 'Alt'
	}
];
