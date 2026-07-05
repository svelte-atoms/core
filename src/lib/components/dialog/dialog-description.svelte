<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import type { DialogDescriptionProps } from './types';
	import { DialogBond, DialogDescriptionAtom } from './bond.svelte';

	let {
		preset = undefined,
		as = 'p' as E,
		children = undefined,
		...restProps
	}: DialogDescriptionProps<E, B> = $props();

	const bond = DialogBond.getOrThrow(
		'<Dialog.Description /> must be used within a <Dialog.Root />'
	);

	const atom = createAtomInstance<DialogDescriptionAtom, DialogBond, HTMLElement>('description', {
		bond,
		factory: (owner) => new DialogDescriptionAtom(owner as DialogBond)
	});

	const descriptionProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom {as} {bond} {...descriptionProps}>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
