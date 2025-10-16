export function getElementId(id: string, kind: string) {
	return `${kind}-${id}`;
}

export function isBrowser(): boolean {
	return typeof window !== 'undefined' && typeof document !== 'undefined';
}
