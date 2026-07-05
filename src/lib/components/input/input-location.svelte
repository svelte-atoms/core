<script lang="ts">
	import {
		buildLocationSegments,
		isValidLatitude,
		isValidLongitude,
		LOCATION_SEGMENT_STYLES,
		parseLocationCoords
	} from '$ixirjs/ui/components/input/location';
	import {
		resolveControlPreset,
		writeInputValue
	} from '$ixirjs/ui/components/input/shared';
	import { cn, toClassValue } from '$ixirjs/ui/utils';
	import { InputBond } from '$ixirjs/ui/components/input/bond.svelte';
	import type { InputLocationControlProps } from '$ixirjs/ui/components/input/types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		lat = $bindable<number | undefined>(undefined),
		lng = $bindable<number | undefined>(undefined),
		format = 'dd',
		precision = 6,
		placeholder = 'lat, lng',
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.location',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputLocationControlProps = $props();

	const preset = resolveControlPreset(() => presetKey, bond);

	let inputEl = $state<HTMLInputElement>();
	let scrollLeft = $state(0);
	let isFocused = $state(false);

	const segments = $derived(buildLocationSegments(value, { format, precision }));

	// Sync value → lat/lng props
	$effect(() => {
		const coords = parseLocationCoords(value);
		if (coords && isValidLatitude(coords.lat) && isValidLongitude(coords.lng)) {
			lat = coords.lat;
			lng = coords.lng;
		} else if (!value.trim()) {
			lat = undefined;
			lng = undefined;
		}
	});

	// Sync lat/lng props → value string (external writes)
	$effect(() => {
		if (lat !== undefined && lng !== undefined) {
			const current = parseLocationCoords(value);
			if (current?.lat !== lat || current?.lng !== lng) {
				value = `${lat}, ${lng}`;
				writeInputValue(bond, value);
			}
		}
	});

	// Input / change handlers
	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		value = input.value;
		writeInputValue(bond, value);
		syncScroll();
		oninput?.(ev, { lat, lng, value });
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { lat, lng, value });
	}

	function syncScroll() {
		scrollLeft = inputEl?.scrollLeft ?? 0;
	}

	function handleFocus() {
		isFocused = true;
	}

	function handleBlur() {
		isFocused = false;
	}

	// Paste: normalise common coordinate formats
	function handlePaste(ev: ClipboardEvent) {
		ev.preventDefault();
		const pasted = ev.clipboardData?.getData('text') ?? '';
		const coords = parseLocationCoords(pasted);
		if (coords) {
			value = `${coords.lat}, ${coords.lng}`;
		} else {
			value = pasted;
		}
		if (inputEl) inputEl.value = value;
		writeInputValue(bond, value);
		oninput?.(new Event('input'), { lat, lng, value });
	}
</script>

<span class="relative flex h-full w-full flex-1 items-center overflow-hidden">
	<!-- Display mode overlay (hidden while focused) -->
	{#if !isFocused}
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
					{#each segments as seg, i (i)}
						<span style={LOCATION_SEGMENT_STYLES[seg.kind]}>{seg.text}</span>
					{/each}
				{:else}
					<span class="text-muted-foreground">{placeholder}</span>
				{/if}
			</span>
		</span>
	{/if}

	<!-- Real <input> — transparent in display mode, visible while focused -->
	<input
		bind:this={inputEl}
		type="text"
		inputmode="decimal"
		autocomplete="off"
		spellcheck={false}
		bind:value
		{placeholder}
		{disabled}
		{readonly}
		class={cn(
			'relative h-full w-full flex-1 bg-transparent px-2 font-mono text-sm caret-foreground outline-none',
			isFocused
				? 'text-foreground placeholder:text-muted-foreground'
				: 'text-transparent placeholder:text-transparent',
			disabled && 'cursor-not-allowed opacity-50',
			preset?.class,
			toClassValue(klass, bond)
		)}
		oninput={handleInput}
		onchange={handleChange}
		onscroll={syncScroll}
		onpaste={handlePaste}
		onfocus={handleFocus}
		onblur={handleBlur}
		{...restProps}
	/>
</span>
