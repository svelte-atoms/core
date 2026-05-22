<script lang="ts">
	import { List } from '$lib/components/list';
</script>

<div class="w-64">
	<List.Root>
		<List.Group>
			<List.Title>Fruits</List.Title>
			<List.Item>Apple</List.Item>
			<List.Item>Banana</List.Item>
		</List.Group>
		<List.Divider />
		<List.Group>
			<List.Title>Vegetables</List.Title>
			<List.Item>Carrot</List.Item>
			<List.Item>Broccoli</List.Item>
		</List.Group>
	</List.Root>
</div>
