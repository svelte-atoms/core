<script>
	import { Playground } from '$docs/playground';
	import { Button } from '$lib/components/button';
	import { Dropdown } from '$lib/components/dropdown';
	import { Input } from '$lib/components/input';

	let buttonContent = $state('Click me');
</script>

<Playground.Root class="mb-12 text-gray-900">
	<Playground.Header class="mb-6 text-2xl font-bold text-gray-900">Playground</Playground.Header>
	<Playground.Content class="border-border gap-x-4 rounded-lg border p-6">
		<!-- Controls -->
		<Playground.Controls class="space-y-4">
			<div class="space-y-3">
				<div>
					<label for="style-select" class="mb-1 block text-sm font-medium text-gray-700"
						>Style</label
					>
					<Dropdown.Root
						id="style-select"
						class="border-border block w-full rounded-md border px-3 py-2 text-sm"
					>
						<Dropdown.Trigger class="w-full" component={Input.Root}>
							<Dropdown.Values>
								{#snippet children({ items })}
									{#each items as item (item.id)}
										<div>{item.text}</div>
									{/each}
								{/snippet}
							</Dropdown.Values>

							<Dropdown.Placeholder>Select a style</Dropdown.Placeholder>
						</Dropdown.Trigger>
						<Dropdown.List>
							<Dropdown.Item class="text-gray-900" value="default">Default</Dropdown.Item>
							<Dropdown.Item class="text-gray-900" value="primary">Primary</Dropdown.Item>
							<Dropdown.Item class="text-gray-900" value="outline">Outline</Dropdown.Item>
							<Dropdown.Item class="text-gray-900" value="gradient">Gradient</Dropdown.Item>
						</Dropdown.List>
					</Dropdown.Root>
				</div>

				<div>
					<label for="size-select" class="mb-1 block text-sm font-medium text-gray-700">Size</label>
					<Dropdown.Root
						id="style-select"
						class="border-border block w-full rounded-md border px-3 py-2 text-sm"
					>
						<Dropdown.Trigger class="w-full" component={Input.Root}>
							<Dropdown.Values>
								{#snippet children({ items })}
									{#each items as item (item.id)}
										<div>{item.text}</div>
									{/each}
								{/snippet}
							</Dropdown.Values>

							<Dropdown.Placeholder>Select a size</Dropdown.Placeholder>
						</Dropdown.Trigger>
						<Dropdown.List>
							<Dropdown.Item class="text-gray-900" value="sm">Small</Dropdown.Item>
							<Dropdown.Item class="text-gray-900" value="md">Medium</Dropdown.Item>
							<Dropdown.Item class="text-gray-900" value="lg">Large</Dropdown.Item>
						</Dropdown.List>
					</Dropdown.Root>
				</div>
				<div>
					<label for="text-input" class="mb-1 block text-sm font-medium text-gray-700">Text</label>
					<Input.Root id="text-input" type="text" value="Click me" class="text-sm">
						<Input.Value class="py-2" bind:value={buttonContent} />
					</Input.Root>
				</div>
			</div>
		</Playground.Controls>

		<!-- Preview -->
		<Playground.Preview class="space-y-4">
			<!-- <h3 class="text-lg font-semibold text-gray-900">Preview</h3> -->
			<div
				class="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 py-12"
			>
				<Button class="bg-blue-600 text-white transition-colors hover:bg-blue-700">
					{buttonContent}
				</Button>
			</div>
		</Playground.Preview>
	</Playground.Content>
</Playground.Root>
