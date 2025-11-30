<script lang="ts">
	import { Toast } from '$lib/components/toast';
	import { Button } from '$lib/components/button';
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

	const basicCode = `<script lang="ts">
  import { toast } from '@svelte-atoms/core/toast';
<\/script>

<button onclick={() => toast.show('Hello!')}>
  Show Toast
<\/button>`;

	let showToast = $state(false);
	let toastVariant = $state<'default' | 'success' | 'error' | 'warning'>('default');
</script>

<svelte:head>
	<title>Toast - Svelte Atoms</title>
	<meta name="description" content="Brief notification messages." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Toast' }]} />

	<PageHeader
		title="Toast"
		description="Brief notification messages that appear temporarily. Use for feedback after user actions."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Toast, toast &#125; from '@svelte-atoms/core/toast';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the toast appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Toast components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  toast: () => ({
    class: 'fixed z-50 flex w-full max-w-md items-center justify-between gap-2 rounded-lg border p-4 shadow-lg transition-all',
    variants: {
      variant: {
        default: { class: 'bg-background text-foreground' },
        success: { class: 'bg-green-50 text-green-900 border-green-200' },
        error: { class: 'bg-red-50 text-red-900 border-red-200' },
        warning: { class: 'bg-yellow-50 text-yellow-900 border-yellow-200' },
        info: { class: 'bg-blue-50 text-blue-900 border-blue-200' }
      }
    },
    defaults: {
      variant: 'default'
    }
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different toast notifications">
		<div class="space-y-8">
			<DemoExample
				title="Basic Toast"
				description="Simple notification"
				code={basicCode}
			>
				<Button onclick={() => { showToast = true; toastVariant = 'default'; }}>
					Show Toast
				</Button>
				{#if showToast && toastVariant === 'default'}
					<Toast 
						variant="default" 
						onclose={() => showToast = false}
					>
						This is a toast message
					</Toast>
				{/if}
			</DemoExample>

			<DemoExample
				title="Toast Variants"
				description="Different notification types"
				code={`<Toast variant="success">Success!</Toast>
<Toast variant="error">Error!</Toast>
<Toast variant="warning">Warning!</Toast>`}
			>
				<div class="flex flex-wrap gap-2">
					<Button 
						variant="outline"
						onclick={() => { showToast = true; toastVariant = 'success'; }}
					>
						Success
					</Button>
					<Button 
						variant="outline"
						onclick={() => { showToast = true; toastVariant = 'error'; }}
					>
						Error
					</Button>
					<Button 
						variant="outline"
						onclick={() => { showToast = true; toastVariant = 'warning'; }}
					>
						Warning
					</Button>
				</div>
				{#if showToast && toastVariant === 'success'}
					<Toast 
						variant="success" 
						onclose={() => showToast = false}
					>
						Operation completed successfully!
					</Toast>
				{:else if showToast && toastVariant === 'error'}
					<Toast 
						variant="error" 
						onclose={() => showToast = false}
					>
						Something went wrong!
					</Toast>
				{:else if showToast && toastVariant === 'warning'}
					<Toast 
						variant="warning" 
						onclose={() => showToast = false}
					>
						Please review your changes
					</Toast>
				{/if}
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Toast Props</h3>
				<Props
					data={[
						{
							name: 'variant',
							type: "'default' | 'success' | 'error' | 'warning'",
							default: "'default'",
							description: 'Toast variant'
						},
						{
							name: 'duration',
							type: 'number',
							default: '5000',
							description: 'Auto-dismiss time (ms)'
						},
						{
							name: 'closable',
							type: 'boolean',
							default: 'true',
							description: 'Show close button'
						},
						{
							name: 'onclose',
							type: '() => void',
							default: '-',
							description: 'Close callback'
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
				'Uses ARIA live regions',
				'role="status" for announcements',
				'Keyboard dismissible',
				'Respects prefers-reduced-motion',
				'Screen reader friendly'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Textarea', href: '/docs/components/textarea' }}
		next={{ label: 'Tooltip', href: '/docs/components/tooltip' }}
	/>
</div>
