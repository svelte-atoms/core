import { getContext, setContext } from 'svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondElements,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

export type PortalStateProps = BondStateProps & {
	id: string;
	readonly rest?: Record<string, unknown>;
};

export type PortalElements = BondElements & {
	root?: HTMLElement;
	inner?: HTMLElement;
};

export class PortalRootAtom extends BondAtom<PortalBond, HTMLElement> {
	constructor(bond: PortalBond) {
		super(bond, 'root');
	}

	override get attrs() {
		return {
			...super.attrs,
			id: this.bond.id
		};
	}
}

export class PortalInnerAtom extends BondAtom<PortalBond, HTMLElement> {
	constructor(bond: PortalBond) {
		super(bond, 'inner');
	}
}

export class PortalBond extends Bond<PortalStateProps, PortalState, PortalElements> {
	static CONTEXT_KEY = '@atoms/context/portal';

	constructor(atom: PortalState) {
		super(atom, 'portal');
	}

	get targetElement() {
		return this.element<HTMLElement>('inner') ?? this.element<HTMLElement>('root');
	}

	root() {
		return this.atom('root', () => new PortalRootAtom(this));
	}

	inner() {
		return this.atom('inner', () => new PortalInnerAtom(this));
	}

	share(): this {
		return PortalBond.set(this) as this;
	}

	override destroy(): void {
		super.destroy();
		this.element<HTMLElement>('inner')?.remove();
		this.element<HTMLElement>('root')?.remove();
	}

	static get(): PortalBond | undefined {
		return getContext(PortalBond.CONTEXT_KEY);
	}

	static set(bond: PortalBond): PortalBond {
		return setContext(PortalBond.CONTEXT_KEY, bond);
	}
}

export class PortalState extends BondState<PortalStateProps> {
	constructor(props: () => PortalStateProps) {
		super(props);
	}
}
