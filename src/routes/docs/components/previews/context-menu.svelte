<script lang="ts">
	import { ContextMenu } from '$lib/components/context-menu';
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-24 w-56 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 text-xs text-muted-foreground select-none cursor-context-menu hover:text-primary hover:border-current hover:bg-primary/5 duration-200 transition-colors"
	>
		Right-click anywhere here
	</ContextMenu.Trigger>
	<ContextMenu.Content
		preset="context-menu.content"
		class="min-w-40 rounded-lg border border-border bg-popover shadow-lg p-0 z-50"
	>
		<ContextMenu.Item preset="context-menu.item" class="border-none">Copy</ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item" class="border-none">Paste</ContextMenu.Item>
		<ContextMenu.Divider />
		<ContextMenu.Item preset="context-menu.item" class="border-none text-destructive"
			>Delete</ContextMenu.Item
		>
	</ContextMenu.Content>
</ContextMenu.Root>
