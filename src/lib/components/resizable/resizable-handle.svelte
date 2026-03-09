<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { getResizableContext } from './context';
	import type { ResizableHandleProps } from './types';

	let {
		class: klass = '',
		preset = 'resizable.handle',
		handleContent = undefined,
		...restProps
	}: ResizableHandleProps & HTMLAttributes<HTMLDivElement> = $props();

	const ctx = getResizableContext();
	const isHorizontal = $derived(ctx.direction === 'horizontal');

	let dragging = $state(false);
	let handleEl: HTMLElement | undefined = $state();

	// Which handle index are we? Count preceding Handle siblings via DOM position.
	// Simpler: track via a module-level counter keyed to the root context.
	// We use the handle's index among all resizable-handle elements in the parent.
	function getHandleIndex(): number {
		if (!handleEl) return 0;
		const siblings = Array.from(handleEl.parentElement?.querySelectorAll('.resizable-handle') ?? []);
		return siblings.indexOf(handleEl);
	}

	function onPointerDown(ev: PointerEvent) {
		ev.preventDefault();
		dragging = true;
		(ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
	}

	function onPointerMove(ev: PointerEvent) {
		if (!dragging || !handleEl) return;
		const container = handleEl.parentElement;
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const totalSize = isHorizontal ? rect.width : rect.height;
		const delta = isHorizontal
			? (ev.movementX / totalSize) * 100
			: (ev.movementY / totalSize) * 100;

		ctx.resizeAdjacentPanels(getHandleIndex(), delta);
	}

	function onPointerUp(ev: PointerEvent) {
		dragging = false;
		(ev.currentTarget as HTMLElement).releasePointerCapture(ev.pointerId);
	}

	function onKeyDown(ev: KeyboardEvent) {
		const step = ev.shiftKey ? 5 : 1;
		let delta = 0;
		if (isHorizontal) {
			if (ev.key === 'ArrowRight') delta = +step;
			else if (ev.key === 'ArrowLeft') delta = -step;
			else return;
		} else {
			if (ev.key === 'ArrowDown') delta = +step;
			else if (ev.key === 'ArrowUp') delta = -step;
			else return;
		}
		ev.preventDefault();
		ctx.resizeAdjacentPanels(getHandleIndex(), delta);
	}
</script>

<!-- ── Default handle grip ───────────────────────────────────────────────── -->

{#snippet defaultHandle()}
	<div class={[
		'flex items-center justify-center opacity-40 transition-opacity group-hover:opacity-100 group-active:opacity-100',
		isHorizontal ? 'h-8 w-1 flex-col gap-0.5' : 'h-1 w-8 flex-row gap-0.5'
	].join(' ')}>
		{#each [0,1,2] as _}
			<span class={['bg-foreground/60 rounded-full', isHorizontal ? 'h-1 w-1' : 'h-1 w-1'].join(' ')}></span>
		{/each}
	</div>
{/snippet}

<!-- ── Handle ────────────────────────────────────────────────────────────── -->

<HtmlAtom
	bind:el={handleEl}
	{preset}
	as="div"
	class={[
		'resizable-handle group relative z-10 flex shrink-0 items-center justify-center',
		'bg-border transition-colors hover:bg-foreground/20 active:bg-foreground/30',
		isHorizontal
			? 'w-1 cursor-col-resize'
			: 'h-1 cursor-row-resize',
		dragging && 'bg-foreground/30',
		'$preset',
		klass
	]}
	role="separator"
	tabindex={0}
	aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
	aria-label="Resize panels"
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onkeydown={onKeyDown}
	{...restProps}
>
	{@render (handleContent ?? defaultHandle)()}
</HtmlAtom>
