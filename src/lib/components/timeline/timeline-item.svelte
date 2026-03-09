<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { getTimelineContext } from './context';
	import type { TimelineItemProps } from './types';

	let {
		class: klass = '',
		completed = false,
		active = false,
		preset = 'timeline.item',
		dotContent = undefined,
		oppositeContent = undefined,
		children,
		...restProps
	}: TimelineItemProps & HTMLAttributes<HTMLLIElement> = $props();

	const ctx = getTimelineContext();
	const isVertical  = $derived(ctx.orientation === 'vertical');
	const isAlternate = $derived(ctx.align === 'alternate');
	const isRight     = $derived(ctx.align === 'right');
</script>

<!-- ── Default dot ───────────────────────────────────────────────────────── -->

{#snippet defaultDot({ completed, active }: { completed: boolean; active: boolean })}
	<span
		class={[
			'timeline-dot h-3 w-3 rounded-full border-2 transition-colors',
			completed ? 'border-foreground bg-foreground'
			: active   ? 'border-foreground bg-background'
			:            'border-muted-foreground bg-background'
		].join(' ')}
	></span>
{/snippet}

<!-- ── Item ──────────────────────────────────────────────────────────────── -->

<HtmlAtom
	{preset}
	as="li"
	class={[
		'timeline-item relative',
		isVertical ? 'flex min-h-12 flex-row gap-3' : 'flex flex-1 flex-col items-center gap-2',
		isAlternate && isVertical && 'even:flex-row-reverse',
		isRight     && isVertical && 'flex-row-reverse',
		'$preset',
		klass
	]}
	{...restProps}
>
	{#if isVertical}
		<!-- Opposite side content (for alternate/right layouts) -->
		{#if oppositeContent || isAlternate || isRight}
			<div class="timeline-opposite min-w-0 flex-1 pt-0.5 text-right">
				{#if oppositeContent}
					{@render oppositeContent()}
				{/if}
			</div>
		{/if}

		<!-- Dot + connector column — self-stretch so line fills item height -->
		<div class="timeline-spine flex shrink-0 self-stretch flex-col items-center">
			<div class="timeline-dot-wrap z-10 flex items-center justify-center pt-0.5">
				{@render (dotContent ?? defaultDot)({ completed, active })}
			</div>
			<!-- Connector line: grows to fill, hidden on last li via CSS -->
			<div class="timeline-connector bg-border mt-1 w-0.5 grow [li:last-child_&]:hidden"></div>
		</div>

		<!-- Main content -->
		<div class="timeline-content min-w-0 flex-1 pb-8 pt-0.5">
			{@render children?.()}
		</div>

	{:else}
		<!-- Horizontal: dot + connector in a row, content below -->
		<div class="timeline-spine flex w-full flex-row items-center">
			<!-- Left connector -->
			<div class="timeline-connector bg-border h-0.5 flex-1 first-of-type:invisible"></div>
			<div class="timeline-dot-wrap z-10 flex items-center justify-center">
				{@render (dotContent ?? defaultDot)({ completed, active })}
			</div>
			<!-- Right connector -->
			<div class="timeline-connector bg-border h-0.5 flex-1 last-of-type:invisible"></div>
		</div>
		<div class="timeline-content px-2 text-center">
			{@render children?.()}
		</div>
	{/if}
</HtmlAtom>
