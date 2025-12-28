<script lang="ts" generics="T">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { DropdownBond, DropdownBondState, type DropdownStateProps } from './bond.svelte';
	import type { DropdownRootProps } from './types';

	let {
		open = $bindable(false),
		value = $bindable(),
		values = $bindable(),
		multiple = false,
		disabled = false,
		placements = ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
		placement = 'bottom-start',
		offset = 1,
		keys = [],
		factory = _factory,
		children = undefined,
		onquerychange = undefined,
		...restProps
	}: DropdownRootProps<T> = $props();

	const bondProps = defineState<DropdownStateProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					open = v;
				}
			),
			defineProperty(
				'values',
				() => (multiple ? values : [value].filter(Boolean)),
				(v) => {
					values = v;
					value = v[0];
				}
			),
			defineProperty('multiple', () => multiple),
			defineProperty('disabled', () => disabled),
			defineProperty('placement', () => placement),
			defineProperty('offset', () => offset),
			defineProperty('placements', () => placements ?? []),
			defineProperty('keys', () => keys ?? [])
		],
		() => ({ onquerychange })
	);
	const bond = factory(bondProps).share();

	function _factory(props: typeof bondProps) {
		const bondState = new DropdownBondState(() => props);
		return new DropdownBond(bondState);
	}

	export function getBond() {
		return bond;
	}

	$effect(() => {
		return () => {
			bond.destroy();
		};
	});
</script>

{@render children?.({ dropdown: bond })}
