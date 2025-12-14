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

	const basicCode = `<Avatar src="/avatar.jpg" alt="User name" />`;

	const sizesCode = `<Avatar size="sm" src="/avatar.jpg" alt="Small" />
<Avatar size="md" src="/avatar.jpg" alt="Medium" />
<Avatar size="lg" src="/avatar.jpg" alt="Large" />
<Avatar size="xl" src="/avatar.jpg" alt="Extra Large" />`;

	const fallbackCode = `<Avatar alt="John Doe" />
<Avatar alt="Jane Smith" />`;

	const groupCode = `<div class="flex -space-x-2">
  <Avatar src="/avatar1.jpg" alt="User 1" />
  <Avatar src="/avatar2.jpg" alt="User 2" />
  <Avatar src="/avatar3.jpg" alt="User 3" />
  <Avatar>+5</Avatar>
</div>`;
</script>

<svelte:head>
	<title>Avatar - Svelte Atoms</title>
	<meta name="description" content="Display user profile images with fallback support." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Avatar' }]} />

	<PageHeader
		title="Avatar"
		description="Display user profile images with automatic fallback to initials. Supports various sizes and grouping."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Avatar &#125; from '@svelte-atoms/core/avatar';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the avatar appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Avatar components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
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
	</Section>

	<Section title="Examples" description="Explore different avatar variations and use cases">
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Avatar Props</h3>
				<Props data={avatarProps} />
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Proper alt text for images',
				'Meaningful fallback initials',
				'Adequate color contrast for initials',
				'Semantic img element usage',
				'ARIA labels when needed'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Alert', href: '/docs/components/alert' }}
		next={{ label: 'Badge', href: '/docs/components/badge' }}
	/>
</div>
