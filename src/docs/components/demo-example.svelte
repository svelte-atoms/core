<script lang="ts">
	import type { Snippet } from 'svelte';
	import CodeBlock from './code-block.svelte';

	type Props = {
		title: string;
		description?: string;
		code?: string;
		children: Snippet;
	};

	let { title, description, code, children }: Props = $props();

	let activeTab = $state<'preview' | 'code'>('preview');

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
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-foreground text-lg font-semibold">{title}</h3>
				{#if description}
					<p class="text-muted-foreground mt-1 text-sm">{description}</p>
				{/if}
			</div>
			{#if code}
				<div class="flex items-center gap-1 rounded-md border p-1">
					<button
						class={[
							'rounded px-3 py-1 text-sm transition-colors',
							activeTab === 'preview'
								? 'bg-background text-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground'
						]}
						onclick={() => (activeTab = 'preview')}
					>
						Preview
					</button>
					<button
						class={[
							'rounded px-3 py-1 text-sm transition-colors',
							activeTab === 'code'
								? 'bg-background text-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground'
						]}
						onclick={() => (activeTab = 'code')}
					>
						Code
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- Preview -->
	{#if activeTab === 'preview'}
		<div
			class="bg-background p-6"
			style="background-image: radial-gradient(circle, var(--color-border, #e5e7eb) 1px, transparent 1px); background-size: 20px 20px;"
		>
			<div class="bg-background/80 rounded-md p-4 backdrop-blur-sm">
				{@render children()}
			</div>
		</div>
	{/if}

	<!-- Code -->
	{#if code && activeTab === 'code'}
		<div class="border-border bg-card border-t">
			<div class="flex items-center justify-between px-4 pt-3">
				<span class="text-muted-foreground text-xs">Svelte</span>
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
			<CodeBlock lang="svelte" code={code} />
		</div>
	{/if}
</div>
