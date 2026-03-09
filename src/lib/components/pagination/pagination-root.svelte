<script lang="ts">
	import { setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { PaginationRootProps, PaginationContext } from './types';

	export const PAGINATION_CTX = '@svelte-atoms/pagination';

	let {
		class: klass = '',
		page = $bindable(1),
		total = 1,
		siblings = 1,
		preset = 'pagination',
		onchange = undefined,
		children = undefined,
		...restProps
	}: PaginationRootProps & HTMLAttributes<HTMLElement> = $props();

	// Build the pages array with ellipsis markers
	const pages = $derived.by<(number | 'ellipsis')[]>(() => {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

		const left = Math.max(2, page - siblings);
		const right = Math.min(total - 1, page + siblings);
		const result: (number | 'ellipsis')[] = [1];

		if (left > 2) result.push('ellipsis');
		for (let i = left; i <= right; i++) result.push(i);
		if (right < total - 1) result.push('ellipsis');
		result.push(total);

		return result;
	});

	const isFirst = $derived(page <= 1);
	const isLast = $derived(page >= total);

	function goto(p: number) {
		if (p < 1 || p > total || p === page) return;
		page = p;
		onchange?.(page);
	}

	function prev() { goto(page - 1); }
	function next() { goto(page + 1); }

	const ctx: PaginationContext = {
		get page() { return page; },
		get total() { return total; },
		get pages() { return pages; },
		get isFirst() { return isFirst; },
		get isLast() { return isLast; },
		prev,
		next,
		goto
	};

	setContext(PAGINATION_CTX, ctx);
</script>

<HtmlAtom
	{preset}
	as="nav"
	aria-label="Pagination"
	class={['pagination-root flex items-center gap-1', '$preset', klass]}
	{...restProps}
>
	{@render children?.(ctx)}
</HtmlAtom>
