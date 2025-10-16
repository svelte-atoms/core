import { nanoid } from 'nanoid';

export type BondStateProps = Record<string, unknown> & { id?: string };
export type BondElements = Record<string, Element | undefined>;

export abstract class Bond<
	Props extends BondStateProps = BondStateProps,
	State extends BondState<Props> = BondState<Props>,
	Elements extends BondElements = BondElements
> {
	static CONTEXT_KEY = '@atoms/context/bond';

	#elements: Elements = $state({} as Elements);
	#state: State;

	constructor(state: State) {
		this.#state = state;
	}

	get elements() {
		return this.#elements;
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

	get props() {
		return this.#props();
	}
}
