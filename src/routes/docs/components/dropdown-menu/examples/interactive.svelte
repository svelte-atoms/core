<script lang="ts">
	import { DropdownMenu } from '$lib/components/dropdown-menu';
	import { Button } from '$lib/components/button';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger base={Button} variant="outline">User Menu</DropdownMenu.Trigger>
	<DropdownMenu.Content class="border-border bg-background min-w-36 rounded-lg border shadow-lg">
		<DropdownMenu.Item onclick={() => {}}>Profile</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => {}}>Settings</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => {}}>Logout</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
