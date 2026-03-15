import { getContext, setContext } from 'svelte';

// ── Header context ─────────────────────────────────────────────────────────
// Used by DataGridTrBondState to determine whether a Tr is a header row.

const DATAGRID_HEADER_CONTEXT_KEY = '@atoms/context/datagrid/header';

export type DatagridHeaderContext = {
	readonly derived: { data: { header: boolean } };
};

export function getDatagridHeaderContext(): DatagridHeaderContext | undefined {
	return getContext(DATAGRID_HEADER_CONTEXT_KEY);
}

export function setDatagridHeaderContext(context: DatagridHeaderContext): void {
	setContext(DATAGRID_HEADER_CONTEXT_KEY, context);
}
