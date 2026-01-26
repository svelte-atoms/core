<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';
	import { HtmlAtom } from '../atom';
	import { CalendarBond } from './bond.svelte';

	const calendarBond = CalendarBond.get();

	let {
		class: klass = '',
		preset = 'calendar.weekday',
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
	{preset}
	class={cn(
		'calendar-week-day h-fit px-1 py-1 text-center text-sm font-medium border-border border-l first:border-l-0 data-[weekend=true]:text-primary',
		klass
	)}
	data-weekend={isWeekend}
	{...weekDayProps}
>
	{@render children?.()}
</HtmlAtom>
