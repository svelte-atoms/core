<script lang="ts">
	import { Dialog } from '$lib/components/dialog';
	import { Button } from '$lib/components/button';
</script>

<Dialog.Root>
	{#snippet trigger({ dialog })}
		<Button variant="destructive" {...dialog.trigger()}>Delete Account</Button>
	{/snippet}
	{#snippet children({ dialog })}
		<Dialog.Content>
			<Dialog.Header>
				<h2 class="text-foreground text-lg font-semibold">Are you absolutely sure?</h2>
				<Dialog.CloseButton class="ml-auto" />
			</Dialog.Header>
			<Dialog.Body class="text-muted-foreground text-sm">
				<p>This action cannot be undone. This will permanently delete your account and remove all associated data.</p>
			</Dialog.Body>
			<Dialog.Footer class="flex justify-end gap-2">
				<Button variant="outline" onclick={() => dialog.state.close()}>Cancel</Button>
				<Button variant="destructive" onclick={() => dialog.state.close()}>Delete account</Button>
			</Dialog.Footer>
		</Dialog.Content>
	{/snippet}
</Dialog.Root>
