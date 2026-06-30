<script lang="ts">
	import {
		resolveControlPreset,
		writeInputValue
	} from '$svelte-atoms/core/components/input/shared';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import { InputBond } from '$svelte-atoms/core/components/input/bond.svelte';
	import {
		buildPhoneMasked,
		deletePhoneDigitsFromCursor,
		nextPhoneCursorPos,
		parsePhoneFormat,
		phoneDigitSlotKinds,
		phoneMaskMaxDigits,
		phoneOverlaySpans
	} from '$svelte-atoms/core/components/input/phone-mask';
	import type {
		InputPhoneControlProps,
		PhoneSpan as Span
	} from '$svelte-atoms/core/components/input/types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		format = undefined,
		segments: segmentMap = undefined,
		placeholder = '+_ (___) ___-____',
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.phone',
		onchange = undefined,
		oninput = undefined,
		span: spanSnippet = undefined,
		...restProps
	}: InputPhoneControlProps = $props();

	const preset = resolveControlPreset(() => presetKey, bond);

	let inputEl = $state<HTMLInputElement>();
	let scrollLeft = $state(0);
	let isFocused = $state(false);

	const tokens = $derived(format ? parsePhoneFormat(format) : []);
	const maxDigits = $derived(phoneMaskMaxDigits(tokens));

	function buildMasked(digits: string, empty = '_'): string {
		return buildPhoneMasked(tokens, digits, empty);
	}

	const digitSlotKind = $derived.by<string[]>(() => {
		return phoneDigitSlotKinds(tokens, segmentMap);
	});

	const overlaySpans = $derived.by<Span[]>(() => {
		if (!format) return [];
		return phoneOverlaySpans({ tokens, value, digitSlotKind, segments: segmentMap });
	});

	// Sync external value → display + caret
	$effect(() => {
		if (!format || !inputEl) return;
		const masked = value || isFocused ? buildMasked(value) : '';
		if (inputEl.value !== masked) inputEl.value = masked;
		// re-place caret via rAF to beat the browser's own placement
		if (isFocused) {
			const pos = nextPhoneCursorPos(tokens, value);
			requestAnimationFrame(() => inputEl?.setSelectionRange(pos, pos));
		}
	});

	// Input handler
	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;

		if (!format) {
			value = input.value;
			writeInputValue(bond, value);
			oninput?.(ev, { value });
			return;
		}

		const digits = input.value.replace(/\D/g, '').slice(0, maxDigits);
		input.value = buildMasked(digits);
		scrollLeft = input.scrollLeft;
		value = digits;
		writeInputValue(bond, value);
		oninput?.(ev, { value });
	}

	function handleKeydown(ev: KeyboardEvent) {
		if (!format) return;
		if (ev.key === 'Backspace') {
			ev.preventDefault();
			if (!value) return;
			const next = value.slice(0, -1);
			if (inputEl) inputEl.value = next ? buildMasked(next) : buildMasked('');
			value = next;
			writeInputValue(bond, value);
			oninput?.(undefined as unknown as Event, { value });
		} else if (ev.key === 'Delete') {
			ev.preventDefault();
			// clear forward from the digit slot at/after the cursor
			if (!value || !inputEl) return;
			const pos = inputEl.selectionStart ?? 0;
			const next = deletePhoneDigitsFromCursor(tokens, value, pos);
			if (next === value) return;
			if (inputEl) inputEl.value = next ? buildMasked(next) : buildMasked('');
			value = next;
			writeInputValue(bond, value);
			oninput?.(undefined as unknown as Event, { value });
		} else if (ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey && !/\d/.test(ev.key)) {
			// block non-digit printable keys: no input event, caret stays put
			ev.preventDefault();
		}
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}

	// Paste handler
	function handlePaste(ev: ClipboardEvent) {
		ev.preventDefault();
		const pasted = ev.clipboardData?.getData('text') ?? '';

		if (!format) {
			// free mode: insert at caret
			const input = ev.currentTarget as HTMLInputElement;
			const start = input.selectionStart ?? value.length;
			const end = input.selectionEnd ?? value.length;
			value = value.slice(0, start) + pasted + value.slice(end);
			writeInputValue(bond, value);
			oninput?.(ev, { value });
			onchange?.(ev, { value });
			return;
		}

		// mask mode: keep digits only, clamp to maxDigits
		const digits = pasted.replace(/\D/g, '').slice(0, maxDigits);
		if (!digits) return;
		value = digits;
		if (inputEl) inputEl.value = buildMasked(digits);
		writeInputValue(bond, value);
		oninput?.(ev, { value });
		onchange?.(ev, { value });
	}

	function handleFocus() {
		if (!format || !inputEl) return;
		isFocused = true;
		if (!value) inputEl.value = buildMasked('');
		// $effect places the caret via rAF
	}

	function handleBlur() {
		if (!format || !inputEl) return;
		isFocused = false;
		if (!value) inputEl.value = '';
	}

	function syncScroll() {
		scrollLeft = inputEl?.scrollLeft ?? 0;
	}
</script>

{#snippet defaultSpan(span: Span, _index: number)}
	<span style={span.style}>{span.text}</span>
{/snippet}

{#if format}
	<span class="relative flex h-full w-full flex-1 items-center overflow-hidden">
		<!-- coloured overlay (mirrors the input, no caret) -->
		<span
			aria-hidden="true"
			class={cn(
				'pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre px-2 font-mono text-sm',
				preset?.class,
				toClassValue(klass, bond)
			)}
		>
			<span style="transform: translateX(-{scrollLeft}px)">
				{#each overlaySpans as span, i (span)}
					{@render (spanSnippet ?? defaultSpan)(span, i)}
				{/each}
			</span>
		</span>

		<!-- real input: transparent text, visible caret -->
		<input
			bind:this={inputEl}
			type="text"
			inputmode="tel"
			{disabled}
			{readonly}
			class={cn(
				'relative h-full w-full flex-1 bg-transparent px-2 font-mono text-sm text-transparent caret-foreground outline-none',
				'placeholder:text-transparent',
				disabled && 'cursor-not-allowed opacity-50',
				preset?.class,
				toClassValue(klass, bond)
			)}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onchange={handleChange}
			onpaste={handlePaste}
			onscroll={syncScroll}
			onfocus={handleFocus}
			onblur={handleBlur}
			{...restProps}
		/>
	</span>
{:else}
	<!-- Free mode: plain input -->
	<input
		bind:this={inputEl}
		type="text"
		inputmode="tel"
		bind:value
		{placeholder}
		{disabled}
		{readonly}
		class={cn(
			'h-full w-full flex-1 bg-transparent px-2 font-mono text-sm outline-none',
			'text-foreground placeholder:text-muted-foreground',
			disabled && 'cursor-not-allowed opacity-50',
			preset?.class,
			toClassValue(klass, bond)
		)}
		oninput={handleInput}
		onchange={handleChange}
		onpaste={handlePaste}
		{...restProps}
	/>
{/if}
