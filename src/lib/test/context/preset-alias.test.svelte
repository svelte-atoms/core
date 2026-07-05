<script lang="ts">
	import { getPreset, mergePreset, setPreset, type Preset } from '$ixirjs/ui/context';
	import type { PresetEntryRecord } from '$ixirjs/ui/context/preset.svelte';

	setPreset({
		'alert.close': () => ({ 'data-source': 'base' })
	} satisfies Partial<Preset>);

	mergePreset(
		() =>
			({
				'alert.close-button': () => ({ 'data-source': 'legacy-override' })
			}) satisfies Partial<Preset>
	);

	const canonical = getPreset('alert.close')?.(undefined) as PresetEntryRecord | undefined;
	const legacy = getPreset('alert.close-button')?.(undefined) as PresetEntryRecord | undefined;
	const raw = getPreset();
</script>

<span
	data-canonical={canonical?.['data-source']}
	data-legacy={legacy?.['data-source']}
	data-has-legacy={raw?.['alert.close-button'] ? 'yes' : 'no'}
>
	preset alias probe
</span>
