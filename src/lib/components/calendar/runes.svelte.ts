export function today(ms = 1000 * 60) {
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	let date = $state(new Date());

	const date_readonly = $derived(date);

	let timeout_id: NodeJS.Timeout | undefined = undefined;
	let interval_id: NodeJS.Timeout | undefined = undefined;

	$effect(() => {
		timeout_id = setTimeout(() => {
			interval_id = setInterval(() => {
				// eslint-disable-next-line svelte/prefer-svelte-reactivity
				date = new Date();
			}, ms);
			// eslint-disable-next-line svelte/prefer-svelte-reactivity
		}, 1000 - new Date().getMilliseconds());

		return () => {
			clearTimeout(timeout_id);
			clearInterval(interval_id);
		};
	});

	return {
		get current() {
			return date_readonly;
		}
	};
}
