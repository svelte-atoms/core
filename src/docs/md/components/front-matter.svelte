<script lang="ts">
	import type { Frontmatter } from '$docs/md/frontmatter';

	let { frontmatter }: { frontmatter: Frontmatter } = $props();
</script>

---
id: {frontmatter.id}
title: {frontmatter.title}
category: {frontmatter.category}{#if frontmatter.subcategory}
subcategory: {frontmatter.subcategory}{/if}
depth: {frontmatter.depth}
prerequisites:{#if frontmatter.prerequisites.length === 0} []{:else}
{#each frontmatter.prerequisites as p (p)}
  - {p}
{/each}{/if}
related:{#if frontmatter.related.length === 0} []{:else}
{#each frontmatter.related as r (r)}
  - {r}
{/each}{/if}
---
