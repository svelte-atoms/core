<script lang="ts">
	import { Icon } from '$svelte-atoms/core/components/icon';
	import CheckmarkRegularIcon from '$svelte-atoms/core/icons/icon-checkmark.svelte';
	import { DURATION } from '$svelte-atoms/core/shared';
	import { circOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	let checked = $state(true);
</script>

{#if checked === true}
	<div
		class="ui-checkbox-indicator pointer-events-none absolute inset-0 flex h-full content-center items-center justify-center overflow-hidden"
		transition:scale={{ duration: DURATION.fast, easing: circOut, start: 0.9 }}
	>
		<Icon class="h-full p-0">
			<CheckmarkRegularIcon />
		</Icon>
	</div>
{/if}
