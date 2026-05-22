<script lang="ts">
	import { Textarea } from '$lib/components/textarea';

	let value = $state('');
</script>

<div class="w-80">
	<Textarea.Root>
		<Textarea.Input bind:value placeholder="Type your message here..." rows={4} />
	</Textarea.Root>
</div>
