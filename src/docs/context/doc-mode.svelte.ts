import { getContext, setContext } from 'svelte';

const DOC_MODE_KEY = Symbol('doc-mode');

export type DocMode = 'html' | 'markdown';

export function setDocMode(mode: DocMode) {
	setContext(DOC_MODE_KEY, mode);
}

export function getDocMode(): DocMode {
	return getContext<DocMode>(DOC_MODE_KEY) ?? 'html';
}
