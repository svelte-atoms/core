<script lang="ts">
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
		preset = 'datepicker.calendar',
		children: childrenProp,
		Header = DatePickerHeader,
		Weekdays = CalendarHeader,
		Body = CalendarBody,
		Day = CalendarDay,
		Months = DatePickerMonths,
		Years = DatePickerYears,
		...restProps
	}: DatePickerCalendarProps = $props();

	function handleChange(_: CustomEvent, { range, pivote }: { range: CalendarRange; pivote: Date }) {
		if (!datePickerBond) return;

		datePickerBond.state.props.range = range;
		datePickerBond.state.props.pivote = pivote;
	}
</script>

<Content
	class={['relative overflow-hidden p-0', klass]}
	base={Root}
	onchange={handleChange}
	{preset}
	{...restProps}
>
	<HtmlAtom base={Header} class="col-span-full" />
	<HtmlAtom base={Weekdays} class="border-0" />

	<HtmlAtom base={Body}>
		{#snippet children({ day }: { day: CalendarDayType })}
			<HtmlAtom base={Day} {day} class="flex items-center justify-center border-0">
				<span class="value">{day.dayOfMonth}</span>
			</HtmlAtom>
		{/snippet}
	</HtmlAtom>

	<HtmlAtom base={Months} />
	<HtmlAtom base={Years} />
</Content>
