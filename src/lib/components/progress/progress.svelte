<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { ProgressProps } from './types';

	let {
		class: klass = '',
		value = null,
		max = 100,
		variant = 'linear',
		showLabel = false,
		preset = 'progress',
		labelContent = undefined,
		fillContent = undefined,
		children = undefined,
		...restProps
	}: ProgressProps & HTMLAttributes<HTMLDivElement> = $props();

	const isIndeterminate = $derived(value === null || value === undefined);
	const percent = $derived(isIndeterminate ? null : Math.min(100, Math.max(0, (value! / max) * 100)));

	// Circular SVG params
	const radius = 20;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = $derived(
		isIndeterminate ? 0 : circumference - (percent! / 100) * circumference
	);
</script>

<!-- ─── Default part snippets ──────────────────────────────────────────── -->

{#snippet defaultLinearFill({ percent: p }: { percent: number | null })}
	<HtmlAtom
		preset="progress.fill"
		as="div"
		class={[
			'progress-fill bg-foreground h-full rounded-full transition-[width] duration-300',
			isIndeterminate && 'animate-progress-indeterminate w-1/3',
			'$preset'
		]}
		style={p !== null ? `width: ${p}%` : undefined}
	/>
{/snippet}

{#snippet defaultCircularFill({ percent: p }: { percent: number | null })}
	<circle
		cx="24"
		cy="24"
		r={radius}
		fill="none"
		stroke-width="4"
		stroke-linecap="round"
		stroke-dasharray={circumference}
		stroke-dashoffset={strokeDashoffset}
		class={[
			'stroke-foreground origin-center transition-[stroke-dashoffset] duration-300',
			isIndeterminate && 'animate-spin'
		].filter(Boolean).join(' ')}
	/>
{/snippet}

{#snippet defaultLabel({ percent: p }: { value: number | null; percent: number | null })}
	{#if showLabel && p !== null}
		<span class="progress-label text-muted-foreground text-xs">
			{Math.round(p)}%
		</span>
	{/if}
{/snippet}

<!-- ─── Render ────────────────────────────────────────────────────────── -->

{#if variant === 'circular'}
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
		{...restProps}
	>
		<svg viewBox="0 0 48 48" class="h-12 w-12 -rotate-90">
			<!-- Background track -->
			<circle cx="24" cy="24" r={radius} fill="none" stroke-width="4" class="stroke-input" />
			<!-- Fill arc -->
			{@render (fillContent ?? defaultCircularFill)({ value, percent })}
		</svg>

		<!-- Label inside circle -->
		<span class="progress-label absolute text-xs font-medium">
			{@render (labelContent ?? defaultLabel)({ value, percent })}
		</span>
	</HtmlAtom>
{:else}
	<HtmlAtom
		{preset}
		as="div"
		class={['progress-root flex flex-col gap-1', '$preset', klass]}
		role="progressbar"
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuenow={isIndeterminate ? undefined : value ?? undefined}
		{...restProps}
	>
		<!-- Track -->
		<HtmlAtom
			preset="progress.track"
			as="div"
			class="progress-track bg-input border-border h-2 w-full overflow-hidden rounded-full border $preset"
		>
			{@render (fillContent ?? defaultLinearFill)({ value, percent })}
		</HtmlAtom>

		<!-- Label -->
		{@render (labelContent ?? defaultLabel)({ value, percent })}
	</HtmlAtom>
{/if}

{#if children}
	{@render children()}
{/if}
