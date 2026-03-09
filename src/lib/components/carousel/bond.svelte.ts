import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import type { CarouselOrientation } from './types';

export type CarouselBondProps = BondStateProps & {
	orientation: CarouselOrientation;
	loop: boolean;
	autoplay: number;
	current?: number;
	onCurrentChange?: (index: number) => void;
	readonly rest?: Record<string, unknown>;
};

type CarouselElements = {
	track?: HTMLElement;
};

export class CarouselBond extends Bond<CarouselBondProps, CarouselBondState, CarouselElements> {
	static CONTEXT_KEY = '@svelte-atoms/bonds/carousel';

	constructor(state: CarouselBondState) {
		super(state);
	}

	share(): this {
		return CarouselBond.set(this) as this;
	}

	static override get(): CarouselBond {
		return getContext(this.CONTEXT_KEY);
	}

	static override set(bond: CarouselBond): CarouselBond {
		return setContext(this.CONTEXT_KEY, bond);
	}

	scrollTo(index: number) {
		const track = this.elements.track;
		if (!track) return;
		const item = track.children[index] as HTMLElement | undefined;
		if (!item) return;
		item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
	}
}

export class CarouselBondState extends BondState<CarouselBondProps> {
	#count = $state(0);
	#current = $state(0);

	constructor(props: () => CarouselBondProps) {
		super(props);
		// Sync with controlled current prop
		$effect(() => {
			const c = this.props.current;
			if (c !== undefined && c !== this.#current) this.#current = c;
		});
	}

	get orientation(): CarouselOrientation {
		return this.props.orientation;
	}

	get loop(): boolean {
		return this.props.loop;
	}

	get count(): number {
		return this.#count;
	}

	set count(v: number) {
		this.#count = v;
	}

	get current(): number {
		return this.#current;
	}

	get canPrev(): boolean {
		return this.loop || this.#current > 0;
	}

	get canNext(): boolean {
		return this.loop || this.#current < this.#count - 1;
	}

	prev() {
		if (!this.canPrev) return;
		this.#current = this.loop
			? (this.#current - 1 + this.#count) % this.#count
			: this.#current - 1;
		this.props.onCurrentChange?.(this.#current);
	}

	next() {
		if (!this.canNext) return;
		this.#current = this.loop
			? (this.#current + 1) % this.#count
			: this.#current + 1;
		this.props.onCurrentChange?.(this.#current);
	}

	goTo(index: number) {
		if (index < 0 || index >= this.#count) return;
		this.#current = index;
		this.props.onCurrentChange?.(this.#current);
	}
}
