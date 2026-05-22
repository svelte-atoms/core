<script lang="ts">
	import { Label } from '$lib/components/label';
	import { Input } from '$lib/components/input';
</script>

<div class="space-y-2">
	<Label for="disabled-input" class="text-muted-foreground">Disabled Field</Label>
	<Input.Root>
		<Input.Control id="disabled-input" type="text" placeholder="Disabled" disabled />
	</Input.Root>
</div>
