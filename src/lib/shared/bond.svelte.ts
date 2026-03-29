import { nanoid } from 'nanoid';
import { getElementId } from '../utils/dom.svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { SvelteMap } from 'svelte/reactivity';

export type BondStateProps = { id?: string };
export type BondElements = Record<string, Element | undefined>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class AtomsQueue<T extends BondAtom<any, any>> {
	#pending = new Map<string, T>();
	#atoms = new SvelteMap<string, T>();
	#flushScheduled = false;

	/**
	 * Schedules a microtask to flush pending atoms into the reactive SvelteMap.
	 * Defers reactive writes outside `$derived` to avoid `state_unsafe_mutation`.
	 */
	#scheduleFlush() {
		if (this.#flushScheduled) return;
		this.#flushScheduled = true;
		queueMicrotask(() => {
			this.#flushScheduled = false;
			for (const [key, atom] of this.#pending) this.#atoms.set(key, atom);
			this.#pending.clear();
		});
	}

	get(key: string): T | undefined {
		// Always read from #atoms first to register a reactive dependency.
		// Without this, a $derived that finds the value in #pending never tracks
		// #atoms — so the microtask flush into #atoms won't re-trigger it.
		const committed = this.#atoms.get(key);
		return this.#pending.get(key) ?? committed;
	}

	stage(key: string, atom: T): void {
		this.#pending.set(key, atom);
		this.#scheduleFlush();
	}

	clear(): void {
		this.#pending.clear();
		this.#atoms.clear();
	}

	forEach(cb: (key: string, atom: T) => void): void {
		for (const [key, atom] of this.#atoms) cb(key, atom);
		for (const [key, atom] of this.#pending) cb(key, atom);
	}
}

export abstract class Bond<
	Props extends BondStateProps = BondStateProps,
	State extends BondState<Props> = BondState<Props>,
	Elements extends BondElements = BondElements
> {
	static CONTEXT_KEY = '@atoms/context/bond';

	#animationPromises: Record<
		string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Promise<{ duration?: number; delay?: number; controller?: any }>
	> = {};
	#state: State;
	#queue = new AtomsQueue<BondAtom>();
	#name: string;

	constructor(state: State, name?: string) {
		this.#state = state;
		this.#name = name ?? '';
	}

	get elements() {
		const obj: Record<string, Element | undefined> = {};
		this.#queue.forEach((key, atom) => (obj[key] = atom.element));
		return obj;
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

	get name() {
		return this.#name;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected atom<T extends BondAtom<any, any>>(
		key: keyof Elements | (string & {}),
		factory: () => T
	): T {
		const existing = this.#queue.get(key as string);
		if (existing) return existing as T;

		const newAtom = factory();
		this.#queue.stage(key as string, newAtom);
		return newAtom;
	}

	abstract share(): this;

	element<T extends Element = Element>(key: keyof Elements): T | undefined {
		return this.#queue.get(key as string)?.element as T | undefined;
	}

	destroy() {
		this.#queue.clear();
	}

	static get(): unknown | undefined {
		throw new Error('Method not implemented! Use derived class');
	}

	static set(bond: unknown): unknown {
		void bond;
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

	get props() {
		return this.#props();
	}
}

export abstract class BondAtom<
	B extends Bond<BondStateProps, BondState<BondStateProps>, BondElements> = Bond,
	E extends Element = Element
> {
	#element?: E;
	protected bond: B;
	protected key: string;

	constructor(bond: B, key: string) {
		this.bond = bond;
		this.key = key;
	}

	protected get id() {
		return getElementId(this.bond.id, this.kind);
	}

	get element() {
		return this.#element;
	}

	get kind() {
		return `${this.bond.name}-${this.key}`;
	}

	get attrs(): Record<string, unknown> {
		return {
			id: this.id,
			'data-bond': this.bond.name,
			'data-kind': this.kind
		};
	}

	get handlers(): Record<string, unknown> {
		return {};
	}

	get attachments(): Record<string, (node: E) => void | (() => void)> {
		return {
			[createAttachmentKey()]: (node: E) => {
				this.#element = node as E;

				const cleanup = this.onmount(node);

				return () => {
					cleanup?.();
					this.ondestroy?.();
				};
			}
		};
	}

	get spread(): Record<string | symbol, unknown> {
		return { ...this.attrs, ...this.handlers, ...this.attachments };
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onmount(_node: E): void | (() => void) {
		return;
	}
	ondestroy?(): void {}
}
