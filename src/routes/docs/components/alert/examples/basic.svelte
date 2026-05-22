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

<Alert.Root base={alertLayout} variant="primary">
	<Alert.Icon>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
			<circle cx="12" cy="12" r="10"></circle>
			<path d="M12 16v-4M12 8h.01"></path>
		</svg>
	</Alert.Icon>
	<Alert.Title>New Feature Available</Alert.Title>
	<Alert.Description>We've added dark mode support to your dashboard.</Alert.Description>
	<Alert.Content></Alert.Content>
</Alert.Root>
