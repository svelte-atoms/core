<script lang="ts">
	import type { Frontmatter } from '$docs/md/frontmatter';

	let { frontmatter }: { frontmatter: Frontmatter } = $props();

	const depthLabels: Record<string, string> = {
		beginner: 'Beginner',
		intermediate: 'Intermediate',
		detailed: 'Detailed',
		foundational: 'Foundational',
		advanced: 'Advanced'
	};
</script>

---
id: {frontmatter.id}
title: {frontmatter.title}
category: {frontmatter.category}{#if frontmatter.subcategory}
subcategory: {frontmatter.subcategory}{/if}
depth: {frontmatter.depth}
prerequisites:{#if frontmatter.prerequisites.length === 0} []{:else}
{#each frontmatter.prerequisites as p}
  - {p}
{/each}{/if}
related:{#if frontmatter.related.length === 0} []{:else}
{#each frontmatter.related as r}
  - {r}
{/each}{/if}
---
