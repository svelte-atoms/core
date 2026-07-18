<script lang="ts">
	import { mergePresetProps } from '$ixirjs/ui/components/atom';
	import { Content } from '../popover/atoms';
	import {
		Root,
		Header as CalendarHeader,
		Body as CalendarBody,
		Day as CalendarDay
	} from '../calendar/atoms';
	import { DatePickerBond } from './bond.svelte';
	import DatePickerHeader from './date-picker-header.svelte';
	import DatePickerMonths from './date-picker-months.svelte';
	import DatePickerYears from './date-picker-years.svelte';
	import { HtmlAtom } from '../atom';
	import type { CalendarRange, Day as CalendarDayType } from '../calendar/types';
	import type { DatePickerCalendarProps } from './types';

	const datePickerBond = DatePickerBond.get();

	let {
		class: klass = '',
		preset = undefined,
		header: Header = DatePickerHeader,
		weekdays: Weekdays = CalendarHeader,
		body: Body = CalendarBody,
		day: Day = CalendarDay,
		months: Months = DatePickerMonths,
		years: Years = DatePickerYears,
		...restProps
	}: DatePickerCalendarProps = $props();

	const calendarProps = $derived(mergePresetProps(preset, 'datepicker.calendar', restProps));

	function handleValueChange(value: Date | undefined) {
		if (datePickerBond) datePickerBond.props.value = value;
	}

	function handleRangeChange(range: CalendarRange) {
		if (datePickerBond) datePickerBond.props.range = range;
	}

	function handlePivoteChange(pivote: Date) {
		if (datePickerBond) datePickerBond.props.pivote = pivote;
	}
</script>

<Content
	class={['relative overflow-hidden p-0 max-w-[96svw] md:max-w-xs', klass]}
	base={Root}
	{...calendarProps}
	value={datePickerBond?.props.value}
	range={datePickerBond?.props.range ?? [undefined, undefined]}
	pivote={datePickerBond?.props.pivote ?? new Date()}
	start={datePickerBond?.props.start}
	end={datePickerBond?.props.end}
	min={datePickerBond?.props.min}
	max={datePickerBond?.props.max}
	type={datePickerBond?.props.type ?? 'single'}
	onvaluechange={handleValueChange}
	onrangechange={handleRangeChange}
	onpivotechange={handlePivoteChange}
>
	<HtmlAtom base={Header} class="col-span-full" />
	<HtmlAtom base={Weekdays} class="border-0" />

	<HtmlAtom base={Body}>
		{#snippet children({ day }: { day: CalendarDayType })}
			<Day {day} />
		{/snippet}
	</HtmlAtom>

	<HtmlAtom base={Months} />
	<HtmlAtom base={Years} />
</Content>
