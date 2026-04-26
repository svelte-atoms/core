<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as ProgressLinearCmp } from './progress-linear.svelte';
	import { default as ProgressCircularCmp } from './progress-circular.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Progress'
	});
</script>

<Story name="Linear">
		<div class="flex w-72 flex-col gap-4">
			<ProgressLinearCmp value={40} />
			<ProgressLinearCmp value={75} />
			<ProgressLinearCmp value={null} />
			<!-- indeterminate -->
		</div>
</Story>

<Story name="Circular">
		<div class="flex gap-6">
			<ProgressCircularCmp value={65} />
			<ProgressCircularCmp value={null} />
			<!-- indeterminate -->
		</div>
</Story>

<Story name="Composition Label">
		<div class="flex w-72 flex-col gap-4">
			<ProgressLinearCmp value={80} />
			<span class="text-primary text-xs font-bold">80 / 100</span>
		</div>
</Story>
