<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Dialog } from '$lib/components/dialog';
</script>

<Dialog.Root>
	{#snippet trigger({ dialog })}
		<Button {...dialog.trigger().spread} size="sm" variant="outline">Open Dialog</Button>
	{/snippet}
	{#snippet children({ dialog })}
		<Dialog.Content>
			<Dialog.Header>
				<h2 class="text-foreground text-base font-semibold">Edit Profile</h2>
				<Dialog.CloseButton class="ml-auto" />
			</Dialog.Header>
			<Dialog.Body class="text-muted-foreground text-sm py-2">
				Make changes to your profile here. Click save when you're done.
			</Dialog.Body>
			<Dialog.Footer class="flex justify-end gap-2">
				<Button variant="outline" size="sm" onclick={() => dialog.state.close()}>Cancel</Button>
				<Button size="sm" onclick={() => dialog.state.close()}>Save changes</Button>
			</Dialog.Footer>
		</Dialog.Content>
	{/snippet}
</Dialog.Root>
