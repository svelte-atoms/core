<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';
	import { Icon } from '../icon';
	import type { renderSVG } from 'uqr';

	let { class: klass = '', value = '' } = $props();

	type Render = typeof renderSVG;

	let render: Render | undefined = $state();

	const code = $derived(
		render?.(value, { blackColor: 'currentColor', whiteColor: 'transparent', border: 0 })
	);

	import('uqr').then((result) => {
		render = result.renderSVG;
	});
</script>

<Icon class={cn('aspect-square h-20', klass)}>
	{#if code}
		{@html code}
	{/if}
</Icon>
