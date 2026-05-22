<script lang="ts">
	import { Input } from '$lib/components/input';
</script>

<div class="w-52 flex flex-col gap-2">
	<Input.Root>
		<Input.Icon class="text-muted-foreground/50 p-1.5 h-8">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
			</svg>
		</Input.Icon>
		<Input.TextControl placeholder="Search..." />
	</Input.Root>
	<Input.Root>
		<Input.Icon class="text-muted-foreground px-2 text-sm">$</Input.Icon>
		<Input.NumberControl placeholder="0.00" />
	</Input.Root>
</div>
