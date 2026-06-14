<script lang="ts">
	import { startOfDay } from 'date-fns';
	import type { CalendarRange } from '../calendar/types';
	import { DatePickerBond, DatePickerBondState, type DatePickerBondProps } from './bond.svelte';
	import type { DatePickerRootProps } from './types';
	import { bindBond } from '$svelte-atoms/core/shared';
	import { useFocusRestore } from '$svelte-atoms/core/shared/overlay';

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
		factory = defaultFactory,
		children,
		...restProps
	}: DatePickerRootProps = $props();

	const binding = bindBond<DatePickerBond>(
		(props) => factory(props),
		{
			open: [() => open, (v) => (open = v)],
			range: [() => range, (v: CalendarRange) => (range = v)],
			value: [() => range?.[0], (v) => (range[0] = v)],
			pivote: [() => pivote, (v) => (pivote = v as Date)],
			start: [() => range[0], (v) => (range[0] = v)],
			end: [() => range[1], (v) => (range[1] = v)],
			min: [() => min, (v) => (min = v)],
			max: [() => max, (v) => (max = v)],
			type: () => type ?? 'single',
			rest: () => restProps
		}
	);
	// `share()` publishes the bond under both the date-picker context key (read by
	// `DatePickerBond.get()` in the calendar/header/sub-pickers) and the popover key
	// (read by the re-exported `Trigger`/`Content`/`Arrow`/`Indicator`), via the
	// flat-composition `share` override. ADR 0004 Decision 1.
	const bond = binding.bond.share();

	// Focus capture/restore reacts to `open` (ADR 0001 / ADR 0003) — the same hook the
	// popover Root used to apply; carried here now that the bond is shared directly.
	useFocusRestore(bond);

	function defaultFactory(props: DatePickerBondProps) {
		const bondState = new DatePickerBondState(props);
		return new DatePickerBond(bondState);
	}
</script>

{@render children?.({ datePicker: bond })}
