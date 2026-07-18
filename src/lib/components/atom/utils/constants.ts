// Presentation configuration and unsupported lifecycle fields never reach a DOM spread.
export const PRESET_SKIP = new Set([
	'class',
	'attrs',
	'render',
	'base',
	'as',
	'variants',
	'compounds',
	'defaults',
	'attachments'
]);

export const VARIANTS_SKIP = new Set(PRESET_SKIP);
