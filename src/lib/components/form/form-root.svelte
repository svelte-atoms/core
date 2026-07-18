<script lang="ts" generics="B extends Base = Base">
	import { mergePresetProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { bindBond } from '$ixirjs/ui/shared/bond/bind.svelte';
	import { FormBond, type FormProps } from './bond.svelte';
	import type { FormRootProps } from './types';

	let {
		class: klass = '',
		renderless = false,
		validator = undefined,
		factory = defaultFactory,
		children = undefined,
		preset = undefined,
		...restProps
	}: FormRootProps<B> = $props();

	const formProps = $derived(mergePresetProps(preset, 'form', restProps));

	const binding = bindBond<FormBond>((props) => factory(props), {
		renderless: () => renderless,
		validator: () => validator
	});
	const bond = binding.bond.share();

	export function getBond() {
		return bond;
	}

	const content = $derived(renderless ? children : renderfull);

	function defaultFactory(props: FormProps) {
		return new FormBond(props);
	}
</script>

{#snippet renderfull({ form }: { form: FormBond })}
	<HtmlAtom bond={form} class={['$preset', klass]} as="form" {...formProps}>
		{@render children?.({ form })}
	</HtmlAtom>
{/snippet}

{@render content?.({ form: bond })}
