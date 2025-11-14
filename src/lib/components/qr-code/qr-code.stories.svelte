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
					<QrCodeComponent value="Hello World" />
				</div>
			{/snippet}
		</Root>
	{/snippet}
</Story>
