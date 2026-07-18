<script lang="ts">
	import { PopoverBond, type PopoverBondProps } from './bond.svelte';
	import { OverlayBond } from '$ixirjs/ui/components/portal/host';
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import type { PopoverRootProps } from './types';

	const owner = OverlayBond.get() ?? null;

	let {
		open = $bindable(false),
		disabled = false,
		placements = ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'bottom', 'top'],
		placement = 'bottom',
		offset = 2,
		position = 'absolute',
		portal = undefined,
		factory = defaultFactory,
		onopenchange = undefined,
		children = undefined,
		...restProps
	}: PopoverRootProps = $props();

	function defaultFactory(props: PopoverBondProps): PopoverBond {
		return PopoverBond.create(props);
	}

	let openState = $derived(open);
	const callbackState = { bond: undefined as PopoverBond | undefined };

	const binding = bindBond<PopoverBond>((props) => factory(props), {
		open: [
			() => openState && (owner?.isOpen ?? true),
			(v) => {
				const changed = !Object.is(openState, v);
				openState = v;
				open = openState;

				const callbackBond = callbackState.bond;
				if (changed && callbackBond) {
					onopenchange?.(openState, {
						bond: callbackBond,
						...callbackBond.takeOpenChangeContext()
					});
				}
			}
		],
		disabled: () => disabled,
		placement: () => placement,
		offset: () => offset,
		position: () => position,
		placements: () => placements ?? [],
		portal: () => portal,
		// Vestigial: this element-less context root has no typed channel to forward restProps
		// (its rest type doesn't overlap bond state props). Kept to consume restProps; see note.
		rest: () => restProps
	});
	const bond = binding.bond.share();
	callbackState.bond = bond;

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ popover: bond })}
