<script lang="ts">
	import type { Component } from 'svelte';
	import type { LazyProps } from './types';

	let { promise, children, loading, error, ...restProps }: LazyProps = $props();

	let Lazy: Component | null = $state(null);

	let err = $state();

	promise
		.then((c) => {
			Lazy = c;
		})
		.catch((r) => {
			err = r;
		});
</script>

<Lazy {...restProps}>
	{@render children?.()}
</Lazy>

{#if err && error}
	{@render error?.()}
{:else if !Lazy}
	{@render loading?.()}
{/if}
