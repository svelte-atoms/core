<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { animate } from 'motion';
	import { Tabs as ATabs, Tab } from '.';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Atoms/Tabs',
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
	let value = $state('ar');

	const array = $state([
		{
			value: 'en',
			label: "English",
			description: "This content is teleported from Tab.Body to Tabs.Content component."
		}, 
		{
			value: "ar",
			label: "Arabic",
			description:"هذا المحتوى يتم نقله من Tab.Body إلى مكون Tabs.Content."
		},{
			value: "fr",
			label: "French",
			description:"Ce contenu est téléporté de Tab.Body vers le composant Tabs.Content."
		}
	])
</script>

<Story name="Tabs" args={{}}>
	<ATabs.Root bind:value>
		<ATabs.Header class="border-b">
			{#each array as item (item.value)}
				<Tab.Root value={item.value}>
					<Tab.Header>{item.label}</Tab.Header>
					<Tab.Body class="p-4">
						<h3 class="font-bold mb-2">{item.label} Content</h3>
						<p>{item.description}</p>
					</Tab.Body>
				</Tab.Root>
			{/each}
		</ATabs.Header>
				
		<ATabs.Body>
			<!-- Tab bodies are defined separately and teleported to Tabs.Content -->
			<ATabs.Content 
				enter={node=> {
					const duration = 0.3;
					animate(node, { opacity: [0, 1] }, { duration });
					return { duration };
				}}
				exit={node=> {
					const duration = 0.1;
					animate(node, { opacity: [1, 0] }, { duration });
					return { duration };
				}}
			/>
		</ATabs.Body>
	</ATabs.Root>
</Story>
