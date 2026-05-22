<script lang="ts">
	import { Textarea } from '$lib/components/textarea';
</script>

<div class="w-full h-full">
	<Textarea.Root class="size-full p-0">
		<Textarea.Input placeholder="Write your message here..." rows={3} class="p-3 h-full" />
	</Textarea.Root>
</div>
