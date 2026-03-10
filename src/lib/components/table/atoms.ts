// ── Canonical exports ─────────────────────────────────────────────────────
export { default as Root } from './table-root.svelte';
export { default as Head } from './table-head.svelte';
export { default as Body } from './table-body.svelte';
export { default as Foot } from './table-foot.svelte';
export { default as Row } from './table-row.svelte';
export { default as Col } from './table-col.svelte';
export { default as Cell } from './table-cell.svelte';
export { default as Caption } from './table-caption.svelte';

// ── Deprecated aliases — kept for backwards compatibility ─────────────────
// Will be removed in a future major version.
/** @deprecated Use Table.Head */
export { default as Header } from './table-header.svelte';
/** @deprecated Use Table.Foot */
export { default as Footer } from './table-footer.svelte';
/** @deprecated Use Table.Row */
export { default as Tr } from './table-tr.svelte';
/** @deprecated Use Table.Col */
export { default as Th } from './table-th.svelte';
/** @deprecated Use Table.Cell */
export { default as Td } from './table-td.svelte';
