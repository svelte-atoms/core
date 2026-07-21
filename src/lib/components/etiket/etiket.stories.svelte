<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { BarcodeType, DotType, ErrorCorrectionLevel } from 'etiket';
	import { EtiketBarcode, EtiketQRCode, EtiketDataMatrix, EtiketPDF417, EtiketAztec } from '.';

	const { Story } = defineMeta({
		title: 'ATOMS/Etiket'
	});

	const barcodeTypes: { type: BarcodeType; label: string; value: string }[] = [
		{ type: 'code128', label: 'Code 128', value: 'Hello World' },
		{ type: 'code39',  label: 'Code 39',  value: 'HELLO' },
		{ type: 'ean13',   label: 'EAN-13',   value: '5901234123457' },
		{ type: 'ean8',    label: 'EAN-8',    value: '96385074' },
		{ type: 'upca',    label: 'UPC-A',    value: '042100005264' },
		{ type: 'itf14',   label: 'ITF-14',   value: '12345678901231' },
		{ type: 'codabar', label: 'Codabar',  value: 'A12345B' },
		{ type: 'msi',     label: 'MSI',      value: '12345' },
	];

	const dotTypes: DotType[] = [
		'square', 'rounded', 'dots', 'diamond',
		'classy', 'classy-rounded', 'extra-rounded',
		'vertical-line', 'horizontal-line', 'small-square', 'tiny-square',
	];

	const ecLevels: { ecLevel: ErrorCorrectionLevel; label: string }[] = [
		{ ecLevel: 'L', label: 'L — 7%' },
		{ ecLevel: 'M', label: 'M — 15%' },
		{ ecLevel: 'Q', label: 'Q — 25%' },
		{ ecLevel: 'H', label: 'H — 30%' },
	];
</script>

<!-- ─── Barcode ───────────────────────────────────────────────────────────── -->
<Story name="Barcode / Code128">
	<EtiketBarcode class="p-1 bg-card rounded-md" value="Hello World 123" type="code128" />
</Story>

