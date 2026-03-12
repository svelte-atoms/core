<script lang="ts">
	import { Avatar } from '$lib/components/avatar';
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
	import { avatarProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, sizes: sizesCode, fallback: fallbackCode, group: groupCode, preset: presetCode } = metadata.examples;
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="py-8">
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
			<Section.Subtitle>Customize the avatar appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Avatar components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  avatar: () => ({
    class: 'inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground overflow-hidden',
    variants: {
      size: {
        sm: { class: 'h-8 w-8 text-xs' },
        md: { class: 'h-10 w-10 text-sm' },
        lg: { class: 'h-12 w-12 text-base' },
        xl: { class: 'h-16 w-16 text-lg' }
      }
    },
    defaults: {
      size: 'md'
    }
  })
});`}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different avatar variations and use cases</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Avatar" description="Simple avatar with image" code={basicCode}>
				<Avatar src="https://i.pravatar.cc/150?img=1" alt="User name" />
			</DemoExample>

			<DemoExample
				title="Avatar Sizes"
				description="Different sizes for various contexts"
				code={sizesCode}
			>
				<div class="flex items-center gap-4">
					<Avatar size="sm" src="https://i.pravatar.cc/150?img=2" alt="Small" />
					<Avatar size="md" src="https://i.pravatar.cc/150?img=3" alt="Medium" />
					<Avatar size="lg" src="https://i.pravatar.cc/150?img=4" alt="Large" />
					<Avatar size="xl" src="https://i.pravatar.cc/150?img=5" alt="Extra Large" />
				</div>
			</DemoExample>

			<DemoExample
				title="Fallback Initials"
				description="Automatic initials when no image is provided"
				code={fallbackCode}
			>
				<div class="flex items-center gap-4">
					<Avatar alt="John Doe" />
					<Avatar alt="Jane Smith" />
				</div>
			</DemoExample>

			<DemoExample
				title="Avatar Group"
				description="Display multiple avatars in a group"
				code={groupCode}
			>
				<div class="flex -space-x-2">
					<Avatar src="https://i.pravatar.cc/150?img=6" alt="User 1" />
					<Avatar src="https://i.pravatar.cc/150?img=7" alt="User 2" />
					<Avatar src="https://i.pravatar.cc/150?img=8" alt="User 3" />
					<Avatar>+5</Avatar>
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">Avatar Props</h3>
				<Props data={avatarProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={[
				'Proper alt text for images',
				'Meaningful fallback initials',
				'Adequate color contrast for initials',
				'Semantic img element usage',
				'ARIA labels when needed'
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Alert', href: '/docs/components/alert' }}
		next={{ label: 'Badge', href: '/docs/components/badge' }}
	/>
</div>
