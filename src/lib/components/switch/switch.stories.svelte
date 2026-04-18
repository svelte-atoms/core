<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { default as SwitchCmp } from './switch.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Switch'
	});
</script>

<script>
	let checked = $state(false);
</script>

<Story name="Default">
	{#snippet children()}
		<div class="flex flex-col gap-4">
			<div class="flex items-center gap-3">
				<SwitchCmp bind:checked />
				<span class="text-sm">{checked ? 'On' : 'Off'}</span>
			</div>

			<div class="flex items-center gap-3">
				<SwitchCmp checked={true} />
				<span class="text-sm">Checked (uncontrolled)</span>
			</div>

			<div class="flex items-center gap-3">
				<SwitchCmp disabled />
				<span class="text-sm text-muted-foreground">Disabled off</span>
			</div>

			<div class="flex items-center gap-3">
				<SwitchCmp checked={true} disabled />
				<span class="text-sm text-muted-foreground">Disabled on</span>
			</div>
		</div>
	{/snippet}
</Story>
