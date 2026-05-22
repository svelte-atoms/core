<script lang="ts">
	import { Radio } from '$lib/components/radio';
</script>

<div class="flex items-center gap-2">
	<Radio id="disabled-radio" name="disabled" value="yes" disabled />
	<label for="disabled-radio" class="text-muted-foreground">Disabled</label>
</div>
