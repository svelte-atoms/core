import { nanoid } from 'nanoid';
import { getElementId } from '../utils/dom.svelte';
import { createAttachmentKey } from 'svelte/attachments';

export type BondStateProps = { id?: string };
export type BondElements = Record<string, Element | undefined>;

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
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#atoms = new Map<string, Atom>();
	#name: string;

	constructor(state: State, name?: string) {
		this.#state = state;
		this.#name = name ?? '';
	}

	get elements() {
		const obj: Record<string, Element | undefined> = {};

		for (const [key, atom] of this.#atoms) {
			obj[key] = atom.element;
		}

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
	protected atom<T extends Atom<any, any>>(
		key: keyof Elements | (string & {}),
		factory: () => T
	): T {
		const atom = this.#atoms.get(key as string);

		if (atom) return atom as T;

		const newAtom = factory();
		this.#atoms.set(key as string, newAtom);

		return newAtom;
	}

	abstract share(): this;

	element<T extends Element = Element>(key: keyof Elements): T | undefined {
		return this.#atoms.get(key as string)?.element as T | undefined;
	}

	destroy() {}

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

export abstract class Atom<
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
	onmount(_node: E): void | (() => void){ return; }
	ondestroy?(): void{}
}
