export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const avatarProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string | undefined',
		default: "''",
		description: 'Class'
	},
	{
		name: 'src',
		type: 'string | Component<{}, {}, string> | undefined',
		default: "''",
		description: 'Src'
	},
	{
		name: 'alt',
		type: 'string | undefined',
		default: "''",
		description: 'Alt'
	},
	{
		name: 'element',
		type: 'HTMLElement | undefined',
		default: 'undefined',
		description: 'Element'
	}
];
