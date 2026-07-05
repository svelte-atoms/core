import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { ScrollableBond } from './bond.svelte';

export const scrollable = createBondAttachment<ScrollableBond>(ScrollableBond);
