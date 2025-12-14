<script lang="ts">
	import { Alert } from '$lib/components/alert';
	import { Button } from '$lib/components/button';
	import { Icon } from '$lib/components/icon';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props,
		CodeBlock
	} from '$docs/components';
	import { cn } from '$lib/utils';
	import {
		alertRootProps,
		alertActionsProps,
		alertContentProps,
		alertDescriptionProps,
		alertIconProps,
		alertTitleProps
	} from './props';

	let dismissed = $state(false);

	const basicCode = `<script>
  import { Alert } from '@svelte-atoms/core';
<\/script>

<Alert.Root variant="primary">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4M12 8h.01"></path>
    </svg>
  </Alert.Icon>
  <Alert.Title>New Feature Available</Alert.Title>
  <Alert.Description>
    We've added dark mode support to your dashboard.
  </Alert.Description>
</Alert.Root>`;

	const variantsCode = `<Alert.Root variant="primary">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4M12 8h.01"></path>
    </svg>
  </Alert.Icon>
  <Alert.Title>Primary Alert</Alert.Title>
  <Alert.Description>This is a primary alert message.</Alert.Description>
</Alert.Root>

<Alert.Root variant="secondary">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  </Alert.Icon>
  <Alert.Title>Secondary Alert</Alert.Title>
  <Alert.Description>This is a secondary alert message.</Alert.Description>
</Alert.Root>

<Alert.Root variant="destructive">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  </Alert.Icon>
  <Alert.Title>Destructive Alert</Alert.Title>
  <Alert.Description>This is a destructive alert message.</Alert.Description>
</Alert.Root>`;

	const dismissibleCode = `<script>
  let dismissed = $state(false);
<\/script>

<Alert.Root variant="primary" dismissible bind:dismissed>
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4M12 8h.01"></path>
    </svg>
  </Alert.Icon>
  <Alert.Title>Dismissible Alert</Alert.Title>
  <Alert.Description>
    You can dismiss this alert by clicking the close button.
  </Alert.Description>
  <Alert.CloseButton>
    <Icon class="h-full">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </Icon>
  </Alert.CloseButton>
</Alert.Root>`;

	const actionsCode = `<Alert.Root variant="primary">
  <Alert.Icon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  </Alert.Icon>
  <Alert.Title>System Update Available</Alert.Title>
  <Alert.Description>
    A new version is ready to install.
  </Alert.Description>
  <Alert.Actions>
    <Button variant="primary" size="sm">Update Now</Button>
    <Button variant="ghost" size="sm">Remind Me Later</Button>
  </Alert.Actions>
</Alert.Root>`;
</script>

<svelte:head>
	<title>Alert - Svelte Atoms</title>
	<meta name="description" content="Display important messages and notifications to users." />
</svelte:head>

