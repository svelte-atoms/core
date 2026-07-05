import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { PopoverBond } from '$ixirjs/ui/components/popover/bond.svelte';

export const tooltip = createBondAttachment<PopoverBond>(PopoverBond);
