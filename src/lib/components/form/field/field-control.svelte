<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { FieldBond } from './bond.svelte';
	import type { FieldControlProps } from '../types';

	type InputDetail = { value?: unknown; files?: File[]; date?: Date | null; number?: number; checked?: boolean }

	const bond = FieldBond.get();
	const name = $derived(bond?.state?.props?.name);

	let {
		class: klass = '',
		value = $bindable(),
		checked = $bindable(),
		number = $bindable(),
		date = $bindable(),
		files = $bindable(),
		children = undefined,
		oninput = undefined,
		...restProps
	}: FieldControlProps<E, B> = $props();
	
	const controlProps = $derived.by(() => {
		return {
			...(bond?.control().spread ?? {}),
			...restProps
		};
	});

	function handleInput(
		ev: InputEvent,
		inputDetail: InputDetail
	) {
		oninput?.(ev, inputDetail);

		if (ev.defaultPrevented) {
			return;
		}

		const detail = inputDetail ?? {};

		value = detail?.value;
		files = detail?.files ?? [];
		date = detail?.date ?? null;
		if (detail?.number !== undefined) {
			number = detail.number;
		}
		checked = detail?.checked ?? false;

		if (!bond) {
			return;
		}

		bond.state.props.value = value
		bond.state.props.files = files
		bond.state.props.date = date
		bond.state.props.number = number
		bond.state.props.checked = checked = detail?.checked ?? false;
	}
</script>

<HtmlAtom
	{value}
	{checked}
	{name}
	preset="field.control"
	class={['flex items-center', '$preset', klass]}
	oninput={(ev: InputEvent, detail: InputDetail) => handleInput(ev, detail)}
	{...controlProps}
>
	{@render children?.({ field: bond })}
</HtmlAtom>
