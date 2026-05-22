<script lang="ts">
	import { Label } from '$lib/components/label';
	import { Input } from '$lib/components/input';
</script>

<div class="space-y-2">
	<Label for="email-input">Email Address</Label>
	<Input.Root>
		<Input.Control id="email-input" type="email" placeholder="Enter email..." />
	</Input.Root>
</div>
