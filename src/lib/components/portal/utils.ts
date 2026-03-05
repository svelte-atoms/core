export function port(node: HTMLElement, target: HTMLElement = document.body) {
	if (!target) {
		throw Error('[actions] portal: Target element is undefined !');
	}

	const opacity = node.style.opacity;

	if (node.parentElement !== target) {
		node.style.opacity = '0';

		// Check if element is already mounted on target
		if (node.parentElement !== target) {
			target.appendChild(node);
			requestAnimationFrame(() => {
				node.style.opacity = opacity;
			});
		}
	}

	return () => {
		node.remove();
	};
}
