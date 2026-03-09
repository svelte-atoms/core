<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { RatingProps } from './types';

	let {
		class: klass = '',
		value = $bindable(0),
		count = 5,
		allowHalf = false,
		allowClear = true,
		readonly = false,
		disabled = false,
		preset = 'rating',
		iconContent = undefined,
		onchange = undefined,
		...restProps
	}: RatingProps & HTMLAttributes<HTMLDivElement> = $props();

	let hoverValue = $state<number | null>(null);

	const display = $derived(hoverValue ?? value);

	function getStarState(index: number) {
		const filled = display >= index + 1;
		const half   = !filled && allowHalf && display >= index + 0.5;
		const active = Math.ceil(display) === index + 1;
		return { index, filled, half, active };
	}

	function pick(index: number, isHalf: boolean) {
		if (readonly || disabled) return;
		const next = isHalf ? index + 0.5 : index + 1;
		value = (allowClear && next === value) ? 0 : next;
		hoverValue = null;
		onchange?.(value);
	}

	function onHover(index: number, isHalf: boolean) {
		if (readonly || disabled) return;
		hoverValue = isHalf ? index + 0.5 : index + 1;
	}

	function onLeave() {
		hoverValue = null;
	}

	function onKeyDown(ev: KeyboardEvent) {
		if (readonly || disabled) return;
		const step = allowHalf ? 0.5 : 1;
		if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') {
			ev.preventDefault();
			value = Math.min(count, value + step);
			onchange?.(value);
		} else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') {
			ev.preventDefault();
			value = Math.max(0, value - step);
			onchange?.(value);
		}
	}
</script>

<!-- ── Default star snippet ───────────────────────────────────────────────── -->

{#snippet defaultIcon({ filled, half }: { filled: boolean; half: boolean; index: number; active: boolean })}
	<svg
		viewBox="0 0 24 24"
		class="h-full w-full"
		aria-hidden="true"
	>
		{#if half}
			<!-- Left half filled, right half empty -->
			<defs>
				<linearGradient id="half-grad" x1="0" x2="1" y1="0" y2="0">
					<stop offset="50%" stop-color="currentColor" />
					<stop offset="50%" stop-color="transparent" />
				</linearGradient>
			</defs>
			<path
				d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
				fill="url(#half-grad)"
				stroke="currentColor"
				stroke-width="1.5"
			/>
		{:else}
			<path
				d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
				fill={filled ? 'currentColor' : 'none'}
				stroke="currentColor"
				stroke-width="1.5"
			/>
		{/if}
	</svg>
{/snippet}

<!-- ── Root ───────────────────────────────────────────────────────────────── -->

<HtmlAtom
	{preset}
	as="div"
	class={[
		'rating-root flex items-center gap-1',
		disabled && 'cursor-not-allowed opacity-50',
		readonly && 'cursor-default',
		'$preset',
		klass
	]}
	role="slider"
	aria-label="Rating"
	aria-valuenow={value}
	aria-valuemin={0}
	aria-valuemax={count}
	aria-disabled={disabled || undefined}
	aria-readonly={readonly || undefined}
	tabindex={readonly || disabled ? -1 : 0}
	onmouseleave={onLeave}
	onkeydown={onKeyDown}
	{...restProps}
>
	{#each Array.from({ length: count }, (_, i) => i) as index}
		{@const state = getStarState(index)}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			class={[
				'rating-item relative h-6 w-6 transition-transform',
				!readonly && !disabled && 'cursor-pointer hover:scale-110',
				state.filled || state.half ? 'text-yellow-400' : 'text-muted-foreground'
			].join(' ')}
			onclick={() => pick(index, false)}
			onmousemove={(ev) => {
				if (allowHalf) {
					const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect();
					onHover(index, ev.clientX - rect.left < rect.width / 2);
				} else {
					onHover(index, false);
				}
			}}
			aria-label="Star {index + 1}"
		>
			{@render (iconContent ?? defaultIcon)(state)}

			{#if allowHalf}
				<!-- Left half hit zone for half-value picking -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<span
					class="absolute inset-y-0 left-0 w-1/2"
					onclick={(ev) => { ev.stopPropagation(); pick(index, true); }}
				></span>
			{/if}
		</span>
	{/each}
</HtmlAtom>
