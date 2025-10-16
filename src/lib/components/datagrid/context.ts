import { getContext, setContext } from 'svelte';
import type { DataGridBond } from './bond.svelte';

export const DATAGRID_CONTEXT_KEY = '@icare/context/datagrid';

export type Payload<T> = { data: T; selected: boolean };

export type DatagridContext<T = unknown> = DataGridBond<T> | { [key: string]: unknown };

export function getDataGridContext<T>(): DataGridBond<T> {
	return getContext(DATAGRID_CONTEXT_KEY);
}

export function setDataGridContext<T>(context: DataGridBond<T>): DataGridBond<T> {
	return setContext(DATAGRID_CONTEXT_KEY, context);
}

/********************************************************************************* */

export const DATAGRID_HEADER_CONTEXT_KEY = '@icare/context/datagrid/header';

export type DatagridHeaderContext = {
	readonly derived: {
		data: {
			header: boolean;
		};
	};
};

export function getDatagridHeaderContext(): DatagridHeaderContext {
	return getContext(DATAGRID_HEADER_CONTEXT_KEY);
}

export function setDatagridHeaderContext(context: DatagridHeaderContext): DatagridHeaderContext {
	return setContext(DATAGRID_HEADER_CONTEXT_KEY, context);
}

/********************************************************************************* */

export const DATAGRID_TR_CONTEXT_KEY = '@icare/context/datagrid/tr';

export type DatagridTrContext<T> = {
	value: string;
	readonly derived: {
		data: {
			data?: T;
			isHeader: boolean;
			isSelected: boolean;
		};
	};
};

export function getDatagridTrContext<T>(): DatagridTrContext<T> {
	return getContext(DATAGRID_TR_CONTEXT_KEY);
}

export function setDatagridTrContext<T>(context: DatagridTrContext<T>): DatagridTrContext<T> {
	return setContext(DATAGRID_TR_CONTEXT_KEY, context);
}
