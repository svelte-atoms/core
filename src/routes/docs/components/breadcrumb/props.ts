export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const breadcrumbRootProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'as',
		type: 'string',
		default: "'div'",
		description: 'HTML element type to render'
	}
];

export const breadcrumbItemProps: PropDefinition[] = [
	{
		name: 'href',
		type: 'string',
		default: "''",
		description: 'Link URL (omit for current page item)'
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'as',
		type: 'string',
		default: "'a'",
		description: 'HTML element type to render'
	}
];

export const breadcrumbSeparatorProps: PropDefinition[] = [
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes'
	},
	{
		name: 'as',
		type: 'string',
		default: "'span'",
		description: 'HTML element type to render'
	}
];

export default {
	root: breadcrumbRootProps,
	item: breadcrumbItemProps,
	separator: breadcrumbSeparatorProps
};
