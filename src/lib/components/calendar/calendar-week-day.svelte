<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';
	import { HtmlAtom } from '../atom';
	import { CalendarBond } from './bond.svelte';

	const calendarBond = CalendarBond.get();

	let {
		class: klass = '',
		isWeekend,
		element = $bindable(undefined),
		children = undefined,
		...restProps
	} = $props();

	const weekDayProps = $derived({
		...calendarBond?.weekDay(),
		...restProps
	});
</script>

<HtmlAtom
	preset="calendar.weekday"
	class={cn(
		'calendar-week-day h-fit px-2 py-2 text-center text-sm font-medium',
		isWeekend ? 'text-primary' : '',
		klass
	)}
	data-weekend={isWeekend}
	{...weekDayProps}
>
	{@render children?.()}
</HtmlAtom>
