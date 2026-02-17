<script lang="ts">
	import { Popover } from '$lib/components/popover';
	import { Button } from '$lib/components/button';
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
	import {
		popoverArrowProps,
		popoverContentProps,
		popoverRootProps,
		popoverTriggerProps,
		popoverIndicatorProps
	} from './props';
	import { metadata } from './shared';

	let isOpen = $state(false);
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={metadata.breadcrumbs} />

	<PageHeader
		title={metadata.componentTitle}
		description={metadata.componentDescription}
		status={metadata.status}
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName={metadata.packageName}
			importCode={metadata.importCode}
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the popover appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Popover components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={metadata.examples.preset}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different popover variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Popover" description="Simple popover with content" code={metadata.examples.basic}>
				<Popover.Root>
					<Popover.Trigger base={Button}>Open Popover</Popover.Trigger>
					<Popover.Content>
						<div class="max-w-xs p-4">
							<h4 class="mb-2 font-semibold">Popover Title</h4>
							<p class="text-muted-foreground text-sm">
								This is the popover content with some helpful information.
							</p>
						</div>
					</Popover.Content>
				</Popover.Root>
			</DemoExample>

			<DemoExample
				title="Popover Positions"
				description="Control popover placement"
				code={metadata.examples.positions}
			>
				<div class="flex flex-wrap gap-4">
					<Popover.Root placement="top">
						<Popover.Trigger base={Button} variant="outline">Top</Popover.Trigger>
						<Popover.Content>
							<div class="p-3 text-sm">Top popover</div>
						</Popover.Content>
					</Popover.Root>
					<Popover.Root placement="bottom">
						<Popover.Trigger base={Button} variant="outline">Bottom</Popover.Trigger>
						<Popover.Content>
							<div class="p-3 text-sm">Bottom popover</div>
						</Popover.Content>
					</Popover.Root>
					<Popover.Root placement="left">
						<Popover.Trigger base={Button} variant="outline">Left</Popover.Trigger>
						<Popover.Content>
							<div class="p-3 text-sm">Left popover</div>
						</Popover.Content>
					</Popover.Root>
					<Popover.Root placement="right">
						<Popover.Trigger base={Button} variant="outline">Right</Popover.Trigger>
						<Popover.Content>
							<div class="p-3 text-sm">Right popover</div>
						</Popover.Content>
					</Popover.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="User Account Menu"
				description="Real-world example with controlled state and close button"
				code={metadata.examples.controlled}
			>
				<div class="space-y-4">
					<Popover.Root bind:open={isOpen}>
						<Popover.Trigger base={Button} variant="outline">Account Settings</Popover.Trigger>
						<Popover.Content>
							<div class="w-80 p-4">
								<div class="mb-4 flex items-start justify-between">
									<div>
										<h4 class="font-semibold">User Account</h4>
										<p class="text-muted-foreground text-sm">Manage your account settings</p>
									</div>
									<Button size="sm" variant="ghost" onclick={() => (isOpen = false)}>✕</Button>
								</div>

								<div class="space-y-3">
									<div class="flex items-center gap-3">
										<div
											class="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full"
										>
											JD
										</div>
										<div>
											<p class="text-sm font-medium">John Doe</p>
											<p class="text-muted-foreground text-xs">john.doe@example.com</p>
										</div>
									</div>

									<div class="border-border border-t pt-3">
										<Button variant="outline" size="sm" class="w-full">Edit Profile</Button>
									</div>
								</div>
							</div>
						</Popover.Content>
					</Popover.Root>
					<p class="text-muted-foreground text-sm">
						Popover is {isOpen ? 'open' : 'closed'}
					</p>
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Popover.Root Props</h3>
				<Props data={[...popoverRootProps]} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Popover.Trigger Props</h3>
				<Props data={[...popoverTriggerProps]} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Popover.Content Props</h3>
				<Props data={[...popoverContentProps]} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Popover.Indicator Props</h3>
				<Props data={[...popoverIndicatorProps]} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Popover.Arrow Props</h3>
				<Props data={[...popoverArrowProps]} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={metadata.accessibility}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Menu', href: '/docs/components/menu' }}
		next={{ label: 'Radio', href: '/docs/components/radio' }}
	/>
</div>
