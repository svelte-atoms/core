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
		Props,
		CodeBlock
	} from '$docs/components';
	import { textareaRootProps, textareaInputProps } from './props';

	const basicCode = `<Textarea.Root>
  <Textarea.Control placeholder="Enter your message..." />
</Textarea.Root>`;

	const rowsCode = `<Textarea.Root>
  <Textarea.Control rows={3} placeholder="Small (3 rows)" class="max-w-lg" />
</Textarea.Root>
<Textarea.Root>
  <Textarea.Control rows={6} placeholder="Medium (6 rows)" class="max-w-lg" />
</Textarea.Root>
<Textarea.Root>
  <Textarea.Control rows={10} placeholder="Large (10 rows)" class="max-w-lg" />
</Textarea.Root>`;

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

	<Section
		title="Preset Configuration"
		description="Customize the textarea appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Textarea components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core/context';

setPreset({
  'textarea.root': () => ({
    class: 'w-full'
  }),
  'textarea.control': () => ({
    class: 'flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different textarea variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Textarea"
				description="Simple multi-line text input"
				code={basicCode}
			>
				<Textarea.Root>
					<Textarea.Control placeholder="Enter your message..." class="" />
				</Textarea.Root>
			</DemoExample>

			<DemoExample title="Different Sizes" description="Control height with rows" code={rowsCode}>
				<div class="max-w-lg space-y-4">
					<Textarea.Root>
						<Textarea.Control rows={3} placeholder="Small (3 rows)" class="max-w-lg" />
					</Textarea.Root>
					<Textarea.Root>
						<Textarea.Control rows={6} placeholder="Medium (6 rows)" class="max-w-lg" />
					</Textarea.Root>
					<Textarea.Root>
						<Textarea.Control rows={10} placeholder="Large (10 rows)" class="max-w-lg" />
					</Textarea.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="With Character Limit"
				description="Show remaining characters"
				code={`<script lang="ts">
  let message = $state('');
  const maxLength = 200;
<\/script>

<Textarea.Root>
  <Textarea.Control 
    bind:value={message} 
    maxlength={maxLength} 
    placeholder="Maximum 200 characters" 
  />
</Textarea.Root>
<p class="text-muted-foreground text-right text-sm">
  {message.length} / {maxLength}
</p>`}
			>
				<div class="max-w-lg space-y-2">
					<Textarea.Root>
						<Textarea.Control
							bind:value={message}
							maxlength={maxLength}
							placeholder="Maximum 200 characters"
						/>
					</Textarea.Root>
					<p class="text-muted-foreground text-right text-sm">
						{message.length} / {maxLength}
					</p>
				</div>
			</DemoExample>

			<DemoExample
				title="Disabled State"
				description="Non-editable textarea"
				code={`<Textarea.Root>
  <Textarea.Control disabled value="This textarea is disabled" />
</Textarea.Root>`}
			>
				<Textarea.Root>
					<Textarea.Control disabled value="This textarea is disabled" class="" />
				</Textarea.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Textarea.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">Container for the textarea component.</p>
				<Props data={textareaRootProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Textarea.Control</h3>
				<p class="text-muted-foreground mb-4 text-sm">The actual textarea element.</p>
				<Props data={textareaInputProps} />
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
