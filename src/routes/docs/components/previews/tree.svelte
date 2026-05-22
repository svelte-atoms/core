<script lang="ts">
	import { Tree } from '$lib/components/tree';

	let treeOpen = $state(true);
</script>

<div class="text-sm bg-muted/50 rounded-lg px-3 py-2 w-48">
	<Tree.Root bind:open={treeOpen}>
		<Tree.Header class="px-1 py-0.5 cursor-pointer hover:text-primary">📁 project</Tree.Header>
		<Tree.Body class="ml-3 border-l border-border pl-2 mt-0.5 space-y-0.5">
			<div class="px-1 py-0.5 text-muted-foreground">📄 package.json</div>
			<div class="px-1 py-0.5 text-muted-foreground">📄 svelte.config.js</div>
			<div class="px-1 py-0.5 text-muted-foreground">📁 src</div>
		</Tree.Body>
	</Tree.Root>
</div>
