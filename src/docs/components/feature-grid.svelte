<script lang="ts">
	import type { Snippet } from 'svelte';

	type Feature = {
		title: string;
		description: string;
		icon?: Snippet;
		iconPath?: string;
		color: 'purple' | 'blue' | 'green' | 'pink' | 'yellow' | 'red';
	};

	type Props = {
		features: Feature[];
		columns?: 1 | 2 | 3 | 4;
	};

	let { features, columns = 2 }: Props = $props();

	const colorClasses = {
		purple: {
			gradient: 'from-accent/10 to-accent/20',
			icon: 'bg-accent text-accent-foreground'
		},
		blue: {
			gradient: 'from-palette-ion/10 to-palette-ion/20',
			icon: 'bg-palette-ion text-foreground'
		},
		green: {
			gradient: 'from-palette-electron/10 to-palette-electron/20',
			icon: 'bg-palette-electron text-foreground'
		},
		pink: {
			gradient: 'from-palette-fusion/10 to-palette-fusion/20',
			icon: 'bg-palette-fusion text-foreground'
		},
		yellow: {
			gradient: 'from-palette-energy/10 to-palette-energy/20',
			icon: 'bg-palette-energy text-foreground'
		},
		red: {
			gradient: 'from-destructive/10 to-destructive/20',
			icon: 'bg-destructive text-destructive-foreground'
		}
	};

	const gridCols = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 md:grid-cols-2',
		3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
		4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
	};
</script>

<div class="grid {gridCols[columns]} gap-6">
	{#each features as feature}
		<div
			class="border-border rounded-lg border bg-gradient-to-br {colorClasses[feature.color]
				.gradient} p-6 transition-transform hover:scale-[1.02]"
		>
			<div
				class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg {colorClasses[
					feature.color
				].icon}"
			>
				{#if feature.icon}
					{@render feature.icon()}
				{:else if feature.iconPath}
					{@html feature.iconPath}
				{/if}
			</div>
			<h3 class="text-foreground mb-2 text-lg font-semibold">{feature.title}</h3>
			<p class="text-muted-foreground text-sm">{feature.description}</p>
		</div>
	{/each}
</div>
