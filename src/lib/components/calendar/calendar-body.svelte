<script lang="ts">
	import { backInOut } from 'svelte/easing';
	import CalendarDay from './calendar-day.svelte';
	import { CalendarBond } from './bond.svelte';
	import { cn } from '$svelte-atoms/core/utils';
	import { HtmlAtom } from '../atom';

	const calendarBond = CalendarBond.get();

	const currentMonth = $derived(calendarBond?.state.props.currentMonth);

	let {
		class: klass = '',
		weekday,
		element = $bindable(undefined),
		children = undefined,
		...restProps
	} = $props();

	const bodyProps = $derived({
		...calendarBond?.body(),
		...restProps
	});

	// const generator = function (pivot: Date, start: Date, end?: Date) {
	// 	const firstDay = new Date(pivot.getFullYear(), pivot.getMonth(), 1).getDay();
	// 	const lastMonthDaysCount = monthDays(pivot.getMonth() - 1, pivot.getFullYear());
	// 	const sample = new Date(
	// 		pivot.getFullYear(),
	// 		pivot.getMonth() - 1,
	// 		lastMonthDaysCount - firstDay
	// 	);

	// 	const array = [];
	// 	let next = false,
	// 		prec = false;

	// 	for (let index = 0; index < 42; index++) {
	// 		sample.setDate(sample.getDate() + 1);

	// 		prec = pivot.getMonth() > sample.getMonth() || pivot.getFullYear() > sample.getFullYear();
	// 		next =
	// 			(pivot.getMonth() < sample.getMonth() && pivot.getFullYear() === sample.getFullYear()) ||
	// 			(pivot.getMonth() > sample.getMonth() && pivot.getFullYear() < sample.getFullYear());

	// 		array.push({
	// 			id: sample.getTime(),
	// 			date: sample.getDate(),
	// 			offmonth: next || prec,
	// 			next,
	// 			prec,
	// 			today: isToday(sample),
	// 			week: Math.floor(index / 7),
	// 			month: sample.getMonth(),
	// 			disabled: false,
	// 			weekend: sample.getDay() == 0,
	// 			name: format(sample, 'iiiii'),
	// 			selected: start?.getTime() === sample.getTime()
	// 		});
	// 	}

	// 	return array;
	// };

	// const days = $derived(
	// 	generator(
	// 		context_calendar.derived.data.pivote,
	// 		context_calendar.derived.data.start ?? new Date(),
	// 		context_calendar.derived.data.end
	// 	)
	// );

	function monthDays(month: number, year = 2020) {
		return new Date(year, month + 1, 0).getDate();
	}

	function scle(node: HTMLElement, { delay = 0, duration = 400, easing = backInOut }) {
		return {
			delay,
			duration,
			easing,
			css: (_, u) => {
				return `transform: scale(${u})`;
			}
		};
	}
</script>

<HtmlAtom class={cn('col-span-full grid h-full w-full grid-cols-subgrid', klass)} {...bodyProps}>
	{#each currentMonth?.days ?? [] as day (day.id)}
		{#if children}
			{@render children?.({ day })}
		{:else}
			<CalendarDay
				{day}
				onclick={() => {
					console.log('day clicked', day.date);
					calendarBond?.state.selectStart(new Date(day.date));
				}}
			/>
		{/if}
	{/each}
</HtmlAtom>

<style>
</style>
