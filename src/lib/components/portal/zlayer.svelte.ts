import { createContext } from 'svelte';

const [get, set] = createContext<ZLayer>();

export const LAYER_BASE = {
	sidebar: 100,
	drawer: 200,
	dialog: 300,
	popover: 400,
	tooltip: 500
} as const;

export type LayerName = keyof typeof LAYER_BASE;

export class ZLayer {
	#base: number;
	#offset: () => number;

	constructor(base: number | LayerName, offset: () => number = () => 0) {
		this.#base = typeof base === 'string' ? LAYER_BASE[base] : base;
		this.#offset = offset;
	}

	get() {
		return this.#base + this.#offset();
	}

	share() {
		return ZLayer.set(this);
	}

	static get = get;
	static set = set;
}
