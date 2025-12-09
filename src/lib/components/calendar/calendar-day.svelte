<script lang="ts">
	import { isBefore, isSameDay, isWithinInterval } from 'date-fns';
	import { CalendarBond } from './bond.svelte';
	import type { CalendarDayProps } from './types';
	import { HtmlAtom } from '../atom';

	const calendarBond = CalendarBond.get();

	const selectedDateStart = $derived(calendarBond?.state.props.start);
	const selectedDateEnd = $derived(calendarBond?.state.props.end);
	const isRange = $derived(Array.isArray(calendarBond?.state.props.type === 'range'));

	let {
		class: klass = '',
		preset = 'calendar.day',
		day,
		as = 'button',
		children = undefined,
		onclick = handleClick,
		...restProps
	}: CalendarDayProps = $props();

	const dayProps = $derived({
		...calendarBond?.day(day),
		...restProps
	});

	const isSelected = $derived.by(() => {
		if (selectedDateEnd && selectedDateStart) {
			return isWithinInterval(day.date, { end: selectedDateEnd, start: selectedDateStart });
		}

		return selectedDateStart && isSameDay(day.date, selectedDateStart);
	});

	function handleClick() {
		if (day.disabled) return;

		if (isRange) {
			const start = calendarBond?.state.props.start;
			if (!start) {
				calendarBond?.state.selectStart(new Date(day.date));
				return;
			}

			if (isBefore(new Date(day.date), new Date(start))) {
				calendarBond?.state.selectStart(new Date(day.date));
				return;
			}

			calendarBond?.state.selectEnd(new Date(day.date));
		} else {
			calendarBond?.state.selectStart(new Date(day.date));
		}
	}
</script>

<HtmlAtom
	{as}
	{preset}
	class={[
		'calendar-day text-foreground border-border hover:bg-accent hover:text-accent-foreground h-12 cursor-pointer border-b border-l p-1 transition-colors',
		day.offmonth && !day.disabled && 'text-muted-foreground/50 bg-muted/50',
		day.weekend && 'bg-accent',
		isSelected &&
			'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
		isSelected && day.offmonth && 'bg-primary/70',
		day.today &&
			!day.disabled &&
			!isSelected &&
			'border-primary bg-primary/5 border-2 font-semibold',
		day.disabled && 'pointer-events-none opacity-25',
		klass
	]}
	data-disabled={day.disabled}
	data-prec={day.fromPreviousMonth}
	data-next={day.fromNextMonth}
	data-offmonth={day.offmonth}
	data-weekend={day.weekend}
	data-today={day.today}
	data-selected={isSelected}
	{onclick}
	{...dayProps}
>
	{#if children}
		{@render children({
			calendar: calendarBond!
		})}
	{:else}
		<span class="value">{day.dayOfMonth}</span>
	{/if}
</HtmlAtom>

<style>
	:global(.calendar-day):nth-child(7n + 1) {
		border-left: none;
	}
	:global(.calendar-day):nth-last-child(-n + 7) {
		border-bottom: none;
	}
</style>
