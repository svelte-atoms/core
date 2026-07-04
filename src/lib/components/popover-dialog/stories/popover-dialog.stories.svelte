<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { PopoverDialog } from '..';
	import { Button } from '../../button';

	// PopoverDialog is the first Fusion: fuse(Popover, Dialog). Popover's
	// trigger/disclosure opens Dialog's modal content (centered, backdrop, focus-trapped).
	const { Story } = defineMeta({
		title: 'Atoms/PopoverDialog',
		parameters: {
			layout: 'fullscreen'
		},
		args: {
			disabled: false,
			type: 'modal'
		},
		argTypes: {
			disabled: {
				control: 'boolean',
				description: 'Disable the trigger and prevent the dialog from opening'
			},
			type: {
				control: 'select',
				options: ['modal', 'non-modal'],
				description: 'Presentation mode — modal closes on backdrop click; non-modal leaves it open'
			}
		}
	});
</script>

<script lang="ts">
	let open = $state(false);
	let demoOpen = $state(false);
</script>

<!--
	The fusion in action: one `<PopoverDialog.Root>` carries Popover's trigger AND
	Dialog's modal presentation. Every part here is a *reused* component — the Trigger
	is `<Popover.Trigger>`, the Header/Body are `<Dialog.*>` — resolving the fused bond
	via context. Root provides context; Content self-portals the backdrop + card.
-->
<Story name="Basic">
	{#snippet template(args)}
		<div class="flex h-full items-center justify-center p-8">
			<PopoverDialog.Root bind:open disabled={args.disabled}>
				<!-- Reused <Popover.Trigger>: click toggles open, ARIA = dialog. -->
				<PopoverDialog.Trigger base={Button} variant="primary">Open Dialog</PopoverDialog.Trigger>

				<!-- Content self-portals the modal; Header/Body are reused <Dialog.*> atoms. -->
				<PopoverDialog.Content type={args.type}>
					<PopoverDialog.Header>Modal title</PopoverDialog.Header>
					<PopoverDialog.Body>
						<p>
							This panel is opened by a Popover trigger but presented in Dialog (modal) style —
							centered, backdropped, and focus-trapped. It is a single fused bond, and these atoms
							are the very same Popover/Dialog components, reused.
						</p>
					</PopoverDialog.Body>
					<div class="flex justify-end gap-4 px-8 pt-2">
						<Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
						<Button variant="primary" onclick={() => (open = false)}>Confirm</Button>
					</div>
				</PopoverDialog.Content>
			</PopoverDialog.Root>
		</div>
	{/snippet}
</Story>

<!--
	Real-world: a destructive-action confirmation. The trigger sits in a settings row,
	and the fused Dialog presents a focus-trapped confirm step before deleting.
-->
<Story name="Delete Confirmation">
	<div class="mx-auto flex max-w-md flex-col p-8">
		<div class="border-border flex items-center justify-between rounded-lg border px-4 py-3">
			<div>
				<p class="text-foreground text-sm font-medium">Delete project</p>
				<p class="text-muted-foreground text-xs">This permanently removes all data.</p>
			</div>

			<PopoverDialog.Root bind:open={demoOpen}>
				<PopoverDialog.Trigger base={Button} variant="ghost">Delete</PopoverDialog.Trigger>

				<PopoverDialog.Content>
					<PopoverDialog.Header>Delete this project?</PopoverDialog.Header>
					<PopoverDialog.Body>
						<p class="text-muted-foreground text-sm">
							This action cannot be undone. All boards, tasks, and files will be permanently
							deleted.
						</p>
					</PopoverDialog.Body>
					<div class="flex justify-end gap-3 px-8 pt-2">
						<Button variant="ghost" onclick={() => (demoOpen = false)}>Cancel</Button>
						<Button variant="destructive" onclick={() => (demoOpen = false)}>Delete</Button>
					</div>
				</PopoverDialog.Content>
			</PopoverDialog.Root>
		</div>
	</div>
</Story>
