import { tick, untrack } from 'svelte';
import { DataGridBond } from './bond.svelte';
import { throttle } from 'es-toolkit';

export function datagrid(callback: (node: HTMLElement, bond?: DataGridBond) => any) {
	const bond = DataGridBond.get();

	return (node: HTMLElement) => callback(node, bond);
}

export type DataGridVirtualizeParams = {
	rowHeight?: number;
	overscan?: number;
	disabled?: boolean;
	onScroll?: (scrollTop: number) => void;
};
export function virtualize<T>(data: () => T[], params: DataGridVirtualizeParams = {}) {
	const { rowHeight = 32, overscan = 8, disabled = false, onScroll } = params;

	const array = $derived(data());

	let viewportElement: HTMLElement | null = $state(null);
	let tableElement: HTMLElement | null = $state(null);
	let contentElement: HTMLElement | null = $state(null);

	// Height management with exponential moving average
	const heightMap: number[] = $state([]);
	let averageHeight = $state(untrack(() => rowHeight) || 50);
	let heightSampleCount = $state(0);

	let collection: HTMLCollectionOf<Element> | undefined = undefined;

	let rows: HTMLElement[] = $state([]);
	let mounted = $state(false);

	let viewportHeight = $state(0);

	let start = $state(0);
	let end = $state(0);

	let top = $state(0);
	let bottom = $state(0);

	const visibleItems = $derived(
		array.slice(start, end).map((d, i) => ({ index: i + start, data: d }))
	);

	const handleScroll = throttle(async () => {
		if (!viewportElement) return;
		if (disabled) return;

		const { scrollTop } = viewportElement;

		// Call user's onScroll callback
		onScroll?.(scrollTop);

		await refresh();
	}, 1000 / 144); // ~144fps

	// trigger initial refresh
	$effect(() => {
		if (!contentElement) return;
		collection = contentElement.getElementsByClassName('virtual-row');

		rows = Array.from(collection) as HTMLElement[];

		mounted = true;

		// Give the browser time to render and measure the viewport
		setTimeout(() => {
			if (untrack(() => viewportElement)) {
				viewportHeight = untrack(() => viewportElement?.offsetHeight ?? 0);
			}

			refresh();
		}, 0);
	});

	// Watch for data changes and viewport size changes
	$effect(() => {
		if (mounted) refresh();
	});

	// Improved height estimation using exponential moving average
	function updateAverageHeight(newHeight: number) {
		if (heightSampleCount < 1) {
			averageHeight = newHeight;
			heightSampleCount = 1;
		} else {
			// Exponential moving average with alpha = 0.1 for stability
			const alpha = Math.min(0.1, 1 / heightSampleCount);
			averageHeight = alpha * newHeight + (1 - alpha) * averageHeight;
			heightSampleCount++;
		}
	}

	function getItemHeight(index: number): number {
		return heightMap[index] || rowHeight || averageHeight;
	}

	async function refresh() {
		if (!viewportElement || !mounted) return;

		tableElement = contentElement?.closest('table') as HTMLElement;

		const contentOffsetTop = tableElement?.offsetTop ?? 0;

		// Calculate visible range with overscan buffer
		const scrollTop = Math.max(0, viewportElement.scrollTop - contentOffsetTop);

		const startIndex = Math.max(0, findStartIndex(scrollTop) - overscan);
		const endIndex = Math.min(array.length, findEndIndex(scrollTop, startIndex) + overscan);

		start = startIndex;
		end = endIndex;

		await new Promise((res) => requestAnimationFrame(res)); // Wait for DOM update

		// Update height measurements for visible items
		updateHeights();
		updatePadding();
	}

	function findStartIndex(scrollTop: number): number {
		let index = 0;
		let accumulatedHeight = 0;

		while (index < array.length && accumulatedHeight + getItemHeight(index) <= scrollTop) {
			accumulatedHeight += getItemHeight(index);
			index++;
		}

		return index;
	}

	function findEndIndex(scrollTop: number, startIndex: number): number {
		let index = startIndex;
		let accumulatedHeight = 0;

		// Start from the scroll position
		for (let i = 0; i < startIndex; i++) {
			accumulatedHeight += getItemHeight(i);
		}

		// Use a minimum viewport height to ensure we render enough items initially
		const effectiveViewportHeight = Math.max(viewportHeight, 800);

		while (index < array.length && accumulatedHeight <= scrollTop + effectiveViewportHeight) {
			accumulatedHeight += getItemHeight(index);
			index++;
		}

		return index;
	}

	function updateHeights() {
		if (!contentElement) return;
		if (!collection) return;

		rows = Array.from(collection) as HTMLElement[];

		// Update heights for currently rendered items
		rows.forEach((row, i) => {
			const actualIndex = start + i;
			const measuredHeight = rowHeight || row.offsetHeight;

			if (heightMap[actualIndex] !== measuredHeight) {
				heightMap[actualIndex] = measuredHeight;
				if (!rowHeight) {
					updateAverageHeight(measuredHeight);
				}
			}
		});
	}

	function updatePadding() {
		// Calculate top padding (sum of heights above visible area)
		let topPadding = 0;
		for (let i = 0; i < start; i++) {
			topPadding += getItemHeight(i);
		}

		// Calculate bottom padding (estimated heights below visible area)
		let bottomPadding = 0;
		for (let i = end; i < array.length; i++) {
			bottomPadding += getItemHeight(i);
		}

		top = topPadding;
		bottom = bottomPadding;
	}

	async function scrollToItem(index: number) {
		if (!viewportElement || index < 0 || index >= array.length) return;

		let targetScrollTop = 0;
		for (let i = 0; i < index; i++) {
			targetScrollTop += getItemHeight(i);
		}

		viewportElement.scrollTo({
			top: targetScrollTop,
			behavior: 'smooth'
		});
	}

	return {
		viewport: (node: HTMLElement) => {
			viewportElement = node;

			viewportElement.addEventListener('scroll', handleScroll);

			return () => {
				viewportElement?.removeEventListener('scroll', handleScroll);
			};
		},
		table: (node: HTMLElement) => {
			tableElement = node;
		},
		content: (node: HTMLElement) => {
			contentElement = node;
		},
		methods: {
			scrollTo: (index: number) => {
				if (index === undefined) return;

				if (viewportElement && mounted) {
					scrollToItem(index);
				}
			}
		},
		get current() {
			return visibleItems;
		},
		get paddingTop() {
			return top;
		},
		get paddingBottom() {
			return bottom;
		}
	};
}
