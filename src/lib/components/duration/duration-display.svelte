<script lang="ts">
	import { getDurationContext } from './context';
	import type { DurationDisplayProps } from './types';
	import type { DurationValue } from './types';

	let {
		format = undefined,
		showZero = false,
		class: klass = '',
	}: DurationDisplayProps = $props();

	const ctx = getDurationContext();
	const d = $derived(ctx.duration());

	function formatDuration(d: DurationValue, fmt: string | undefined, showZero: boolean): string {
		if (d.totalMilliseconds === 0) return '0 seconds';

		if (fmt) {
			// Token replacement: pad mm/ss to 2 digits
			return fmt
				.replace(/\bY\b/g, String(d.years))
				.replace(/\bM\b/g, String(d.months))
				.replace(/\bD\b/g, String(d.days))
				.replace(/\bh\b/g, String(d.hours))
				.replace(/\bmm\b/g, String(d.minutes).padStart(2, '0'))
				.replace(/\bm\b/g, String(d.minutes))
				.replace(/\bss\b/g, String(d.seconds).padStart(2, '0'))
				.replace(/\bs\b/g, String(d.seconds))
				.replace(/\bms\b/g, String(d.milliseconds));
		}

		// Auto format: show most significant units
		const parts: string[] = [];
		if (d.years   && (showZero || d.years))   parts.push(`${d.years} ${d.years === 1 ? 'year' : 'years'}`);
		if (d.months  && (showZero || d.months))  parts.push(`${d.months} ${d.months === 1 ? 'month' : 'months'}`);
		if (d.days    && (showZero || d.days))    parts.push(`${d.days} ${d.days === 1 ? 'day' : 'days'}`);
		if (d.hours   && (showZero || d.hours))   parts.push(`${d.hours} ${d.hours === 1 ? 'hour' : 'hours'}`);
		if (d.minutes && (showZero || d.minutes)) parts.push(`${d.minutes} ${d.minutes === 1 ? 'minute' : 'minutes'}`);
		if (d.seconds && (showZero || d.seconds)) parts.push(`${d.seconds} ${d.seconds === 1 ? 'second' : 'seconds'}`);
		if (d.milliseconds && (showZero || d.milliseconds)) parts.push(`${d.milliseconds}ms`);

		return parts.join(', ') || '0 seconds';
	}

	const display = $derived(formatDuration(d, format, showZero));
</script>

<span class={klass}>{display}</span>
