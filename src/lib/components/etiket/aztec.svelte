<script lang="ts">
	import { aztecIR } from 'etiket/ir';
	import { HtmlAtom } from '../atom';
	import IrRenderer from './ir-renderer.svelte';
	import type { AztecProps } from './types';

	let {
		class: klass = '',
		value,
		ecPercent,
		layers,
		compact,
		size,
		color='currentColor',
		background = 'transparent',
		margin,
		ariaLabel,
		role,
		title,
		desc,
		...restProps
	}: AztecProps = $props();

	const tree = $derived(
		aztecIR(value, {
			...(ecPercent !== undefined && { ecPercent }),
			...(layers !== undefined && { layers }),
			...(compact !== undefined && { compact }),
			...(size !== undefined && { size }),
			...(color !== undefined && { color }),
			...(background !== undefined && { background }),
			...(margin !== undefined && { margin }),
			...(ariaLabel !== undefined && { ariaLabel }),
			...(role !== undefined && { role }),
			...(title !== undefined && { title }),
			...(desc !== undefined && { desc })
		})
	);
</script>

<HtmlAtom class={[klass, 'inline-flex']} {...restProps}>
	<IrRenderer {tree} />
</HtmlAtom>
