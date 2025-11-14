<script lang="ts">
	import { cn, defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { addMonths, format, isToday, startOfDay, subMonths } from 'date-fns';
	import type { CalendarRange, CalendarRootProps, Day, Month } from './types';
	import { CalendarBond, CalendarBondState, type CalendarBondProps } from './bond.svelte';
	import { HtmlAtom } from '../atom';

	import './calendar.css';

	let {
		class: klass = '',
		value = $bindable(),
		range = $bindable([undefined, undefined]),
		pivote = $bindable(new Date()),
		start = $bindable(startOfDay(new Date())),
		end = $bindable(),
		min = undefined,
		max = undefined,
		type = 'single',
		extend = {},
		onchange = undefined,
		factory = _factory,
		children = undefined,
		...restProps
	}: CalendarRootProps = $props();

	const monthCurrentDays = $derived(generator(pivote));

	$inspect(min, max, monthCurrentDays);

	const monthCurrent: Month = $derived.by(() => {
		const start = monthCurrentDays.at(0) as Day;
		const end = monthCurrentDays.at(-1) as Day;

		return {
			start: start?.date,
			end: end?.date,
			days: monthCurrentDays,
			name: start ? format(start.date, 'MM') : '',
			fullname: start ? format(start.date, 'MMM') : ''
		};
	});

	const monthPreviousDays = $derived(generator(subMonths(pivote, 1)));
	const monthPrevious: Month = $derived.by(() => {
		const start = monthPreviousDays.at(0) as Day;
		const end = monthPreviousDays.at(-1) as Day;

		return {
			start: start?.date,
			end: end?.date,
			days: monthPreviousDays,
			name: start ? format(start.date, 'MM') : '',
			fullname: start ? format(start.date, 'MMM') : ''
		};
	});

	const monthNextDays = $derived(generator(addMonths(pivote, 1)));

	const monthNext: Month = $derived.by(() => {
		const start = monthNextDays.at(0) as Day;
		const end = monthNextDays.at(-1) as Day;

		return {
			start: start?.date,
			end: end?.date,
			days: monthNextDays,
			name: start ? format(start.date, 'MM') : '',
			fullname: start ? format(start.date, 'MMM') : ''
		};
	});

	function generator(pivot: Date): Day[] {
		const firstDay = new Date(pivot.getFullYear(), pivot.getMonth(), 1).getDay();
		const lastMonthDaysCount = monthDays(pivot.getMonth() - 1, pivot.getFullYear());
		const sample = startOfDay(
			new Date(pivot.getFullYear(), pivot.getMonth() - 1, lastMonthDaysCount - firstDay)
		);

		const array: Day[] = [];

		for (let index = 0; index < 42; index++) {
			sample.setDate(sample.getDate() + 1);

			const prec =
				pivot.getMonth() > sample.getMonth() || pivot.getFullYear() > sample.getFullYear();
			const next =
				(pivot.getMonth() < sample.getMonth() && pivot.getFullYear() === sample.getFullYear()) ||
				(pivot.getMonth() > sample.getMonth() && pivot.getFullYear() < sample.getFullYear());

			const disabled =
				(min ? sample < startOfDay(min) : false) || (max ? sample > startOfDay(max) : false);

			array.push({
				id: sample.getTime(),
				date: new Date(sample),
				get offmonth() {
					return next || prec;
				},
				dayOfMonth: sample.getDate(),
				today: isToday(sample),
				week: Math.floor(index / 7),
				month: sample.getMonth(),
				disabled: disabled,
				weekend: sample.getDay() == 0,
				name: format(sample, 'iii'),
				fullname: format(sample, 'iiiii'),
				get fromNextMonth() {
					return next;
				},
				get fromPreviousMonth() {
					return prec;
				}
			});
		}

		return array;
	}

	function monthDays(month: number, year = 2020) {
		return new Date(year, month + 1, 0).getDate();
	}

	const bondProps = defineState<CalendarBondProps>(
		[
			defineProperty(
				'range',
				() => range,
				(v: CalendarRange) => {
					range = v;
					onchange?.(new CustomEvent('change'), { range, pivote });
				}
			),
			defineProperty(
				'value',
				() => range?.[0],
				(v) => {
					if (range?.[0]) {
						range[0] = v;
					}
					onchange?.(new CustomEvent('change'), { range, pivote });
				}
			),
			defineProperty(
				'pivote',
				() => pivote,
				(v: Date) => {
					pivote = v;
					onchange?.(new CustomEvent('change'), { range, pivote });
				}
			),
			defineProperty(
				'start',
				() => range?.[0],
				(v: Date) => {
					range[0] = v;
					onchange?.(new CustomEvent('change'), { range, pivote });
				}
			),
			defineProperty(
				'end',
				() => range?.[1],
				(v: Date | undefined) => {
					range[1] = v;
					onchange?.(new CustomEvent('change'), { range, pivote });
				}
			),
			defineProperty(
				'min',
				() => min,
				(v: Date | undefined) => (min = v)
			),
			defineProperty(
				'max',
				() => max,
				(v: Date | undefined) => (max = v)
			),
			defineProperty('type', () => type ?? 'single'),
			defineProperty('nextMonth', () => monthNext),
			defineProperty('currentMonth', () => monthCurrent),
			defineProperty('previousMonth', () => monthPrevious)
		],
		() => ({ extend })
	);

	const bond = factory(bondProps).share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const popoverState = new CalendarBondState(() => props);
		const popoverBond = new CalendarBond(popoverState);

		return popoverBond;
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom class={cn('h-full w-full', klass)} data-atom="calendar-root" {...rootProps}>
	{@render children?.({ calendar: bond })}
</HtmlAtom>
