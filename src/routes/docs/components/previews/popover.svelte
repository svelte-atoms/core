<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Popover } from '$lib/components/popover';
</script>

<Popover.Root>
	<Popover.Trigger base={Button} variant="outline" size="sm">Open Popover</Popover.Trigger>
	<Popover.Content class="border-border bg-background z-50 w-52 rounded-lg border p-3 shadow-lg">
		<p class="text-xs font-medium mb-1">Quick tips</p>
		<p class="text-xs text-muted-foreground">Press ⌘K to open the command palette.</p>
	</Popover.Content>
</Popover.Root>
