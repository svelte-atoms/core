export function copy(text: string) {
	return navigator.clipboard.writeText(text);
}
