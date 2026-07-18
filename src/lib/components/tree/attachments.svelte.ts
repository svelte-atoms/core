import {
	createBondAttachment,
	type BondAttachment
} from '$ixirjs/ui/components/internal/attachments.svelte';
import { TreeBond } from './bond.svelte';

export const tree: BondAttachment<TreeBond> = createBondAttachment<TreeBond>(TreeBond);
