<script lang="ts">
	import { Form, Field } from '$lib/components/form';
	import Button from '$lib/components/button/button.svelte';
	import { Playground } from '$docs/playground';
	import { Input } from '$lib/components/input';
	import { Dropdown } from '$lib/components/dropdown';

	let formData = $state({
		name: '',
		email: '',
		message: '',
		subscribe: false
	});

	let selectedVariant = $state('default');
	let selectedSize = $state('default');
	let isDisabled = $state(false);

	const variants = [
		{ label: 'Default', value: 'default' },
		{ label: 'Card', value: 'card' },
		{ label: 'Inline', value: 'inline' }
	];

	const sizes = [
		{ label: 'Small', value: 'sm' },
		{ label: 'Default', value: 'default' },
		{ label: 'Large', value: 'lg' }
	];

	function handleSubmit() {
		console.log('Form submitted:', formData);
	}

	function resetForm() {
		formData = {
			name: '',
			email: '',
			message: '',
			subscribe: false
		};
	}
</script>

<Playground.Root>
	<Playground.Header>Interactive Playground</Playground.Header>

	<Playground.Content>
		<Playground.Preview>
			<div class="flex items-center justify-center p-8">
				<div
					class={`w-full max-w-md ${selectedVariant === 'card' ? 'border-border rounded-lg border bg-white p-6 shadow-sm' : ''}`}
				>
					<Form
						class={`space-y-4 ${selectedSize === 'sm' ? 'text-sm' : selectedSize === 'lg' ? 'text-lg' : ''}`}
						onsubmit={handleSubmit}
					>
						<Field.Root name="name" bind:value={formData.name} disabled={isDisabled}>
							{#snippet children({ field })}
								<Field.Label class="mb-1 block text-sm font-medium text-gray-700">Name</Field.Label>
								<Field.Control type="text" placeholder="Enter your name" component={Input.Root}>
									<Input.Value />
								</Field.Control>
							{/snippet}
						</Field.Root>

						<Field.Root name="email" bind:value={formData.email} disabled={isDisabled}>
							{#snippet children({ field })}
								<Field.Label class="mb-1 block text-sm font-medium text-gray-700">
									Email
								</Field.Label>
								<Field.Control type="email" placeholder="Enter your email" component={Input.Root}>
									<Input.Value />
								</Field.Control>
							{/snippet}
						</Field.Root>

						<Field.Root name="message" bind:value={formData.message} disabled={isDisabled}>
							{#snippet children({ field })}
								<Field.Label class="mb-1 block text-sm font-medium text-gray-700">
									Message
								</Field.Label>
								<Field.Control placeholder="Enter your message" rows="3" component={Input.Root}>
									<Input.Value />
								</Field.Control>
							{/snippet}
						</Field.Root>

						<Field.Root name="subscribe" bind:value={formData.subscribe} disabled={isDisabled}>
							{#snippet children({ field })}
								<div class="flex items-center space-x-2">
									<Field.Control
										type="checkbox"
										class="border-border rounded text-purple-600 focus:ring-purple-500 disabled:opacity-50"
										component={Input.Root}
									>
										<Input.Value />
									</Field.Control>
									<Field.Label class="text-sm text-gray-700">Subscribe to newsletter</Field.Label>
								</div>
							{/snippet}
						</Field.Root>

						<div class="flex gap-2">
							<Button
								type="submit"
								class={`bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 ${
									selectedSize === 'sm'
										? 'px-3 py-1.5 text-xs'
										: selectedSize === 'lg'
											? 'px-6 py-3 text-base'
											: 'px-4 py-2 text-sm'
								}`}
								disabled={isDisabled}
							>
								Submit
							</Button>
							<Button
								type="button"
								onclick={resetForm}
								class={`border-border border text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 ${
									selectedSize === 'sm'
										? 'px-3 py-1.5 text-xs'
										: selectedSize === 'lg'
											? 'px-6 py-3 text-base'
											: 'px-4 py-2 text-sm'
								}`}
								disabled={isDisabled}
							>
								Reset
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</Playground.Preview>

		<Playground.Controls>
			<Playground.Header title="Customize Form" />

			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">Variant</label>
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
						<Dropdown.Content>
							{#each variants as variant}
								<Dropdown.Item class="text-gray-900" value={variant.value}
									>{variant.label}</Dropdown.Item
								>
							{/each}
						</Dropdown.Content>
					</Dropdown.Root>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">Size</label>
					<select
						bind:value={selectedSize}
						class="border-border w-full rounded-md border px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
					>
						{#each sizes as size}
							<option value={size.value}>{size.label}</option>
						{/each}
					</select>
				</div>

				<div class="flex items-center space-x-2">
					<input
						type="checkbox"
						bind:checked={isDisabled}
						class="border-border rounded text-purple-600 focus:ring-purple-500"
					/>
					<label class="text-sm text-gray-700">Disabled</label>
				</div>
			</div>

			<div class="mt-6 rounded-lg bg-gray-50 p-4">
				<h4 class="mb-2 text-sm font-medium text-gray-700">Current Values:</h4>
				<pre class="text-xs whitespace-pre-wrap text-gray-600">{JSON.stringify(
						formData,
						null,
						2
					)}</pre>
			</div>
		</Playground.Controls>
	</Playground.Content>
</Playground.Root>
