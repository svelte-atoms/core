import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { DataGridBond } from './bond.svelte';

export const datagrid = createBondAttachment<DataGridBond>(DataGridBond);
