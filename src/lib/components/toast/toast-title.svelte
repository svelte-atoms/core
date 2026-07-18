<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { ToastBond } from './bond.svelte';
	import type { ToastTitleProps } from './types';
	import { usePart } from '$ixirjs/ui/shared';

	let {
		as = 'p' as E,
		preset = undefined,
		children = undefined,
		...restProps
	}: ToastTitleProps<E, B> = $props();

	const part = usePart(ToastBond, 'title', () => restProps, {
		message: '<Toast.Title /> must be used within a <Toast.Root />',
		preset: () => preset
	});
</script>

<HtmlAtom {as} bond={part.bond} {...part.props}>
	{@render children?.({ toast: part.bond })}
</HtmlAtom>
