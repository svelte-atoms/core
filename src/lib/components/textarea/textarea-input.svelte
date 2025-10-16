<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';

	let { class: klass = '', value = $bindable(), ...restProps } = $props();
</script>

<textarea class={['w-full outline-none', klass]} bind:value {...restProps}></textarea>
