<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { StepBond } from './bond.svelte';
	import type { StepTitleProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: StepTitleProps<E, B> = $props();

	const part = usePart(StepBond, 'title', () => restProps, {
		message: 'StepTitle must be used within a Step component.',
		preset: () => preset
	});
</script>

<HtmlAtom
	as="div"
	bond={part.bond}
	class={['font-medium text-sm', '$preset', klass]}
	{...part.props}
>
	{@render children?.({ step: part.bond })}
</HtmlAtom>
