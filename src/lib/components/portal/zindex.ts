import { createContext } from 'svelte';

const [get, set] = createContext<ZIndex>();

export class ZIndex {
	#value: () => number;

	constructor(value: () => number) {
		this.#value = value;
	}

	get() {
		return this.#value();
	}

	share() {
		return ZIndex.set(this);
	}

	static get = get;
	static set = set;
}
