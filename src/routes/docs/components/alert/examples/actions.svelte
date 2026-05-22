<script lang="ts">
	import { Alert } from '$lib/components/alert';
	import { Button } from '$lib/components/button';
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

<Alert.Root base={alertLayout} variant="primary">
	<Alert.Icon>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
			<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
			<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
		</svg>
	</Alert.Icon>
	<Alert.Title>System Update Available</Alert.Title>
	<Alert.Description>A new version is ready to install.</Alert.Description>
	<Alert.Actions>
		<Button variant="primary" size="sm">Update Now</Button>
		<Button variant="ghost" size="sm">Remind Me Later</Button>
	</Alert.Actions>
	<Alert.Content></Alert.Content>
</Alert.Root>
