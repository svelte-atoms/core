<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Accordion as AAccordion, AccordionItem } from '.';
	import { createLifecycleKey } from '../atom';

	const { Story } = defineMeta({
		title: 'Atoms/Accordion',

		parameters: {
			layout: 'fullscreen'
		},
		args: {}
	});
</script>

<script lang="ts">
</script>

<Story name="Accordion" args={{ collapsible: false, multiple: false, disabled: false }}>
	{#snippet template(args)}
		<AAccordion class="backdrop-blur-sm" {...args}>
			<AccordionItem.Root>
				<AccordionItem.Header>
					<div>Hello Atomic UI 1</div>
					<AccordionItem.Indicator class="ml-auto" />
				</AccordionItem.Header>

				<AccordionItem.Body>
					<div class="p-2">
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</div>
				</AccordionItem.Body>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<div>Hello Atomic UI 2</div>
					<AccordionItem.Indicator class="ml-auto" />
				</AccordionItem.Header>

				<AccordionItem.Body>
					<div class="p-2">
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</div>
				</AccordionItem.Body>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<div>Hello Atomic UI 3</div>
					<AccordionItem.Indicator class="ml-auto" />
				</AccordionItem.Header>

				<AccordionItem.Body>
					<div class="p-2">
						Mauris et habitasse cubilia potenti at condimentum iaculis nam. Ante fusce litora
						tristique letius libero. Curabitur vitae cursus consectetur feugiat aenean viverra vel
						dolor diam nascetur.
					</div>
				</AccordionItem.Body>
			</AccordionItem.Root>
		</AAccordion>
	{/snippet}
</Story>
