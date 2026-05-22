<script lang="ts">
	import { Input } from '$lib/components/input';

	let colorValue = $state('oklch(0.65 0.18 253)');
</script>

<Input.Root class="w-fit gap-2 px-2">
	<Input.ColorSwatch />
	<Input.ColorControl bind:value={colorValue} />
</Input.Root>
