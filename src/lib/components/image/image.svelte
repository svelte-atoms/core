<script lang="ts">
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom } from '../atom';

	let {
		class: klass = '',
		src = undefined,
		alt = undefined,
		children = undefined,
		...restProps
	} = $props();

	let hasError = $state(false);
</script>

<HtmlAtom
	preset="image"
	as="div"
	class={[
		'flex items-center justify-center overflow-hidden rounded-lg',
		hasError && 'bg-foreground/5',
		'$preset',
		toClassValue(klass, { error: hasError })
	]}
	{...restProps}
>
	<img
		class={[hasError && 'hidden size-full object-cover']}
		{src}
		{alt}
		onerror={(ev) => {
			hasError = true;
		}}
	/>

	{#if hasError}
		{@render children?.()}
	{/if}
</HtmlAtom>
