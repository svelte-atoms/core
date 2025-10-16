<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Icon } from '$lib/components/icon';
	import { cn } from '$lib/utils';

	let { feature } = $props();
</script>

<Card.Root
	class={cn(
		'feature-card group transform rounded-2xl bg-radial p-6 transition-all duration-300',
		feature.class
	)}
>
	<Icon
		class={cn(
			'grid-area-[icon] mb-4 flex size-6 h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r p-2 transition-transform duration-200 group-hover:scale-110',
			feature.iconClass
		)}
	>
		<svg class="text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={feature.icon} />
			{#if feature.secondaryIcon}
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d={feature.secondaryIcon}
				/>
			{/if}
		</svg>
	</Icon>
	<Card.Title class="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100"
		>{feature.title}</Card.Title
	>
	<Card.Description class="text-gray-600 dark:text-gray-300">{feature.description}</Card.Description
	>
</Card.Root>

<style>
	:global(.feature-card) {
		grid-template-columns: 1fr;
		grid-template-areas: 'icon title' 'icon description';
	}
</style>
