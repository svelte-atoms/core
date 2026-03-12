<script lang="ts">
	import { Button } from '$lib/components/button';
	import CodeBlock from './code-block.svelte';

	type Props = {
		packageName: string;
		importCode: string;
	};

	let { importCode }: Props = $props();

	let importCopySuccess = $state(false);
	let installCopySuccess = $state(false);

	const installCmd = 'npm install @svelte-atoms/core';

	function copyImport() {
		navigator.clipboard.writeText(importCode);
		importCopySuccess = true;
		setTimeout(() => (importCopySuccess = false), 2000);
	}

	function copyInstall() {
		navigator.clipboard.writeText(installCmd);
		installCopySuccess = true;
		setTimeout(() => (installCopySuccess = false), 2000);
	}

	function CopyIcon() {
		return `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`;
	}
</script>

<div class="space-y-2">
	<!-- Install step -->
	<div class="border-border overflow-hidden rounded-lg border">
		<div class="flex items-center justify-between border-b border-white/5 px-4 py-2">
			<span class="text-muted-foreground text-xs font-medium">Install package</span>
			<Button
				class={['size-fit p-1.5 transition-colors duration-200', installCopySuccess ? 'text-green-400' : 'text-muted-foreground hover:text-foreground']}
				variant="ghost"
				onclick={copyInstall}
			>
				{#if installCopySuccess}
					<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				{:else}
					<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
				{/if}
			</Button>
		</div>
		<CodeBlock lang="bash" code={installCmd} />
	</div>

	<!-- Import Code -->
	<div class="border-border overflow-hidden rounded-lg border">
		<div class="flex items-center justify-between border-b border-white/5 px-4 py-2">
			<span class="text-muted-foreground text-xs font-medium">Import</span>
			<Button
				class={['size-fit p-1.5 transition-colors duration-200', importCopySuccess ? 'text-green-400' : 'text-muted-foreground hover:text-foreground']}
				variant="ghost"
				onclick={copyImport}
			>
				{#if importCopySuccess}
					<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				{:else}
					<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
				{/if}
			</Button>
		</div>
		<CodeBlock lang="typescript" code={importCode} />
	</div>
</div>
