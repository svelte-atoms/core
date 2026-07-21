<script lang="ts">
	import { barcodeIR } from 'etiket/ir';
	import { HtmlAtom } from '../atom';
	import IrRenderer from './ir-renderer.svelte';
	import type { BarcodeProps } from './types';

	let {
		class: klass = '',
		value,
		type = 'code128',
		height,
		barWidth,
		barGap,
		color='currentColor',
		background = 'transparent',
		showText,
		text,
		fontSize,
		fontFamily,
		margin,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		textAlign,
		textPosition,
		rotation,
		unit,
		bearerBars,
		bearerBarWidth,
		ariaLabel,
		role,
		title,
		desc,
		msiCheckDigit,
		code39CheckDigit,
		codabarStart,
		codabarStop,
		code128Charset,
		...restProps
	}: BarcodeProps = $props();

	const tree = $derived(
		barcodeIR(value, {
			type,
			...(height !== undefined && { height }),
			...(barWidth !== undefined && { barWidth }),
			...(barGap !== undefined && { barGap }),
			...(color !== undefined && { color }),
			...(background !== undefined && { background }),
			...(showText !== undefined && { showText }),
			...(text !== undefined && { text }),
			...(fontSize !== undefined && { fontSize }),
			...(fontFamily !== undefined && { fontFamily }),
			...(margin !== undefined && { margin }),
			...(marginTop !== undefined && { marginTop }),
			...(marginBottom !== undefined && { marginBottom }),
			...(marginLeft !== undefined && { marginLeft }),
			...(marginRight !== undefined && { marginRight }),
			...(textAlign !== undefined && { textAlign }),
			...(textPosition !== undefined && { textPosition }),
			...(rotation !== undefined && { rotation }),
			...(unit !== undefined && { unit }),
			...(bearerBars !== undefined && { bearerBars }),
			...(bearerBarWidth !== undefined && { bearerBarWidth }),
			...(ariaLabel !== undefined && { ariaLabel }),
			...(role !== undefined && { role }),
			...(title !== undefined && { title }),
			...(desc !== undefined && { desc }),
			...(msiCheckDigit !== undefined && { msiCheckDigit }),
			...(code39CheckDigit !== undefined && { code39CheckDigit }),
			...(codabarStart !== undefined && { codabarStart }),
			...(codabarStop !== undefined && { codabarStop }),
			...(code128Charset !== undefined && { code128Charset })
		})
	);
</script>

<HtmlAtom class={[klass, 'inline-flex']} {...restProps}>
	<IrRenderer {tree} />
</HtmlAtom>
