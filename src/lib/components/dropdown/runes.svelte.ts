type Predicate<T> =
	| ((query: string, value: T) => boolean)
	| ((query: string, value: T, index: number) => boolean)
	| ((query: string, value: T, index: number, array: T[]) => boolean);

export function filter<T>(data: () => T[], predicate: Predicate<T>, initialQuery = '') {
	let query = $state(initialQuery);
	const results = $derived(data().filter((...args) => predicate(query, ...args)));

	return {
		get query() {
			return query;
		},
		set query(value: string) {
			query = value;
		},
		get current() {
			return results;
		}
	};
}
