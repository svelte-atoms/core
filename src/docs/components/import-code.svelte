<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Icon } from '$lib/components/icon';

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
				class="text-muted-foreground hover:text-foreground transition-colors"
				onclick={() => copyToClipboard(importCode)}
			>
				{#if copySuccess}
					<Icon name="check" class="h-4 w-4 text-palette-electron" />
				{:else}
					<Icon name="copy" class="h-4 w-4" />
				{/if}
			</Button>
		</div>
		<pre class="text-foreground font-mono text-sm">{importCode}</pre>
	</div>
</div>
