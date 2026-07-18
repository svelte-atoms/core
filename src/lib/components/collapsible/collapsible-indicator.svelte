<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { animate as runAnimation } from '$ixirjs/ui/shared';
	import { Icon } from '$ixirjs/ui/components/icon';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import IconArrowDown from '$ixirjs/ui/icons/icon-arrow-down.svelte';
	import { CollapsibleBond } from './bond.svelte';
	import type { CollapsibleIndicatorProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		animate = defaultAnimate,
		children = undefined,
		...restProps
	}: CollapsibleIndicatorProps<E, B> = $props();
	const part = usePart(CollapsibleBond, 'indicator', () => restProps, {
		message: '<Collapsible.Indicator /> must be used within a <Collapsible.Root />',
		preset: () => preset
	});
	const isOpen = $derived(part.bond.isOpen);

	function defaultAnimate(node: HTMLElement) {
		runAnimation(node, { rotate: 180 * +isOpen }, { duration: 0.3, ease: 'anticipate' });
	}
</script>

<HtmlAtom
	bond={part.bond}
	{animate}
	class={['border-border flex size-4 items-center justify-center', '$preset', klass]}
	{...part.props}
>
	{#if children}
		{@render children?.({ collapsible: part.bond })}
	{:else}
		<Icon src={IconArrowDown} />
	{/if}
</HtmlAtom>
