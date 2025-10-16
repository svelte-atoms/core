export function mounted() {
	let value = $state(false);

	$effect(() => {
		value = true;

		return () => {
			value = false;
		};
	});

	return {
		get current() {
			return value;
		}
	};
}
