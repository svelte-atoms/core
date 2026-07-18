<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'dialog', B extends Base = Base"
>
	import { type Base } from '$ixirjs/ui/components/atom';
	import { bindBond } from '$ixirjs/ui/shared';
	import { PopoverDialogBond } from './bond.svelte';
	import type { PopoverDialogRootProps } from './types';

	let {
		open = $bindable(false),
		disabled = false,
		onopenchange = undefined,
		children = undefined,
		...restProps
	}: PopoverDialogRootProps<E, B> = $props();

	let openState = $derived(open);
	const callbackState = { bond: undefined as PopoverDialogBond | undefined };

	// The fused bond — Popover's trigger/disclosure + Dialog's modal presentation.
	// Root only owns state + context; the trigger renders in flow (`<PopoverDialog.Trigger>`)
	// and the modal self-portals from `<PopoverDialog.Content>`.
	const binding = bindBond<PopoverDialogBond>((props) => new PopoverDialogBond(props), {
		open: [
			() => openState,
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
		// Vestigial: element-less context root, no typed channel to forward restProps.
		rest: () => restProps
	});
	const bond = binding.bond.share();
	callbackState.bond = bond;

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ popoverDialog: bond })}
