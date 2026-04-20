<script lang="ts">
    import {Root} from '../dropdown-menu/atoms'
	import type { PopoverRootProps } from '../popover';

    let {placement = 'bottom-start', ...restProps}: PopoverRootProps = $props();
</script>

<Root {placement} {...restProps} />