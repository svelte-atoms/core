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

	const basicCode = `<Label for="email">Email Address</Label>
<Input.Root>
  <Input.Control id="email" type="email" />
</Input.Root>`;

	const requiredCode = `<Label for="username">
  Username <span class="text-red-500">*</span>
</Label>
<Input.Root>
  <Input.Control id="username" required />
</Input.Root>`;
</script>

<svelte:head>
	<title>Label - Svelte Atoms</title>
	<meta name="description" content="Label element for form controls." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Label' }]} />

	<PageHeader
		title="Label"
		description="Label element for form controls. Provides accessible names and improves usability."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Label &#125; from '@svelte-atoms/core/label';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the label appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Label components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  label: () => ({
    class: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different label variations">
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Label Props</h3>
				<Props data={labelProps} />
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Always use for attribute to associate with input',
				'Place labels consistently (before or after inputs)',
				'Make required fields clear to screen readers',
				'Use semantic label element',
				'Ensure sufficient color contrast'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Input', href: '/docs/components/input' }}
		next={{ label: 'Link', href: '/docs/components/link' }}
	/>
</div>
