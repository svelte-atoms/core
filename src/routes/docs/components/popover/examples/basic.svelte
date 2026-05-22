<script lang="ts">
	import { Popover } from '$lib/components/popover';
	import { Button } from '$lib/components/button';
</script>

<Popover.Root>
	<Popover.Trigger base={Button} variant="outline">Open Popover</Popover.Trigger>
	<Popover.Content class="border-border bg-background z-10 w-64 rounded-lg border p-4 shadow-lg">
		<p class="text-sm">This is a popover. It floats near its trigger element.</p>
	</Popover.Content>
</Popover.Root>
