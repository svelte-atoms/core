<script lang="ts">
	import { qrcodeIR } from 'etiket/ir';
	import { HtmlAtom } from '../atom';
	import IrRenderer from './ir-renderer.svelte';
	import type { EtiketQRCodeProps } from './types';

	let {
		class: klass = '',
		value,
		size,
		margin,
		color = 'currentColor',
		background = 'transparent',
		dotType,
		dotSize,
		shape,
		corners,
		logo,
		unit,
		ariaLabel,
		role,
		title,
		desc,
		ecLevel,
		version,
		mode,
		mask,
		micro,
		structuredAppend,
		...restProps
	}: EtiketQRCodeProps = $props();

	const tree = $derived(
		qrcodeIR(value, {
			...(size !== undefined && { size }),
			...(margin !== undefined && { margin }),
			...(color !== undefined && { color }),
			...(background !== undefined && { background }),
			...(dotType !== undefined && { dotType }),
			...(dotSize !== undefined && { dotSize }),
			...(shape !== undefined && { shape }),
			...(corners !== undefined && { corners }),
			...(logo !== undefined && { logo }),
			...(unit !== undefined && { unit }),
			...(ariaLabel !== undefined && { ariaLabel }),
			...(role !== undefined && { role }),
			...(title !== undefined && { title }),
			...(desc !== undefined && { desc }),
			...(ecLevel !== undefined && { ecLevel }),
			...(version !== undefined && { version }),
			...(mode !== undefined && { mode }),
			...(mask !== undefined && { mask }),
			...(micro !== undefined && { micro }),
			...(structuredAppend !== undefined && { structuredAppend })
		})
	);
</script>

<HtmlAtom class={[klass, 'inline-flex']} {...restProps}>
	<IrRenderer {tree} />
</HtmlAtom>
