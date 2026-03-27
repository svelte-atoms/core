<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description: string;
		status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
		llms?: boolean;
		children?: Snippet;
	};

	let { title, description, status = 'stable', llms = false, children }: Props = $props();
</script>

<div class="doc-header">
	<div class="mb-3 flex flex-wrap items-center gap-2">
		<h1 class="doc-title text-foreground font-bold">{title}</h1>
		<span class="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-xs capitalize">
			{status}
		</span>
		{#if llms}
			<span class="bg-primary/10 border-primary/20 text-primary rounded-full border px-2 py-0.5 text-xs font-medium">
				llms.txt
			</span>
		{/if}
	</div>
	<p class="page-description text-foreground max-w-3xl leading-relaxed font-medium">
		{description}
	</p>
	{#if children}
		<div class="page-children mt-4">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	@supports (animation-timeline: view()) {
		@keyframes shrink-title {
			0% {
				font-size: 1.875rem;
			}
			100% {
				font-size: 1.25rem;
			}
		}

		@keyframes hide-description {
			0% {
				opacity: 1;
				margin-bottom: 1rem;
				font-size: var(--text-lg);
				max-height: 200px;
			}
			100% {
				opacity: 0;
				margin-bottom: 0;
				font-size: var(--text-xs);
				max-height: 0;
			}
		}

		h1.doc-title {
			animation: shrink-title linear;
			animation-timeline: view();
			animation-range: entry 0% cover 100%;
			animation-duration: 1ms;
			animation-fill-mode: forwards;
		}

		.page-description {
			animation: hide-description linear;
			animation-timeline: view();
			animation-range: entry 0% cover 50%;
			animation-duration: 1ms;
			animation-fill-mode: both;
		}

		.page-children {
			animation: hide-description linear;
			animation-timeline: view();
			animation-range: entry 30% cover 70%;
			animation-fill-mode: both;
		}
	}

	@supports not (animation-timeline: view()) {
		h1.doc-title {
			font-size: 1.875rem;
			opacity: 1;
		}

		.page-description {
			opacity: 1;
			font-size: var(--text-lg)
		}
	}
</style>