import { DialogBond, DialogBondState, type DialogBondProps } from '$svelte-atoms/core/components/dialog/bond.svelte';
import { getContext, setContext } from 'svelte';

export type CommandPaletteBondProps = DialogBondProps & {
	query?: string;
	placeholder?: string;
	onsearch?: (query: string) => void;
};

export class CommandPaletteBond<
	Props extends CommandPaletteBondProps = CommandPaletteBondProps,
	State extends CommandPaletteBondState<Props> = CommandPaletteBondState<Props>
> extends DialogBond<State> {
	static override CONTEXT_KEY = '@svelte-atoms/bonds/command-palette';

	constructor(state: State) {
		super(state);
	}

	override share(): this {
		return CommandPaletteBond.set(this) as this;
	}

	static override get(): CommandPaletteBond {
		return getContext(this.CONTEXT_KEY);
	}

	static override set(bond: CommandPaletteBond): CommandPaletteBond {
		return setContext(this.CONTEXT_KEY, bond);
	}
}

export class CommandPaletteBondState<
	Props extends CommandPaletteBondProps = CommandPaletteBondProps
> extends DialogBondState<Props> {
	#activeIndex = $state(-1);
	#items: HTMLElement[] = $state([]);

	constructor(props: () => Props) {
		super(props);
	}

	get query(): string {
		return this.props.query ?? '';
	}

	set query(v: string) {
		this.props.query = v;
		this.props.onsearch?.(v);
		this.#activeIndex = -1;
	}

	get placeholder(): string {
		return this.props.placeholder ?? 'Search commands…';
	}

	get activeIndex(): number {
		return this.#activeIndex;
	}

	registerItem(el: HTMLElement) {
		if (!this.#items.includes(el)) this.#items.push(el);
	}

	unregisterItem(el: HTMLElement) {
		this.#items = this.#items.filter((i) => i !== el);
	}

	moveDown() {
		const enabled = this.#items.filter((el) => !el.hasAttribute('disabled'));
		if (!enabled.length) return;
		this.#activeIndex = (this.#activeIndex + 1) % enabled.length;
		enabled[this.#activeIndex]?.scrollIntoView({ block: 'nearest' });
	}

	moveUp() {
		const enabled = this.#items.filter((el) => !el.hasAttribute('disabled'));
		if (!enabled.length) return;
		this.#activeIndex = (this.#activeIndex - 1 + enabled.length) % enabled.length;
		enabled[this.#activeIndex]?.scrollIntoView({ block: 'nearest' });
	}

	selectActive() {
		const enabled = this.#items.filter((el) => !el.hasAttribute('disabled'));
		enabled[this.#activeIndex]?.click();
	}

	getActiveItem(): HTMLElement | undefined {
		const enabled = this.#items.filter((el) => !el.hasAttribute('disabled'));
		return enabled[this.#activeIndex];
	}

	clearItems() {
		this.#items = [];
		this.#activeIndex = -1;
	}
}
