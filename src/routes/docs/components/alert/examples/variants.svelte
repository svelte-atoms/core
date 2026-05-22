<script lang="ts">
	import { Alert } from '$lib/components/alert';
	import { cn } from '$lib/utils';
</script>

{#snippet alertLayout({ children, class: klass, ...args }: any)}
	{@const gridTemplateAreas = `"icon title close-button" ". description description" "content content content" "actions actions actions"`}
	{@const gridTemplateColumns = `auto 1fr auto`}
	<div
		{...args}
		class={cn(klass, 'grid items-center')}
		style:grid-template-areas={gridTemplateAreas}
		style:grid-template-columns={gridTemplateColumns}
	>
		{@render children?.()}
	</div>
{/snippet}

<div class="space-y-4">
	<Alert.Root base={alertLayout} variant="primary">
		<Alert.Icon>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
				<circle cx="12" cy="12" r="10"></circle>
				<path d="M12 16v-4M12 8h.01"></path>
			</svg>
		</Alert.Icon>
		<Alert.Title>Primary Alert</Alert.Title>
		<Alert.Description>This is a primary alert message.</Alert.Description>
		<Alert.Content></Alert.Content>
	</Alert.Root>
	<Alert.Root base={alertLayout} variant="secondary">
		<Alert.Icon>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
				<polyline points="22 4 12 14.01 9 11.01"></polyline>
			</svg>
		</Alert.Icon>
		<Alert.Title>Secondary Alert</Alert.Title>
		<Alert.Description>This is a secondary alert message.</Alert.Description>
		<Alert.Content></Alert.Content>
	</Alert.Root>
	<Alert.Root base={alertLayout} variant="destructive">
		<Alert.Icon>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="15" y1="9" x2="9" y2="15"></line>
				<line x1="9" y1="9" x2="15" y2="15"></line>
			</svg>
		</Alert.Icon>
		<Alert.Title>Destructive Alert</Alert.Title>
		<Alert.Description>This is a destructive alert message.</Alert.Description>
		<Alert.Content></Alert.Content>
	</Alert.Root>
</div>
