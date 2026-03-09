<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { setResizableContext } from './context';
	import type { ResizableRootProps } from './types';

	let {
		class: klass = '',
		direction = 'horizontal',
		preset = 'resizable',
		children,
		...restProps
	}: ResizableRootProps & HTMLAttributes<HTMLDivElement> = $props();

	// Panel registry: id → { size, min, max }
	type PanelEntry = { size: number; min: number; max: number };
	const panels = new Map<symbol, PanelEntry>();
	const order: symbol[] = [];

	function registerPanel(id: symbol, defaultSize: number, minSize: number, maxSize: number) {
		panels.set(id, { size: defaultSize, min: minSize, max: maxSize });
		order.push(id);
	}

	function getSizes() {
		return order.map((id) => panels.get(id)!.size);
	}

	function getPanelSize(id: symbol) {
		return panels.get(id)?.size ?? 50;
	}

	function setPanelSize(id: symbol, size: number) {
		const p = panels.get(id);
		if (p) p.size = size;
	}

	function getPanelIndex(id: symbol) {
		return order.indexOf(id);
	}

	/**
	 * Resize panel at handleIndex and handleIndex+1 by delta (percentage points).
	 * Respects each panel's min/max constraints.
	 */
	function resizeAdjacentPanels(handleIndex: number, delta: number) {
		const idA = order[handleIndex];
		const idB = order[handleIndex + 1];
		if (!idA || !idB) return;

		const a = panels.get(idA)!;
		const b = panels.get(idB)!;

		const newA = Math.min(a.max, Math.max(a.min, a.size + delta));
		const actualDelta = newA - a.size;
		const newB = b.size - actualDelta;

		if (newB < b.min || newB > b.max) return;

		a.size = newA;
		b.size = newB;
	}

	setResizableContext({
		direction,
		registerPanel,
		getSizes,
		setPanelSize,
		getPanelSize,
		getPanelIndex,
		resizeAdjacentPanels
	});
</script>

<HtmlAtom
	{preset}
	as="div"
	class={[
		'resizable-root flex overflow-hidden',
		direction === 'horizontal' ? 'flex-row' : 'flex-col',
		'$preset',
		klass
	]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
