<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { resolvePreset } from '$svelte-atoms/core/components/atom';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { untrack } from 'svelte';
	import { InputBond } from './bond.svelte';
	import type { InputEmailControlProps } from './types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(),
		placeholder = 'you@example.com',
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.email',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputEmailControlProps = $props();

	const preset = resolvePreset(getPreset(untrack(() => presetKey) as PresetModuleName)?.apply(bond, [bond]));

	let inputEl = $state<HTMLInputElement>();
	let scrollLeft = $state(0);

	// ── Parse email into segments ─────────────────────────────────────────
	type Segment = { text: string; kind: 'local' | 'at' | 'domain' | 'tld' | 'plain' };

	function parseSegments(raw: string): Segment[] {
		if (!raw) return [];

		const atIdx = raw.indexOf('@');
		if (atIdx === -1) return [{ text: raw, kind: 'plain' }];

		const local  = raw.slice(0, atIdx);
		const domain = raw.slice(atIdx + 1);
		const segs: Segment[] = [];

		if (local)  segs.push({ text: local,  kind: 'local' });
		segs.push({ text: '@', kind: 'at' });

		if (domain) {
			// Split domain into base + TLD on last dot
			const lastDot = domain.lastIndexOf('.');
			if (lastDot !== -1 && lastDot < domain.length - 1) {
				segs.push({ text: domain.slice(0, lastDot), kind: 'domain' });
				segs.push({ text: domain.slice(lastDot),    kind: 'tld' });
			} else {
				segs.push({ text: domain, kind: 'domain' });
			}
		}

		return segs;
	}

	const segments = $derived(parseSegments(value));

	const kindStyle: Record<Segment['kind'], string> = {
		local:  'color: var(--input-hl-primary, var(--foreground)); font-weight: 500',
		at:     'color: var(--input-hl-muted, var(--foreground))',
		domain: 'color: var(--input-hl-secondary, var(--foreground))',
		tld:    'color: var(--input-hl-accent, var(--foreground))',
		plain:  'color: var(--foreground)',
	};

	function syncScroll() {
		scrollLeft = inputEl?.scrollLeft ?? 0;
	}

	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		value = input.value;
		if (bond) bond.state.props.value = value;
		syncScroll();
		oninput?.(ev, { value });
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}
</script>

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
			{#if segments.length}
				{#each segments as seg (seg.kind + seg.text)}
					<span style={kindStyle[seg.kind]}>{seg.text}</span>
				{/each}
			{:else}
				<span class="text-muted-foreground">{placeholder}</span>
			{/if}
		</span>
	</span>

	<!-- Real input — transparent text, visible caret -->
	<input
		bind:this={inputEl}
		type="email"
		bind:value
		{placeholder}
		{disabled}
		{readonly}
		class={cn(
			'relative h-full w-full flex-1 bg-transparent px-2 font-mono text-sm text-transparent caret-foreground outline-none',
			'placeholder:text-transparent',
			disabled && 'cursor-not-allowed',
			preset?.class,
			toClassValue(klass, bond)
		)}
		oninput={handleInput}
		onchange={handleChange}
		onscroll={syncScroll}
		{...restProps}
	/>
</span>
