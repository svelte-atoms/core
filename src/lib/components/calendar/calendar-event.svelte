<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';
	import { CalendarBond } from './bond.svelte';

	const calendarBond = CalendarBond.get();

	let { class: klass = '', element = $bindable(undefined), children } = $props();
</script>

<div bind:this={element} class={cn('calendar-event', klass)}>
	{@render children?.()}
</div>
