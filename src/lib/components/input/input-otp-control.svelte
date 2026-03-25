<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { resolvePreset } from '$svelte-atoms/core/components/atom';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { untrack } from 'svelte';
	import { InputBond } from './bond.svelte';
	import type { InputOtpControlProps } from './types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(),
		length = 6,
		type = 'numeric',
		groupSize = undefined,
		placeholder = '·',
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.otp',
		onchange = undefined,
		oninput = undefined,
		oncomplete = undefined,
		...restProps
	}: InputOtpControlProps = $props();

	const preset = resolvePreset(getPreset(untrack(() => presetKey) as PresetModuleName)?.apply(bond, [bond]));

	// ── Slot refs ──────────────────────────────────────────────────────────
	let slotEls = $state<Array<HTMLInputElement | undefined>>([]);

	// ── Derived slots ─────────────────────────────────────────────────────
	const slots  = $derived(Array.from({ length }, (_, i) => value?.[i] ?? ''));
	const isFull = $derived(slots.every(s => s !== ''));

	// ── Track previous full state so oncomplete only fires once per fill ──
	let wasFull = $state(false);

	// ── Input validation per type ─────────────────────────────────────────
	function isValidChar(char: string): boolean {
		if (type === 'numeric')     return /^\d$/.test(char);
		if (type === 'alpha')       return /^[a-zA-Z]$/.test(char);
		return /^[a-zA-Z0-9]$/.test(char); // alphanumeric
	}

	function normalizeChar(char: string): string {
		return type !== 'numeric' ? char.toUpperCase() : char;
	}

	// ── Commit value ──────────────────────────────────────────────────────
	function commit(arr: string[]) {
		value = arr.join('');
		if (bond) bond.state.props.value = value;
	}

	function getArr(): string[] {
		return Array.from({ length }, (_, i) => value[i] ?? '');
	}

	// ── Focus helpers ─────────────────────────────────────────────────────
	function focusSlot(index: number) {
		slotEls[Math.max(0, Math.min(length - 1, index))]?.focus();
	}

	// ── Emit ──────────────────────────────────────────────────────────────
	function emit(ev: Event) {
		const detail = { value };
		oninput?.(ev, detail);
		if (isFull) {
			onchange?.(ev, detail);
			if (!wasFull) {
				oncomplete?.(value);
			}
		}
		wasFull = isFull;
	}

	// ── Keydown ───────────────────────────────────────────────────────────
	function handleKeydown(ev: KeyboardEvent, index: number) {
		if (disabled || readonly) return;

		const { key } = ev;

		if (key === 'Backspace') {
			ev.preventDefault();
			const arr = getArr();
			if (arr[index]) {
				// Clear current slot
				arr[index] = '';
				commit(arr);
			} else if (index > 0) {
				// Already empty — clear previous and move back
				arr[index - 1] = '';
				commit(arr);
				focusSlot(index - 1);
			}
			emit(ev);
			return;
		}

		if (key === 'Delete') {
			ev.preventDefault();
			const arr = getArr();
			arr[index] = '';
			commit(arr);
			emit(ev);
			return;
		}

		if (key === 'ArrowLeft')  { ev.preventDefault(); focusSlot(index - 1);     return; }
		if (key === 'ArrowRight') { ev.preventDefault(); focusSlot(index + 1);     return; }
		if (key === 'Home')       { ev.preventDefault(); focusSlot(0);             return; }
		if (key === 'End')        { ev.preventDefault(); focusSlot(length - 1);    return; }

		// Printable character
		if (key.length === 1 && !ev.ctrlKey && !ev.metaKey && !ev.altKey) {
			ev.preventDefault();
			if (!isValidChar(key)) return;
			const arr = getArr();
			arr[index] = normalizeChar(key);
			commit(arr);
			emit(ev);
			if (index < length - 1) focusSlot(index + 1);
		}
	}

	// ── Paste ─────────────────────────────────────────────────────────────
	function handlePaste(ev: ClipboardEvent, fromIndex: number) {
		ev.preventDefault();
		const pasted = ev.clipboardData?.getData('text') ?? '';
		const chars = pasted
			.split('')
			.filter(isValidChar)
			.map(normalizeChar)
			.slice(0, length - fromIndex);

		if (!chars.length) return;

		const arr = getArr();
		chars.forEach((c, i) => { arr[fromIndex + i] = c; });
		commit(arr);
		focusSlot(Math.min(length - 1, fromIndex + chars.length));
		emit(ev);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	role="group"
	aria-label="One-time password"
	class={cn(
		'inline-flex items-center gap-1',
		bond && 'h-full py-1 px-1',
		disabled && 'cursor-not-allowed opacity-50',
		preset?.class,
		toClassValue(klass, bond)
	)}
	{...restProps}
>
	{#each slots as slotVal, i (i)}
		{#if groupSize !== undefined && i > 0 && i % groupSize === 0}
			{#if bond}
				<span class="bg-border h-5 w-px shrink-0 select-none"></span>
			{:else}
				<span class="text-muted-foreground select-none px-0.5">—</span>
			{/if}
		{/if}

		<!-- Sizing wrapper — aspect-ratio doesn't apply to <input> elements -->
		<div class={cn('shrink-0', bond ? 'h-full flex-1' : 'h-10 w-7')}>
			<input
				bind:this={slotEls[i]}
				type="text"
				inputmode={type === 'numeric' ? 'numeric' : 'text'}
				maxlength={1}
				value={slotVal}
				{disabled}
				{readonly}
				autocomplete={i === 0 ? 'one-time-code' : 'off'}
				aria-label={`Digit ${i + 1} of ${length}`}
				aria-disabled={disabled}
				data-filled={slotVal !== ''}
				class={cn(
					'h-full w-full text-center font-mono text-sm font-medium tabular-nums',
					'caret-transparent select-none outline-none',
					'text-foreground transition-colors duration-150 rounded-md',
					!bond && 'border border-border bg-input',
					'focus:bg-foreground/5',
					!bond && 'focus:border-foreground/40 focus:ring-2 focus:ring-foreground/20',
					// bond && i > 0 && !(groupSize !== undefined && i % groupSize === 0) && 'border-l border-border rounded-none',
					disabled && 'cursor-not-allowed',
					readonly && 'cursor-default',
				)}
				placeholder={slotVal === '' ? placeholder : ''}
				onkeydown={(ev) => handleKeydown(ev, i)}
				onpaste={(ev) => handlePaste(ev, i)}
				onclick={() => slotEls[i]?.select()}
				oninput={(ev) => {
					// All input handled via keydown — suppress native input
					(ev.currentTarget as HTMLInputElement).value = slotVal;
				}}
			/>
		</div>
	{/each}
</span>
