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
		preset = undefined,
		children = undefined,
		...restProps
	} = $props();

	const bodyProps = $derived({
		preset: preset ?? 'calendar.body',
		...calendarBond?.body().spread,
		...restProps
	});

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

<HtmlAtom
	class={cn('col-span-full grid h-full w-full grid-cols-subgrid', klass)}
	{...bodyProps}
>
	{#each currentMonth?.days ?? [] as day (day.id)}
		{#if children}
			{@render children?.({ day })}
		{:else}
			<CalendarDay
				{day}
				onclick={() => {
					calendarBond?.state.selectStart(new Date(day.date));
				}}
			/>
		{/if}
	{/each}
</HtmlAtom>
