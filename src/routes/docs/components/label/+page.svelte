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
		Props
	} from '$docs/components';

	const basicCode = `<Label for="email">Email Address</Label>
<Input id="email" type="email" />`;

	const requiredCode = `<Label for="username">
  Username <span class="text-red-500">*</span>
</Label>
<Input id="username" required />`;
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
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  label: () => ({
    class: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  })
});`}</code
					></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different label variations">
		<div class="space-y-8">
			<DemoExample title="Basic Label" description="Simple label with input" code={basicCode}>
				<div class="max-w-sm space-y-2">
					<Label for="email">Email Address</Label>
					<Input id="email" type="email" placeholder="you@example.com" />
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
					<Input id="username" required placeholder="johndoe" />
				</div>
			</DemoExample>

			<DemoExample
				title="With Description"
				description="Add helpful text below label"
				code={`<Label for="bio">Bio</Label>
<p class="text-sm text-muted-foreground">
  Tell us about yourself
</p>
<Input id="bio" />`}
			>
				<div class="max-w-sm space-y-2">
					<Label for="bio">Bio</Label>
					<p class="text-muted-foreground text-sm">Tell us about yourself</p>
					<Input id="bio" placeholder="I'm a developer..." />
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Label Props</h3>
				<Props
					data={[
						{
							name: 'for',
							type: 'string',
							default: '-',
							description: 'ID of associated form control'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
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
