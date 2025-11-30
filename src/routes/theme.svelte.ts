import { colorScheme, type ColorScheme } from '$lib';
import { createContext } from 'svelte';

const [get, set] = createContext<Theme>();

export class Theme {
	#systemColorScheme = colorScheme();
	#userColorScheme: ColorScheme | undefined = $state();

	constructor() {}

	get systemColorScheme() {
		return this.#systemColorScheme;
	}

	get userColorScheme() {
		return this.#userColorScheme;
	}

	set userColorScheme(value: ColorScheme | undefined) {
		this.#userColorScheme = value;
	}

	get colorScheme() {
		return this.userColorScheme ?? this.systemColorScheme;
	}

	share() {
		return Theme.set(this);
	}

	toggle() {
		if (this.#userColorScheme === 'dark') {
			this.#userColorScheme = 'light';
		} else {
			this.#userColorScheme = 'dark';
		}
	}

	static get = get;
	static set = set;
}
