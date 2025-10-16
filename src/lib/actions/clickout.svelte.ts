export function clickout(node: HTMLElement, onclick?: (ev: MouseEvent) => void) {
	const handler = (ev: MouseEvent) => {
		const target = ev.target as HTMLElement;

		if (!node.contains(target)) {
			onclick?.(ev);
		}
	};

	document.addEventListener('click', handler);

	return () => {
		document.removeEventListener('click', handler);
	};
}

export function clickoutAction(node: HTMLElement, onclick?: (ev: MouseEvent) => void) {
	$effect(() => clickout(node, onclick));
}
