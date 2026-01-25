import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import type { CalendarRange, Day, Month } from './types';

export type CalendarBondProps = BondStateProps & {
	value?: Date;
	range: CalendarRange;
	start?: Date;
	end?: Date;
	min?: Date;
	max?: Date;
	pivote?: Date;
	disabled?: boolean;
	type?: 'range' | 'single';
	currentMonth?: Month;
	previousMonth?: Month;
	nextMonth?: Month;
	extend?: Record<string, unknown>;
	readonly rest?: Record<string, unknown>;
};

export type CalendarBondElements = {
	root: HTMLElement;
	body: HTMLElement;
	day: HTMLElement;
	weekDay: HTMLElement;
	header: HTMLElement;
};

export class CalendarBond<
	Props extends CalendarBondProps = CalendarBondProps,
	State extends CalendarBondState<Props> = CalendarBondState<Props>
> extends Bond<Props, State, CalendarBondElements> {
	static CONTEXT_KEY = '@atoms/context/calendar';

	constructor(s: State) {
		super(s);
	}

	share(): this {
		return CalendarBond.set(this) as this;
	}

	root() {
		return {
			id: `calendar-root-${this.id}`,
			'aria-label': 'Calendar',
			'aria-disabled': this.state.props.disabled ?? false,
			role: 'application',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	body() {
		return {
			id: `calendar-month-${this.id}`,
			role: 'grid',
			'aria-labelledby': `calendar-month-label-${this.id}`,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		};
	}

	day(day: Day) {
		return {
			id: `calendar-day-${this.id}-${day.id}`,
			role: 'gridcell',
			'aria-selected': this.state.isDaySelected(day),
			'aria-disabled': day.disabled,
			tabindex: day.disabled ? -1 : 0
		};
	}

	weekDay() {
		return {
			id: `calendar-weekday-${this.id}`,
			role: 'columnheader'
		};
	}

	header() {
		return {
			id: `calendar-weekdays-${this.id}`,
			role: 'row',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	static get(): CalendarBond | undefined {
		return getContext(this.CONTEXT_KEY);
	}

	static set(bond: CalendarBond): CalendarBond {
		return setContext(this.CONTEXT_KEY, bond);
	}
}

export class CalendarBondState<Props extends CalendarBondProps> extends BondState<Props> {
	constructor(props: () => Props) {
		super(props);
	}

	selectDate(date: Date) {
		// if (this.props.range) {
		// } else {
		// 	this.props.value = date;
		// }

		if (!this.props.start) {
			this.props.range[0] = date;
		} else if (!this.props.end) {
			this.props.range[1] = date;
		} else {
			this.props.range[0] = date;
			this.props.range[1] = undefined;
		}

		this.props.range = [...this.props.range];
	}

	selectStart(date: Date) {
		this.props.range[0] = date;
		this.props.range = [...this.props.range];
	}

	selectEnd(date: Date) {
		this.props.range[1] = date;
		this.props.range = [...this.props.range];
	}

	unselect() {
		this.props.range = [undefined, undefined];
		this.props.range = [...this.props.range];
	}

	unselectStart() {
		this.props.range[0] = undefined;
		this.props.range = [...this.props.range];
	}

	unselectEnd() {
		this.props.range[1] = undefined;
		this.props.range = [...this.props.range];
	}

	nextMonth() {
		if (this.props.pivote) {
			const current = this.props.pivote;
			this.props.pivote = new Date(current.getFullYear(), current.getMonth() + 1, 1);
		}
	}

	previousMonth() {
		if (this.props.pivote) {
			const current = this.props.pivote;
			this.props.pivote = new Date(current.getFullYear(), current.getMonth() - 1, 1);
		}
	}

	isDaySelected(day: Day): boolean {
		if (this.props.range) {
			const start = this.props.range[0];
			const end = this.props.range[1];

			if (!start) return false;

			const dayTime = day.date.getTime();
			const startTime = start.getTime();

			if (!end) return dayTime === startTime;

			const endTime = end.getTime();
			return dayTime >= startTime && dayTime <= endTime;
		}

		return this.props.value?.getTime() === day.date.getTime();
	}
}
