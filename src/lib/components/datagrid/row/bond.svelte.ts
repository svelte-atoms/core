import { Bond, defineAtom, type BondStateProps } from '$ixirjs/ui/shared/bond';
import { defineBond, type BondOf } from '$ixirjs/ui/shared';
import { DataGridBond, type IDataGrid } from '../bond.svelte';
import { getDatagridHeaderContext } from '../context';
import { rowColumnCellLink } from '$ixirjs/ui/shared/capability/models/relationship.svelte';
import {
	defineAtomCapability,
	sharedCapabilityKey,
	type AtomHost
} from '$ixirjs/ui/shared/capability';
import type { StateChangeContext } from '$ixirjs/ui/types';

// -----------------------------------------------------------------------------
// Public types
// -----------------------------------------------------------------------------

export type DataGridRowBondProps<T = unknown> = BondStateProps & {
	value?: string;
	data?: T;
};

// -----------------------------------------------------------------------------
// Internal types
// -----------------------------------------------------------------------------

type DataGridRowBondView = DataGridRowBondBase;

// -----------------------------------------------------------------------------
// Capability slots and shared helpers
// -----------------------------------------------------------------------------

const DATAGRID_ROW_ROOT = sharedCapabilityKey<void>({
	owner: '@ixirjs/datagrid-row',
	name: 'root',
	version: 1
});

// -----------------------------------------------------------------------------
// Atom definitions
// -----------------------------------------------------------------------------

export const DataGridRowRootAtom = defineAtom<DataGridRowBondView>('root', (atom, bond) => {
	atom.role('row');
	// Project selection a11y (role:'item') onto data rows only — header rows are not selectable.
	if (!bond.isHeader) atom.role('item', bond.id);
	atom.capability(datagridRowPresentation());
});
export type DataGridRowRootAtom = InstanceType<typeof DataGridRowRootAtom>;

// -----------------------------------------------------------------------------
// Atom capabilities
// -----------------------------------------------------------------------------

function datagridRowPresentation() {
	return defineAtomCapability<void, AtomHost, DataGridRowBondView>({
		slot: DATAGRID_ROW_ROOT,
		meta: {
			layer: 1,
			kind: 'projection',
			projects: ['root'],
			docs: 'Datagrid row identity and header-state projection.'
		},
		behavior: {
			attrs: (_node, bond) => ({
				// aria-selected + data-selected come from the datagrid's selection capability (role:'item').
				'data-header': bond?.isHeader ? 'true' : undefined
			})
		}
	});
}

// -----------------------------------------------------------------------------
// Bond implementation
// -----------------------------------------------------------------------------

class DataGridRowBondBase<T = unknown> extends Bond<DataGridRowBondProps<T>> {
	readonly #parent: IDataGrid<T>;
	readonly #headerContext = getDatagridHeaderContext();

	constructor(props: DataGridRowBondProps<T>) {
		super(props, 'datagrid-row');
		const datagrid = DataGridBond.get() as DataGridBond<T> | undefined;
		if (!datagrid) throw new Error('DataGridRowBond must be used within a DataGridBond context.');
		this.#parent = datagrid;
		const selection = this.#parent.selectionCapability();
		if (selection) this.capability(selection);
		this.capability(rowColumnCellLink());
	}

	get datagrid(): IDataGrid<T> {
		return this.#parent;
	}

	// Preset namespace is datagrid.row (not the hyphenated DOM name datagrid-row).
	override get preset(): string {
		return 'datagrid.row';
	}

	get id(): string {
		return this.props.value ?? super.id;
	}

	get isSelected(): boolean {
		return this.#parent.isSelected(this.id);
	}

	get isHeader(): boolean {
		return this.#headerContext?.isHeader ?? false;
	}

	mount(): () => void {
		return this.#parent.mountRow(this.id, this);
	}

	select(context?: Pick<StateChangeContext, 'event'>): void {
		this.#parent.select([this.id], context);
	}

	unselect(context?: Pick<StateChangeContext, 'event'>): void {
		this.#parent.unselect([this.id], context);
	}
}

// DataGridRowBond via defineBond over DataGridRowBondBase; T carried by state/datagrid via generic facade.

// -----------------------------------------------------------------------------
// Bond spec and constructor facade
// -----------------------------------------------------------------------------

const DataGridRowBondDefinition = defineBond({
	name: 'datagrid-row',
	base: DataGridRowBondBase,
	atoms: { root: DataGridRowRootAtom }
});

// Generic instance type — intersect to preserve Bond brand; narrows state/datagrid to carry T.

// -----------------------------------------------------------------------------
// Public types
// -----------------------------------------------------------------------------

export type DataGridRowBond<
	T = unknown,
	Props extends DataGridRowBondProps<T> = DataGridRowBondProps<T>
> = BondOf<typeof DataGridRowBondDefinition> & {
	readonly __props?: Props;
	readonly props: Props;
	readonly datagrid: IDataGrid<T>;
	readonly id: string;
	readonly isSelected: boolean;
	readonly isHeader: boolean;
	select(context?: Pick<StateChangeContext, 'event'>): void;
	unselect(context?: Pick<StateChangeContext, 'event'>): void;
};

// Generic-constructor facade over the non-generic impl.

// -----------------------------------------------------------------------------
// Bond spec and constructor facade
// -----------------------------------------------------------------------------

// TS cannot retain a class value's type parameter through `typeof DataGridRowBondDefinition`; this
// minimal static facade preserves generic construction and context lookup ergonomics.
interface DataGridRowBondGenericFacade {
	new <T = unknown>(props: DataGridRowBondProps<T>): DataGridRowBond<T>;
	get<T = unknown>(): DataGridRowBond<T> | undefined;
	getOrThrow<T = unknown>(message?: string): DataGridRowBond<T>;
	optional<T = unknown>(): DataGridRowBond<T> | undefined;
	required<T = unknown>(message?: string): DataGridRowBond<T>;
	set<T = unknown>(bond: DataGridRowBond<T>): DataGridRowBond<T>;
	create<T = unknown>(props: DataGridRowBondProps<T>): DataGridRowBond<T>;
}

// Replace only generic-sensitive signatures. The mapped original retains defineBond's
// untouched statics and definition phantom metadata while dropping its construct signature.
type DataGridRowBondConstructor = Omit<
	typeof DataGridRowBondDefinition,
	keyof DataGridRowBondGenericFacade
> &
	DataGridRowBondGenericFacade;

export const DataGridRowBond = DataGridRowBondDefinition as unknown as DataGridRowBondConstructor;
