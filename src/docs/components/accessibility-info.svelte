<script lang="ts">
	type Props = {
		features: string[];
		title?: string;
	};

	let { features, title = 'Built-in Accessibility Features' }: Props = $props();
</script>

<div class="border-border bg-muted/40 rounded-lg border p-6">
	<div class="mb-4 flex items-center gap-2">
		<div class="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		</div>
		<h3 class="text-foreground text-base font-semibold">{title}</h3>
	</div>
	<ul class="space-y-2">
		{#each features as feature}
			<li class="flex items-start gap-2">
				<svg
					class="text-primary mt-0.5 h-4 w-4 flex-shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				<span class="text-foreground/80 text-sm">{feature}</span>
			</li>
		{/each}
	</ul>
</div>
