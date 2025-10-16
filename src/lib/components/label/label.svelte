<script module lang="ts">
	import type { Snippet } from 'svelte';

	export type LabelProps<
		E extends keyof HTMLElementTagNameMap = 'label',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		for?: string | null;
		children?: Snippet<[]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base">
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { HTMLAttributes } from 'svelte/elements';

	type Element = ElementType<E>;

	const preset = getPreset('label');

	let {
		class: klass = '',
		as = preset?.as ?? 'label',
		base = preset?.base as B,
		for: labelfor = null,
		children,
		...restProps
	}: LabelProps<E, B> & HTMLAttributes<Element> = $props();
</script>

<HtmlAtom class={['font-medium', klass]} for={labelfor} {as} {base} {...restProps}>
	{@render children?.()}
</HtmlAtom>
