import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { AlertBond } from './bond.svelte';

export const alert = createBondAttachment<AlertBond>(AlertBond);
