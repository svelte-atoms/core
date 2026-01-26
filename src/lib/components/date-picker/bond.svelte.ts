import {
	PopoverBond,
	PopoverState,
	type PopoverDomElements,
	type PopoverStateProps
} from '$svelte-atoms/core/components/popover/bond.svelte';
import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import type { CalendarBond, CalendarBondProps } from '../calendar/bond.svelte';

export type DatePickerBondProps = PopoverStateProps &
	CalendarBondProps & {
		format?: string;
		placeholder?: string;
		readonly rest?: Record<string, unknown>;
	};

export type DatePickerBondElements = PopoverDomElements & {
	trigger: HTMLInputElement;
	root: HTMLElement;
	content: HTMLElement;
	clearButton: HTMLElement;
};

export class DatePickerBond<
	Props extends DatePickerBondProps = DatePickerBondProps,
	State extends DatePickerBondState<Props> = DatePickerBondState<Props>
> extends PopoverBond<Props, State, DatePickerBondElements> {
	#calendarBond?: CalendarBond;

	constructor(state: State) {
		super(state);
	}

	get calendar() {
		return this.#calendarBond;
	}

	setCalendar(calendar: CalendarBond) {
		this.#calendarBond = calendar;
	}

	override share(): this {
		return DatePickerBond.set(this) as this;
	}

	trigger() {
		const isDisabled = this.state.props.disabled ?? false;
		const placeholder = this.state.props.placeholder ?? 'Select a date';

		return {
			...super.trigger(),
			id: `date-picker-input-${this.id}`,
			role: 'combobox',
			'aria-expanded': this.state.props.open ?? false,
			'aria-controls': `date-picker-calendar-${this.id}`,
			'aria-label': 'Date picker',
			'aria-disabled': isDisabled,
			placeholder,
			disabled: isDisabled,
			readonly: true,
			tabindex: isDisabled ? -1 : 0
		};
	}

	content() {
		const superProps = super.content();
		return {
			...superProps,
			id: `date-picker-calendar-${this.id}`,
			role: 'dialog',
			'aria-label': 'Choose date'
		};
	}

	clearButton() {
		const hasValue = this.state.hasValue;

		return {
			id: `date-picker-clear-${this.id}`,
			type: 'button',
			'aria-label': 'Clear date',
			tabindex: hasValue ? 0 : -1,
			onclick: (ev: Event) => {
				ev.preventDefault();
				ev.stopPropagation();
				this.state.clear();
			},
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.clearButton = node;
			}
		};
	}

	static override get(): DatePickerBond {
		return getContext(this.CONTEXT_KEY);
	}

	static override set(bond: DatePickerBond): DatePickerBond {
		return setContext(this.CONTEXT_KEY, bond);
	}
}

export class DatePickerBondState<Props extends DatePickerBondProps> extends PopoverState<Props> {
	#isYearsPickerOpen = $state(false);
	#isMonthsPickerOpen = $state(false);

	constructor(props: () => Props) {
		super(props);
	}

	get formattedValue() {
		if (this.props.range) {
			if (!this.props.start) return '';
			if (!this.props.end) return this.formatDate(this.props.start);
			return `${this.formatDate(this.props.start)} - ${this.formatDate(this.props.end)}`;
		}

		return this.props.value ? this.formatDate(this.props.value) : '';
	}

	get hasValue() {
		if (this.props.range) {
			return !!(this.props.start || this.props.end);
		}
		return !!this.props.value;
	}

	get isYearsPickerOpen() {
		return this.#isYearsPickerOpen;
	}

	get isMonthsPickerOpen() {
		return this.#isMonthsPickerOpen;
	}

	selectDate(date: Date) {
		if (this.props.range) {
			if (!this.props.start) {
				this.props.start = date;
			} else if (!this.props.end) {
				this.props.end = date;
				this.close(); // Close after selecting range
			} else {
				this.props.start = date;
				this.props.end = undefined;
			}
		} else {
			this.props.value = date;
			this.close(); // Close after selecting single date
		}
	}

	selectStart(date: Date) {
		this.props.start = date;
	}

	selectEnd(date: Date) {
		this.props.end = date;
		this.close();
	}

	clear() {
		this.props.value = undefined;
		this.props.start = undefined;
		this.props.end = undefined;
	}

	private formatDate(date: Date): string {
		const format = this.props.format ?? 'MM/dd/yyyy';

		// Basic formatting - can be enhanced with date-fns format later
		if (format === 'MM/dd/yyyy') {
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const year = date.getFullYear();
			return `${month}/${day}/${year}`;
		}

		if (format === 'dd/MM/yyyy') {
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		}

		if (format === 'yyyy-MM-dd') {
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const year = date.getFullYear();
			return `${year}-${month}-${day}`;
		}

		// Default fallback
		return date.toLocaleDateString();
	}

	openYearsPicker() {
		this.#isYearsPickerOpen = true;
	}
	closeYearsPicker() {
		this.#isYearsPickerOpen = false;
	}
	toggleYearsPicker() {
		this.#isYearsPickerOpen = !this.#isYearsPickerOpen;
	}

	openMonthsPicker() {
		this.#isMonthsPickerOpen = true;
	}
	closeMonthsPicker() {
		this.#isMonthsPickerOpen = false;
	}
	toggleMonthsPicker() {
		this.#isMonthsPickerOpen = !this.#isMonthsPickerOpen;
	}
}
