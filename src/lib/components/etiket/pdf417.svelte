<script lang="ts">
	import { pdf417IR } from 'etiket/ir';
	import { HtmlAtom } from '../atom';
	import IrRenderer from './ir-renderer.svelte';
	import type { PDF417Props } from './types';

	let {
		class: klass = '',
		value,
		ecLevel,
		columns,
		compact,
		size,
		color = 'currentColor',
		background = 'transparent',
		margin,
		ariaLabel,
		role,
		title,
		desc,
		...restProps
	}: PDF417Props = $props();

	const tree = $derived(
		pdf417IR(value, {
			...(ecLevel !== undefined && { ecLevel }),
			...(columns !== undefined && { columns }),
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
