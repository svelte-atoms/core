import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { FieldBond } from './bond.svelte';

export const field = createBondAttachment<FieldBond>(FieldBond);
