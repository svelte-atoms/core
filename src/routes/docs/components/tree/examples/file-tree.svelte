<script lang="ts">
	import { Tree } from '$lib/components/tree';

	let srcOpen = $state(true);
	let libOpen = $state(false);
	let rootOpen = $state(true);
</script>

<div class="bg-muted rounded-lg p-4 text-sm">
	<Tree.Root bind:open={rootOpen}>
		<Tree.Header class="px-2 py-1">📁 project</Tree.Header>
		<Tree.Body class="ml-4 border-l pl-2">
			<Tree.Root bind:open={srcOpen}>
				<Tree.Header class="px-2 py-1">📁 src</Tree.Header>
				<Tree.Body class="ml-4 border-l pl-2">
					<Tree.Root bind:open={libOpen}>
						<Tree.Header class="px-2 py-1">📁 lib</Tree.Header>
						<Tree.Body class="ml-4 border-l pl-2">
							<div class="px-2 py-1">📄 index.ts</div>
						</Tree.Body>
					</Tree.Root>
					<div class="px-2 py-1">📄 +page.svelte</div>
				</Tree.Body>
			</Tree.Root>
			<div class="px-2 py-1">📄 package.json</div>
		</Tree.Body>
	</Tree.Root>
</div>
