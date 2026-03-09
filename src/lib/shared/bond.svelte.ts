import { nanoid } from 'nanoid';

export type BondStateProps = { id?: string };
export type BondElements = Record<string, Element | undefined>;

export abstract class Bond<
	Props extends BondStateProps = BondStateProps,
	State extends BondState<Props> = BondState<Props>,
	Elements extends BondElements = BondElements
> {
	static CONTEXT_KEY = '@atoms/context/bond';

	#elements: Elements = $state({} as Elements);
	#animationPromises: Record<
		string,
		Promise<{ duration?: number; delay?: number; controller?: any }>
	> = {};
	#state: State;

	constructor(state: State) {
		this.#state = state;
	}

	get elements() {
		return this.#elements;
	}

	get animationPromises() {
		return this.#animationPromises;
	}

	get id() {
		return this.state.id;
	}

	get state() {
		return this.#state;
	}

	abstract share(): this;

	destroy() {}

	static get(): unknown | undefined {
		throw new Error('Method not implemented! Use derived class');
	}

	static set(bond: unknown): unknown {
		throw new Error('Method not implemented! Use derived class');
	}
}

export abstract class BondState<S extends BondStateProps = BondStateProps> {
	#id: string;
	#props: () => S;

	constructor(props: () => S, id: string = nanoid(8)) {
		this.#props = props;
		this.#id = id;
	}

	get id() {
		return this.props?.id ?? this.#id;
	}

	/**
	 * Returns the current props object.
	 *
	 * ## Mutation
	 *
	 * Props are reactive via `defineProperty` setters wired up in each root component.
	 * There are two supported ways to mutate props:
	 *
	 * ### Canonical (preferred for new code):
	 * ```ts
	 * this.set('open', true);
	 * ```
	 * In dev mode, `set()` warns if the key has no registered setter — catching
	 * silent mutation bugs early.
	 *
	 * ### Direct (legacy, still works):
	 * ```ts
	 * this.props.open = true;
	 * ```
	 * Works because `defineProperty` installs a setter on the props object.
	 * But if no setter was registered, the write is silently lost.
	 */
	get props() {
		return this.#props();
	}

	/**
	 * Canonical prop mutation method. Use this in new BondState methods.
	 *
	 * In development, warns if the target key has no setter registered via
	 * `defineProperty` — which means the write would be silently discarded.
	 *
	 * @example
	 * ```ts
	 * // In a BondState subclass:
	 * open() { this.set('open', true); }
	 * close() { this.set('open', false); }
	 * toggle() { this.set('open', !this.props.open); }
	 * ```
	 */
	set<K extends keyof S>(key: K, value: S[K]): void {
		const props = this.props;

		if (import.meta.env.DEV) {
			const descriptor = Object.getOwnPropertyDescriptor(props, key);
			const hasSetter = descriptor?.set !== undefined;
			const isWritable = descriptor?.writable === true;
			const isUndefined = descriptor === undefined;

			if (isUndefined || (!hasSetter && !isWritable)) {
				console.warn(
					`[svelte-atoms] BondState.set("${String(key)}", ...) — ` +
					`no setter registered for this key. The mutation will be silently lost.\n` +
					`Make sure defineProperty("${String(key)}", getter, setter) was called in the root component.\n` +
					`BondState class: ${this.constructor.name}`
				);
			}
		}

		(props as Record<string, unknown>)[key as string] = value;
	}
}
