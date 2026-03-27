<script lang="ts">
	import { Avatar } from '$lib/components/avatar';
	import {
		DocPage,
		DocSection,
		DocExample,
		DocProps,
		DocOnly,
		DocInstallation,
		DocAccessibility,
		DocCode,
	} from '$docs/components';
	import { avatarProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'avatar',
		title: 'Avatar',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Alert', href: '/docs/components/alert' }}
	next={{ label: 'Badge', href: '/docs/components/badge' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Simple Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the avatar appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different avatar variations and use cases">
		<DocExample title="Basic Avatar" description="Simple avatar with image" code={metadata.examples.basic}>
			<Avatar src="https://i.pravatar.cc/150?img=1" alt="User name" />
		</DocExample>

		<DocExample title="Avatar Sizes" description="Different sizes for various contexts" code={metadata.examples.sizes}>
			<div class="flex items-center gap-4">
				<Avatar size="sm" src="https://i.pravatar.cc/150?img=2" alt="Small" />
				<Avatar size="md" src="https://i.pravatar.cc/150?img=3" alt="Medium" />
				<Avatar size="lg" src="https://i.pravatar.cc/150?img=4" alt="Large" />
				<Avatar size="xl" src="https://i.pravatar.cc/150?img=5" alt="Extra Large" />
			</div>
		</DocExample>

		<DocExample title="Fallback Initials" description="Automatic initials when no image is provided" code={metadata.examples.fallback}>
			<div class="flex items-center gap-4">
				<Avatar alt="John Doe" />
				<Avatar alt="Jane Smith" />
			</div>
		</DocExample>

		<DocExample title="Avatar Group" description="Display multiple avatars in a group" code={metadata.examples.group}>
			<div class="flex -space-x-2">
				<Avatar src="https://i.pravatar.cc/150?img=6" alt="User 1" />
				<Avatar src="https://i.pravatar.cc/150?img=7" alt="User 2" />
				<Avatar src="https://i.pravatar.cc/150?img=8" alt="User 3" />
				<Avatar>+5</Avatar>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Avatar Props

**Preset Key:** `avatar`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Avatar Props

**Preset Key:** `avatar`</h3></DocOnly>
		<DocProps data={avatarProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
