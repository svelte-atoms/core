import type { Component, Snippet } from 'svelte';
import type { Day, CalendarRange } from '../calendar/types';
import type { DatePickerBond } from './bond.svelte';
import type { Factory } from '$svelte-atoms/core/types';

export interface DatePickerCalendarProps {
	class?: string;
	preset?: string;
	children?: Snippet<[{ day: Day }]>;
	Header?: Component;
	Weekdays?: Component;
	Body?: Component;
	Day?: Component;
	Months?: Component;
	Years?: Component;
	[key: string]: unknown;
}

export interface DatePickerHeaderProps {
	class?: string;
	preset?: string;
	children?: Snippet;
	[key: string]: unknown;
}

export interface DatePickerMonthsProps {
	class?: string;
	preset?: string;
	children?: Snippet;
	[key: string]: unknown;
}

export interface DatePickerYearsProps {
	class?: string;
	preset?: string;
	children?: Snippet;
	[key: string]: unknown;
}

export interface DatePickerRootProps {
	open?: boolean;
	value?: Date;
	range?: CalendarRange;
	pivote?: Date;
	start?: Date;
	end?: Date;
	min?: Date;
	max?: Date;
	type?: 'range' | 'single';
	offset?: number;
	factory?: Factory<DatePickerBond>;
	children?: Snippet<[{ datePicker: DatePickerBond }]>;
	[key: string]: unknown;
}
