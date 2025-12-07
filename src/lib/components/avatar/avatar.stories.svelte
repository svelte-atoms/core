<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AvatarCmp from './avatar.svelte';
	import CalendarRegularIcon from '$svelte-atoms/core/icons/icon-arrow-down.svelte';

	const { Story } = defineMeta({
		title: 'ATOMS/Avatar'
	});
</script>

<Story name="Avatar">
	<div class="flex h-full w-full items-center justify-center gap-4">
		<AvatarCmp alt="Abdelhalim Riache" />

		<AvatarCmp src={CalendarRegularIcon} alt="Abdelhalim Riache" />

		<AvatarCmp
			src="https://sevennaturalwonders.org/wp-content/uploads/2023/12/1-Mount-Fuji.jpg"
			alt="Mount Fuji"
		/>
	</div>
</Story>
