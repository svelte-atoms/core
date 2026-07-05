import { getContext, setContext, untrack } from 'svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$ixirjs/ui/shared/bond.svelte';
import { getElementId } from '$ixirjs/ui/utils/dom.svelte';

export type ToastBondProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
	readonly rest?: Record<string, unknown>;
};

export type ToastBondElements = {
	root: HTMLElement;
	title: HTMLElement;
	description: HTMLElement;
	close: HTMLElement;
};

export class ToastRootAtom extends BondAtom<ToastBond> {
	constructor(bond: ToastBond) {
		super(bond, 'root');
	}

	override get attrs() {
		const props = untrack(() => this.bond.state?.props);
		const isOpen = props?.open ?? false;
		const isDisabled = props?.disabled ?? false;
		const titleId = getElementId(this.bond.id, 'toast-title');
		const descriptionId = getElementId(this.bond.id, 'toast-description');

		return {
			...super.attrs,
			role: 'status',
			'aria-live': 'polite',
			'aria-atomic': 'true',
			'aria-labelledby': titleId,
			'aria-describedby': descriptionId,
			'aria-disabled': isDisabled ? 'true' : 'false',
			'data-open': isOpen,
			'data-state': isOpen ? 'open' : 'closed'
		};
	}
}

export class ToastTitleAtom extends BondAtom<ToastBond> {
	constructor(bond: ToastBond) {
		super(bond, 'title');
	}

	override get attrs() {
		return {
			...super.attrs,
			id: getElementId(this.bond.id, 'toast-title')
		};
	}
}

export class ToastDescriptionAtom extends BondAtom<ToastBond> {
	constructor(bond: ToastBond) {
		super(bond, 'description');
	}

	override get attrs() {
		return {
			...super.attrs,
			id: getElementId(this.bond.id, 'toast-description')
		};
	}
}

export class ToastCloseAtom extends BondAtom<ToastBond> {
	constructor(bond: ToastBond) {
		super(bond, 'close');
	}

	override get attrs() {
		const isButton = (this.element as any)?.tagName?.toLowerCase() === 'button';
		return {
			...super.attrs,
			type: isButton ? 'button' : undefined,
			role: isButton ? undefined : 'button',
			tabindex: isButton ? undefined : 0,
			'aria-label': 'Dismiss notification'
		};
	}

	override get handlers() {
		return {
			onclick: (ev: MouseEvent) => {
				ev.stopPropagation();
				this.bond.state.close();
			},
			onkeydown: (ev: KeyboardEvent) => {
				if (ev.key === 'Enter' || ev.key === ' ') {
					ev.preventDefault();
					this.bond.state.close();
				}
			}
		};
	}
}

export class ToastBond<
	State extends ToastBondState<ToastBondProps> = ToastBondState<ToastBondProps>
> extends Bond<ToastBondProps, State, ToastBondElements> {
	static CONTEXT_KEY = '@atoms/context/toast';

	constructor(s: State) {
		super(s, 'toast');
	}

	share(): this {
		return ToastBond.set(this) as this;
	}

	/** Handle for granular access to root attrs and attachment */
	root() {
		return this.atom('root', () => new ToastRootAtom(this));
	}

	/** Handle for granular access to title attrs and attachment */
	title() {
		return this.atom('title', () => new ToastTitleAtom(this));
	}

	/** Handle for granular access to description attrs and attachment */
	description() {
		return this.atom('description', () => new ToastDescriptionAtom(this));
	}

	/** Handle for granular access to close button attrs, handlers, and attachment */
	dismiss() {
		return this.atom('close', () => new ToastCloseAtom(this));
	}

	static get(): ToastBond | undefined {
		return getContext(ToastBond.CONTEXT_KEY);
	}

	static set(bond: ToastBond): ToastBond {
		return setContext(ToastBond.CONTEXT_KEY, bond);
	}
}

export class ToastBondState<Props extends ToastBondProps> extends BondState<Props> {
	constructor(props: () => Props) {
		super(props);
	}

	get isOpen() {
		return this.props.open;
	}

	get isDisabled() {
		return this.props.disabled;
	}

	open() {
		if (this.props.disabled) return;
		this.props.open = true;
	}

	close() {
		this.props.open = false;
	}

	toggle() {
		if (this.props.disabled) return;
		this.props.open = !this.props.open;
	}
}
