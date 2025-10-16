<script module lang="ts">
	import type { Factory } from '$svelte-atoms/core/types';

	export type PopoverRootProps = {
		open?: boolean;
		disabled?: boolean;
		placements?: Placement[];
		placement?: Placement;
		offset?: number;
		extend?: Record<string, unknown>;
		factory?: Factory<PopoverBond>;
		children?: Snippet<[{ popover: PopoverBond }]>;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Placement } from '@floating-ui/dom';
	import { PopoverState, PopoverBond, type PopoverStateProps } from './bond.svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';

	let {
		open = $bindable(false),
		disabled = false,
		placements = ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
		placement = 'bottom-start',
		offset = 0,
		extend = {},
		factory = _factory,
		children = undefined
	}: PopoverRootProps = $props();

	const bondProps = defineState<PopoverStateProps>(
		[
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
			defineProperty('placements', () => placements ?? [])
		],
		() => ({ extend })
	);
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
