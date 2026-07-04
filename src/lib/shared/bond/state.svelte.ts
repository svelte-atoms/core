import { nanoid } from 'nanoid';
import { CapabilityRegistry } from './capability-registry';
import type { BondStateProps } from './types';

/**
 * Compatibility state host for legacy Bond authoring.
 *
 * @deprecated New components should author shared state directly on a `Bond`
 * subclass or use `defineBond({ state })` as a compatibility bridge. `BondState`
 * remains available for existing user code during the vNext migration window.
 */
export abstract class BondState<
	S extends BondStateProps = BondStateProps
> extends CapabilityRegistry {
	#id: string;
	#props: S;

	constructor(props: S, id: string = nanoid(8)) {
		super();
		this.#props = props;
		this.#id = id;
	}

	get id() {
		return this.props?.id ?? this.#id;
	}

	get props() {
		return this.#props;
	}
}
