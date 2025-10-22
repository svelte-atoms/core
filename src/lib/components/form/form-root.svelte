<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { defineState, defineProperty } from '$svelte-atoms/core/utils/state';
	import type { Override, Factory } from '$svelte-atoms/core/types';
	import { FormBond, FormBondState, type FormProps } from './bond.svelte';

	type CommonProps = {
		factory?: Factory<FormBond>;
	};

	type RenderlessProps = {
		renderless?: true;
		children?: Snippet<[{ form: FormBond }]>;
	};

	type RenderfullProps<B extends Base = Base> = Override<
		HtmlAtomProps<'form', B>,
		{
			renderless?: false;
			children?: Snippet<[{ form: FormBond }]>;
		}
	>;

	export type FormRootProps<B extends Base = Base> = CommonProps &
		(RenderlessProps | RenderfullProps<B>);
</script>

<script lang="ts" generics="B extends Base = Base">
	let {
		class: klass = '',
		renderless = false,
		validator = undefined,
		factory = _factory,
		children = undefined,
		...restProps
	}: FormRootProps<S> & HTMLAttributes<HTMLFormElement> = $props();

	const bondProps = defineState<FormProps>([
		defineProperty('renderless', () => renderless),
		defineProperty('validator', () => validator)
	]);
	const bond = factory(bondProps).share();

	function _factory(props: typeof bondProps) {
		// Placeholder for any factory logic if needed

		const bondState = new FormBondState(() => props);

		return new FormBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

{#if renderless}
	{@render children?.({ form: bond })}
{:else}
	<HtmlAtom {bond} preset="form" class={['$preset', klass]} as="form" {...restProps}>
		{@render children?.({ form: bond })}
	</HtmlAtom>
{/if}
