<script lang="ts">
	type Props = {
		features: string[];
		title?: string;
	};

	let { features, title = 'Built-in Accessibility Features' }: Props = $props();
</script>

<div class="rounded-lg border border-palette-ion/30 bg-palette-ion/10 p-6">
	<div class="flex items-start">
		<svg
			class="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-palette-ion"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<div>
			<h3 class="text-foreground mb-2 text-lg font-semibold">{title}</h3>
			<ul class="text-foreground/90 space-y-1">
				{#each features as feature}
					<li>• {feature}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
