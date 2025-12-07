<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import QrCodeComponent from './qr-code.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/QR Code'
	});
</script>

<script>
</script>

<Story name="QR Code">
	<QrCodeComponent
		class="text-primary-foreground bg-primary size-64 rounded-2xl p-1"
		value="Hello World 123"
	/>
</Story>
