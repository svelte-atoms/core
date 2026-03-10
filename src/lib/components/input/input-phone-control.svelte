<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { untrack } from 'svelte';
	import { InputBond } from './bond.svelte';
	import type { InputPhoneControlProps } from './types';

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

	const preset = getPreset(untrack(() => presetKey) as PresetModuleName)?.apply(bond, [bond]);

	let inputEl = $state<HTMLInputElement>();
	let scrollLeft = $state(0);

	// ── Format token parser ────────────────────────────────────────────────
	// Tokens:
	//   { type: 'digit', optional: false }  →  # (required)
	//   { type: 'digit', optional: true }   →  [#] (optional)
	//   { type: 'lit', char, optional }     →  literal char, may belong to optional group
	//
	// Optional group: [#] tokens and the literals between them form a group.
	// A group's literals are shown only if at least one digit in the group is filled.
	// Literals outside any [#] group are always shown.

	type Token =
		| { type: 'digit'; optional: boolean; slotIndex: number }
		| { type: 'lit'; char: string; optional: boolean };

	function parseFormat(fmt: string): Token[] {
		const tokens: Token[] = [];
		let i = 0;
		let slotIndex = 0;
		// First pass: lex tokens
		while (i < fmt.length) {
			if (fmt[i] === '[' && fmt[i + 1] === '#' && fmt[i + 2] === ']') {
				tokens.push({ type: 'digit', optional: true, slotIndex: slotIndex++ });
				i += 3;
			} else if (fmt[i] === '#') {
				tokens.push({ type: 'digit', optional: false, slotIndex: slotIndex++ });
				i++;
			} else {
				tokens.push({ type: 'lit', char: fmt[i]!, optional: false });
				i++;
			}
		}

		// Second pass: mark literals as optional if they sit between optional digit slots
		// Rule: a literal is optional if the nearest digit token on both sides is optional.
		// We scan left and right from each literal to find its bounding digit tokens.
		for (let j = 0; j < tokens.length; j++) {
			const t = tokens[j]!;
			if (t.type !== 'lit') continue;
			let leftOpt = false;
			for (let k = j - 1; k >= 0; k--) {
				const tk = tokens[k]!;
				if (tk.type === 'digit') { leftOpt = tk.optional; break; }
			}
			let rightOpt = false;
			for (let k = j + 1; k < tokens.length; k++) {
				const tk = tokens[k]!;
				if (tk.type === 'digit') { rightOpt = tk.optional; break; }
			}
			t.optional = leftOpt && rightOpt;
		}

		return tokens;
	}

	const tokens = $derived(format ? parseFormat(format) : []);
	const maxDigits = $derived(tokens.filter(t => t.type === 'digit').length);

	// ── Build masked string from digits + tokens ───────────────────────────
	// empty: what to show for an unfilled required slot ('_' for display, '' for measuring)
	function buildMasked(digits: string, empty = '_'): string {
		let out = '';
		for (const t of tokens) {
			if (t.type === 'digit') {
				const ch = digits[t.slotIndex];
				if (ch !== undefined) {
					out += ch;
				} else if (!t.optional) {
					out += empty;
				}
				// optional + unfilled = emit nothing
			} else {
				// Literal — show only if not optional, or if optional and at least
				// one adjacent optional digit slot is filled
				if (!t.optional) {
					out += t.char;
				} else {
					// Show if surrounding optional slots have any filled digits
					const adjacentFilled = tokens.some(
						tok => tok.type === 'digit' && tok.optional && digits[tok.slotIndex] !== undefined
					);
					if (adjacentFilled) out += t.char;
				}
			}
		}
		return out;
	}

	// Position in the masked string of the next empty slot for `filledCount` digits
	function nextCursorPos(digits: string): number {
		let pos = 0;
		for (const t of tokens) {
			if (t.type === 'digit') {
				const filled = digits[t.slotIndex] !== undefined;
				if (!filled && !t.optional) return pos; // next required empty slot
				if (!filled && t.optional) return pos;  // next optional empty slot
				pos++; // filled digit occupies one char
			} else {
				// Literal: only counts if it will be rendered
				const willRender = !t.optional || tokens.some(
					tok => tok.type === 'digit' && tok.optional && digits[tok.slotIndex] !== undefined
				);
				if (willRender) pos++;
			}
		}
		return pos; // all filled
	}

	// ── Segment color map ─────────────────────────────────────────────────
	const segmentColors: Record<string, string> = {
		country: 'text-blue-500 dark:text-blue-400',
		area:    'text-foreground font-medium',
		prefix:  'text-foreground/80',
		line:    'text-foreground',
		other:   'text-foreground',
	};

	const digitSlotKind = $derived.by<string[]>(() => {
		const kinds: string[] = [];
		if (segmentMap) {
			for (const [kind, count] of Object.entries(segmentMap)) {
				for (let i = 0; i < (count as number); i++) kinds.push(kind);
			}
		}
		while (kinds.length < maxDigits) kinds.push('other');
		return kinds;
	});

	// ── Overlay spans ─────────────────────────────────────────────────────
	type SpanType = 'country' | 'area' | 'prefix' | 'line' | 'other' | 'lit' | 'empty';
	type Span = { text: string; class: string; type: SpanType };

	const overlaySpans = $derived.by<Span[]>(() => {
		if (!format) return [];
		const spans: Span[] = [];

		for (const t of tokens) {
			if (t.type === 'digit') {
				const filled = value[t.slotIndex] !== undefined;
				if (!filled && t.optional) continue;
				const ch = filled ? value[t.slotIndex]! : '_';
				const kind = (digitSlotKind[t.slotIndex] ?? 'other') as SpanType;
				const spanType: SpanType = filled ? kind : 'empty';
				const cls = filled
					? (segmentMap ? (segmentColors[kind] ?? segmentColors['other']!) : 'text-foreground')
					: 'text-muted-foreground/40';
				spans.push({ text: ch, class: cls, type: spanType });
			} else {
				if (t.optional) {
					const anyOptFilled = tokens.some(
						tok => tok.type === 'digit' && tok.optional && value[tok.slotIndex] !== undefined
					);
					if (!anyOptFilled) continue;
				}
				spans.push({ text: t.char, class: 'text-muted-foreground', type: 'lit' });
			}
		}

		// Merge consecutive spans with same type (preserves type for snippet)
		return spans.reduce<Span[]>((acc, s) => {
			const last = acc[acc.length - 1];
			if (last && last.type === s.type) { last.text += s.text; return acc; }
			return [...acc, { ...s }];
		}, []);
	});

	// ── Sync external value → display ─────────────────────────────────────
	$effect(() => {
		if (!format || !inputEl) return;
		// When focused and empty, keep the placeholder mask visible (handleFocus/handleKeydown own it)
		const focused = document.activeElement === inputEl;
		const masked = (value || focused) ? buildMasked(value) : '';
		if (inputEl.value !== masked) inputEl.value = masked;
	});

	// ── Input handler ──────────────────────────────────────────────────────
	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;

		if (!format) {
			value = input.value;
			if (bond) bond.state.props.value = value;
			oninput?.(ev, { value });
			return;
		}

		const digits = input.value.replace(/\D/g, '').slice(0, maxDigits);
		const masked = buildMasked(digits);

		input.value = masked;
		scrollLeft = input.scrollLeft;

		const cursorPos = nextCursorPos(digits);
		input.setSelectionRange(cursorPos, cursorPos);

		value = digits;
		if (bond) bond.state.props.value = value;
		oninput?.(ev, { value });
	}

	function handleKeydown(ev: KeyboardEvent) {
		if (!format) return;
		if (ev.key === 'Backspace') {
			ev.preventDefault();
			if (!value) return;
			const next = value.slice(0, -1);
			if (inputEl) {
				// If clearing the last digit, show placeholder mask so caret stays at first slot
				inputEl.value = next ? buildMasked(next) : buildMasked('');
				const pos = nextCursorPos(next);
				inputEl.setSelectionRange(pos, pos);
			}
			value = next;
			if (bond) bond.state.props.value = value;
			oninput?.(undefined as unknown as Event, { value });
		} else if (ev.key === 'Delete') {
			ev.preventDefault();
			// Clear from cursor position forward — find which digit slot the cursor is at
			if (!value || !inputEl) return;
			const pos = inputEl.selectionStart ?? 0;
			// Find digit slot index at or after cursor in the rendered string
			let charPos = 0;
			for (const t of tokens) {
				if (t.type === 'digit') {
					const filled = value[t.slotIndex] !== undefined;
					if (!filled && t.optional) continue;
					if (charPos >= pos) {
						// Clear this slot and everything after
						const next = value.slice(0, t.slotIndex);
						const masked = next ? buildMasked(next) : '';
						if (inputEl) {
							inputEl.value = masked;
							inputEl.setSelectionRange(charPos, charPos);
						}
						value = next;
						if (bond) bond.state.props.value = value;
						oninput?.(undefined as unknown as Event, { value });
						return;
					}
					charPos++;
				} else {
					const willRender = !t.optional || tokens.some(
						tok => tok.type === 'digit' && tok.optional && value[tok.slotIndex] !== undefined
					);
					if (willRender) charPos++;
				}
			}
		}
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}

	function snapCaret() {
		if (!format || !inputEl) return;
		const pos = inputEl.selectionStart ?? 0;
		const cursorPos = nextCursorPos(value);
		inputEl.setSelectionRange(Math.min(pos, cursorPos), Math.min(pos, cursorPos));
	}

	function handleFocus() {
		if (!format || !inputEl) return;
		// Show the placeholder mask so caret can sit at the first digit slot
		if (!value) inputEl.value = buildMasked('');
		requestAnimationFrame(snapCaret);
	}

	function handleBlur() {
		if (!format || !inputEl) return;
		// If no digits were entered, restore empty state
		if (!value) inputEl.value = '';
	}

	function syncScroll() {
		scrollLeft = inputEl?.scrollLeft ?? 0;
	}
</script>

{#snippet defaultSpan(span: Span, index: number)}
	<span class={span.class}>{span.text}</span>
{/snippet}

{#if format}
	<span class="relative flex h-full w-full flex-1 items-center overflow-hidden">

		<!-- Coloured overlay -->
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

		<!-- Real input — transparent text, visible caret, empty when no value -->
		<input
			bind:this={inputEl}
			type="tel"
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
			onscroll={syncScroll}
			onclick={() => requestAnimationFrame(snapCaret)}
			onfocus={handleFocus}
			onblur={handleBlur}
			{...restProps}
		/>
	</span>
{:else}
	<!-- Free mode: plain input -->
	<input
		bind:this={inputEl}
		type="tel"
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
		{...restProps}
	/>
{/if}
