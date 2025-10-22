<script module lang="ts">
	export type IconProps<
		Src extends Component = Component,
		E extends HtmlElementTagName = 'div',
		B extends Base = Base
	> = {
		class?: string;
		src?: Src;
		children?: Snippet;
	} & HtmlAtomProps<E, B>;
</script>

<script
	lang="ts"
	generics="Src extends Component = Component, E extends HtmlElementTagName = 'div', B extends Base = Base"
>
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName, HtmlElementType } from '$svelte-atoms/core/components/element';

	type Element = HtmlElementType<'div'>;

	let {
		class: klass = '',
		src = undefined,
		preset = 'icon',
		children = undefined,
		...restProps
	}: IconProps<Src, E, B> & HTMLAttributes<Element> = $props();
</script>

<HtmlAtom
	{preset}
	class={[
		'icon inline-flex aspect-square h-6 items-center justify-center leading-none text-current',
		'$preset',
		klass
	]}
	{...restProps}
>
	{#if src}
		{@const Src = src}
		<Src />
	{:else}
		{@render children?.()}
	{/if}
</HtmlAtom>

<style>
	:global(.icon > *) {
		width: 100%;
		height: 100%;
	}
</style>
