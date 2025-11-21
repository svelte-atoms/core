import type { Snippet } from 'svelte';
import type { Factory } from '$svelte-atoms/core/types';
import type { CalendarBond } from './bond.svelte';

export type Day = {
	id: number;
	date: Date;
	dayOfMonth: number;
	offmonth: boolean;
	today: boolean;
	week: number;
	month: number;
	disabled: boolean;
	weekend: boolean;
	name: string;
	fullname: string;

	readonly fromNextMonth: boolean;
	readonly fromPreviousMonth: boolean;
};

export type Month = {
	name: string;
	fullname: string;
	start: Date;
	end: Date | undefined;
	days: Day[];
};
export type CalendarRange = [Date | undefined, Date | undefined];

export interface CalendarRootProps {
	class?: string;
	preset?: string;

	value?: Date;
	range?: CalendarRange;

	start?: Date;
	end?: Date;

	min?: Date;
	max?: Date;

	pivote?: Date;

	type?: 'range' | 'single';

	extend?: Record<string, unknown>;

	factory?: Factory<CalendarBond>;

	onchange?: (ev: CustomEvent, params: { range: CalendarRange; pivote: Date }) => void;

	children?: Snippet<
		[
			{
				calendar: CalendarBond;
			}
		]
	>;
}

export interface CalendarDayProps {
	class?: string;
	preset?: string;
	day: Day;
	as?: string;
	onclick?: () => void;
	readonly element?: HTMLElement;
	children?: Snippet<
		[
			{
				calendar: CalendarBond;
			}
		]
	>;
}
