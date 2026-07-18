<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { TreeBond } from './bond.svelte';
	import type { TreeHeaderProps } from './types';

	type Element = HTMLElementTagNameMap[E];

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		onpointerdown = undefined,
		onkeydown = undefined,
		...restProps
	}: TreeHeaderProps<E, B> & HTMLAttributes<Element> = $props();

	const part = usePart(TreeBond, 'header', () => restProps, {
		message: '<Tree.Header /> must be used within a <Tree.Root />',
		preset: () => preset
	});

	function handlePointerDown(event: PointerEvent & { currentTarget: EventTarget & Element }) {
		onpointerdown?.(event);
		if (event.defaultPrevented) return;
		part.bond.stageOpenChange({ event, reason: 'trigger' });
		(part.props.onpointerdown as ((event: PointerEvent) => void) | undefined)?.(event);
	}

	function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & Element }) {
		onkeydown?.(event);
		if (event.defaultPrevented) return;
		if (event.key === 'Enter' || event.key === ' ') {
			part.bond.stageOpenChange({ event, reason: 'trigger' });
		}
		(part.props.onkeydown as ((event: KeyboardEvent) => void) | undefined)?.(event);
	}
</script>

<HtmlAtom
	bond={part.bond}
	class={['cursor-pointer', '$preset', klass]}
	{...part.props}
	onpointerdown={handlePointerDown}
	onkeydown={handleKeydown}
>
	{@render children?.({ tree: part.bond })}
</HtmlAtom>
