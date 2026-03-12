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

		// Auto format: skip leading zeros, then include remaining units per showZero
		const units = [
			{ n: d.years,        label: d.years === 1        ? 'year'        : 'years'        },
			{ n: d.months,       label: d.months === 1       ? 'month'       : 'months'       },
			{ n: d.days,         label: d.days === 1         ? 'day'         : 'days'         },
			{ n: d.hours,        label: d.hours === 1        ? 'hour'        : 'hours'        },
			{ n: d.minutes,      label: d.minutes === 1      ? 'minute'      : 'minutes'      },
			{ n: d.seconds,      label: d.seconds === 1      ? 'second'      : 'seconds'      },
			{ n: d.milliseconds, label: 'ms' },
		];
		const parts: string[] = [];
		let started = false;
		for (const { n, label } of units) {
			if (!started && n === 0) continue; // skip leading zeros always
			started = true;
			if (n > 0 || showZero) parts.push(label === 'ms' ? `${n}ms` : `${n} ${label}`);
		}

		return parts.join(', ') || '0 seconds';
	}

	const display = $derived((d.negative ? '−' : '') + formatDuration(d, format, showZero));
</script>

<span class={klass}>{display}</span>
