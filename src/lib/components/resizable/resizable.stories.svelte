<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'ATOMS/Resizable'
	});
</script>

<script lang="ts">
	import { Resizable } from '.';
</script>

<Story name="Horizontal Split">
	{#snippet template()}
		<Resizable.Root class="h-48 w-full rounded-lg border">
			<Resizable.Panel defaultSize={40}>
				<div class="flex h-full items-center justify-center p-4">
					<p class="text-muted-foreground text-sm">Left panel</p>
				</div>
			</Resizable.Panel>
			<Resizable.Handle />
			<Resizable.Panel defaultSize={60}>
				<div class="flex h-full items-center justify-center p-4">
					<p class="text-muted-foreground text-sm">Right panel</p>
				</div>
			</Resizable.Panel>
		</Resizable.Root>
	{/snippet}
</Story>

<Story name="Vertical Split">
	{#snippet template()}
		<Resizable.Root direction="vertical" class="h-64 w-full rounded-lg border">
			<Resizable.Panel defaultSize={40}>
				<div class="flex h-full items-center justify-center p-4">
					<p class="text-muted-foreground text-sm">Top panel</p>
				</div>
			</Resizable.Panel>
			<Resizable.Handle />
			<Resizable.Panel defaultSize={60}>
				<div class="flex h-full items-center justify-center p-4">
					<p class="text-muted-foreground text-sm">Bottom panel</p>
				</div>
			</Resizable.Panel>
		</Resizable.Root>
	{/snippet}
</Story>

<Story name="Three Panels">
	{#snippet template()}
		<Resizable.Root class="h-48 w-full rounded-lg border">
			<Resizable.Panel defaultSize={20} minSize={15}>
				<div class="flex h-full items-center justify-center p-2">
					<p class="text-muted-foreground text-xs">Sidebar</p>
				</div>
			</Resizable.Panel>
			<Resizable.Handle />
			<Resizable.Panel defaultSize={60}>
				<div class="flex h-full items-center justify-center p-4">
					<p class="text-muted-foreground text-sm">Main</p>
				</div>
			</Resizable.Panel>
			<Resizable.Handle />
			<Resizable.Panel defaultSize={20} minSize={15}>
				<div class="flex h-full items-center justify-center p-2">
					<p class="text-muted-foreground text-xs">Inspector</p>
				</div>
			</Resizable.Panel>
		</Resizable.Root>
	{/snippet}
</Story>

<Story name="Custom Handle">
	{#snippet template()}
		<Resizable.Root class="h-48 w-full rounded-lg border">
			<Resizable.Panel defaultSize={50}>
				<div class="flex h-full items-center justify-center p-4">
					<p class="text-muted-foreground text-sm">Panel A</p>
				</div>
			</Resizable.Panel>
			<Resizable.Handle>
				{#snippet handleContent()}
					<div class="bg-border hover:bg-foreground/30 flex h-full w-3 cursor-col-resize items-center justify-center transition-colors">
						<span class="text-muted-foreground text-xs">⋮</span>
					</div>
				{/snippet}
			</Resizable.Handle>
			<Resizable.Panel defaultSize={50}>
				<div class="flex h-full items-center justify-center p-4">
					<p class="text-muted-foreground text-sm">Panel B</p>
				</div>
			</Resizable.Panel>
		</Resizable.Root>
	{/snippet}
</Story>
