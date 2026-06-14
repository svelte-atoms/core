<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';
	import { HtmlAtom } from '../atom';
	import { CalendarBond } from './bond.svelte';

	const calendarBond = CalendarBond.get();

	let {
		class: klass = '',
		preset = undefined,
		isWeekend,
		index = 0,
		element = $bindable(undefined),
		children = undefined,
		...restProps
	} = $props();

	const weekDayProps = $derived({
		preset: preset ?? 'calendar.weekday',
		...calendarBond?.weekDay(index).spread,
		...restProps
	});
</script>

<HtmlAtom
	class={cn(
		'calendar-week-day h-fit px-1 py-2 text-center text-sm font-medium border-border border-b border-l first:border-l-0 data-[weekend=true]:text-primary',
		klass
	)}
	data-weekend={isWeekend}
	{...weekDayProps}
>
	{@render children?.()}
</HtmlAtom>
