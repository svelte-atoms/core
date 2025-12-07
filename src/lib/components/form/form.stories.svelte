<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AForm from './form-root.svelte';
	import { Field } from './field';
	import { Input } from '$svelte-atoms/core/components/input';
	import { Checkbox } from '$svelte-atoms/core/components/checkbox';

	const { Story } = defineMeta({
		title: 'ATOMS/Form'
	});
</script>

<script lang="ts">
	import { z } from 'zod';
	import { ZodAdapter } from './field/validation-adapters';
	import { Radio, RadioGroup } from '../radio';

	const nameSchema = z.string().min(2).max(100);

	const personSchema = z.object({
		firstName: nameSchema,
		lastName: nameSchema,
		isAdmin: z.boolean()
	});

	type PersonSchema = z.infer<typeof personSchema>;

	const validator = new ZodAdapter();
</script>

<Story name="Form">
	{#snippet children({ args })}
		<AForm class="flex flex-col gap-2" {validator}>
			<div class="mb-4 flex flex-col">
				<h2 class="text-3xl font-semibold">Form Title</h2>
				<p class="text-sm text-gray-500">Form description goes here.</p>
			</div>

			<div class="flex gap-2">
				<Field.Root name="first name" schema={personSchema.shape.firstName}>
					{#snippet children({ field })}
						<Field.Label>First Name</Field.Label>
						<Input.Root>
							<Field.Control
								base={Input.Control}
								placeholder="Enter your first name"
								onblur={() => {
									const results = field?.state.validate();
									console.log(results);
								}}
							/>
						</Input.Root>
						{#if field?.state?.errors?.length > 0}
							<div class="text-xs text-red-600">
								{#each field.state.errors as error}
									<div>{error.message}</div>
								{/each}
							</div>
						{/if}
					{/snippet}
				</Field.Root>

				<Field.Root name="last name" schema={personSchema.shape.lastName}>
					<Field.Label>Last Name</Field.Label>
					<Input.Root>
						<Field.Control base={Input.Control} placeholder="Enter your last name" />
					</Input.Root>
				</Field.Root>
			</div>

			<div class="flex flex-col">
				<Field.Root name="is admin" schema={personSchema.shape.isAdmin}>
					<Field.Label>Is Admin?</Field.Label>
					<Field.Control base={Checkbox} />
				</Field.Root>
			</div>

			<div class="flex flex-col">
				<Field.Root name="color" schema={personSchema.shape.color}>
					<Field.Label>Is current scheme black?</Field.Label>
					<Field.Control class="flex flex-col items-start text-sm" base={RadioGroup}>
						<div class="flex items-center gap-2">
							<Radio value="yes" />
							<div>Yes</div>
						</div>

						<div class="flex items-center gap-2">
							<Radio value="no" />
							<div>No</div>
						</div>
					</Field.Control>
				</Field.Root>
			</div>
		</AForm>
	{/snippet}
</Story>
