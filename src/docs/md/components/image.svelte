<script lang="ts">
	interface Props {
		src: string;
		alt?: string;
	}

	let { src, alt = '' }: Props = $props();
</script>
![{alt}]({src})
