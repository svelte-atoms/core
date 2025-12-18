<script lang="ts">
	import { Button } from '$lib/components/button';

	type Props = {
		packageName: string;
		importCode: string;
	};

	let { importCode }: Props = $props();

	let copySuccess = $state(false);

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		copySuccess = true;
		setTimeout(() => (copySuccess = false), 2000);
	}
</script>

<div class="space-y-4">
	<!-- Import Code -->
	<div class="border-border bg-card rounded-lg border p-4">
		<div class="mb-2 flex items-center justify-between">
			<span class="text-muted-foreground text-sm">Import</span>
			<Button
				class={[
					'hover:text-foreground size-fit p-2 transition-colors duration-200',
					copySuccess && 'bg-primary/10 hover:bg-primary/15'
				]}
				variant="ghost"
				onclick={() => copyToClipboard(importCode)}
			>
				{#if copySuccess}
					<svg
						class="h-4 w-4 text-palette-electron"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				{:else}
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				{/if}
			</Button>
		</div>
		<pre class="text-foreground font-mono text-sm">{importCode}</pre>
	</div>
</div>
