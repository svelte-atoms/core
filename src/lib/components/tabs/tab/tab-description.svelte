<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import type { TabDescriptionProps } from '../types';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { TabBond } from './bond.svelte';

	let {
		preset = undefined,
		as = 'p' as E,
		children,
		...restProps
	}: TabDescriptionProps<E, B> = $props();

	const part = usePart(TabBond, 'description', () => restProps, {
		message: 'TabDescription must be used within a Tab component.',
		preset: () => preset
	});
</script>

<HtmlAtom bond={part.bond} {as} {...part.props}>
	{@render children?.({ tab: part.bond })}
</HtmlAtom>
