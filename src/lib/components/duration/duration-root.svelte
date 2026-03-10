<script lang="ts">
	import { setDurationContext, computeDuration } from './context';
	import type { DurationRootProps } from './types';

	let {
		from = $bindable(''),
		to = $bindable(''),
		value = $bindable(undefined),
		children,
		class: klass = '',
	}: DurationRootProps = $props();

	const duration = $derived(computeDuration(from, to));

	// Sync computed duration out via bind:value
	$effect(() => {
		value = duration;
	});

	setDurationContext({
		from: () => from,
		to: () => to,
		duration: () => duration,
		setFrom: (v) => { from = v; },
		setTo: (v) => { to = v; },
	});
</script>

<div class={klass}>
	{@render children?.()}
</div>
