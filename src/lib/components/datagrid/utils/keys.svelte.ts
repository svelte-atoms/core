/**
 * Extracts keys from a data array reactively using requestIdleCallback for performance.
 * Automatically rebuilds keys when data changes and cleans up stale bonds.
 *
 * @param getData - A function that returns the data array
 * @param options - Configuration options
 * @returns An object containing the reactive keys array
 *
 * @example
 * ```ts
 * const data = $state([{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }]);
 * const { keys } = extractKeys(() => data, { keyField: 'id' });
 * ```
 */
export function extractDataKeys<T>(getData: () => T[], mapper: (item: T) => string) {
	let keys: string[] = $state([]);

	$effect(() => {
		const snapshot = getData();

		// Use requestIdleCallback to rebuild keys during idle time
		const idleCallbackId = requestIdleCallback(() => {
			const array = [];

			for (let i = 0; i < snapshot.length; i++) {
				const item = snapshot[i];
				if (!item) continue;

				const key = mapper(item);

				if (!key) continue;

				array[i] = key;
			}

			// Trim array if some keys were null/undefined
			keys = array;
		});

		return () => {
			cancelIdleCallback(idleCallbackId);
		};
	});

	return {
		get current() {
			return keys;
		}
	};
}
