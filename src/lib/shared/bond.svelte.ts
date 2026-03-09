import { nanoid } from 'nanoid';

export type BondStateProps = { id?: string };
export type BondElements = Record<string, Element | undefined>;

// =============================================================================
// Dev-mode proxy — wraps props to warn on unregistered mutations
// Zero cost in production (import.meta.env.DEV is tree-shaken out)
// =============================================================================

function devProxyProps<T extends object>(target: T, bondName: string): T {
	return new Proxy(target, {
		set(obj, key, value) {
			const descriptor = Object.getOwnPropertyDescriptor(obj, key);
			const hasSetter = descriptor?.set !== undefined;
			const isWritable = descriptor?.writable === true;

			if (!hasSetter && !isWritable) {
				console.warn(
					`[svelte-atoms] ${bondName}: writing to props.${String(key)} ` +
					`but no setter is registered via defineProperty() — ` +
					`this mutation will be silently lost and the UI will not update.\n` +
					`Make sure defineProperty("${String(key)}", getter, setter) is called in the root component.`
				);
			}

			(obj as Record<string, unknown>)[key as string] = value;
			return true;
		},
		get(obj, key) {
			const val = (obj as Record<string, unknown>)[key as string];
			// Recursively proxy nested objects so sub-prop writes are also caught
			if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
				return devProxyProps(val as object, `${bondName}.${String(key)}`);
			}
			return val;
		}
	}) as T;
}

// =============================================================================

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
	 * In **development**, the returned object is wrapped in a Proxy that warns
	 * when you write to a key with no registered setter (via `defineProperty`).
	 * This catches silent mutation bugs — writes that appear to work but are
	 * actually discarded because no setter was wired up.
	 *
	 * The proxy is deep: sub-property mutations (`this.props.obj.key = x`) are
	 * also caught. In production the proxy is not applied (tree-shaken out).
	 */
	get props() {
		const raw = this.#props();
		if (import.meta.env.DEV) {
			return devProxyProps(raw, this.constructor.name);
		}
		return raw;
	}
}
