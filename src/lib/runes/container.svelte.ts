export function container() {
	let element = $state<HTMLElement>();
	let size = $state<{ width: number; height: number }>();

	$effect(() => {
		if (!element) return;

		const observer = new ResizeObserver(() => {
			size = {
				width: element!.clientWidth,
				height: element!.clientHeight
			};
		});

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	});

	return {
		get current() {
			return { ...size };
		},
		attach: (node: HTMLElement) => {
			element = node;
		}
	};
}
