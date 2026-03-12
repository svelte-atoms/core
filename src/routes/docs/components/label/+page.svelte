<script lang="ts">
	import { Label } from '$lib/components/label';
	import { Input } from '$lib/components/input';
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
	import { labelProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, required: requiredCode } = metadata.examples;
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
			<Section.Subtitle>Customize the label appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Label components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  label: () => ({
    class: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  })
});`}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different label variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Label" description="Simple label with input" code={basicCode}>
				<div class="max-w-sm space-y-2">
					<Label for="email">Email Address</Label>
					<Input.Root>
						<Input.Control
							id="email"
							type="email"
							placeholder="you@example.com"
							class="px-3 py-2"
						/>
					</Input.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Required Field"
				description="Mark required fields clearly"
				code={requiredCode}
			>
				<div class="max-w-sm space-y-2">
					<Label for="username">
						Username <span class="text-red-500">*</span>
					</Label>
					<Input.Root>
						<Input.Control id="username" required placeholder="johndoe" class="px-3 py-2" />
					</Input.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="With Description"
				description="Add helpful text below label"
				code={`<Label for="bio">Bio</Label>
<p class="text-sm text-muted-foreground">
  Tell us about yourself
</p>
<Input.Root>
  <Input.Control id="bio" />
</Input.Root>`}
			>
				<div class="max-w-sm space-y-2">
					<Label for="bio">Bio</Label>
					<p class="text-muted-foreground text-sm">Tell us about yourself</p>
					<Input.Root>
						<Input.Control id="bio" placeholder="I'm a developer..." class="px-3 py-2" />
					</Input.Root>
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">Label Props</h3>
				<Props data={labelProps} />
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
		prev={{ label: 'Input', href: '/docs/components/input' }}
		next={{ label: 'Link', href: '/docs/components/link' }}
	/>
</div>
