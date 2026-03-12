import { getContext, setContext } from 'svelte';
import type { DurationValue } from './types';

const CTX = '@svelte-atoms/context/duration';

export interface DurationContext {
	from: () => string;
	to: () => string;
	duration: () => DurationValue;
	setFrom: (v: string) => void;
	setTo: (v: string) => void;
}

export function setDurationContext(ctx: DurationContext) {
	setContext(CTX, ctx);
}

export function getDurationContext(): DurationContext {
	return getContext(CTX);
}

export function computeDuration(from: string, to: string): DurationValue {
	const zero: DurationValue = {
		years: 0, months: 0, days: 0,
		hours: 0, minutes: 0, seconds: 0,
		milliseconds: 0, totalMilliseconds: 0,
		negative: false,
	};

	if (!from || !to) return zero;

	const a = new Date(from);
	const b = new Date(to);
	if (isNaN(a.getTime()) || isNaN(b.getTime())) return zero;

	const negative = b.getTime() < a.getTime();
	// Always compute magnitude: earlier → later
	const start = negative ? b : a;
	const end   = negative ? a : b;

	const totalMs = end.getTime() - start.getTime();

	let cur = new Date(start);
	let years = 0, months = 0;

	cur.setFullYear(cur.getFullYear() + 1);
	while (cur <= end) { years++; cur.setFullYear(cur.getFullYear() + 1); }
	cur.setFullYear(cur.getFullYear() - 1);

	cur.setMonth(cur.getMonth() + 1);
	while (cur <= end) { months++; cur.setMonth(cur.getMonth() + 1); }
	cur.setMonth(cur.getMonth() - 1);

	const remainMs = end.getTime() - cur.getTime();
	const days         = Math.floor(remainMs / 86_400_000);
	const rem1         = remainMs % 86_400_000;
	const hours        = Math.floor(rem1 / 3_600_000);
	const rem2         = rem1 % 3_600_000;
	const minutes      = Math.floor(rem2 / 60_000);
	const rem3         = rem2 % 60_000;
	const seconds      = Math.floor(rem3 / 1000);
	const milliseconds = rem3 % 1000;

	return { years, months, days, hours, minutes, seconds, milliseconds, totalMilliseconds: totalMs, negative };
}
