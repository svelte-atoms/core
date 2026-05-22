<script lang="ts">
	import { Label } from '$lib/components/label';
	import { Input } from '$lib/components/input';
</script>

<div class="space-y-2">
	<Label for="required-input" required>Name <span class="text-red-500">*</span></Label>
	<Input.Root>
		<Input.Control id="required-input" type="text" placeholder="Required field" required />
	</Input.Root>
</div>
