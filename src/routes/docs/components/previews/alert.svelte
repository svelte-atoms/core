<script lang="ts">
	import { Alert } from '$lib/components/alert';
	import { cn } from '$lib/utils';

	const alertGridAreas = `"icon title" ". description"`;
	const alertGridCols = `auto 1fr`;
</script>

{#snippet alertLayout({ children: alertChildren, class: klass, ...args }: any)}
	<div
		{...args}
		class={cn(klass, 'grid items-center')}
		style:grid-template-areas={alertGridAreas}
		style:grid-template-columns={alertGridCols}
	>
		{@render alertChildren?.()}
	</div>
{/snippet}

<div class="w-60">
	<Alert.Root base={alertLayout} variant="primary">
		<Alert.Icon>
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
			</svg>
		</Alert.Icon>
		<Alert.Title class="text-sm font-medium">Update available</Alert.Title>
		<Alert.Description class="text-xs">Version 2.0 is ready to install.</Alert.Description>
		<Alert.Content></Alert.Content>
	</Alert.Root>
</div>
