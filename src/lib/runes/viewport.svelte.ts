export type Viewport = {
	width: number;
	height: number;
};
export function viewport() {
	let vp = $state<Viewport>();

	const onresize = () => {
		vp = {
			height: window?.visualViewport?.height ?? 0,
			width: window?.visualViewport?.width ?? 0
		};
	};

	$effect(() => {
		window.addEventListener('resize', onresize);

		onresize();

		return () => {
			window.removeEventListener('resize', onresize);
		};
	});

	return {
		get current() {
			return vp;
		}
	};
}
