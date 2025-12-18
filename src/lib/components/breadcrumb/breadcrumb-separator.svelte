<script lang="ts" generics="B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	let { class: klass = '', as = 'span', children = undefined, ...restProps } = $props();
</script>

<HtmlAtom
	{as}
	preset="breadcrumb.separator"
	class={['text-stroke-0/50 border-border px-0', '$preset', klass]}
	data-kind="breadcrumb-separator"
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		/
	{/if}
</HtmlAtom>
