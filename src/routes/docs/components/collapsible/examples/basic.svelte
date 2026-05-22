<script lang="ts">
	import { Collapsible } from '$lib/components/collapsible';

	let open = $state(false);
</script>

<div class="w-80">
	<Collapsible.Root bind:open>
		<Collapsible.Header>
			<span>Toggle Content</span>
		</Collapsible.Header>
		<Collapsible.Body>
			<p class="text-sm">This content can be shown or hidden by clicking the header.</p>
		</Collapsible.Body>
	</Collapsible.Root>
</div>
