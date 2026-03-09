import { getContext, setContext } from 'svelte';
import type { ResizableDirection } from './types';

export type ResizableContext = {
	direction: ResizableDirection;
	registerPanel: (id: symbol, defaultSize: number, minSize: number, maxSize: number) => void;
	getSizes: () => number[];
	setPanelSize: (id: symbol, size: number) => void;
	getPanelSize: (id: symbol) => number;
	getPanelIndex: (id: symbol) => number;
	resizeAdjacentPanels: (handleIndex: number, delta: number) => void;
};

const KEY = '@svelte-atoms/context/resizable';
export const setResizableContext = (ctx: ResizableContext) => setContext(KEY, ctx);
export const getResizableContext = (): ResizableContext => getContext(KEY);
