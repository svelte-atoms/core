<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import QrCodeComponent from './qr-code.svelte';
	import { Root } from '../root';

	const { Story } = defineMeta({
		title: 'Atoms/QR Code'
	});
</script>

<script>
</script>

<Story name="QR Code">
	{#snippet children(args)}
		<Root>
			{#snippet children({})}
				<div class="flex h-full w-full items-center justify-center">
					<QrCodeComponent
						class="text-primary-foreground bg-primary size-64 rounded-2xl p-1"
						value="Hello World 123"
					/>
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
