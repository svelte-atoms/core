import { call } from './function';

export function promiseToState<T>(promise: Promise<T> | (() => Promise<T>)) {
	let data = $state<T | null>(null);

	const refresh = async () => {
		const result = (await call(promise)) as T;
		data = result;
	};

	$effect(() => {
		refresh();
	});

	return {
		get promise() {
			return promise;
		},
		get current() {
			return data;
		},
		refresh
	};
}
