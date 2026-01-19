export function getElementId(id: string, kind: string) {
	return `${kind}-${id}`;
}

export function isBrowser(): boolean {
	return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function focusTrap(ev: KeyboardEvent) {
	const node = ev.currentTarget as HTMLElement;

	// Tab trap - keep focus within popover
	if (ev.key === 'Tab') {
		const focusableElements = node.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (ev.shiftKey && document.activeElement === firstElement) {
			ev.preventDefault();
			lastElement?.focus();
		} else if (!ev.shiftKey && document.activeElement === lastElement) {
			ev.preventDefault();
			firstElement?.focus();
		}
	}
}

export function focus(element: Element | null) {
	const firstFocusable = element?.querySelector<HTMLElement>(
		'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
	);

	((firstFocusable || element) as HTMLElement)?.focus({ preventScroll: true });
}
