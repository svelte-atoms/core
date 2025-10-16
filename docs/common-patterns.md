# Common Patterns & Recipes

> **Practical examples** of common UI patterns built with `@svelte-atoms/core`

## 📋 Table of Contents

- [Forms](#forms)
- [Navigation](#navigation)
- [Data Display](#data-display)
- [Overlays & Modals](#overlays--modals)
- [Interactive Lists](#interactive-lists)
- [Layouts](#layouts)
- [Feedback](#feedback)

---

## Forms

### Simple Login Form

```svelte
<script lang="ts">
	import { Form } from '@svelte-atoms/core/components/form';
	import { Input } from '@svelte-atoms/core/components/input';
	import { Button } from '@svelte-atoms/core/components/button';

	let formData = $state({ email: '', password: '' });

	function handleSubmit(e: Event) {
		e.preventDefault();
		console.log('Login:', formData);
	}
</script>

<Form.Root bind:value={formData} onsubmit={handleSubmit}>
	<Form.Field name="email">
		<Form.Field.Label>Email</Form.Field.Label>
		<Form.Field.Control>
			<Input.Root type="email" placeholder="you@example.com" />
		</Form.Field.Control>
		<Form.Field.Errors />
	</Form.Field>

	<Form.Field name="password">
		<Form.Field.Label>Password</Form.Field.Label>
		<Form.Field.Control>
			<Input.Root type="password" placeholder="••••••••" />
		</Form.Field.Control>
		<Form.Field.Errors />
	</Form.Field>

	<Button.Root type="submit" class="w-full rounded bg-blue-500 py-2 text-white">
		Sign In
	</Button.Root>
</Form.Root>
```

### Multi-Select Form

```svelte
<script lang="ts">
	import { Form } from '@svelte-atoms/core/components/form';
	import { Checkbox } from '@svelte-atoms/core/components/checkbox';
	import { Radio } from '@svelte-atoms/core/components/radio';

	let preferences = $state({
		notifications: [] as string[],
		theme: 'light'
	});
</script>

<Form.Root bind:value={preferences}>
	<Form.Field name="notifications">
		<Form.Field.Label>Notification Preferences</Form.Field.Label>
		<Form.Field.Control>
			<label class="flex items-center gap-2">
				<Checkbox.Root value="email" bind:group={preferences.notifications} />
				Email notifications
			</label>
			<label class="flex items-center gap-2">
				<Checkbox.Root value="push" bind:group={preferences.notifications} />
				Push notifications
			</label>
			<label class="flex items-center gap-2">
				<Checkbox.Root value="sms" bind:group={preferences.notifications} />
				SMS notifications
			</label>
		</Form.Field.Control>
	</Form.Field>

	<Form.Field name="theme">
		<Form.Field.Label>Theme</Form.Field.Label>
		<Form.Field.Control>
			<label class="flex items-center gap-2">
				<Radio.Root value="light" bind:group={preferences.theme} />
				Light mode
			</label>
			<label class="flex items-center gap-2">
				<Radio.Root value="dark" bind:group={preferences.theme} />
				Dark mode
			</label>
		</Form.Field.Control>
	</Form.Field>
</Form.Root>
```

---

## Navigation

### Sidebar Navigation

```svelte
<script lang="ts">
	import { Sidebar } from '@svelte-atoms/core/components/sidebar';
	import { Menu } from '@svelte-atoms/core/components/menu';
	import { Button } from '@svelte-atoms/core/components/button';

	let open = $state(false);
</script>

<Button.Root onclick={() => (open = !open)}>Toggle Menu</Button.Root>

<Sidebar.Root bind:open>
	<Sidebar.Content class="w-64 bg-gray-900 p-4 text-white">
		<h2 class="mb-4 text-xl font-bold">Menu</h2>

		<Menu.Root>
			<Menu.Item href="/">
				<Menu.Item.Icon />
				<Menu.Item.Label>Home</Menu.Item.Label>
			</Menu.Item>
			<Menu.Item href="/profile">
				<Menu.Item.Label>Profile</Menu.Item.Label>
			</Menu.Item>
			<Menu.Item href="/settings">
				<Menu.Item.Label>Settings</Menu.Item.Label>
			</Menu.Item>
		</Menu.Root>
	</Sidebar.Content>
</Sidebar.Root>
```

### Tab Navigation

```svelte
<script lang="ts">
	import { Tabs } from '@svelte-atoms/core/components/tabs';

	let activeTab = $state('overview');
</script>

<Tabs.Root bind:value={activeTab} class="w-full">
	<Tabs.Header class="flex border-b">
		<Tabs.Tab value="overview">
			<Tabs.Tab.Header
				class="px-4 py-2 {activeTab === 'overview' ? 'border-b-2 border-blue-500' : ''}"
			>
				Overview
			</Tabs.Tab.Header>
		</Tabs.Tab>
		<Tabs.Tab value="details">
			<Tabs.Tab.Header
				class="px-4 py-2 {activeTab === 'details' ? 'border-b-2 border-blue-500' : ''}"
			>
				Details
			</Tabs.Tab.Header>
		</Tabs.Tab>
		<Tabs.Tab value="settings">
			<Tabs.Tab.Header
				class="px-4 py-2 {activeTab === 'settings' ? 'border-b-2 border-blue-500' : ''}"
			>
				Settings
			</Tabs.Tab.Header>
		</Tabs.Tab>
	</Tabs.Header>

	<Tabs.Body class="p-4">
		<Tabs.Tab value="overview">
			<Tabs.Tab.Body>Overview content here</Tabs.Tab.Body>
		</Tabs.Tab>
		<Tabs.Tab value="details">
			<Tabs.Tab.Body>Details content here</Tabs.Tab.Body>
		</Tabs.Tab>
		<Tabs.Tab value="settings">
			<Tabs.Tab.Body>Settings content here</Tabs.Tab.Body>
		</Tabs.Tab>
	</Tabs.Body>
</Tabs.Root>
```

---

## Data Display

### User Profile Card

```svelte
<script lang="ts">
	import { Card } from '@svelte-atoms/core/components/card';
	import { Avatar } from '@svelte-atoms/core/components/avatar';
	import { Badge } from '@svelte-atoms/core/components/badge';
	import { Button } from '@svelte-atoms/core/components/button';

	let user = {
		name: 'Jane Doe',
		role: 'Developer',
		avatar: '/avatar.jpg',
		bio: 'Full-stack developer passionate about UI/UX'
	};
</script>

<Card.Root class="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
	<Card.Header class="flex items-center gap-4 p-6">
		<Avatar.Root src={user.avatar} alt={user.name} class="h-16 w-16 rounded-full" />
		<div>
			<h3 class="text-xl font-bold">{user.name}</h3>
			<Badge.Root class="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
				{user.role}
			</Badge.Root>
		</div>
	</Card.Header>

	<Card.Body class="p-6 pt-0">
		<p class="text-gray-600">{user.bio}</p>
	</Card.Body>

	<Card.Footer class="flex gap-2 p-6 pt-0">
		<Button.Root class="flex-1 rounded bg-blue-500 py-2 text-white">Follow</Button.Root>
		<Button.Root class="flex-1 rounded bg-gray-200 py-2 text-gray-800">Message</Button.Root>
	</Card.Footer>
</Card.Root>
```

### Data Table with Selection

```svelte
<script lang="ts">
	import { DataGrid } from '@svelte-atoms/core/components/datagrid';

	let selected = $state<string[]>([]);

	const users = [
		{ id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' }
	];
</script>

<DataGrid.Root bind:value={selected} multiple template="auto 1fr 2fr 1fr">
	<DataGrid.Header class="bg-gray-100">
		<DataGrid.Tr>
			<DataGrid.Th><DataGrid.Checkbox /></DataGrid.Th>
			<DataGrid.Th sortable>Name</DataGrid.Th>
			<DataGrid.Th sortable>Email</DataGrid.Th>
			<DataGrid.Th>Role</DataGrid.Th>
		</DataGrid.Tr>
	</DataGrid.Header>

	<DataGrid.Body>
		{#each users as user}
			<DataGrid.Tr value={user.id} class="border-b hover:bg-gray-50">
				<DataGrid.Td><DataGrid.Checkbox /></DataGrid.Td>
				<DataGrid.Td>{user.name}</DataGrid.Td>
				<DataGrid.Td>{user.email}</DataGrid.Td>
				<DataGrid.Td>{user.role}</DataGrid.Td>
			</DataGrid.Tr>
		{/each}
	</DataGrid.Body>
</DataGrid.Root>

<p class="mt-4 text-sm text-gray-600">
	Selected: {selected.length} items
</p>
```

---

## Overlays & Modals

### Confirmation Dialog

```svelte
<script lang="ts">
	import { Dialog } from '@svelte-atoms/core/components/dialog';
	import { Button } from '@svelte-atoms/core/components/button';

	let open = $state(false);

	function handleConfirm() {
		console.log('Confirmed');
		open = false;
	}
</script>

<Button.Root onclick={() => (open = true)} class="rounded bg-red-500 px-4 py-2 text-white">
	Delete Account
</Button.Root>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-md rounded-lg bg-white p-6 shadow-xl">
		<Dialog.Header class="mb-4">
			<h2 class="text-xl font-bold">Are you sure?</h2>
			<Dialog.CloseButton class="absolute top-4 right-4" />
		</Dialog.Header>

		<Dialog.Body class="mb-6">
			<p class="text-gray-600">
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</p>
		</Dialog.Body>

		<Dialog.Footer class="flex justify-end gap-2">
			<Button.Root onclick={() => (open = false)} class="rounded bg-gray-200 px-4 py-2">
				Cancel
			</Button.Root>
			<Button.Root onclick={handleConfirm} class="rounded bg-red-500 px-4 py-2 text-white">
				Delete
			</Button.Root>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
```

### Popover Menu

```svelte
<script lang="ts">
	import { Popover } from '@svelte-atoms/core/components/popover';
	import { Button } from '@svelte-atoms/core/components/button';

	let open = $state(false);
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		<Button.Root class="rounded bg-blue-500 px-4 py-2 text-white">Options ▼</Button.Root>
	</Popover.Trigger>

	<Popover.Content class="min-w-[200px] rounded-lg border bg-white p-2 shadow-lg">
		<button class="w-full rounded px-4 py-2 text-left hover:bg-gray-100"> Edit </button>
		<button class="w-full rounded px-4 py-2 text-left hover:bg-gray-100"> Duplicate </button>
		<button class="w-full rounded px-4 py-2 text-left hover:bg-gray-100"> Archive </button>
		<div class="my-1 border-t"></div>
		<button class="w-full rounded px-4 py-2 text-left text-red-600 hover:bg-red-50">
			Delete
		</button>
	</Popover.Content>
</Popover.Root>
```

---

## Interactive Lists

### Searchable Dropdown

```svelte
<script lang="ts">
	import { Combobox } from '@svelte-atoms/core/components/combobox';

	let selected = $state<string[]>([]);
	let query = $state('');

	const countries = [
		'United States',
		'United Kingdom',
		'Canada',
		'Australia',
		'Germany',
		'France',
		'Japan',
		'Brazil'
	];

	let filtered = $derived(countries.filter((c) => c.toLowerCase().includes(query.toLowerCase())));
</script>

<Combobox.Root bind:value={selected} bind:query>
	<Combobox.Trigger class="relative w-full">
		<Combobox.Input placeholder="Search countries..." class="w-full rounded border px-4 py-2" />
	</Combobox.Trigger>

	<Combobox.List
		class="absolute mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow-lg"
	>
		{#if filtered.length === 0}
			<div class="px-4 py-2 text-gray-500">No results found</div>
		{:else}
			{#each filtered as country}
				<Combobox.Item value={country} class="cursor-pointer px-4 py-2 hover:bg-blue-50">
					{country}
				</Combobox.Item>
			{/each}
		{/if}
	</Combobox.List>
</Combobox.Root>
```

### Collapsible Accordion

```svelte
<script lang="ts">
	import { Accordion } from '@svelte-atoms/core/components/accordion';

	let openSections = $state<string[]>(['faq-1']);

	const faqs = [
		{
			id: 'faq-1',
			question: 'What is Svelte?',
			answer: 'Svelte is a modern JavaScript framework...'
		},
		{ id: 'faq-2', question: 'How do I install?', answer: 'Run npm install...' },
		{ id: 'faq-3', question: 'Is it free?', answer: "Yes, it's open source and free..." }
	];
</script>

<Accordion.Root bind:value={openSections} class="space-y-2">
	{#each faqs as faq}
		<Accordion.Item value={faq.id} class="rounded-lg border">
			<Accordion.Item.Header
				class="flex cursor-pointer items-center justify-between px-4 py-3 font-semibold hover:bg-gray-50"
			>
				{faq.question}
				<span
					class="transform transition-transform {openSections.includes(faq.id) ? 'rotate-180' : ''}"
				>
					▼
				</span>
			</Accordion.Item.Header>

			<Accordion.Item.Body class="border-t px-4 py-3 text-gray-600">
				{faq.answer}
			</Accordion.Item.Body>
		</Accordion.Item>
	{/each}
</Accordion.Root>
```

---

## Layouts

### Dashboard Layout

```svelte
<script lang="ts">
	import { Card } from '@svelte-atoms/core/components/card';
	import { Stack } from '@svelte-atoms/core/components/stack';
	import { Divider } from '@svelte-atoms/core/components/divider';
</script>

<div class="p-6">
	<h1 class="mb-6 text-3xl font-bold">Dashboard</h1>

	<Stack.Root direction="vertical" gap={6}>
		<!-- Stats Row -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<Card.Root class="rounded-lg bg-white p-6 shadow">
				<Card.Body>
					<p class="text-sm text-gray-600">Total Users</p>
					<p class="mt-2 text-3xl font-bold">1,234</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="rounded-lg bg-white p-6 shadow">
				<Card.Body>
					<p class="text-sm text-gray-600">Revenue</p>
					<p class="mt-2 text-3xl font-bold">$12,345</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="rounded-lg bg-white p-6 shadow">
				<Card.Body>
					<p class="text-sm text-gray-600">Growth</p>
					<p class="mt-2 text-3xl font-bold">+23%</p>
				</Card.Body>
			</Card.Root>
		</div>

		<Divider.Root />

		<!-- Content Area -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<Card.Root class="rounded-lg bg-white shadow">
				<Card.Header class="border-b p-6">
					<h2 class="text-xl font-bold">Recent Activity</h2>
				</Card.Header>
				<Card.Body class="p-6">
					<p>Activity content here...</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="rounded-lg bg-white shadow">
				<Card.Header class="border-b p-6">
					<h2 class="text-xl font-bold">Quick Actions</h2>
				</Card.Header>
				<Card.Body class="p-6">
					<p>Actions content here...</p>
				</Card.Body>
			</Card.Root>
		</div>
	</Stack.Root>
</div>
```

---

## Feedback

### Toast Notifications

```svelte
<script lang="ts">
	import { Toast } from '@svelte-atoms/core/components/toast';
	import { Button } from '@svelte-atoms/core/components/button';

	let showToast = $state(false);

	function notify() {
		showToast = true;
		setTimeout(() => (showToast = false), 3000);
	}
</script>

<Button.Root onclick={notify} class="rounded bg-blue-500 px-4 py-2 text-white">
	Show Notification
</Button.Root>

{#if showToast}
	<Toast.Root class="fixed right-4 bottom-4 rounded-lg bg-green-500 px-6 py-4 text-white shadow-lg">
		<Toast.Title class="font-bold">Success!</Toast.Title>
		<Toast.Description>Your changes have been saved.</Toast.Description>
	</Toast.Root>
{/if}
```

### Loading States

```svelte
<script lang="ts">
	import { Button } from '@svelte-atoms/core/components/button';
	import { Icon } from '@svelte-atoms/core/components/icon';

	let loading = $state(false);

	async function handleSubmit() {
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 2000));
		loading = false;
	}
</script>

<Button.Root
	onclick={handleSubmit}
	disabled={loading}
	class="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
>
	{#if loading}
		<Icon src={LoadingIcon} class="mr-2 animate-spin" />
		Loading...
	{:else}
		Submit
	{/if}
</Button.Root>
```

---

## Best Practices

### Component Composition

Create reusable composed components:

```svelte
<!-- FormInput.svelte -->
<script lang="ts">
	import { Form } from '@svelte-atoms/core/components/form';
	import { Input } from '@svelte-atoms/core/components/input';

	let { name, label, type = 'text', ...rest } = $props();
</script>

<Form.Field {name}>
	<Form.Field.Label class="mb-1 block text-sm font-medium">
		{label}
	</Form.Field.Label>
	<Form.Field.Control>
		<Input.Root {type} {...rest} class="w-full rounded border px-3 py-2" />
	</Form.Field.Control>
	<Form.Field.Errors class="mt-1 text-sm text-red-500" />
</Form.Field>
```

### State Management

Use derived state for computed values:

```svelte
<script lang="ts">
	let items = $state<string[]>([]);
	let query = $state('');

	let filtered = $derived(items.filter((item) => item.toLowerCase().includes(query.toLowerCase())));

	let hasResults = $derived(filtered.length > 0);
	let isEmpty = $derived(items.length === 0);
</script>
```

---

For more patterns and examples, see the [Component Documentation](./components/).
