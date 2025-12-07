<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Tabs as Tabs_, Tab } from '.';
	import { Root as TabsRoot } from './atoms';

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
</script>

<Story name="Tabs" args={{}}>
	<Tabs_.Root bind:value>
		<Tabs_.Header class="border-b" />
		<Tabs_.Body>
			<Tab.Root value="en">
				<Tab.Header>English</Tab.Header>
				<Tab.Body class="">
					<div>
						Ligula ex tincidunt efficitur netus consequat aenean finibus. Dictum ex pretium torquent
						vel scelerisque quisque class nisl penatibus blandit risus. Pretium praesent egestas
						ante placerat lacus pede risus pulvinar facilisi.
					</div>
				</Tab.Body>
			</Tab.Root>

			<Tab.Root value="ar">
				<Tab.Header>Arabic</Tab.Header>
				<Tab.Body class="h-[1440px]">
					<div>
						Interdum turpis taciti mauris orci condimentum vitae malesuada ornare ridiculus ultrices
						quisque feugiat pretium facilisis justo ligula pede volutpat nisi viverra adipiscing
						donec torquent ac sapien aliquet parturient posuere leo litora vivamus luctus vestibulum
						aptent faucibus platea libero dolor purus integer fusce nam senectus nibh nostra diam
						tortor dictumst praesent tellus montes ad iaculis sociosqu mollis sodales consectetuer
						hac accumsan dictum blandit conubia velit elit efficitur duis nascetur erat mattis
						semper et aliquam magna lorem bibendum ante id cursus nulla eget ut pellentesque
						himenaeos consectetur potenti si maximus ullamcorper etiam nec magnis ipsum mus porta
						lobortis natoque rhoncus fringilla
					</div>
				</Tab.Body>
			</Tab.Root>
		</Tabs_.Body>
	</Tabs_.Root>
</Story>
