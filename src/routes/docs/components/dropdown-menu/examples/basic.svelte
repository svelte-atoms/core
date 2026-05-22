<script lang="ts">
	import { DropdownMenu } from '$lib/components/dropdown-menu';
	import { Button } from '$lib/components/button';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger base={Button} variant="outline">Open Menu</DropdownMenu.Trigger>
	<DropdownMenu.Content class="border-border bg-background min-w-36 rounded-lg border shadow-lg">
		<DropdownMenu.Item>New File</DropdownMenu.Item>
		<DropdownMenu.Item>Open File</DropdownMenu.Item>
		<DropdownMenu.Item>Save</DropdownMenu.Item>
		<DropdownMenu.Item class="text-red-600">Exit</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
