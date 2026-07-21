<script lang="ts">
	import { datamatrixIR, gs1datamatrixIR } from 'etiket/ir';
	import { HtmlAtom } from '../atom';
	import IrRenderer from './ir-renderer.svelte';
	import type { DataMatrixProps } from './types';

	let {
		class: klass = '',
		value,
		gs1 = false,
		size,
		color = 'currentColor',
		background = 'transparent',
		margin,
		ariaLabel,
		role,
		title,
		desc,
		...restProps
	}: DataMatrixProps = $props();

	const opts = $derived({
		...(size !== undefined && { size }),
		...(color !== undefined && { color }),
		...(background !== undefined && { background }),
		...(margin !== undefined && { margin }),
		...(ariaLabel !== undefined && { ariaLabel }),
		...(role !== undefined && { role }),
		...(title !== undefined && { title }),
		...(desc !== undefined && { desc })
	});

	const tree = $derived(gs1 ? gs1datamatrixIR(value, opts) : datamatrixIR(value, opts));
</script>

<HtmlAtom class={[klass, 'inline-flex']} {...restProps}>
	<IrRenderer {tree} />
</HtmlAtom>
