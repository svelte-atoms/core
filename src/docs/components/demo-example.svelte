<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description?: string;
		code: string;
		children: Snippet;
	};

	let { title, description, code, children }: Props = $props();

	let copySuccess = $state(false);

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		copySuccess = true;
		setTimeout(() => (copySuccess = false), 2000);
	}
</script>

<div class="border-border overflow-hidden rounded-lg border">
	<!-- Header -->
	<div class="border-border bg-muted border-b px-6 py-4">
		<h3 class="text-foreground text-lg font-semibold">{title}</h3>
		{#if description}
			<p class="text-muted-foreground mt-1 text-sm">{description}</p>
		{/if}
	</div>

	<!-- Preview -->
	<div class="bg-background p-6">
		<div class="mx-auto max-w-2xl">
			{@render children()}
		</div>
	</div>

	<!-- Code -->
	<div class="border-border bg-card border-t p-4">
		<div class="mb-2 flex items-center justify-between">
			<span class="text-muted-foreground text-sm">Code</span>
			<button
				class="text-muted-foreground hover:text-foreground transition-colors"
				onclick={() => copyToClipboard(code)}
			>
				{#if copySuccess}
					<svg
						class="h-4 w-4 text-palette-electron"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				{:else}
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				{/if}
			</button>
		</div>
		<pre class="text-foreground overflow-x-auto font-mono text-sm whitespace-pre-wrap">{code}</pre>
	</div>
</div>
