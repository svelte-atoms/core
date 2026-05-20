/**
 * Props stripped when spreading preset props onto the element.
 * These are internal atom configuration keys that are not valid DOM attributes.
 */
export const PRESET_SKIP = new Set(['class', 'base', 'as', 'variants', 'compounds', 'defaults']);

/**
 * Props stripped when spreading resolved variant objects.
 */
export const VARIANTS_SKIP = new Set(['class', 'variants', 'compounds', 'defaults']);

