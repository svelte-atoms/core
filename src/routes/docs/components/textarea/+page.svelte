<script lang="ts">
	import { Textarea } from '$lib/components/textarea';
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

	const basicCode = `<Textarea placeholder="Enter your message..." />`;

	const rowsCode = `<Textarea rows={3} placeholder="3 rows" />
<Textarea rows={6} placeholder="6 rows" />`;

	let message = $state('');
	const maxLength = 200;
</script>

<svelte:head>
	<title>Textarea - Svelte Atoms</title>
	<meta name="description" content="Multi-line text input field." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Textarea' }]} />

	<PageHeader
		title="Textarea"
		description="Multi-line text input field for longer user input. Supports various sizes and auto-resizing."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Textarea &#125; from '@svelte-atoms/core/textarea';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the textarea appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Textarea components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  textarea: () => ({
    class: 'flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different textarea variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Textarea"
				description="Simple multi-line text input"
				code={basicCode}
			>
				<Textarea placeholder="Enter your message..." class="max-w-lg" />
			</DemoExample>

			<DemoExample
				title="Different Sizes"
				description="Control height with rows"
				code={rowsCode}
			>
				<div class="space-y-4 max-w-lg">
					<Textarea rows={3} placeholder="Small (3 rows)" />
					<Textarea rows={6} placeholder="Medium (6 rows)" />
					<Textarea rows={10} placeholder="Large (10 rows)" />
				</div>
			</DemoExample>

			<DemoExample
				title="With Character Limit"
				description="Show remaining characters"
				code={`<script lang="ts">
  let message = $state('');
  const maxLength = 200;
<\/script>

<Textarea bind:value={message} maxlength={maxLength} />
<p>{message.length} / {maxLength}</p>`}
			>
				<div class="max-w-lg space-y-2">
					<Textarea 
						bind:value={message}
						maxlength={maxLength}
						placeholder="Maximum 200 characters"
					/>
					<p class="text-muted-foreground text-sm text-right">
						{message.length} / {maxLength}
					</p>
				</div>
			</DemoExample>

			<DemoExample
				title="Disabled State"
				description="Non-editable textarea"
				code={`<Textarea disabled placeholder="Disabled textarea" />`}
			>
				<Textarea 
					disabled 
					value="This textarea is disabled"
					class="max-w-lg"
				/>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Textarea Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: "''",
							description: 'Textarea value'
						},
						{
							name: 'placeholder',
							type: 'string',
							default: "''",
							description: 'Placeholder text'
						},
						{
							name: 'rows',
							type: 'number',
							default: '4',
							description: 'Number of rows'
						},
						{
							name: 'maxlength',
							type: 'number',
							default: '-',
							description: 'Character limit'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable textarea'
						},
						{
							name: 'readonly',
							type: 'boolean',
							default: 'false',
							description: 'Make read-only'
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
				'Proper label association',
				'Error message linking',
				'Keyboard accessible',
				'Resize handle visible',
				'Screen reader friendly'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Tabs', href: '/docs/components/tabs' }}
		next={{ label: 'Toast', href: '/docs/components/toast' }}
	/>
</div>
