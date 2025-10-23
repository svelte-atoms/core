<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Root from '$svelte-atoms/core/components/root/root.svelte';
	import ContainerCmp from './container.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Container'
	});
</script>

<Story name="Container">
	<Root class="p-4">
		<ContainerCmp class="flex w-full flex-col items-center gap-4">
			<div class="flex w-full gap-4">
				{#each { length: 5 } as _, i (i)}
					<div class="bg-foreground h-80 flex-1 rounded-lg"></div>
				{/each}
			</div>

			<div class="bg-foreground h-80 w-[50cqw] rounded-lg"></div>
		</ContainerCmp>
	</Root>
</Story>