<Story name="Barcode / Types">
	<div class="flex flex-col gap-6 p-4">
		{#each barcodeTypes as item (item.label)}
			<div class="flex flex-col gap-1">
				<span class="text-muted-foreground text-xs font-medium">{item.label}</span>
				<EtiketBarcode class="p-1 bg-card rounded-md" value={item.value} type={item.type} />
			</div>
		{/each}
	</div>
</Story>

<Story name="Barcode / Styled">
	<div class="flex flex-col gap-6 p-4">
		<div class="flex flex-col gap-1">
			<span class="text-muted-foreground text-xs font-medium">Custom colors</span>
			<EtiketBarcode class="p-1 rounded-md" value="COLOR-DEMO" color="#6d28d9" background="#ede9fe" height={60} />
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-muted-foreground text-xs font-medium">No text</span>
			<EtiketBarcode class="p-1 bg-card rounded-md" value="NO-TEXT-123" showText={false} height={60} />
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-muted-foreground text-xs font-medium">Text on top</span>
			<EtiketBarcode class="p-1 bg-card rounded-md" value="TOP-TEXT" textPosition="top" height={60} />
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-muted-foreground text-xs font-medium">Bearer bars</span>
			<EtiketBarcode class="p-1 bg-card rounded-md" value="BEARER" bearerBars={true} height={60} />
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-muted-foreground text-xs font-medium">Rotated 90°</span>
			<EtiketBarcode class="p-1 bg-card rounded-md" value="ROTATED" rotation={90} height={60} />
		</div>
	</div>
</Story>

<!-- ─── QR Code ───────────────────────────────────────────────────────────── -->
<Story name="QR Code / Default">
	<EtiketQRCode class="p-2 bg-card rounded-md" value="https://svelte-atoms.dev" size={200} />
</Story>

<Story name="QR Code / Dot Styles">
	<div class="flex flex-wrap gap-6 p-4">
		{#each dotTypes as dotType (dotType)}
			<div class="flex flex-col items-center gap-2">
				<EtiketQRCode class="p-2 bg-card rounded-md" value="https://svelte-atoms.dev" size={120} {dotType} />
				<span class="text-muted-foreground text-xs">{dotType}</span>
			</div>
		{/each}
	</div>
</Story>

<Story name="QR Code / Colors & Gradients">
	<div class="flex flex-wrap gap-6 p-4">
		<div class="flex flex-col items-center gap-2">
			<EtiketQRCode class="p-2 rounded-md" value="https://svelte-atoms.dev" size={160} color="#6d28d9" background="#ede9fe" dotType="dots" />
			<span class="text-muted-foreground text-xs">Solid color</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<EtiketQRCode
				class="p-2 rounded-md"
				value="https://svelte-atoms.dev"
				size={160}
				dotType="dots"
				color={{ type: 'linear', rotation: 45, stops: [{ offset: 0, color: '#6d28d9' }, { offset: 1, color: '#db2777' }] }}
			/>
			<span class="text-muted-foreground text-xs">Linear gradient</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<EtiketQRCode
				class="p-2 rounded-md"
				value="https://svelte-atoms.dev"
				size={160}
				dotType="dots"
				color={{ type: 'radial', stops: [{ offset: 0, color: '#f59e0b' }, { offset: 1, color: '#ef4444' }] }}
			/>
			<span class="text-muted-foreground text-xs">Radial gradient</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<EtiketQRCode class="p-2 rounded-md" value="https://svelte-atoms.dev" size={160} shape="circle" dotType="dots" color="#0ea5e9" />
			<span class="text-muted-foreground text-xs">Circle shape</span>
		</div>
	</div>
</Story>

<Story name="QR Code / Error Correction">
	<div class="flex flex-wrap gap-6 p-4">
		{#each ecLevels as item (item.ecLevel)}
			<div class="flex flex-col items-center gap-2">
				<EtiketQRCode class="p-2 bg-card rounded-md" value="https://svelte-atoms.dev" size={140} ecLevel={item.ecLevel} />
				<span class="text-muted-foreground text-xs">{item.label}</span>
			</div>
		{/each}
	</div>
</Story>

<!-- ─── Data Matrix ────────────────────────────────────────────────────────── -->
<Story name="Data Matrix / Default">
	<EtiketDataMatrix class="p-2 bg-card rounded-md" value="Hello Data Matrix" size={160} />
</Story>

<Story name="Data Matrix / Variants">
	<div class="flex flex-wrap gap-8 p-4">
		<div class="flex flex-col items-center gap-2">
			<EtiketDataMatrix class="p-2 bg-card rounded-md" value="Standard DataMatrix" size={160} />
			<span class="text-muted-foreground text-xs">Standard</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<EtiketDataMatrix class="p-2 bg-card rounded-md" value="(01)01234567890128(10)LOT456" gs1={true} size={160} />
			<span class="text-muted-foreground text-xs">GS1 DataMatrix</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<EtiketDataMatrix class="p-2 rounded-md" value="Styled DM" size={160} color="#0f766e" background="#ccfbf1" />
			<span class="text-muted-foreground text-xs">Custom colors</span>
		</div>
	</div>
</Story>

<!-- ─── PDF417 ────────────────────────────────────────────────────────────── -->
<Story name="PDF417 / Default">
	<EtiketPDF417 class="p-1 bg-card rounded-md" value="PDF417 barcode content — supports long text strings" size={300} />
</Story>

<Story name="PDF417 / Variants">
	<div class="flex flex-col gap-6 p-4">
		<div class="flex flex-col gap-1">
			<span class="text-muted-foreground text-xs font-medium">Standard</span>
			<EtiketPDF417 class="p-1 bg-card rounded-md" value="Standard PDF417" size={300} />
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-muted-foreground text-xs font-medium">Compact</span>
			<EtiketPDF417 class="p-1 bg-card rounded-md" value="Compact PDF417" size={300} compact={true} />
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-muted-foreground text-xs font-medium">Custom columns (4)</span>
			<EtiketPDF417 class="p-1 bg-card rounded-md" value="PDF417 with 4 columns set explicitly" size={300} columns={4} />
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-muted-foreground text-xs font-medium">Custom colors</span>
			<EtiketPDF417 class="p-1 rounded-md" value="Styled PDF417" size={300} color="#1d4ed8" background="#dbeafe" />
		</div>
	</div>
</Story>

<!-- ─── Aztec ──────────────────────────────────────────────────────────────── -->
<Story name="Aztec / Default">
	<EtiketAztec class="p-2 bg-card rounded-md" value="Aztec code content" size={160} />
</Story>

<Story name="Aztec / Variants">
	<div class="flex flex-wrap gap-8 p-4">
		<div class="flex flex-col items-center gap-2">
			<EtiketAztec class="p-2 bg-card rounded-md" value="Standard Aztec" size={160} />
			<span class="text-muted-foreground text-xs">Standard</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<EtiketAztec class="p-2 bg-card rounded-md" value="Compact Aztec" size={160} compact={true} />
			<span class="text-muted-foreground text-xs">Compact</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<EtiketAztec class="p-2 bg-card rounded-md" value="High EC" size={160} ecPercent={50} />
			<span class="text-muted-foreground text-xs">EC 50%</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<EtiketAztec class="p-2 rounded-md" value="Styled Aztec" size={160} color="#be185d" background="#fce7f3" />
			<span class="text-muted-foreground text-xs">Custom colors</span>
		</div>
	</div>
</Story>