{#snippet alertLayout({ children, class: klass, ...args })}
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

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Alert' }]} />

	<PageHeader
		title="Alert"
		description="Display important messages and notifications to users. Alerts provide contextual feedback for user actions."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Alert &#125; from '@svelte-atoms/core/alert';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the alert appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Alert components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  alert: () => ({
    class: 'relative gap-1 rounded-md border p-4 transition-all duration-200',
    variants: {
      variant: {
        primary: {
          class: 'bg-primary/10 text-primary border-primary'
        },
        secondary: {
          class: 'bg-secondary text-secondary-foreground'
        },
        destructive: {
          class: 'bg-destructive text-destructive-foreground'
        },
        outline: {
          class: 'bg-transparent border border-border'
        },
        ghost: {
          class: 'bg-transparent'
        }
      }
    },
    defaults: {
      variant: 'primary'
    }
  }),
  'alert.icon': () => ({
    class: 'inline-flex aspect-square size-4 shrink-0 items-center justify-center'
  }),
  'alert.title': () => ({
    class: 'text-md font-semibold leading-tight'
  }),
  'alert.description': () => ({
    class: 'text-sm leading-relaxed opacity-90'
  }),
  'alert.content': () => ({
    class: 'flex-1 space-y-1'
  }),
  'alert.actions': () => ({
    class: 'mt-3 flex items-center gap-2'
  }),
  'alert.close-button': () => ({
    class: 'rounded-md p-0.5 size-6 opacity-70 transition-all hover:opacity-100'
  })
});`}
			/>
			<div class="bg-muted/50 border-border rounded-lg border p-4">
				<h4 class="text-foreground mb-2 text-sm font-semibold">Available Preset Keys</h4>
				<ul class="text-muted-foreground space-y-1 text-sm">
					<li>
						<code class="bg-background rounded px-1.5 py-0.5">alert</code> - Root container styles and
						variants
					</li>
					<li>
						<code class="bg-background rounded px-1.5 py-0.5">alert.icon</code> - Icon container styles
					</li>
					<li>
						<code class="bg-background rounded px-1.5 py-0.5">alert.title</code> - Title text styles
					</li>
					<li>
						<code class="bg-background rounded px-1.5 py-0.5">alert.description</code> - Description
						text styles
					</li>
					<li>
						<code class="bg-background rounded px-1.5 py-0.5">alert.content</code> - Content container
						styles
					</li>
					<li>
						<code class="bg-background rounded px-1.5 py-0.5">alert.actions</code> - Actions container
						styles
					</li>
					<li>
						<code class="bg-background rounded px-1.5 py-0.5">alert.close-button</code> - Close button
						styles
					</li>
				</ul>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different alert variations and use cases">
		<div class="space-y-8">
			<DemoExample
				title="Basic Alert"
				description="Simple alert with icon and title"
				code={basicCode}
			>
				<Alert.Root base={alertLayout} variant="primary">
					<Alert.Icon>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="h-4 w-4"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<path d="M12 16v-4M12 8h.01"></path>
						</svg>
					</Alert.Icon>
					<Alert.Title>New Feature Available</Alert.Title>
					<Alert.Description>
						We've added dark mode support to your dashboard. Try it out in the settings panel.
					</Alert.Description>
					<Alert.Content></Alert.Content>
				</Alert.Root>
			</DemoExample>

			<DemoExample
				title="Alert Variants"
				description="Different alert styles for various contexts"
				code={variantsCode}
			>
				<div class="space-y-4">
					<Alert.Root base={alertLayout} variant="primary">
						<Alert.Icon>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="h-4 w-4"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<path d="M12 16v-4M12 8h.01"></path>
							</svg>
						</Alert.Icon>
						<Alert.Title>Primary Alert</Alert.Title>
						<Alert.Description>
							This is a primary alert message for important information.
						</Alert.Description>
						<Alert.Content></Alert.Content>
					</Alert.Root>

					<Alert.Root base={alertLayout} variant="secondary">
						<Alert.Icon>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="h-4 w-4"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</Alert.Icon>
						<Alert.Title>Secondary Alert</Alert.Title>
						<Alert.Description
							>This is a secondary alert for general notifications.</Alert.Description
						>
						<Alert.Content></Alert.Content>
					</Alert.Root>

					<Alert.Root base={alertLayout} variant="destructive">
						<Alert.Icon>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="h-4 w-4"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="15" y1="9" x2="9" y2="15"></line>
								<line x1="9" y1="9" x2="15" y2="15"></line>
							</svg>
						</Alert.Icon>
						<Alert.Title>Destructive Alert</Alert.Title>
						<Alert.Description
							>This is a destructive alert for errors and warnings.</Alert.Description
						>
						<Alert.Content></Alert.Content>
					</Alert.Root>

					<Alert.Root base={alertLayout} variant="outline">
						<Alert.Icon>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="h-4 w-4"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<path d="M12 16v-4M12 8h.01"></path>
							</svg>
						</Alert.Icon>
						<Alert.Title>Outline Alert</Alert.Title>
						<Alert.Description>This is an outline alert with a border.</Alert.Description>
						<Alert.Content></Alert.Content>
					</Alert.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Dismissible Alert"
				description="Alert with close button"
				code={dismissibleCode}
			>
				<div class="space-y-4">
					{#if !dismissed}
						<Alert.Root base={alertLayout} variant="primary">
							<Alert.Icon>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									class="h-4 w-4"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<path d="M12 16v-4M12 8h.01"></path>
								</svg>
							</Alert.Icon>
							<Alert.Title>Cookie Preferences</Alert.Title>
							<Alert.Description>
								We use cookies to enhance your experience. You can manage your preferences in
								settings.
							</Alert.Description>
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
			</DemoExample>

			<DemoExample
				title="Alert with Actions"
				description="Alert with action buttons"
				code={actionsCode}
			>
				<Alert.Root base={alertLayout} variant="primary">
					<Alert.Icon>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="h-4 w-4"
						>
							<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
							<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
						</svg>
					</Alert.Icon>
					<Alert.Title>System Update Available</Alert.Title>
					<Alert.Description>
						A new version is ready to install. Update now to get the latest features and security
						improvements.
					</Alert.Description>
					<Alert.Actions>
						<Button variant="primary" size="sm">Update Now</Button>
						<Button variant="ghost" size="sm">Remind Me Later</Button>
					</Alert.Actions>
					<Alert.Content></Alert.Content>
				</Alert.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Alert.Root Props</h3>
				<Props data={alertRootProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Alert.Title Props</h3>
				<Props data={alertTitleProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Alert.Actions Props</h3>
				<Props data={alertActionsProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Alert.Content Props</h3>
				<Props data={alertContentProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Alert.Description Props</h3>
				<Props data={alertDescriptionProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Alert.Icon Props</h3>
				<Props data={alertIconProps} />
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Uses appropriate ARIA role attributes',
				'Semantic HTML structure with proper heading hierarchy',
				'Sufficient color contrast ratios for all variants',
				'Keyboard accessible dismiss button with focus indicators',
				'Screen reader announcements for alert content',
				'Support for assistive technologies'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Accordion', href: '/docs/components/accordion' }}
		next={{ label: 'Avatar', href: '/docs/components/avatar' }}
	/>
</div>
