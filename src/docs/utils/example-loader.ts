import type { Component } from 'svelte';

export type ExampleLoader = () => Promise<{ default: Component }>;

/** Replaces internal $lib paths with the public package name for user-facing code blocks. */
function transformImports(code: string): string {
	return code.replace(/from\s+'(\$lib\/[^']+)'/g, "from '@ixirjs/ui'");
}

/**
 * Creates an `ex(src)` helper bound to a component's glob-registered example files.
 *
 * Call once per content.svelte with two static import.meta.glob calls:
 *
 * ```ts
 * const _loaders = import.meta.glob('./examples/*.svelte');
 * const _sources = import.meta.glob('./examples/*.svelte', {
 *   query: '?raw', import: 'default', eager: true
 * }) as Record<string, string>;
 * const ex = createExampleLoader(_loaders, _sources);
 * ```
 *
 * Then use in DocExample:
 * ```svelte
 * <DocExample title="Basic" {...ex('./examples/basic.svelte')} />
 * ```
 */
export function createExampleLoader(
	loaders: Record<string, () => Promise<unknown>>,
	sources: Record<string, string>,
	transform: (code: string) => string = transformImports
) {
	return function ex(src: string): { component: ExampleLoader; code: string } {
		return {
			component: loaders[src] as ExampleLoader,
			code: transform(sources[src] ?? ''),
		};
	};
}
