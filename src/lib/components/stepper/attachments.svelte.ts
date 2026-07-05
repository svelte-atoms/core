import { createBondAttachment } from '$ixirjs/ui/components/internal/attachments.svelte';
import { StepperBond } from './bond.svelte';

export const stepper = createBondAttachment<StepperBond>(StepperBond);
