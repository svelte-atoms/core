<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond, isValidHex } from './bond.svelte.ts';
	import type { ColorPickerHexInputProps } from './types';

	const bond = ColorPickerBond.get();

	let {
		class: klass = '',
		preset = 'color-picker.hex',
		...restProps
	}: ColorPickerHexInputProps & HTMLAttributes<HTMLDivElement> = $props();

	let draft = $state(bond?.state.value ?? '#000000');

	$effect(() => { draft = bond?.state.value ?? '#000000'; });

	function commit() {
		const full = draft.startsWith('#') ? draft : `#${draft}`;
		if (isValidHex(full)) bond?.state.setHex(full);
		else draft = bond?.state.value ?? '#000000';
	}
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['color-picker-hex flex items-center gap-2', '$preset', klass]}
	{...restProps}
>
	<!-- Native color wheel (invisible over swatch) -->
	<label class="relative h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-md border">
		<input
			type="color"
			value={bond?.state.value}
			oninput={(ev) => bond?.state.setHex((ev.target as HTMLInputElement).value)}
			class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
			aria-label="Pick color with color wheel"
		/>
		<span class="block h-full w-full rounded-md" style="background-color: {bond?.state.value}"></span>
	</label>

	<!-- Hex text field -->
	<div class="border-border bg-input flex flex-1 items-center gap-1 rounded-md border px-2 py-1">
		<span class="text-muted-foreground text-xs">#</span>
		<input
			type="text"
			value={draft.replace('#', '')}
			oninput={(ev) => { draft = '#' + (ev.target as HTMLInputElement).value.replace('#', ''); }}
			onblur={commit}
			onkeydown={(ev) => { if (ev.key === 'Enter') commit(); }}
			maxlength={6}
			spellcheck={false}
			class="text-foreground w-full bg-transparent font-mono text-xs outline-none"
			aria-label="Hex color value"
		/>
	</div>
</HtmlAtom>
