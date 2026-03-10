export { default as Body } from './datagrid-body.svelte';
export { default as Checkbox } from './datagrid-checkbox.svelte';
export { default as Footer } from './datagrid-foot.svelte';
export { default as Header } from './datagrid-head.svelte';
export { default as Root } from './datagrid-root.svelte';
export { Tr } from './row';
export { Th } from './col';
export { Td } from './cell';

// ── Semantic aliases — preferred going forward ────────────────────────────
/** Preferred alias for Header (<thead>) */
export { default as Head } from './datagrid-head.svelte';
/** Preferred alias for Footer (<tfoot>) */
export { default as Foot } from './datagrid-foot.svelte';
/** Preferred alias for Tr */
export { Row } from './row';
/** Preferred alias for Th */
export { Col } from './col';
/** Preferred alias for Td */
export { Cell } from './cell';
