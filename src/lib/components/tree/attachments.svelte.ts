import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { TreeBond } from './bond.svelte';

export const tree = createBondAttachment<TreeBond>(TreeBond);
