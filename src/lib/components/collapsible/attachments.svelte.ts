import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { CollapsibleBond } from './bond.svelte';

export const collapsible = createBondAttachment<CollapsibleBond>(CollapsibleBond);
