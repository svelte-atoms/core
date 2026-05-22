<script lang="ts">
	import { Alert } from '$lib/components/alert';
	import { Icon } from '$lib/components/icon';
	import { Button } from '$lib/components/button';
	import { cn } from '$lib/utils';

	let dismissed = $state(false);
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
	{#if !dismissed}
		<Alert.Root base={alertLayout} variant="primary">
			<Alert.Icon>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
					<circle cx="12" cy="12" r="10"></circle>
					<path d="M12 16v-4M12 8h.01"></path>
				</svg>
			</Alert.Icon>
			<Alert.Title>Cookie Preferences</Alert.Title>
			<Alert.Description>We use cookies to enhance your experience.</Alert.Description>
			<Alert.Content></Alert.Content>
			<Alert.CloseButton onclick={() => (dismissed = true)}>
				<Icon class="h-full">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</Icon>
			</Alert.CloseButton>
		</Alert.Root>
	{:else}
		<Button onclick={() => (dismissed = false)}>Restore Alert</Button>
	{/if}
</div>
