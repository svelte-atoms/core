<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Field } from '.';
	import { Input } from '$svelte-atoms/core/components/input';
	import { Checkbox } from '$svelte-atoms/core/components/checkbox';
	import FormRoot from '../form-root.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Form/Field',
		parameters: {
			layout: 'centered'
		}
	});
</script>

<script lang="ts">
	import { z } from 'zod';
	import { ZodAdapter } from './validation-adapters';

	const validator = new ZodAdapter();
	const commonFieldProps = {
		disabled: false,
		readonly: false,
		extend: {},
		parse: () => {}
	};

	const usernameSchema = z
		.string()
		.trim()
		.min(3, 'Username must have at least 3 characters.')
		.max(20, 'Username must have at most 20 characters.');

	const profileSchema = z.object({
		displayName: z.string().trim().min(3, 'Display name must be at least 3 characters.'),
		notifyByEmail: z.boolean()
	});

	let username = $state('');
	let displayName = $state('');
	let notifyByEmail = $state(false);
</script>

<Story name="Standalone Field Validation">
	<div class="bg-card border-border w-115 rounded-xl border p-5">
		<Field.Root
			{...commonFieldProps}
			name="username"
			schema={usernameSchema}
			validator={validator}
			value={username}
		>
			<Field.Label>Username</Field.Label>
			<Input.Root>
				<Field.Control
					base={Input.Control as unknown as never}
					bind:value={username}
					placeholder="svelte-wizard"
				/>
			</Input.Root>
			<Field.HelperText>Use 3 to 20 characters with letters, numbers, or dashes.</Field.HelperText>
		</Field.Root>
		<p class="text-muted-foreground mt-3 text-xs">Current value: {username || '(empty)'}</p>
	</div>
</Story>

<Story name="Field Inside Form">
	<FormRoot class="bg-card border-border flex w-140 flex-col gap-4 rounded-xl border p-5" {validator}>
		<Field.Root {...commonFieldProps} name="displayName" schema={profileSchema.shape.displayName} value={displayName}>
			<Field.Label>Display Name</Field.Label>
			<Input.Root>
				<Field.Control base={Input.Control as unknown as never} bind:value={displayName} placeholder="Maya L" />
			</Input.Root>
			<Field.HelperText>Shown in comments, mentions, and activity feeds.</Field.HelperText>
		</Field.Root>

		<Field.Root {...commonFieldProps} name="notifyByEmail" schema={profileSchema.shape.notifyByEmail} value={notifyByEmail}>
			<label class="flex items-start gap-2">
				<div class="pt-0.5">
					<Field.Control base={Checkbox as unknown as never} bind:checked={notifyByEmail} />
				</div>
				<Field.Label class="text-sm">Receive product updates by email</Field.Label>
			</label>
		</Field.Root>

		<pre class="bg-muted text-muted-foreground overflow-x-auto rounded p-2 text-xs">
{JSON.stringify({ displayName, notifyByEmail }, null, 2)}</pre>
	</FormRoot>
</Story>
