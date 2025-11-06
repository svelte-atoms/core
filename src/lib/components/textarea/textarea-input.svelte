<script lang="ts">
	let { class: klass = '', value = $bindable(), ...restProps } = $props();
</script>

<textarea class={['border-border w-full outline-none', '$preset', klass]} bind:value {...restProps}
></textarea>
