<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Tooltip } from '$lib/components/tooltip';
</script>

<Tooltip.Root>
	<Tooltip.Trigger base={Button} variant="outline" size="sm">Hover me</Tooltip.Trigger>
	<Tooltip.Content
		class="border-border bg-popover text-popover-foreground z-50 rounded-md border px-3 py-1.5 text-xs shadow-md"
	>
		This is a helpful tooltip!
	</Tooltip.Content>
</Tooltip.Root>
