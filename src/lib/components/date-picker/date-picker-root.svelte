<script lang="ts">
	import { startOfDay } from 'date-fns';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { Root } from '../popover/atoms';
	import type { CalendarRange } from '../calendar/types';
	import { DatePickerBond, DatePickerBondState, type DatePickerBondProps } from './bond.svelte';
	import type { DatePickerRootProps } from './types';

	let {
		open = $bindable(false),
		value = $bindable(undefined),
		range = $bindable([undefined, undefined]),
		pivote = $bindable(new Date()),
		start = $bindable(startOfDay(new Date())),
		end = $bindable(undefined),
		min = undefined,
		max = undefined,
		type = 'single',
		offset = 2,
		factory = _factory,
		children,
		...restProps
	}: DatePickerRootProps = $props();

	const seed = {};

	const bondProps = defineState<DatePickerBondProps>(
		[
			defineProperty(
				'open',
				() => open,
				(v) => {
					open = v;
				}
			),
			defineProperty(
				'range',
				() => range,
				(v: CalendarRange) => {
					range = v;
					value = v[0];
				}
			),
			defineProperty(
				'value',
				() => range?.[0],
				(v) => {
					range[0] = v;
				}
			),
			defineProperty(
				'pivote',
				() => pivote,
				(v: Date) => (pivote = v)
			),
			defineProperty(
				'start',
				() => range[0],
				(v: Date) => {
					range[0] = v;
				}
			),
			defineProperty(
				'end',
				() => range[1],
				(v: Date | undefined) => {
					range[1] = v;
				}
			),
			defineProperty(
				'min',
				() => min,
				(v: Date | undefined) => (min = v)
			),
			defineProperty(
				'max',
				() => max,
				(v: Date | undefined) => (max = v)
			),
			defineProperty('type', () => type ?? 'single')
		],
		() => seed
	);

	const bond = factory().share();

	function _factory() {
		const bondState = new DatePickerBondState(() => bondProps);
		return new DatePickerBond(bondState);
	}
</script>

<Root bind:open extend={bondProps} {offset} {...restProps}>
	{@render children?.({ datePicker: bond })}
</Root>
