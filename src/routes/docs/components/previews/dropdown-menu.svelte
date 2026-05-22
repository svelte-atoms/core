<script lang="ts">
	import { Button } from '$lib/components/button';
	import { DropdownMenu } from '$lib/components/dropdown-menu';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger base={Button} variant="outline" size="sm">Open Menu</DropdownMenu.Trigger>
	<DropdownMenu.Content
		class="border-border bg-background z-50 min-w-36 rounded-lg border shadow-lg"
	>
		<DropdownMenu.Item>New file</DropdownMenu.Item>
		<DropdownMenu.Item>Open file</DropdownMenu.Item>
		<DropdownMenu.Item>Save</DropdownMenu.Item>
		<DropdownMenu.Item class="text-red-600">Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
