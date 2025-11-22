<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';
	import { HtmlAtom } from '../atom';
	import { CalendarBond } from './bond.svelte';
	import CalendarWeekDay from './calendar-week-day.svelte';

	const calendarBond = CalendarBond.get();
	const currentMonth = $derived(calendarBond?.state.props.currentMonth);

	let { class: klass = '', preset = 'calendar.header', ...restProps } = $props();

	const headerProps = $derived({
		...calendarBond?.header(),
		...restProps
	});
</script>

<HtmlAtom
	{preset}
	class={cn(
		'calendar-header border-border col-span-full grid h-fit grid-cols-subgrid border-b',
		klass
	)}
	{...headerProps}
>
	{#each (currentMonth?.days ?? []).filter((d) => d.week == 1) as day}
		<CalendarWeekDay isWeekend={day.weekend}>{day.name}</CalendarWeekDay>
	{/each}
</HtmlAtom>
