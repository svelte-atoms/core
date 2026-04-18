<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { FieldBond } from './bond.svelte';
	import type { FieldControlProps } from '../types';

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
		const raw = /** @type {Record<string, unknown>} */ (bond?.control?.() ?? {});
		return {
			...raw,
			...restProps
		};
	});

	function handleInput(
		ev: CustomEvent<{
			value?: unknown;
			files?: File[];
			date?: Date | null;
			number?: number;
			checked?: boolean;
		}>
	) {
		oninput?.(ev, { value: ev?.detail?.value });

		if (ev.defaultPrevented) {
			return;
		}

		const detail = ev?.detail ?? {};

		if (!bond) {
			return;
		}

		bond.state.props.value = value = detail?.value;
		bond.state.props.files = files = detail?.files ?? [];
		bond.state.props.date = date = detail?.date ?? null;
		if (detail?.number !== undefined) {
			bond.state.props.number = number = detail.number;
		}
		bond.state.props.checked = checked = detail?.checked ?? false;
	}
</script>

<HtmlAtom
	{value}
	{checked}
	{name}
	preset="field.control"
	class={['flex items-center', '$preset', klass]}
	oninput={(ev: Event) => handleInput(ev as unknown as CustomEvent<{ value?: unknown; files?: File[]; date?: Date | null; number?: number; checked?: boolean }>)}
	{...controlProps}
>
	{@render children?.({ field: bond })}
</HtmlAtom>
