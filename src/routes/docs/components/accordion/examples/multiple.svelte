<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/accordion';
</script>

<div class="flex h-96 w-full items-center justify-center">
	<Accordion multiple={true} class="border-border overflow-hidden rounded-lg border">
		<AccordionItem.Root class="border-border border-b last:border-b-0">
			<AccordionItem.Header>
				<span class="text-foreground font-medium">Section 1</span>
				<AccordionItem.Indicator class="ml-auto" />
			</AccordionItem.Header>
			<AccordionItem.Body>Multiple sections can be open at the same time.</AccordionItem.Body>
		</AccordionItem.Root>
		<AccordionItem.Root>
			<AccordionItem.Header>
				<span class="text-foreground font-medium">Section 2</span>
				<AccordionItem.Indicator class="ml-auto" />
			</AccordionItem.Header>
			<AccordionItem.Body>Opening this won't close the others.</AccordionItem.Body>
		</AccordionItem.Root>
	</Accordion>
</div>
