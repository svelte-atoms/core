const basicCode = `<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div class="h-32 w-64 rounded-lg border border-dashed p-4">
      Right-click this area
    </div>
  </ContextMenu.Trigger>
  <ContextMenu.Content preset="context-menu.content">
    <ContextMenu.Item preset="context-menu.item">Copy</ContextMenu.Item>
    <ContextMenu.Item preset="context-menu.item">Paste</ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu.Item preset="context-menu.item">Delete</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>`;

const buttonCode = `<ContextMenu.Root>
  <ContextMenu.Trigger base={Button} variant="outline">
    Right-click button
  </ContextMenu.Trigger>
  <ContextMenu.Content preset="context-menu.content">
    <ContextMenu.Item preset="context-menu.item">Open</ContextMenu.Item>
    <ContextMenu.Item preset="context-menu.item">Rename</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>`;

const rowCode = `<DataGrid.Root>
  <DataGrid.Header>
    <DataGrid.Row>
      <DataGrid.Column>Name</DataGrid.Column>
      <DataGrid.Column>Role</DataGrid.Column>
    </DataGrid.Row>
  </DataGrid.Header>
  <DataGrid.Body>
    {#each rows as row (row.id)}
      <ContextMenu.Root>
        <ContextMenu.Trigger base={DataGrid.Row}>
          <DataGrid.Cell>{row.name}</DataGrid.Cell>
          <DataGrid.Cell>{row.role}</DataGrid.Cell>
        </ContextMenu.Trigger>
        <ContextMenu.Content preset="context-menu.content">
          <ContextMenu.Item preset="context-menu.item">Edit row</ContextMenu.Item>
          <ContextMenu.Item preset="context-menu.item">Delete row</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    {/each}
  </DataGrid.Body>
</DataGrid.Root>`;

export const examples = {
	basic: basicCode,
	button: buttonCode,
	row: rowCode
};
