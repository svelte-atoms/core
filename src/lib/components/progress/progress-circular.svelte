<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { ProgressCircularProps } from './types';
	import { SvgElement } from '../element'

	let {
		class: klass = '',
		value = null,
		max = 100,
		preset = 'progress.circular',
		...restProps
	}: ProgressCircularProps & HTMLAttributes<HTMLDivElement> = $props();

	const isIndeterminate = $derived(value === null || value === undefined);
	const percent = $derived(isIndeterminate ? null : Math.min(100, Math.max(0, (value! / max) * 100)));

	const radius = 20;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = $derived(
		isIndeterminate ? circumference : circumference - (percent! / 100) * circumference
	);
</script>

{#snippet defaultCircularFill()}
	<SvgElement
		as="circle"
		preset="progress.circular.fill"
		cx="24"
		cy="24"
		r={radius}
		fill="none"
		stroke-width="4"
		stroke-linecap="round"
		stroke-dasharray={circumference}
		stroke-dashoffset={strokeDashoffset}
		class={[
			'stroke-foreground origin-center duration-300',
			!isIndeterminate && 'transition-[stroke-dashoffset]',
			isIndeterminate && 'animate-progress-circular-indeterminate'
		]
			.filter(Boolean)
			.join(' ')}
	/>
{/snippet}

<HtmlAtom
	{preset}
	as="div"
	class={[
		'progress-root progress-root--circular relative inline-flex items-center justify-center',
		'$preset',
		klass
	]}
	role="progressbar"
	aria-valuemin={0}
	aria-valuemax={max}
	aria-valuenow={isIndeterminate ? undefined : value ?? undefined}
	data-indeterminate={isIndeterminate}
	data-value={isIndeterminate ? undefined : value ?? undefined}
	data-max={max}
	data-completed={!isIndeterminate && percent === 100}
	{...restProps}
>
	<svg viewBox="0 0 48 48" class="h-full w-full -rotate-90">
		<SvgElement
			as="circle"
			preset="progress.circular.track"
			cx="24"
			cy="24"
			r={radius}
			fill="none"
			stroke-width="4"
			class="stroke-input"
		/>
		{@render defaultCircularFill()}
	</svg>
</HtmlAtom>

<style>
	@keyframes progress-circular-spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@keyframes progress-circular-dash {
		0% { stroke-dashoffset: 119; }
		50% { stroke-dashoffset: 30; }
		100% { stroke-dashoffset: 119; }
	}

	:global(.animate-progress-circular-indeterminate) {
		animation:
			progress-circular-spin 1.4s linear infinite,
			progress-circular-dash 1.4s ease-in-out infinite;
		transform-origin: center;
	}
</style>
