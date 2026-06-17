<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Toast as Toast_, Toaster } from '.';
	import { Button } from '../button';

	const { Story } = defineMeta({
		title: 'Atoms/Toast',
		parameters: {
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	interface ToastData {
		title: string;
		description?: string;
	}

	const toaster = new Toaster();

	let declarativeOpen = $state(false);
	let autoDismissOpen = $state(false);
</script>

<!-- Wires the Toaster manager's item list to Toast.Root. -->
<Story name="Custom toaster">
	<div class="flex h-screen flex-col items-center justify-center gap-4">
		<div class="flex flex-wrap justify-center gap-2">
			<Button onclick={() => toaster.add('default', { data: { title: 'Hello!' } as ToastData })}>Default</Button>
			<Button onclick={() => toaster.add('info', { data: { title: 'Heads up', description: 'Just a heads up.' } as ToastData })}>Info</Button>
			<Button onclick={() => toaster.add('success', { data: { title: 'Saved!', description: 'Changes persisted.' } as ToastData })}>Success</Button>
			<Button onclick={() => toaster.add('warning', { data: { title: 'Careful', description: 'Storage almost full.' } as ToastData })}>Warning</Button>
			<Button onclick={() => toaster.add('error', { data: { title: 'Error', description: 'Something went wrong.' } as ToastData })}>Error</Button>
			<Button onclick={() => toaster.clear()}>Clear all</Button>
		</div>
	</div>

	<!-- Custom toaster: position + render loop are fully in user-land -->
	<ol class="fixed bottom-4 right-4 flex flex-col-reverse gap-2" aria-live="polite">
		{#each toaster.toasts as item (item.id)}
			{@const data = item.data as ToastData}
			<Toast_.Root
				open={true}
				onclose={() => toaster.dismiss(item.id)}
				class="relative flex w-80 flex-col gap-1 rounded-md border border-border bg-card p-4 pr-8 shadow-md"
			>
				<Toast_.Title class="text-sm font-medium leading-tight">{data.title}</Toast_.Title>
				{#if data.description}
					<Toast_.Description class="text-sm opacity-80">{data.description}</Toast_.Description>
				{/if}
				<Toast_.Close
					class="absolute top-2 right-2 rounded p-1 opacity-50 transition-opacity hover:opacity-100"
				/>
			</Toast_.Root>
		{/each}
	</ol>
</Story>

<!-- Auto-dismiss: manager removes toasts after the duration. -->
<Story name="Auto-dismiss">
	<div class="flex h-screen flex-col items-center justify-center gap-4">
		<Button onclick={() => toaster.add('default', { duration: 3000, data: { title: 'Auto-dismiss', description: 'Gone in 3 seconds.' } as ToastData })}>
			Trigger 3s toast
		</Button>
	</div>

	<ol class="fixed bottom-4 right-4 flex flex-col-reverse gap-2" aria-live="polite">
		{#each toaster.toasts as item (item.id)}
			{@const data = item.data as ToastData}
			<Toast_.Root
				open={true}
				onclose={() => toaster.dismiss(item.id)}
				class="relative flex w-80 flex-col gap-1 rounded-md border border-border bg-card p-4 pr-8 shadow-md"
			>
				<Toast_.Title class="text-sm font-medium leading-tight">{data.title}</Toast_.Title>
				{#if data.description}
					<Toast_.Description class="text-sm opacity-80">{data.description}</Toast_.Description>
				{/if}
				<Toast_.Close
					class="absolute top-2 right-2 rounded p-1 opacity-50 transition-opacity hover:opacity-100"
				/>
			</Toast_.Root>
		{/each}
	</ol>
</Story>

<!-- Declarative: Toast.Root owned by markup, no manager. -->
<Story name="Declarative">
	<div class="flex h-screen flex-col items-center justify-center gap-6">
		<div class="flex gap-2">
			<Button onclick={() => (declarativeOpen = !declarativeOpen)}>
				{declarativeOpen ? 'Hide' : 'Show'} toast
			</Button>
			<Button onclick={() => (autoDismissOpen = true)}>Trigger 3s toast</Button>
		</div>

		<Toast_.Root
			bind:open={declarativeOpen}
			duration={0}
			class="relative flex w-80 flex-col gap-1 rounded-md border border-border bg-card p-4 pr-8 shadow-md"
		>
			<Toast_.Title class="text-sm font-medium leading-tight">Declarative toast</Toast_.Title>
			<Toast_.Description class="text-sm opacity-80">
				Fully owned by markup — no manager required.
			</Toast_.Description>
			<Toast_.Close class="absolute top-2 right-2 rounded p-1 opacity-50 transition-opacity hover:opacity-100" />
		</Toast_.Root>

		<Toast_.Root
			bind:open={autoDismissOpen}
			duration={3000}
			onclose={() => (autoDismissOpen = false)}
			class="relative flex w-80 flex-col gap-1 rounded-md border border-border bg-card p-4 pr-8 shadow-md"
		>
			<Toast_.Title class="text-sm font-medium leading-tight">Auto-dismiss</Toast_.Title>
			<Toast_.Description class="text-sm opacity-80">Disappears after 3 seconds.</Toast_.Description>
			<Toast_.Close class="absolute top-2 right-2 rounded p-1 opacity-50 transition-opacity hover:opacity-100" />
		</Toast_.Root>
	</div>
</Story>
