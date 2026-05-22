<script lang="ts">
	import { List } from '$lib/components/list';
</script>

<div class="w-64">
	<List.Root>
		<List.Item onclick={() => {}}>Profile Settings</List.Item>
		<List.Item onclick={() => {}}>Notifications</List.Item>
		<List.Item onclick={() => {}}>Privacy</List.Item>
		<List.Divider />
		<List.Item onclick={() => {}} class="text-red-500">Sign Out</List.Item>
	</List.Root>
</div>
