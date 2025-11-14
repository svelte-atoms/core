export type StateDefiner<T extends object> = (base: T) => T;

export function defineState<T extends object>(
	definers: StateDefiner<Partial<T>>[],
	base?: () => Partial<T>
) {
	let outcome = { ...(base?.() ?? ({} as T)) };

	for (const definer of definers) {
		outcome = definer(outcome);
	}

	return outcome as T;
}

export function defineProperty<T extends Record<string, unknown>, R>(
	property: keyof T | (string & {}),
	get: () => R,
	set?: (value: R) => void
) {
	return (base: T) => {
		if (property in base) {
			delete (base as unknown as Record<string, unknown>)[property as string];
		}

		return Object.defineProperty(base, property, {
			get: get,
			set: set,
			enumerable: true
		});
	};
}
