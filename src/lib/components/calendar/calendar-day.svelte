<script lang="ts">
	import { isBefore, isSameDay, isWithinInterval } from 'date-fns';
	import { CalendarBond } from './bond.svelte';
	import type { CalendarDayProps } from './types';
	import { HtmlAtom } from '../atom';
	import './calendar-day.css';

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

		return !!(selectedDateStart && isSameDay(day.date, selectedDateStart));
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
		'calendar-day text-foreground border-border hover:bg-accent hover:text-accent-foreground box-border aspect-square cursor-pointer border-b border-l p-1 transition-colors',
		'data-[offmonth=true]:data-[disabled=false]:data-[selected=false]:text-muted-foreground/50 data-[offmonth=true]:data-[disabled=false]:data-[selected=false]:bg-muted/50',
		'data-[weekend=true]:data-[selected=false]:bg-accent',
		'data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:hover:bg-primary data-[selected=true]:hover:text-primary-foreground',
		'data-[selected=true]:data-[offmonth=true]:bg-primary/80 data-[selected=true]:data-[offmonth=true]:text-primary-foreground',
		'data-[selected=true]:data-[weekend=true]:bg-primary data-[selected=true]:data-[weekend=true]:text-primary-foreground',
		'data-[today=true]:data-[disabled=false]:data-[selected=false]:outline-primary data-[today=true]:data-[disabled=false]:data-[selected=false]:bg-primary/5 data-[today=true]:data-[disabled=false]:data-[selected=false]:outline-2 data-[today=true]:data-[disabled=false]:data-[selected=false]:font-semibold data-[today=true]:data-[disabled=false]:data-[selected=false]:z-1',
		'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-25',
		klass
	]}
	data-disabled={String(day.disabled)}
	data-prec={String(day.fromPreviousMonth)}
	data-next={String(day.fromNextMonth)}
	data-offmonth={String(day.offmonth)}
	data-weekend={String(day.weekend)}
	data-today={String(day.today)}
	data-selected={String(isSelected)}
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
