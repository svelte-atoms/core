/**
 * Returns `true` when `base` is a Svelte 5 snippet (compiled to an arrow function
 * with no `.prototype`), as opposed to a component (compiled to a named function
 * that does have a `.prototype`).
 */
export function isSnippetBase(base: unknown): boolean {
	return typeof base === 'function' && !base.prototype;
}
