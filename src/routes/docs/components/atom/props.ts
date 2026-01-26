export interface PropDefinition {
	name: string;
	type: string;
	default: string;
	description: string;
}

export const htmlAtomProps: PropDefinition[] = [
	{
		name: 'bond',
		type: 'Bond<BondStateProps, BondState<BondStateProps>, BondElements> | undefined',
		default: 'undefined',
		description: 'Bond'
	},
	{
		name: 'base',
		type: 'B | undefined',
		default: 'undefined',
		description: 'Base'
	},
	{
		name: 'preset',
		type: 'PresetModuleName | (string & {}) | undefined',
		default: '\'\'',
		description: 'Preset'
	},
	{
		name: 'variants',
		type: 'Variants | undefined',
		default: 'undefined',
		description: 'Variant definition or function to resolve variants
- VariantDefinition: Static variant config with base, variants, compoundVariants, defaultVariants
- Function: Dynamic function that receives bond and props, returns props (legacy)'
	},
];

