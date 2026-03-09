<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { Dialog } from '$svelte-atoms/core/components/dialog';
	import { CommandPaletteBond } from './bond.svelte.ts';
	import type { CommandPaletteInputProps } from './types';

	const bond = CommandPaletteBond.get();

	let {
		class: klass = '',
		preset = 'command-palette.input',
		...restProps
	}: CommandPaletteInputProps & HTMLAttributes<HTMLDivElement> = $props();

	function onKeyDown(ev: KeyboardEvent) {
		if (ev.key === 'ArrowDown') { ev.preventDefault(); bond?.state.moveDown(); }
		else if (ev.key === 'ArrowUp') { ev.preventDefault(); bond?.state.moveUp(); }
		else if (ev.key === 'Enter')   { ev.preventDefault(); bond?.state.selectActive(); }
	}
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['command-palette-input border-border flex items-center gap-2 border-b px-3', '$preset', klass]}
	{...restProps}
>
	<!-- Search icon -->
	<svg viewBox="0 0 24 24" class="text-muted-foreground h-4 w-4 shrink-0" fill="none" aria-hidden="true">
		<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/>
		<path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
	</svg>

	<input
		type="text"
		value={bond?.state.query ?? ''}
		placeholder={bond?.state.placeholder}
		oninput={(ev) => { if (bond) bond.state.query = (ev.target as HTMLInputElement).value; }}
		onkeydown={onKeyDown}
		class="text-foreground placeholder:text-muted-foreground w-full bg-transparent py-3 text-sm outline-none"
		aria-label="Search commands"
		aria-autocomplete="list"
		autocomplete="off"
		spellcheck={false}
	/>
</HtmlAtom>
