import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { CardBond } from './bond.svelte';

export const card = createBondAttachment<CardBond>(CardBond);
