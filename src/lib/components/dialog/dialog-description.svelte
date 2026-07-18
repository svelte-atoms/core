<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import type { DialogDescriptionProps } from './types';
	import { DialogBond } from './bond.svelte';

	let {
		preset = undefined,
		as = 'p' as E,
		children = undefined,
		...restProps
	}: DialogDescriptionProps<E, B> = $props();

	const part = usePart(DialogBond, 'description', () => restProps, {
		message: '<Dialog.Description /> must be used within a <Dialog.Root />',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom {as} {bond} {...part.props}>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
