<script lang="ts">
	import { untrack } from 'svelte';
	import { PopoverState, PopoverBond } from './bond.svelte';
	import type { PopoverStateProps } from './bond.svelte';
	import { type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import type { PopoverRootProps } from './types';
	import { DialogBond } from '../dialog/bond.svelte';
	import { DrawerBond } from '../drawer';
	import { SidebarBond } from '../sidebar';

	interface PopoverOwnerState {
		readonly props: PopoverStateProps;

		open: () => void;
		close: () => void;
		toggle: () => void;
	}
	interface PopoverOwner {
		readonly state: PopoverOwnerState;
	}

	const owner = (()=> {
		const potentialOwners = [DialogBond, DrawerBond, SidebarBond];
		for (const potentialOwner of potentialOwners) {
			try {
				return potentialOwner.get() as unknown as PopoverOwner;
			} catch {
				continue;
			}
		}
		
		return null;
	})();

	const positionStrategy = $derived.by(()=> {
		if(owner instanceof DialogBond){
			return 'fixed';
		}

		return 'absolute';
	})

	let {
		open = $bindable(false),
		disabled = false,
		placements = ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'bottom', 'top'],
		placement = 'bottom',
		offset = 1,
		portal = undefined,
		factory = _factory,
		children = undefined,
		...restProps
	}: PopoverRootProps = $props();

	const bondProps = defineState<PopoverStateProps>([
		defineProperty(
			'open',
			() => open && (owner?.state?.props?.open ?? true),
			(v) => {
				open = v;
			}
		),
		defineProperty('disabled', () => disabled),
		defineProperty('placement', () => placement),
		defineProperty('offset', () => offset),
		defineProperty('placements', () => placements ?? []),
		defineProperty('portal', () => portal),
		defineProperty('positionStrategy', () => positionStrategy),
		defineProperty('rest', () => restProps)
	]);

	const bond = untrack(() => factory(bondProps as unknown as BondStateProps)).share();

	function _factory() {
		const popoverState = new PopoverState(() => bondProps);
		const popoverBond = new PopoverBond(popoverState);

		return popoverBond;
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ popover: bond })}
