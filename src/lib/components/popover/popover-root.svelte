<script lang="ts">
	import { PopoverState, PopoverBond } from './bond.svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import type { PopoverRootProps } from './types';
	import { DialogBond } from '../dialog/bond.svelte';
	import { DrawerBond } from '../drawer';
	import { SidebarBond } from '../sidebar';

	interface PopoverStateProps {
		readonly open: boolean;
		readonly positionStrategy: 'fixed' | 'absolute';
	}

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
				return potentialOwner.get() as PopoverOwner;
			} catch (_err) {
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

	console.log('Popover owner:', owner);

	let {
		open = $bindable(false),
		disabled = false,
		placements = ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'bottom', 'top'],
		placement = 'bottom',
		offset = 1,
		portal = undefined,
		extend = {},
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

	const bond = factory(bondProps).share();

	function _factory(props: typeof bondProps) {
		const popoverState = new PopoverState(() => props);
		const popoverBond = new PopoverBond(popoverState);

		return popoverBond;
	}

	export function getBond() {
		return bond;
	}
</script>

{@render children?.({ popover: bond })}
