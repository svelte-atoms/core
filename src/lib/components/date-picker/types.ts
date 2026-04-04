import type { Component, Snippet } from 'svelte';
import type { SnippetProps } from '$svelte-atoms/core/components/atom';
import type { Day, CalendarRange } from '../calendar/types';
import type { DatePickerBond } from './bond.svelte';
import type { Factory } from '$svelte-atoms/core/types';

// ============================================================================
// DatePicker Snippet Props (Extensible)
// ============================================================================

export interface DatePickerSnippetProps extends SnippetProps {
	datePicker: DatePickerBond;
}

export type DatePickerChildren = Snippet<[DatePickerSnippetProps]>;

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
	children?: DatePickerChildren;
	[key: string]: unknown;
}
