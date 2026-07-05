import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { FormBond } from './bond.svelte';

export const form = createBondAttachment<FormBond>(FormBond);
