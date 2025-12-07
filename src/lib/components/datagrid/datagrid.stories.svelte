<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DataGrid as DataGridCmp } from '.';
	import { Dropdown } from '$svelte-atoms/core/components/dropdown';
	import MoreVerticalIcon from '$svelte-atoms/core/icons/icon-more-vert.svelte';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { container } from '$svelte-atoms/core/runes/container.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/DataGrid'
	});
</script>

<script>
	let values = $state([]);

	const datagridContainer = container();
</script>

<Story name="DataGrid">
	{#snippet children({ args })}
		<DataGridCmp.Root class="" {@attach datagridContainer.attach}>
			<DataGridCmp.Header>
				<DataGridCmp.Tr header>
					<DataGridCmp.Th width="auto">
						<DataGridCmp.Checkbox />
					</DataGridCmp.Th>
					<DataGridCmp.Th
						class="resize-x overflow-x-auto"
						width="auto"
						hidden={datagridContainer.current?.width
							? datagridContainer.current.width < 1024
							: false}>ID</DataGridCmp.Th
					>
					<DataGridCmp.Th>Name</DataGridCmp.Th>
					<DataGridCmp.Th width="auto">Job</DataGridCmp.Th>
					<DataGridCmp.Th width="auto">Contact</DataGridCmp.Th>
					<DataGridCmp.Th width="auto"></DataGridCmp.Th>
				</DataGridCmp.Tr>
			</DataGridCmp.Header>

			<DataGridCmp.Body>
				{#each { length: 10 } as _, i (i)}
					<DataGridCmp.Tr>
						<DataGridCmp.Td>
							<DataGridCmp.Checkbox />
						</DataGridCmp.Td>

						<DataGridCmp.Td>{crypto.randomUUID()}</DataGridCmp.Td>
						<DataGridCmp.Td>John Doe</DataGridCmp.Td>
						<DataGridCmp.Td>Software Engineer</DataGridCmp.Td>
						<DataGridCmp.Td>+213659009944</DataGridCmp.Td>

						<DataGridCmp.Td base={Dropdown.Root} placement="bottom-end" offset={0}>
							<Dropdown.Trigger class="flex aspect-square items-center justify-center p-0">
								<Icon src={MoreVerticalIcon} />
							</Dropdown.Trigger>
							<Dropdown.List>
								<Dropdown.Item value="ar">Arabic</Dropdown.Item>
								<Dropdown.Item value="en">English</Dropdown.Item>
								<Dropdown.Item value="sp">Spanish</Dropdown.Item>
								<Dropdown.Item value="fr">Frensh</Dropdown.Item>
							</Dropdown.List>
						</DataGridCmp.Td>
					</DataGridCmp.Tr>
				{/each}
			</DataGridCmp.Body>

			<DataGridCmp.Footer></DataGridCmp.Footer>
		</DataGridCmp.Root>
	{/snippet}
</Story>
