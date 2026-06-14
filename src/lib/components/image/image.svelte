<script lang="ts">
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom } from '../atom';

	let {
		class: klass = '',
		src = undefined,
		alt = undefined,
		children = undefined,
		preset = undefined,
		...restProps
	} = $props();

	let hasError = $state(false);

	const imageProps = $derived({ preset: preset ?? 'image', ...restProps });
</script>

<HtmlAtom
	as="div"
	class={[
		'flex items-center justify-center overflow-hidden rounded-lg',
		hasError && 'bg-foreground/5',
		'$preset',
		toClassValue(klass, { error: hasError })
	]}
	{...imageProps}
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
