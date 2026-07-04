<script lang="ts">
	import PopoverRoot from '$svelte-atoms/core/components/popover/popover-root.svelte';
	import type { PopoverBond } from '$svelte-atoms/core/components/popover/bond.svelte';
	import type { PopoverRootProps } from '$svelte-atoms/core/components/popover/types';
	import { TooltipBond, type TooltipBondProps } from './bond.svelte';

	let { open = $bindable(false), ...restProps }: PopoverRootProps = $props();

	// Construct a TooltipBond (name 'tooltip') instead of the default PopoverBond, so the
	// shared popover atoms resolve their presets under the `tooltip.*` namespace. The bond is
	// shared under popover's context keys too (via `parts: [PopoverBond]`), so `<Popover.*>`
	// atom components still find it.
	function factory(bondProps: TooltipBondProps): PopoverBond {
		return TooltipBond.create(bondProps) as unknown as PopoverBond;
	}
</script>

<PopoverRoot bind:open {factory} {...restProps} />
