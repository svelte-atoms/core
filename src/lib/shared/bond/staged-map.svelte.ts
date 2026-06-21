import { SvelteMap } from 'svelte/reactivity';

// Microtask-deferred writes: avoids state_unsafe_mutation in $derived contexts.
export class StagedMap<V> {
	// Intentionally a plain (non-reactive) Map: this is the staging buffer; only #committed is reactive.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#pending = new Map<string, V>();
	#committed = new SvelteMap<string, V>();
	#flushScheduled = false;

	#scheduleFlush() {
		if (this.#flushScheduled) return;
		this.#flushScheduled = true;
		queueMicrotask(() => {
			this.#flushScheduled = false;
			for (const [key, value] of this.#pending) this.#committed.set(key, value);
			this.#pending.clear();
		});
	}

	get(key: string): V | undefined {
		// Read #committed first to register the dependency, else the flush won't re-trigger.
		const committed = this.#committed.get(key);
		return this.#pending.get(key) ?? committed;
	}

	has(key: string): boolean {
		return this.#pending.has(key) || this.#committed.has(key);
	}

	// Finds a just-staged (not yet flushed) value synchronously.
	find(predicate: (value: V, key: string) => boolean): V | undefined {
		for (const [key, value] of this.#committed) if (predicate(value, key)) return value;
		for (const [key, value] of this.#pending) if (predicate(value, key)) return value;
		return undefined;
	}

	stage(key: string, value: V): void {
		this.#pending.set(key, value);
		this.#scheduleFlush();
	}

	clear(): void {
		this.#pending.clear();
		this.#committed.clear();
	}

	forEach(cb: (key: string, value: V) => void): void {
		// Committed first, then pending so a re-staged key's newest value wins.
		for (const [key, value] of this.#committed) cb(key, value);
		for (const [key, value] of this.#pending) cb(key, value);
	}
}
