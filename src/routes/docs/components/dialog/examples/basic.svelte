<script lang="ts">
	import { Dialog } from '$lib/components/dialog';
	import { Button } from '$lib/components/button';
</script>

<Dialog.Root>
	{#snippet trigger({ dialog })}
		<Button {...dialog.trigger()}>Open Dialog</Button>
	{/snippet}
	{#snippet children({ dialog })}
		<Dialog.Content>
			<Dialog.Header>
				<h2 class="text-foreground text-lg font-semibold">Edit Profile</h2>
				<Dialog.CloseButton class="ml-auto" />
			</Dialog.Header>
			<Dialog.Body class="text-muted-foreground text-sm">
				<p>Make changes to your profile here. Click save when you're done.</p>
			</Dialog.Body>
			<Dialog.Footer class="flex justify-end gap-2">
				<Button variant="outline" onclick={() => dialog.state.close()}>Cancel</Button>
				<Button onclick={() => dialog.state.close()}>Save changes</Button>
			</Dialog.Footer>
		</Dialog.Content>
	{/snippet}
</Dialog.Root>
