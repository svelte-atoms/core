import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { ComboboxBond } from './bond.svelte';

export const combobox = createBondAttachment<ComboboxBond>(ComboboxBond);
