import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { InputBond } from './bond.svelte';

export const input = createBondAttachment<InputBond>(InputBond);
