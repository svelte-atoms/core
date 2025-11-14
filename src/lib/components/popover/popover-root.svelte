<script lang="ts">
	import { PopoverState, PopoverBond, type PopoverStateProps } from './bond.svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import type { PopoverRootProps } from './types';

	let {
		open = $bindable(false),
		disabled = false,
		placements = ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
		placement = 'bottom-start',
		offset = 0,
		portal = undefined,
		extend = {},
		factory = _factory,
		children = undefined
	}: PopoverRootProps = $props();

	const bondProps = defineState<PopoverStateProps>([
		defineProperty(
			'open',
			() => open,
			(v) => {
				open = v;
			}
		),
		defineProperty('disabled', () => disabled),
		defineProperty('placement', () => placement),
		defineProperty('offset', () => offset),
		defineProperty('placements', () => placements ?? []),
		defineProperty('portal', () => portal),
		defineProperty('extend', () => extend)
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
