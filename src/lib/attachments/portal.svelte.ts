export function portal(target: HTMLElement = document.body) {
	return (node: HTMLElement) => {
		return port(node, target);
	};
}

export function port(node: HTMLElement, target: HTMLElement = document.body) {
	if (!target) {
		throw Error('[actions] portal: Target element is undefined !');
	}

	if (node.parentElement !== target) {
		// node.hidden = true;

		// Check if element is already mounted on target
		if (node.parentElement !== target) {
			target.appendChild(node);
			requestAnimationFrame(() => {
				node.hidden = false;
			});
		}
	}

	return () => {
		node.hidden = true;
		node.remove();
	};
}
