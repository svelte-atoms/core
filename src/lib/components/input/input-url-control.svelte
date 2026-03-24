<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { resolvePreset } from '$svelte-atoms/core/components/atom';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { untrack } from 'svelte';
	import { InputBond } from './bond.svelte';
	import type { InputUrlControlProps } from './types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		placeholder = 'example.com/path',
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.url',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputUrlControlProps = $props();

	const preset = resolvePreset(getPreset(untrack(() => presetKey) as PresetModuleName)?.apply(bond, [bond]));

	let inputEl = $state<HTMLInputElement>();
	let scrollLeft = $state(0);

	// ── Parse URL into segments ──────────────────────────────────────────
	type Segment = { text: string; kind: 'protocol' | 'host' | 'port' | 'pathname' | 'search' | 'hash' | 'plain' };

	function parseSegments(raw: string): Segment[] {
		if (!raw) return [];

		// Normalise: if no protocol, add a fake one for URL parsing
		const hasProtocol = /^[a-z][a-z0-9+\-.]*:\/\//i.test(raw);
		const forParsing = hasProtocol ? raw : 'https://' + raw;

		try {
			const u = new URL(forParsing);
			const segs: Segment[] = [];

			if (hasProtocol) {
				segs.push({ text: u.protocol + '//', kind: 'protocol' });
			}

			// username:password@
			if (u.username) {
				segs.push({ text: u.username + (u.password ? ':' + u.password : '') + '@', kind: 'plain' });
			}

			segs.push({ text: u.hostname, kind: 'host' });

			if (u.port) {
				segs.push({ text: ':' + u.port, kind: 'port' });
			}

			if (u.pathname && u.pathname !== '/') {
				segs.push({ text: u.pathname, kind: 'pathname' });
			} else if (u.pathname === '/' && (u.search || u.hash)) {
				segs.push({ text: '/', kind: 'pathname' });
			}

			if (u.search) {
				segs.push({ text: u.search, kind: 'search' });
			}

			if (u.hash) {
				segs.push({ text: u.hash, kind: 'hash' });
			}

			return segs;
		} catch {
			// Not a valid URL yet — return as plain text but try partial segment detection
			return partialSegments(raw);
		}
	}

	function partialSegments(raw: string): Segment[] {
		const segs: Segment[] = [];
		let rest = raw;

		// Protocol
		const protoMatch = rest.match(/^([a-z][a-z0-9+\-.]*:\/\/)/i);
		if (protoMatch) {
			segs.push({ text: protoMatch[1], kind: 'protocol' });
			rest = rest.slice(protoMatch[1].length);
		}

		if (!rest) return segs;

		// Split on first / ? #
		const sep = rest.search(/[/?#]/);
		if (sep === -1) {
			segs.push({ text: rest, kind: 'host' });
			return segs;
		}

		const hostPart = rest.slice(0, sep);
		const afterHost = rest.slice(sep);

		// host:port
		const portMatch = hostPart.match(/^(.*):(\d+)$/);
		if (portMatch) {
			if (portMatch[1]) segs.push({ text: portMatch[1], kind: 'host' });
			segs.push({ text: ':' + portMatch[2], kind: 'port' });
		} else {
			if (hostPart) segs.push({ text: hostPart, kind: 'host' });
		}

		// pathname / search / hash
		const hashIdx = afterHost.indexOf('#');
		const searchIdx = afterHost.indexOf('?');

		if (searchIdx !== -1) {
			const path = afterHost.slice(0, searchIdx);
			const queryAndHash = afterHost.slice(searchIdx);
			const hashInQuery = queryAndHash.indexOf('#');
			if (path) segs.push({ text: path, kind: 'pathname' });
			if (hashInQuery !== -1) {
				segs.push({ text: queryAndHash.slice(0, hashInQuery), kind: 'search' });
				segs.push({ text: queryAndHash.slice(hashInQuery), kind: 'hash' });
			} else {
				segs.push({ text: queryAndHash, kind: 'search' });
			}
		} else if (hashIdx !== -1) {
			const path = afterHost.slice(0, hashIdx);
			if (path) segs.push({ text: path, kind: 'pathname' });
			segs.push({ text: afterHost.slice(hashIdx), kind: 'hash' });
		} else {
			segs.push({ text: afterHost, kind: 'pathname' });
		}

		return segs;
	}

	const segments = $derived(parseSegments(value));

	const kindStyle: Record<Segment['kind'], string> = {
		protocol:  'color: var(--input-hl-muted, var(--foreground))',
		host:      'color: var(--input-hl-primary, var(--foreground)); font-weight: 500',
		port:      'color: var(--input-hl-warning, var(--foreground))',
		pathname:  'color: var(--input-hl-secondary, var(--foreground))',
		search:    'color: var(--input-hl-info, var(--foreground))',
		hash:      'color: var(--input-hl-accent, var(--foreground))',
		plain:     'color: var(--input-hl-muted, var(--foreground))',
	};

	// ── Keep overlay scroll in sync with the real input ──────────────────
	function syncScroll() {
		scrollLeft = inputEl?.scrollLeft ?? 0;
	}

	// ── Event handlers ────────────────────────────────────────────────────
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

<!--
  Layout: relative container with two layers:
  1. Invisible real <input> on top (handles caret, selection, all native editing)
  2. Coloured overlay <span> beneath it, same font/padding, pointer-events:none
  The input has `color: transparent` so only the overlay is visible, but the
  caret (caret-color) remains in its natural foreground colour.
-->
<span class="relative flex h-full w-full flex-1 items-center overflow-hidden">

	<!-- Coloured overlay — scrolls with the input -->
	<span
		aria-hidden="true"
		class={cn(
			'pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre px-2 font-mono text-sm',
			preset?.class,
			toClassValue(klass, bond)
		)}
	>
		<!-- Offset to match input scroll position -->
		<span style="transform: translateX(-{scrollLeft}px)">
			{#if segments.length}
				{#each segments as seg}
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
		type="text"
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
