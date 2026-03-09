<script lang="ts">
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableRootProps } from './types';

	let { class: klass = '', preset = 'table', children, ...restProps }: TableRootProps & HTMLTableAttributes = $props();
</script>

<div class="table-root w-full overflow-x-auto">
	<HtmlAtom {preset} as="table" class={['table-root w-full caption-bottom text-sm', '$preset', klass]} {...restProps}>
		{@render children?.()}
	</HtmlAtom>
</div>
