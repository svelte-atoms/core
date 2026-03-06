<script lang="ts" generics="T">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { SelectBond, SelectBondState, type SelectStateProps } from './bond.svelte';
	import type { SelectRootProps } from './types';

	let {
		open = $bindable(false),
		value = $bindable(),
		values = $bindable(),
		labels = $bindable(),
		label = $bindable(),
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
	}: SelectRootProps<T> = $props();

	const bondProps = defineState<SelectStateProps>(
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
				() => (multiple ? values : [value].filter(Boolean) as T[]),
				(v) => {
					values = v;
					value = v[0];
				}
			),
			defineProperty(
				'label',
				() => label,
				(v) => (label = v)
			),
			defineProperty(
				'labels',
				() => labels,
				(v) => (labels = v)
			),
			defineProperty('multiple', () => multiple),
			defineProperty('disabled', () => disabled),
			defineProperty('placement', () => placement),
			defineProperty('offset', () => offset),
			defineProperty('placements', () => placements ?? []),
			defineProperty('keys', () => keys ?? []),
			defineProperty('rest', () => restProps)
		],
		() => ({})
	);

	const bond = factory(bondProps).share();

	function _factory(props: typeof bondProps) {
		const bondState = new SelectBondState(() => props);
		return new SelectBond(bondState);
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

{@render children?.({ select: bond, dropdown: bond })}
